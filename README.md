# Uniphimedia

Cross-platform housing design system — monorepo for web and mobile apps sharing a common design engine.

## Architecture

```
uniphimedia/
├── apps/
│   ├── housing-designer/          # Web app (React + Vite + Babylon.js)
│   └── housing-designer-mobile/   # Mobile app (Expo + React Native + Skia)
├── packages/
│   ├── shared-types/              # TypeScript interfaces (rooms, materials, design, validation)
│   ├── room-modules/              # 13 room templates with geometry, connectors, system nodes
│   ├── systems-engine/            # Snap resolver, connection validator, dependency graph
│   └── materials-library/         # 40+ PBR material catalog across 7 categories
```

## Quick Start

### Prerequisites

- Node.js 20+
- pnpm 9+ (`npm install -g pnpm`)
- For mobile: Expo CLI (`npm install -g expo-cli`) + iOS Simulator or Android Emulator

### Install

```bash
git clone https://github.com/dutchiono/uniphimedia.git
cd uniphimedia
pnpm install
```

### Web App

```bash
pnpm dev:web
# Opens at http://localhost:5173
```

### Mobile App

```bash
# iOS Simulator
pnpm dev:mobile:ios

# Android Emulator
pnpm dev:mobile:android

# Expo Go (scan QR)
pnpm dev:mobile
```

## Features

### Floor Plan Editor
- Drag-to-grid room placement with snap alignment
- 13 room types across 5 categories (sleeping, wet, living, circulation, utility)
- Multi-level support (Ground Floor, First Floor, etc.)
- Room rotation, resize, delete, lock
- Real-time validation — overlaps, egress, plumbing vents, electrical load
- Undo/redo (50-state history)
- Web: HTML Canvas | Mobile: React Native Skia + Gesture Handler

### 3D Shell Viewer
- Real-dimension room meshes at correct floor heights
- Level visibility toggles
- Systems overlay — color-coded HVAC, plumbing, electrical, gas nodes
- Web: Babylon.js ArcRotateCamera | Mobile: expo-three + GLView with pan/pinch orbit

### Interior Mode
- 40+ PBR materials across 7 categories
- Per-room or global material assignment
- Search by name or tag
- Material slots: floor, ceiling, walls (N/S/E/W), exterior, roof, trim, cabinet, countertop, fixture
- Live roughness + metallic visualization

## Packages

### `@uniphimedia/shared-types`
All TypeScript interfaces shared across web and mobile:
- `PlacedRoom`, `RoomModule`, `Connector`, `SystemNode`
- `PBRMaterial`, `Design`, `DesignLevel`, `RoomConnection`
- `ValidationResult`, `ValidationIssue`, `SnapResult`, `SyncState`

### `@uniphimedia/room-modules`
13 room types with real dimensions:

| Room | Grid (W×H) | Dims (m) |
|------|-----------|---------||
| Bedroom | 7×7 | 3.6×3.6×2.7 |
| Master Bedroom | 10×10 | 4.8×4.8×2.7 |
| Bathroom | 4×5 | 1.8×2.4×2.7 |
| Master Bathroom | 6×7 | 3.0×3.6×2.7 |
| Kitchen | 7×8 | 3.6×4.2×2.7 |
| Living Room | 10×11 | 4.8×5.4×2.7 |
| Dining Room | 7×7 | 3.6×3.6×2.7 |
| Hallway | 2×7 | 1.2×3.6×2.7 |
| Stairwell | 5×7 | 2.4×3.6×5.4 |
| Garage | 11×12 | 5.5×6.1×2.7 |
| Laundry | 5×5 | 2.4×2.4×2.7 |
| Office | 6×6 | 3.0×3.0×2.7 |
| Closet | 4×3 | 1.8×1.5×2.7 |

### `@uniphimedia/systems-engine`
- **Snap resolver** — finds connector pairs within threshold, scores by distance, returns snap delta
- **Validator** — checks overlaps, egress, min sizes, plumbing vents, electrical load (200A limit), required connectors
- **Graph** — builds adjacency graph, BFS reachability, connected components, connectivity check

### `@uniphimedia/materials-library`
40 PBR materials:
- **Exterior Siding (6):** Cedar Natural, Cedar Grey, Brick Red, Hempcrete, Zinc Panel, Stucco White
- **Roofing (4):** Asphalt Charcoal, Metal Bronze, Clay Terra Cotta, Sedum Green
- **Flooring (6):** White Oak Light/Dark, Polished Concrete, Carrara Marble, Hex Cement, Cork
- **Interior Wall (5):** Matte White, Warm Greige, Slate Blue, Lime Plaster, White Shiplap
- **Trim (4):** White Gloss, Matte Black, Oak Natural, Dark Walnut
- **Kitchen (8):** 4 cabinet styles + 4 countertop materials
- **Bathroom (7):** 3 tile types + 2 vanity styles + Chrome/Matte Black fixtures

## Build

```bash
# Web production build
pnpm build:web
# Output: apps/housing-designer/dist/

# Mobile (requires EAS CLI: npm install -g eas-cli)
pnpm build:mobile:ios
pnpm build:mobile:android
```

## Typecheck All Packages

```bash
pnpm typecheck:all
```

## Tech Stack

| Layer | Web | Mobile |
|-------|-----|--------|
| Framework | React 18 + Vite | Expo SDK 51 + Expo Router v3 |
| Language | TypeScript 5.4 | TypeScript 5.4 |
| State | Zustand + zundo | Same store (shared) |
| 2D Canvas | HTML Canvas API | React Native Skia |
| 3D Engine | Babylon.js | expo-three (Three.js) |
| Gestures | Mouse events | React Native Gesture Handler |
| Packages | pnpm workspace | pnpm workspace |

## Contributing

See [CONTRIBUTING.md](.github/CONTRIBUTING.md).