// Re-export the shared store — on mobile we use the same Zustand store
// so designs are consistent between web and mobile (e.g. via hydration/sync).
export {
  useDesignStore,
  useUndo,
  useRedo,
  useCanUndo,
  useCanRedo,
} from '../../../apps/housing-designer/src/store/useDesignStore'