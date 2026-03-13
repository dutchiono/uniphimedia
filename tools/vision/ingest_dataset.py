#!/usr/bin/env python3
"""
Ingest AI interior images from a ZIP archive.

Steps:
1) Extract images from ZIP (optionally limited for quick tests)
2) Normalize to JPG for consistent downstream processing
3) Write a manifest CSV with dimensions and SHA1 hashes
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
import shutil
import zipfile
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

from PIL import Image

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".jfif", ".png", ".webp"}


@dataclass
class ImageRecord:
    source_zip_entry: str
    raw_path: str
    normalized_path: str
    width: int
    height: int
    sha1: str


def sha1_file(path: Path) -> str:
    h = hashlib.sha1()
    with path.open("rb") as f:
        while True:
            chunk = f.read(1024 * 1024)
            if not chunk:
                break
            h.update(chunk)
    return h.hexdigest()


def iter_image_entries(zf: zipfile.ZipFile) -> Iterable[zipfile.ZipInfo]:
    for entry in zf.infolist():
        if entry.is_dir():
            continue
        ext = Path(entry.filename).suffix.lower()
        if ext in ALLOWED_EXTENSIONS:
            yield entry


def safe_name_from_entry(entry_name: str) -> str:
    name = Path(entry_name).stem
    return "".join(ch if ch.isalnum() or ch in {"-", "_"} else "_" for ch in name)


def main() -> None:
    parser = argparse.ArgumentParser(description="Ingest AI image ZIP into normalized dataset.")
    parser.add_argument("--zip", required=True, help="Path to source zip file")
    parser.add_argument(
        "--out",
        default="data/vision/hobbit-homes",
        help="Output dataset root directory",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=0,
        help="Max images to process (0 means all)",
    )
    parser.add_argument(
        "--clean",
        action="store_true",
        help="Delete existing output directory before ingest",
    )
    args = parser.parse_args()

    zip_path = Path(args.zip).expanduser().resolve()
    out_root = Path(args.out).resolve()
    raw_dir = out_root / "raw"
    normalized_dir = out_root / "normalized"
    manifest_path = out_root / "manifest.csv"
    summary_path = out_root / "summary.json"

    if not zip_path.exists():
        raise FileNotFoundError(f"ZIP not found: {zip_path}")

    if args.clean and out_root.exists():
        shutil.rmtree(out_root)

    raw_dir.mkdir(parents=True, exist_ok=True)
    normalized_dir.mkdir(parents=True, exist_ok=True)

    processed = 0
    records: list[ImageRecord] = []

    with zipfile.ZipFile(zip_path, "r") as zf:
        entries = list(iter_image_entries(zf))
        total_candidates = len(entries)
        if args.limit > 0:
            entries = entries[: args.limit]

        for idx, entry in enumerate(entries):
            stem = safe_name_from_entry(entry.filename)
            raw_path = raw_dir / f"{stem}{Path(entry.filename).suffix.lower()}"
            normalized_path = normalized_dir / f"{stem}.jpg"

            with zf.open(entry, "r") as src, raw_path.open("wb") as dst:
                shutil.copyfileobj(src, dst)

            with Image.open(raw_path) as im:
                rgb = im.convert("RGB")
                width, height = rgb.size
                rgb.save(normalized_path, format="JPEG", quality=95, optimize=True)

            record = ImageRecord(
                source_zip_entry=entry.filename,
                raw_path=str(raw_path),
                normalized_path=str(normalized_path),
                width=width,
                height=height,
                sha1=sha1_file(normalized_path),
            )
            records.append(record)
            processed += 1

            if (idx + 1) % 100 == 0:
                print(f"Processed {idx + 1}/{len(entries)} images...")

    with manifest_path.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(
            f,
            fieldnames=[
                "source_zip_entry",
                "raw_path",
                "normalized_path",
                "width",
                "height",
                "sha1",
            ],
        )
        writer.writeheader()
        for rec in records:
            writer.writerow(
                {
                    "source_zip_entry": rec.source_zip_entry,
                    "raw_path": rec.raw_path,
                    "normalized_path": rec.normalized_path,
                    "width": rec.width,
                    "height": rec.height,
                    "sha1": rec.sha1,
                }
            )

    summary = {
        "zip": str(zip_path),
        "output_root": str(out_root),
        "total_processed": processed,
        "total_candidates_in_zip": total_candidates,
    }
    summary_path.write_text(json.dumps(summary, indent=2), encoding="utf-8")

    print(json.dumps(summary, indent=2))
    print(f"Manifest written to {manifest_path}")


if __name__ == "__main__":
    main()
