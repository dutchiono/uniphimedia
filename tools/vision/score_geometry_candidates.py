#!/usr/bin/env python3
"""
Pass 1: score and filter wireframe line JSON quality.

This helps remove very noisy/low-structure images before builder conversion.
Input: wireframes/lines/*.json
Output:
- accepted-lines/ (copies of accepted line JSON files)
- report.json
- accepted.json / rejected.json
"""

from __future__ import annotations

import argparse
import json
import math
import shutil
from dataclasses import dataclass
from pathlib import Path
from typing import Any

import cv2


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


def load_dims(image_path: Path) -> tuple[int, int]:
    img = cv2.imread(str(image_path))
    if img is None:
        return (0, 0)
    h, w = img.shape[:2]
    return (w, h)


def score_lines(payload: dict[str, Any]) -> dict[str, float]:
    source = Path(payload.get("source", ""))
    lines_raw = payload.get("lines", [])
    lines = [LineSeg(float(v["x1"]), float(v["y1"]), float(v["x2"]), float(v["y2"])) for v in lines_raw]
    count = len(lines)
    if count == 0:
        return {
            "score": 0.0,
            "line_count": 0.0,
            "long_ratio": 0.0,
            "orientation_balance": 0.0,
            "interior_ratio": 0.0,
        }

    w, h = load_dims(source)
    long_lines = [line for line in lines if line.length >= 60]
    long_ratio = len(long_lines) / max(1, count)

    verticalish = sum(1 for line in lines if abs(line.dy) > abs(line.dx) * 1.25)
    horizontalish = sum(1 for line in lines if abs(line.dx) > abs(line.dy) * 1.25)
    diagish = max(0, count - verticalish - horizontalish)
    min_dir = min(verticalish, horizontalish, diagish)
    max_dir = max(verticalish, horizontalish, diagish)
    orientation_balance = 0.0 if max_dir == 0 else (min_dir / max_dir)

    edge_margin_x = w * 0.08 if w > 0 else 0.0
    edge_margin_y = h * 0.08 if h > 0 else 0.0
    interior_hits = 0
    for line in lines:
        mx = (line.x1 + line.x2) * 0.5
        my = (line.y1 + line.y2) * 0.5
        if edge_margin_x <= mx <= (w - edge_margin_x) and edge_margin_y <= my <= (h - edge_margin_y):
            interior_hits += 1
    interior_ratio = interior_hits / max(1, count)

    # Too many lines is usually noisy; too few lines means little structure.
    if count < 80:
        density_score = count / 80.0
    elif count > 2500:
        density_score = max(0.0, 1.0 - ((count - 2500) / 3000.0))
    else:
        density_score = 1.0

    score = (
        0.35 * density_score
        + 0.30 * long_ratio
        + 0.20 * orientation_balance
        + 0.15 * interior_ratio
    )

    return {
        "score": round(max(0.0, min(1.0, score)), 4),
        "line_count": float(count),
        "long_ratio": round(long_ratio, 4),
        "orientation_balance": round(orientation_balance, 4),
        "interior_ratio": round(interior_ratio, 4),
    }


def main() -> None:
    parser = argparse.ArgumentParser(description="Score and filter geometry candidates from line JSON files.")
    parser.add_argument("--lines", required=True, help="Directory with line JSON files")
    parser.add_argument("--out", default="data/vision/hobbit-homes/geometry-pass1", help="Output directory")
    parser.add_argument("--threshold", type=float, default=0.42, help="Accept score threshold (0.0-1.0)")
    parser.add_argument("--limit", type=int, default=0, help="Max files to evaluate (0 means all)")
    args = parser.parse_args()

    lines_dir = Path(args.lines).resolve()
    out_dir = Path(args.out).resolve()
    accepted_dir = out_dir / "accepted-lines"
    accepted_dir.mkdir(parents=True, exist_ok=True)

    files = sorted(lines_dir.rglob("*.json"))
    if args.limit > 0:
        files = files[: args.limit]

    accepted: list[dict[str, Any]] = []
    rejected: list[dict[str, Any]] = []

    for idx, path in enumerate(files):
        payload = json.loads(path.read_text(encoding="utf-8"))
        metrics = score_lines(payload)
        row = {
            "id": path.stem,
            "linePath": str(path),
            "source": payload.get("source"),
            **metrics,
        }
        if metrics["score"] >= args.threshold:
            accepted.append(row)
            shutil.copy2(path, accepted_dir / path.name)
        else:
            rejected.append(row)

        if (idx + 1) % 100 == 0:
            print(f"Scored {idx + 1}/{len(files)} files...")

    report = {
        "linesDir": str(lines_dir),
        "outputDir": str(out_dir),
        "threshold": args.threshold,
        "evaluated": len(files),
        "accepted": len(accepted),
        "rejected": len(rejected),
    }

    (out_dir / "accepted.json").write_text(json.dumps(accepted, indent=2), encoding="utf-8")
    (out_dir / "rejected.json").write_text(json.dumps(rejected, indent=2), encoding="utf-8")
    (out_dir / "report.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
