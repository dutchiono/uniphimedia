#!/usr/bin/env python3
"""
Generate wireframe candidates from normalized room images.

This is a first-pass extractor:
- edge detection
- line segment detection
- per-image JSON with line segments
- rendered PNG wireframe preview
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path

import cv2
import numpy as np


def find_images(in_dir: Path) -> list[Path]:
    exts = {".jpg", ".jpeg", ".png", ".webp"}
    return sorted([p for p in in_dir.rglob("*") if p.is_file() and p.suffix.lower() in exts])


def process_image(
    img_path: Path,
    out_img_path: Path,
    out_json_path: Path,
    canny1: int,
    canny2: int,
    hough_threshold: int,
    min_line_length: int,
    max_line_gap: int,
) -> int:
    img = cv2.imread(str(img_path))
    if img is None:
        return 0

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (5, 5), 0)
    edges = cv2.Canny(blur, canny1, canny2)

    lines = cv2.HoughLinesP(
        edges,
        rho=1,
        theta=np.pi / 180,
        threshold=hough_threshold,
        minLineLength=min_line_length,
        maxLineGap=max_line_gap,
    )

    canvas = np.full((gray.shape[0], gray.shape[1], 3), 255, dtype=np.uint8)
    line_records = []

    if lines is not None:
        for line in lines:
            x1, y1, x2, y2 = [int(v) for v in line[0]]
            cv2.line(canvas, (x1, y1), (x2, y2), (25, 25, 25), 1, cv2.LINE_AA)
            line_records.append({"x1": x1, "y1": y1, "x2": x2, "y2": y2})

    out_img_path.parent.mkdir(parents=True, exist_ok=True)
    out_json_path.parent.mkdir(parents=True, exist_ok=True)
    cv2.imwrite(str(out_img_path), canvas)
    out_json_path.write_text(json.dumps({"source": str(img_path), "lines": line_records}, indent=2), encoding="utf-8")
    return len(line_records)


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate wireframe candidates from image dataset.")
    parser.add_argument("--in", dest="in_dir", required=True, help="Input directory of normalized images")
    parser.add_argument("--out", dest="out_dir", default="data/vision/hobbit-homes/wireframes", help="Output directory")
    parser.add_argument("--limit", type=int, default=0, help="Max images to process (0 means all)")
    parser.add_argument("--canny1", type=int, default=60)
    parser.add_argument("--canny2", type=int, default=150)
    parser.add_argument("--hough-threshold", type=int, default=60)
    parser.add_argument("--min-line-length", type=int, default=35)
    parser.add_argument("--max-line-gap", type=int, default=14)
    args = parser.parse_args()

    in_dir = Path(args.in_dir).resolve()
    out_dir = Path(args.out_dir).resolve()
    preview_dir = out_dir / "preview"
    lines_dir = out_dir / "lines"

    images = find_images(in_dir)
    if args.limit > 0:
        images = images[: args.limit]

    total_lines = 0
    for idx, img_path in enumerate(images):
        rel = img_path.relative_to(in_dir)
        out_img_path = preview_dir / rel.with_suffix(".png")
        out_json_path = lines_dir / rel.with_suffix(".json")
        line_count = process_image(
            img_path=img_path,
            out_img_path=out_img_path,
            out_json_path=out_json_path,
            canny1=args.canny1,
            canny2=args.canny2,
            hough_threshold=args.hough_threshold,
            min_line_length=args.min_line_length,
            max_line_gap=args.max_line_gap,
        )
        total_lines += line_count

        if (idx + 1) % 50 == 0:
            print(f"Processed {idx + 1}/{len(images)} images...")

    summary = {
        "input_dir": str(in_dir),
        "output_dir": str(out_dir),
        "images_processed": len(images),
        "total_lines_detected": total_lines,
    }
    (out_dir / "summary.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
