#!/usr/bin/env python3
"""
Convert wireframe line JSON files into builder-ready Design candidates.

Input: output from generate_wireframes.py (wireframes/lines/*.json)
Output: candidate JSON files containing a Design payload compatible with
apps/housing-designer store importDesign schema.
"""

from __future__ import annotations

import argparse
import json
import math
import uuid
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import cv2

GRID_M = 0.5


def empty_slots() -> dict[str, None]:
    return {
        "floor": None,
        "ceiling": None,
        "wall_n": None,
        "wall_s": None,
        "wall_e": None,
        "wall_w": None,
        "exterior": None,
        "roof": None,
        "trim": None,
        "cabinet": None,
        "countertop": None,
        "fixture": None,
    }


def iso_now() -> str:
    return datetime.now(timezone.utc).isoformat()


@dataclass
class LineSeg:
    x1: float
    y1: float
    x2: float
    y2: float

    @property
    def dx(self) -> float:
        return self.x2 - self.x1

    @property
    def dy(self) -> float:
        return self.y2 - self.y1

    @property
    def length(self) -> float:
        return math.hypot(self.dx, self.dy)

    @property
    def mid(self) -> tuple[float, float]:
        return ((self.x1 + self.x2) / 2.0, (self.y1 + self.y2) / 2.0)

    def min_dist_to_point(self, px: float, py: float) -> float:
        ax, ay, bx, by = self.x1, self.y1, self.x2, self.y2
        vx, vy = bx - ax, by - ay
        wx, wy = px - ax, py - ay
        vv = vx * vx + vy * vy
        if vv <= 1e-9:
            return math.hypot(px - ax, py - ay)
        t = max(0.0, min(1.0, (wx * vx + wy * vy) / vv))
        qx = ax + t * vx
        qy = ay + t * vy
        return math.hypot(px - qx, py - qy)


def room_module_from_density(line_count: int) -> tuple[str, float]:
    if line_count > 420:
        return ("geodesic_dome_great", 12.0)
    if line_count > 180:
        return ("geodesic_dome", 8.0)
    return ("geodesic_dome_studio", 5.0)


def to_room_meters(x_px: float, y_px: float, width: int, height: int, diameter_m: float) -> tuple[float, float]:
    x_norm = x_px / max(1.0, float(width))
    y_norm = y_px / max(1.0, float(height))
    return (x_norm * diameter_m, y_norm * diameter_m)


