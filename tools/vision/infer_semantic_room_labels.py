#!/usr/bin/env python3
"""
Pass 3: infer semantic room labels from snapped candidates and source images.

This is a lightweight heuristic classifier intended for iterative workflow:
- Produces probabilities for semantic zones (living/sleeping/wet/circulation/workspace/storage)
- Suggests a moduleType for the existing builder schema
- Writes enriched candidate JSON for review/import
"""

from __future__ import annotations

import argparse
import json
import math
from pathlib import Path
from typing import Any

import cv2
import numpy as np


SEMANTIC_KEYS = ["living", "sleeping", "wet", "circulation", "workspace", "storage"]


def clamp01(value: float) -> float:
    return max(0.0, min(1.0, value))


def softmax(scores: dict[str, float]) -> dict[str, float]:
    keys = list(scores.keys())
    values = np.array([scores[k] for k in keys], dtype=np.float64)
    values = values - np.max(values)
    exps = np.exp(values)
    denom = float(np.sum(exps))
    if denom <= 1e-9:
        return {k: round(1.0 / len(keys), 4) for k in keys}
    return {k: round(float(exps[i] / denom), 4) for i, k in enumerate(keys)}


def read_features(image_path: Path) -> dict[str, float]:
    image = cv2.imread(str(image_path))
    if image is None:
        return {
            "brightness": 0.5,
            "saturation": 0.5,
            "contrast": 0.5,
            "warmth": 0.5,
            "edge_density": 0.3,
        }

    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    h, w = gray.shape
    pixel_count = float(max(1, h * w))

    brightness = float(np.mean(hsv[:, :, 2]) / 255.0)
    saturation = float(np.mean(hsv[:, :, 1]) / 255.0)
    contrast = float(np.std(gray) / 128.0)

    # Warmth proxy: compare red and blue channel means
    b_mean = float(np.mean(image[:, :, 0]) / 255.0)
    r_mean = float(np.mean(image[:, :, 2]) / 255.0)
    warmth = clamp01((r_mean - b_mean + 1.0) / 2.0)

    edges = cv2.Canny(gray, 80, 170)
    edge_density = float(np.count_nonzero(edges) / pixel_count)
    edge_density = clamp01(edge_density * 3.5)

    return {
        "brightness": round(brightness, 4),
        "saturation": round(saturation, 4),
        "contrast": round(clamp01(contrast), 4),
        "warmth": round(warmth, 4),
        "edge_density": round(edge_density, 4),
    }


def partition_features(candidate: dict[str, Any]) -> dict[str, float]:
    design = candidate.get("design", {})
    partitions = design.get("partitions", [])
    if not partitions:
        return {
            "partition_count": 0.0,
            "radial_ratio": 0.0,
            "ring_ratio": 0.0,
            "doorway_ratio": 0.0,
            "mean_door_width": 0.9,
        }

    p_count = float(len(partitions))
    radial = sum(1 for p in partitions if p.get("kind") == "radial")
    ring = sum(1 for p in partitions if p.get("kind") == "ring")
    doorway_partitions = [p for p in partitions if p.get("doorWidthMeters") is not None]
    doorway_ratio = float(len(doorway_partitions) / p_count)
    door_widths = [float(p.get("doorWidthMeters", 0.9)) for p in doorway_partitions]
    mean_door_width = float(sum(door_widths) / max(1, len(door_widths)))
    return {
        "partition_count": p_count,
        "radial_ratio": float(radial / p_count),
        "ring_ratio": float(ring / p_count),
        "doorway_ratio": doorway_ratio,
        "mean_door_width": mean_door_width,
    }


def semantic_scores(
    image_feats: dict[str, float],
    part_feats: dict[str, float],
    room_area_m2: float,
) -> dict[str, float]:
    area_norm = clamp01(room_area_m2 / 120.0)
    compact_norm = clamp01(1.0 - (room_area_m2 / 90.0))

    bright = image_feats["brightness"]
    sat = image_feats["saturation"]
    warm = image_feats["warmth"]
    contrast = image_feats["contrast"]
    edges = image_feats["edge_density"]

    partitions = clamp01(part_feats["partition_count"] / 14.0)
    radial = clamp01(part_feats["radial_ratio"])
    doorway = clamp01(part_feats["doorway_ratio"])
    door_w = clamp01((part_feats["mean_door_width"] - 0.7) / 0.8)

    scores = {
        "living": 1.2 * area_norm + 0.8 * bright + 0.6 * warm + 0.4 * door_w - 0.3 * partitions,
        "sleeping": 0.9 * compact_norm + 0.7 * warm + 0.4 * sat + 0.2 * doorway - 0.2 * edges,
        "wet": 0.8 * sat + 0.7 * contrast + 0.5 * edges + 0.4 * partitions - 0.4 * warm,
        "circulation": 1.0 * doorway + 0.8 * partitions + 0.5 * radial - 0.2 * area_norm,
        "workspace": 0.7 * bright + 0.6 * contrast + 0.4 * compact_norm + 0.3 * sat,
        "storage": 0.9 * compact_norm + 0.7 * partitions + 0.3 * edges - 0.2 * bright,
    }
    return scores


