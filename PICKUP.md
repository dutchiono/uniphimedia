# Uniphimedia Pickup

Repo root:
`C:\Users\epj33\Documents\Playground\uniphimedia`

## Start here

Run from repo root:
```powershell
cd C:\Users\epj33\Documents\Playground\uniphimedia
npm.cmd exec -- pnpm dev:web
```

Ngrok if needed:
```powershell
ngrok http 5173
```

## Current state

The app is running as a root-level pnpm workspace app. The main flow is centralized now:
- `App.tsx` owns app-level mode navigation and workflow
- `ModeFrame.tsx` provides the shared screen/frame layout
- Individual views should only own their mode-specific tools

Main modes:
- `Floor Plan`
- `3D Shell`
- `Interior`

## Implemented so far

### Shell and room model
- Multiple dome presets exist:
  - `Studio Dome`
  - `Family Dome`
  - `Great Dome`
- Room instance connectors exist on placed rooms, not just module defaults
- Adjacent rooms auto-generate doorway connectors
- Door widths can be edited per room connector
- Room width/depth editing exists in the floor-plan UI

### Interior planning
- Interior partitions are first-class data
- Supported partition kinds:
  - `straight`
  - `radial`
  - `ring`
- Partitions render in floor plan
- Partitions render in 3D shell
- Dome rooms support dome-native partition types (`radial`, `ring`)

### Interaction
- Selected divider state exists in store
- Divider drag handles exist in plan
- Direct manipulation works for:
  - straight divider offset
  - radial divider angle/end
  - ring divider radius
- Snapping exists:
  - lengths/radii snap to `0.25m`
  - angles snap to `15deg`
- Selected divider is highlighted in 3D shell

### Responsive/mobile
- `ModeFrame.tsx` has a first-pass stacked layout for narrower widths
- Mobile UX is not finished; only the basic responsive frame exists

## Key files

Core app/frame:
- `apps/housing-designer/src/App.tsx`
- `apps/housing-designer/src/components/ModeFrame.tsx`

State/types:
- `apps/housing-designer/src/store/useDesignStore.ts`
- `packages/shared-types/src/index.ts`

Floor plan / shell:
- `apps/housing-designer/src/views/FloorPlanEditor.tsx`
- `apps/housing-designer/src/views/ShellViewer.tsx`
- `apps/housing-designer/src/geometry/buildRoomShellBabylon.ts`

Modules/engine:
- `packages/room-modules/src/index.ts`
- `packages/room-modules/src/registry.ts`
- `packages/systems-engine/src/snap.ts`
- `packages/systems-engine/src/validator.ts`

## Known gaps

- Divider body click selection is not properly implemented; interaction is still handle-first
- Hover highlight before selection is missing
- Keyboard nudge for selected divider is missing
- Numeric HUD near the active handle while dragging is missing
- Ring divider walls are segmented approximations, not smooth curved walls
- Ring walls do not support curved door/opening cuts yet
- Mobile layout is only a first pass and needs a real UX pass
- The repo still has broader unrelated TypeScript noise in untouched areas

## Next recommended work

Priority next pass:
1. Make divider bodies clickable
2. Add hover highlight and better hit areas for radial/ring partitions
3. Add keyboard nudge for selected divider
4. Add a small numeric HUD while dragging
5. Then do a real mobile layout pass

## Notes

- User does not want speculative debugging or restart-loop advice
- Make direct code changes and verify against the actual UI/problem
- Keep changes architectural/top-down, not isolated one-off fixes