def dominant_lines(lines: list[LineSeg], max_keep: int) -> list[LineSeg]:
    long_lines = [line for line in lines if line.length > 30]
    long_lines.sort(key=lambda line: line.length, reverse=True)
    bins: dict[int, list[LineSeg]] = {}
    for line in long_lines:
        angle = (math.degrees(math.atan2(line.dy, line.dx)) + 180.0) % 180.0
        key = int(angle // 15)
        bins.setdefault(key, []).append(line)
    picked: list[LineSeg] = []
    for bucket in sorted(bins.values(), key=lambda items: items[0].length if items else 0, reverse=True):
        if bucket:
            picked.append(bucket[0])
        if len(picked) >= max_keep:
            break
    if len(picked) < max_keep:
        for line in long_lines:
            if line in picked:
                continue
            picked.append(line)
            if len(picked) >= max_keep:
                break
    return picked


def line_to_partition(
    line: LineSeg,
    room_id: str,
    level: int,
    width_px: int,
    height_px: int,
    diameter_m: float,
) -> dict[str, Any]:
    center_x = width_px / 2.0
    center_y = height_px / 2.0
    radius_px = min(width_px, height_px) * 0.45
    near_center = line.min_dist_to_point(center_x, center_y) < radius_px * 0.12

    thickness = 0.12
    height_m = min(2.4, diameter_m * 0.5)
    door_width = 0.9 if line.length > radius_px * 0.35 else None

    if near_center:
        d1 = math.hypot(line.x1 - center_x, line.y1 - center_y)
        d2 = math.hypot(line.x2 - center_x, line.y2 - center_y)
        fx, fy = (line.x1, line.y1) if d1 >= d2 else (line.x2, line.y2)
        angle = (math.degrees(math.atan2(fy - center_y, fx - center_x)) + 360.0) % 360.0
        end_m = min((max(d1, d2) / radius_px) * (diameter_m / 2.0), (diameter_m / 2.0) - 0.2)
        return {
            "id": str(uuid.uuid4()),
            "roomId": room_id,
            "level": level,
            "kind": "radial",
            "angleDeg": angle,
            "startMeters": 0.6,
            "endMeters": max(1.0, end_m),
            "thicknessMeters": thickness,
            "heightMeters": height_m,
            "doorWidthMeters": door_width,
        }

    x_mid, y_mid = line.mid
    x_m, y_m = to_room_meters(x_mid, y_mid, width_px, height_px, diameter_m)
    vertical = abs(line.dx) < abs(line.dy)

    return {
        "id": str(uuid.uuid4()),
        "roomId": room_id,
        "level": level,
        "kind": "straight",
        "orientation": "vertical" if vertical else "horizontal",
        "offsetMeters": x_m if vertical else y_m,
        "thicknessMeters": thickness,
        "heightMeters": height_m,
        "doorWidthMeters": door_width,
    }


def clamp_partition(partition: dict[str, Any], diameter_m: float) -> dict[str, Any]:
    radius = diameter_m / 2.0
    if partition["kind"] == "straight":
        orientation = partition["orientation"]
        limit = diameter_m - 0.3
        partition["offsetMeters"] = max(0.3, min(limit, float(partition["offsetMeters"])))
        if orientation not in {"vertical", "horizontal"}:
            partition["orientation"] = "vertical"
    elif partition["kind"] == "radial":
        partition["angleDeg"] = float(partition["angleDeg"]) % 360.0
        start = max(0.2, min(radius - 0.8, float(partition["startMeters"])))
        end = max(start + 0.6, min(radius - 0.1, float(partition["endMeters"])))
        partition["startMeters"] = start
        partition["endMeters"] = end
    return partition


def dedupe_partitions(partitions: list[dict[str, Any]], diameter_m: float) -> list[dict[str, Any]]:
    kept: list[dict[str, Any]] = []
    seen: set[tuple[str, str, int]] = set()
    for part in partitions:
        if part["kind"] == "straight":
            key = (
                "straight",
                part["orientation"],
                int(round(float(part["offsetMeters"]) * 3)),
            )
        else:
            key = (
                "radial",
                "angle",
                int(round(float(part["angleDeg"]) / 12.0)),
            )
        if key in seen:
            continue
        seen.add(key)
        kept.append(part)
    max_parts = max(3, int(diameter_m))
    return kept[:max_parts]


def read_image_dims(image_path: Path) -> tuple[int, int]:
    img = cv2.imread(str(image_path))
    if img is None:
        raise RuntimeError(f"Unable to load image: {image_path}")
    h, w = img.shape[:2]
    return (w, h)


def build_candidate_from_lines(
    lines_payload: dict[str, Any],
    out_stem: str,
    level_index: int,
    max_partitions: int,
) -> dict[str, Any]:
    source_path = Path(lines_payload["source"]).resolve()
    width_px, height_px = read_image_dims(source_path)
    lines = [
        LineSeg(float(item["x1"]), float(item["y1"]), float(item["x2"]), float(item["y2"]))
        for item in lines_payload.get("lines", [])
    ]
    picked = dominant_lines(lines, max_partitions)

    module_type, diameter_m = room_module_from_density(len(lines))
    grid_size = max(8, int(round(diameter_m / GRID_M)))

    design_id = str(uuid.uuid4())
    room_id = str(uuid.uuid4())
    room = {
        "id": room_id,
        "moduleType": module_type,
        "gridX": 0,
        "gridY": 0,
        "gridW": grid_size,
        "gridH": grid_size,
        "level": level_index,
        "rotation": 0,
        "dims": {"x": diameter_m, "y": diameter_m, "z": round(diameter_m * 0.5, 2)},
        "connectors": [
            {
                "id": "ai-door-s",
                "face": "south",
                "kind": "door",
                "offsetFraction": 0.5,
                "widthMeters": 1.0,
                "heightMeters": 2.1,
                "required": False,
            }
        ],
        "materialSlots": empty_slots(),
        "customLabel": out_stem,
        "locked": False,
    }

    partitions: list[dict[str, Any]] = []
    for line in picked:
        partition = line_to_partition(
            line=line,
            room_id=room_id,
            level=level_index,
            width_px=width_px,
            height_px=height_px,
            diameter_m=diameter_m,
        )
        partitions.append(clamp_partition(partition, diameter_m))
    partitions = dedupe_partitions(partitions, diameter_m)

    timestamp = iso_now()
    design = {
        "id": design_id,
        "name": f"AI Candidate - {out_stem}",
        "createdAt": timestamp,
        "updatedAt": timestamp,
        "levels": [{"index": level_index, "label": "Ground Floor", "floorHeightMeters": 0, "visible": True}],
        "rooms": [room],
        "partitions": partitions,
        "connections": [],
        "globalMaterials": empty_slots(),
        "metadata": {
            "totalSqFt": round(diameter_m * diameter_m * 10.7639, 2),
            "totalSqM": round(diameter_m * diameter_m, 2),
            "roomCount": 1,
            "levelCount": 1,
        },
    }

    # Keep doorway candidates separate so UI can promote them in later tooling.
    doorway_candidates = [
        {
            "id": f"door-candidate-{idx}",
            "partitionId": part["id"],
            "widthMeters": float(part["doorWidthMeters"]),
            "heightMeters": 2.1,
        }
        for idx, part in enumerate(partitions)
        if part.get("doorWidthMeters")
        and (
            part["kind"] != "straight"
            or 0.8 <= float(part.get("offsetMeters", 0.0)) <= (diameter_m - 0.8)
        )
    ]

    return {
        "sourceImage": str(source_path),
        "sourceLineCount": len(lines),
        "usedLineCount": len(picked),
        "moduleType": module_type,
        "diameterMeters": diameter_m,
        "doorwayCandidates": doorway_candidates,
        "design": design,
    }


def main() -> None:
    parser = argparse.ArgumentParser(description="Convert wireframe lines into builder design candidates.")
    parser.add_argument("--lines", required=True, help="Directory containing line JSON files")
    parser.add_argument("--out", default="data/vision/hobbit-homes/builder-candidates", help="Output directory")
    parser.add_argument("--limit", type=int, default=0, help="Max line JSON files to process (0 means all)")
    parser.add_argument("--max-partitions", type=int, default=10, help="Max inferred partitions per candidate")
    args = parser.parse_args()

    lines_dir = Path(args.lines).resolve()
    out_dir = Path(args.out).resolve()
    candidates_dir = out_dir / "candidates"
    candidates_dir.mkdir(parents=True, exist_ok=True)

    files = sorted(lines_dir.rglob("*.json"))
    if args.limit > 0:
        files = files[: args.limit]

    index = []
    for idx, path in enumerate(files):
        payload = json.loads(path.read_text(encoding="utf-8"))
        stem = path.stem
        candidate = build_candidate_from_lines(
            lines_payload=payload,
            out_stem=stem,
            level_index=0,
            max_partitions=max(1, args.max_partitions),
        )
        out_path = candidates_dir / f"{stem}.json"
        out_path.write_text(json.dumps(candidate, indent=2), encoding="utf-8")
        index.append(
            {
                "id": stem,
                "candidatePath": str(out_path),
                "sourceImage": candidate["sourceImage"],
                "moduleType": candidate["moduleType"],
                "usedLineCount": candidate["usedLineCount"],
                "sourceLineCount": candidate["sourceLineCount"],
            }
        )
        if (idx + 1) % 50 == 0:
            print(f"Processed {idx + 1}/{len(files)} line files...")

    summary = {
        "linesDir": str(lines_dir),
        "outputDir": str(out_dir),
        "candidatesCreated": len(index),
    }
    (out_dir / "index.json").write_text(json.dumps(index, indent=2), encoding="utf-8")
    (out_dir / "summary.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