def pick_module_type(
    semantics_prob: dict[str, float],
    room_area_m2: float,
    current_module: str | None,
) -> str:
    top_semantic = max(semantics_prob.items(), key=lambda x: x[1])[0]

    # Keep dome scale if already selected by prior passes.
    if room_area_m2 >= 120:
        dome_module = "geodesic_dome_great"
    elif room_area_m2 >= 55:
        dome_module = "geodesic_dome"
    else:
        dome_module = "geodesic_dome_studio"

    semantic_map = {
        "living": "living_room",
        "sleeping": "bedroom",
        "wet": "bathroom",
        "circulation": "hallway",
        "workspace": "office",
        "storage": "closet",
    }
    base_module = semantic_map.get(top_semantic, "living_room")

    # For dome-first workflow, keep dome module if we started with one.
    if current_module and current_module.startswith("geodesic_dome"):
        return dome_module
    return base_module


def enrich_candidate(candidate: dict[str, Any]) -> dict[str, Any]:
    out = json.loads(json.dumps(candidate))
    design = out.get("design", {})
    rooms = design.get("rooms", [])
    if not rooms:
        return out

    room = rooms[0]
    dims = room.get("dims", {})
    area_m2 = float(dims.get("x", 8.0)) * float(dims.get("y", 8.0))
    source_img = Path(out.get("sourceImage", ""))

    image_feats = read_features(source_img)
    part_feats = partition_features(out)
    scores = semantic_scores(image_feats=image_feats, part_feats=part_feats, room_area_m2=area_m2)
    probs = softmax(scores)
    suggested_module = pick_module_type(probs, room_area_m2=area_m2, current_module=room.get("moduleType"))

    sorted_semantics = sorted(probs.items(), key=lambda x: x[1], reverse=True)
    top3 = [{"label": k, "probability": p} for k, p in sorted_semantics[:3]]

    out["semanticInference"] = {
        "version": "pass3-heuristic-v1",
        "scores": {k: round(float(v), 4) for k, v in scores.items()},
        "probabilities": probs,
        "top3": top3,
        "imageFeatures": image_feats,
        "partitionFeatures": {
            k: round(float(v), 4) for k, v in part_feats.items()
        },
        "suggestedModuleType": suggested_module,
    }

    # Do not overwrite current module automatically; attach suggestion only.
    return out


def main() -> None:
    parser = argparse.ArgumentParser(description="Infer semantic room labels for snapped candidates.")
    parser.add_argument("--in", dest="in_dir", required=True, help="Input snapped candidate directory")
    parser.add_argument(
        "--out",
        dest="out_dir",
        default="data/vision/hobbit-homes/semantic-candidates",
        help="Output directory",
    )
    parser.add_argument("--limit", type=int, default=0, help="Max candidates (0 means all)")
    args = parser.parse_args()

    in_dir = Path(args.in_dir).resolve()
    out_dir = Path(args.out_dir).resolve()
    out_candidates = out_dir / "candidates"
    out_candidates.mkdir(parents=True, exist_ok=True)

    files = sorted(in_dir.rglob("*.json"))
    if args.limit > 0:
        files = files[: args.limit]

    index = []
    for idx, path in enumerate(files):
        candidate = json.loads(path.read_text(encoding="utf-8"))
        enriched = enrich_candidate(candidate)
        out_path = out_candidates / path.name
        out_path.write_text(json.dumps(enriched, indent=2), encoding="utf-8")

        inf = enriched.get("semanticInference", {})
        top = inf.get("top3", [])
        index.append(
            {
                "id": path.stem,
                "source": str(path),
                "semanticPath": str(out_path),
                "suggestedModuleType": inf.get("suggestedModuleType"),
                "topSemantic": top[0]["label"] if top else None,
                "topSemanticProb": top[0]["probability"] if top else None,
            }
        )
        if (idx + 1) % 100 == 0:
            print(f"Inferred semantics for {idx + 1}/{len(files)} candidates...")

    report = {
        "inputDir": str(in_dir),
        "outputDir": str(out_dir),
        "processed": len(index),
    }
    (out_dir / "index.json").write_text(json.dumps(index, indent=2), encoding="utf-8")
    (out_dir / "report.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
