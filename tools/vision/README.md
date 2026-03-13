# Vision Pipeline (AI Interior Images -> Wireframe Candidates)

This folder contains a practical first-pass pipeline for bulk AI room images.

## What this does

1. Ingests ZIP image drops
2. Normalizes mixed formats (`.jfif`, `.jpg`, `.png`, `.webp`) to `.jpg`
3. Generates a manifest with image metadata and hashes
4. Produces wireframe candidate previews + line-segment JSON
5. Pass 1 quality filter (keeps strong geometry, rejects noisy line sets)
6. Converts line-segment JSON into builder-ready candidate Design JSON
7. Pass 2 geodesic snap (normalizes partitions/doors to dome-friendly increments)

This is not production CAD extraction. It is a triage layer to speed up modeling and layout authoring.

## Setup

From repo root:

```bash
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r tools/vision/requirements.txt
```

## Run on your ZIP

```bash
python tools/vision/ingest_dataset.py --zip "C:\Users\epj33\Downloads\Hobbit Homes-20260313T172106Z-3-001.zip" --out data/vision/hobbit-homes --clean
python tools/vision/generate_wireframes.py --in data/vision/hobbit-homes/normalized --out data/vision/hobbit-homes/wireframes
python tools/vision/score_geometry_candidates.py --lines data/vision/hobbit-homes/wireframes/lines --out data/vision/hobbit-homes/geometry-pass1 --threshold 0.42
python tools/vision/convert_lines_to_builder_candidates.py --lines data/vision/hobbit-homes/geometry-pass1/accepted-lines --out data/vision/hobbit-homes/builder-candidates
python tools/vision/snap_candidates_to_geodesic.py --in data/vision/hobbit-homes/builder-candidates/candidates --out data/vision/hobbit-homes/snapped-candidates
```

## Quick test mode

Process only first 100 images:

```bash
python tools/vision/ingest_dataset.py --zip "C:\Users\epj33\Downloads\Hobbit Homes-20260313T172106Z-3-001.zip" --out data/vision/hobbit-homes --clean --limit 100
python tools/vision/generate_wireframes.py --in data/vision/hobbit-homes/normalized --out data/vision/hobbit-homes/wireframes --limit 100
python tools/vision/score_geometry_candidates.py --lines data/vision/hobbit-homes/wireframes/lines --out data/vision/hobbit-homes/geometry-pass1 --threshold 0.42 --limit 100
python tools/vision/convert_lines_to_builder_candidates.py --lines data/vision/hobbit-homes/geometry-pass1/accepted-lines --out data/vision/hobbit-homes/builder-candidates --limit 100
python tools/vision/snap_candidates_to_geodesic.py --in data/vision/hobbit-homes/builder-candidates/candidates --out data/vision/hobbit-homes/snapped-candidates --limit 100
```

## Output

- `data/vision/hobbit-homes/raw/` extracted source files
- `data/vision/hobbit-homes/normalized/` normalized JPG files
- `data/vision/hobbit-homes/manifest.csv` metadata manifest
- `data/vision/hobbit-homes/wireframes/preview/` wireframe PNGs
- `data/vision/hobbit-homes/wireframes/lines/` line JSON per image
- `data/vision/hobbit-homes/geometry-pass1/accepted-lines/` line JSON passing quality threshold
- `data/vision/hobbit-homes/geometry-pass1/report.json` pass/fail quality report
- `data/vision/hobbit-homes/builder-candidates/candidates/` candidate files with `design` payload
- `data/vision/hobbit-homes/builder-candidates/index.json` candidate index
- `data/vision/hobbit-homes/snapped-candidates/candidates/` geodesic-snapped candidates (recommended import source)

## Next stage (recommended)

1. Add semantic tags (room type, dome type, openings, style cluster).
2. Add confidence-based room-type classification from visuals + topology.
3. Add a UI import action in builder to open candidate `design` JSON directly.
