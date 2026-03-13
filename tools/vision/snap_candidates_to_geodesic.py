#!/usr/bin/env python3
"""
Pass 2: snap builder design candidates to geodesic-friendly constraints.

Input: builder-candidates/candidates/*.json
Output: snapped-candidates/candidates/*.json plus report/index
"""

from __future__ import annotations

import argparse
import json
import math
from pathlib import Path
from typing import Any


DOOR_WIDTH_STEPS = [0.76, 0.82, 0.9, 1.0, 1.2, 1.4]


def nearest(value: float, choices: list[float]) -> float:
    return min(choices, key=lambda x: abs(x - value))


def clamp(value: float, low: float, high: float) -> float:
    return max(low, min(high, value))


def geodesic_sectors(diameter_m: float) -> int:
    if diameter_m >= 11:
        return 24
    if diameter_m >= 7:
        return 18
    return 12


def snap_partition(part: dict[str, Any], diameter_m: float, sectors: int) -> tuple[dict[str, Any], bool]:
    changed = False
    out = dict(part)
    radius = diameter_m / 2.0
    chord_step = max(0.3, round((math.pi * diameter_m / sectors) * 0.5, 2))
    angle_step = 360.0 / float(sectors)

    if out.get("kind") == "straight":
        offset = float(out.get("offsetMeters", diameter_m / 2.0))
        snapped = round(round(offset / chord_step) * chord_step, 3)
        snapped = clamp(snapped, 0.8, diameter_m - 0.8)
        if abs(snapped - offset) > 1e-4:
            out["offsetMeters"] = snapped
            changed = True
    elif out.get("kind") == "radial":
        angle = float(out.get("angleDeg", 0.0))
        snapped_angle = round(round(angle / angle_step) * angle_step, 3) % 360.0
        if abs(snapped_angle - angle) > 1e-4:
            out["angleDeg"] = snapped_angle
            changed = True

        start = float(out.get("startMeters", 0.6))
        end = float(out.get("endMeters", radius - 0.2))
        snapped_start = clamp(round(round(start / chord_step) * chord_step, 3), 0.4, max(0.4, radius - 1.0))
        snapped_end = clamp(round(round(end / chord_step) * chord_step, 3), snapped_start + 0.6, radius - 0.1)
        if abs(snapped_start - start) > 1e-4:
            out["startMeters"] = snapped_start
            changed = True
        if abs(snapped_end - end) > 1e-4:
            out["endMeters"] = snapped_end
            changed = True
    elif out.get("kind") == "ring":
        ring_r = float(out.get("radiusMeters", radius * 0.55))
        snapped_r = clamp(round(round(ring_r / chord_step) * chord_step, 3), 0.8, radius - 0.3)
        if abs(snapped_r - ring_r) > 1e-4:
            out["radiusMeters"] = snapped_r
            changed = True
        sweep = float(out.get("sweepDeg", 270.0))
        snapped_sweep = clamp(round(round(sweep / angle_step) * angle_step, 3), angle_step, 360.0)
        if abs(snapped_sweep - sweep) > 1e-4:
            out["sweepDeg"] = snapped_sweep
            changed = True

    if out.get("doorWidthMeters") is not None:
        width = float(out["doorWidthMeters"])
        snapped_w = nearest(width, DOOR_WIDTH_STEPS)
        if abs(snapped_w - width) > 1e-4:
            out["doorWidthMeters"] = snapped_w
            changed = True

    thickness = float(out.get("thicknessMeters", 0.12))
    snapped_thickness = nearest(thickness, [0.1, 0.12, 0.15, 0.18, 0.2, 0.24, 0.3])
    if abs(snapped_thickness - thickness) > 1e-4:
        out["thicknessMeters"] = snapped_thickness
        changed = True

    return out, changed


def snap_candidate(payload: dict[str, Any]) -> tuple[dict[str, Any], int]:
    out = json.loads(json.dumps(payload))
    design = out.get("design", {})
    rooms = design.get("rooms", [])
    if not rooms:
        return out, 0

    room = rooms[0]
    diameter = float(room.get("dims", {}).get("x", 8.0))
    sectors = geodesic_sectors(diameter)
    partitions = design.get("partitions", [])

    snapped_parts = []
    changed_count = 0
    for part in partitions:
        snapped, changed = snap_partition(part, diameter_m=diameter, sectors=sectors)
        snapped_parts.append(snapped)
        if changed:
            changed_count += 1

    deduped: list[dict[str, Any]] = []
    seen: set[tuple[str, str, int]] = set()
    for part in snapped_parts:
        if part.get("kind") == "straight":
            key = ("straight", str(part.get("orientation")), int(round(float(part.get("offsetMeters", 0.0)) * 4)))
        elif part.get("kind") == "radial":
            key = ("radial", "angle", int(round(float(part.get("angleDeg", 0.0)) / 10.0)))
        else:
            key = ("ring", "radius", int(round(float(part.get("radiusMeters", 0.0)) * 4)))
        if key in seen:
            continue
        seen.add(key)
        deduped.append(part)

    design["partitions"] = deduped
    out["design"] = design
    out["geodesicSnap"] = {
        "sectors": sectors,
        "diameterMeters": diameter,
        "changedPartitions": changed_count,
    }
    return out, changed_count


def main() -> None:
    parser = argparse.ArgumentParser(description="Snap builder candidates to geodesic constraints.")
    parser.add_argument("--in", dest="in_dir", required=True, help="Input candidate directory")
    parser.add_argument("--out", dest="out_dir", default="data/vision/hobbit-homes/snapped-candidates", help="Output directory")
    parser.add_argument("--limit", type=int, default=0, help="Max candidates to process (0 means all)")
    args = parser.parse_args()

    in_dir = Path(args.in_dir).resolve()
    out_dir = Path(args.out_dir).resolve()
    out_candidates = out_dir / "candidates"
    out_candidates.mkdir(parents=True, exist_ok=True)

    files = sorted(in_dir.rglob("*.json"))
    if args.limit > 0:
        files = files[: args.limit]

    index = []
    total_changed = 0
    for idx, path in enumerate(files):
        payload = json.loads(path.read_text(encoding="utf-8"))
        snapped, changed_count = snap_candidate(payload)
        total_changed += changed_count

        out_path = out_candidates / path.name
        out_path.write_text(json.dumps(snapped, indent=2), encoding="utf-8")
        index.append(
            {
                "id": path.stem,
                "source": str(path),
                "snappedPath": str(out_path),
                "changedPartitions": changed_count,
            }
        )
        if (idx + 1) % 100 == 0:
            print(f"Snapped {idx + 1}/{len(files)} candidates...")

    report = {
        "inputDir": str(in_dir),
        "outputDir": str(out_dir),
        "processed": len(files),
        "totalChangedPartitions": total_changed,
    }
    (out_dir / "index.json").write_text(json.dumps(index, indent=2), encoding="utf-8")
    (out_dir / "report.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
