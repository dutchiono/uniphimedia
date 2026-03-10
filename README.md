# Uniphimedia

Umbrella monorepo for all Uniphimedia projects.

## Projects

| App | Description |
|-----|-------------|
| [housing-designer](./apps/housing-designer) | Browser-based 3D modular home design tool |

## Structure

```
uniphimedia/
├── apps/
│   └── housing-designer/     # 3D home design app
├── packages/
│   ├── shared-types/          # Core TypeScript interfaces
│   ├── room-modules/          # Room template registry
│   ├── systems-engine/        # HVAC/plumbing/electrical logic
│   └── materials-library/     # Finish & skin catalog
└── .github/                   # Issue templates & contributing guide
```

## Getting Started

```bash
# Install pnpm if you don't have it
npm install -g pnpm

# Install all dependencies
pnpm install

# Run housing-designer in dev mode
pnpm dev
```

## Tech Stack

- **3D Engine**: [Babylon.js](https://www.babylonjs.com/) — Microsoft's WebGL engine for the 3D viewer
- **Framework**: React + Vite
- **Language**: TypeScript
- **Monorepo**: pnpm workspaces
- **IFC Export**: [web-ifc](https://ifcjs.io/) — open BIM standard for interoperability with CAD tools
