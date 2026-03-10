import { useState, useCallback, useRef } from 'react'
import * as BABYLON from '@babylonjs/core'
import { enterWalkthrough, exitWalkthrough } from './WalkthroughCamera.babylon'

export interface UseWalkthroughToggleResult {
  /** Whether walkthrough (first-person) mode is currently active */
  walkthroughActive: boolean
  /** Call this to toggle between orbit and walkthrough modes */
  toggleWalkthrough: (
    scene: BABYLON.Scene,
    canvas: HTMLCanvasElement,
    orbitCamera: BABYLON.ArcRotateCamera,
  ) => void
}

/**
 * React hook that manages the walkthrough toggle state and
 * wires enterWalkthrough / exitWalkthrough for ShellViewer.
 *
 * Usage:
 *   const { walkthroughActive, toggleWalkthrough } = useWalkthroughToggle()
 *   // In toolbar: <button onClick={() => toggleWalkthrough(scene, canvas, orbitCam)}>
 */
export function useWalkthroughToggle(): UseWalkthroughToggleResult {
  const [walkthroughActive, setWalkthroughActive] = useState(false)
  const walkthroughCamRef = useRef<BABYLON.UniversalCamera | null>(null)

  const toggleWalkthrough = useCallback(
    (
      scene: BABYLON.Scene,
      canvas: HTMLCanvasElement,
      orbitCamera: BABYLON.ArcRotateCamera,
    ) => {
      if (!walkthroughActive) {
        // Enter walkthrough
        const wCam = enterWalkthrough(scene, canvas, orbitCamera)
        walkthroughCamRef.current = wCam
        setWalkthroughActive(true)
      } else {
        // Exit walkthrough
        if (walkthroughCamRef.current) {
          exitWalkthrough(scene, canvas, orbitCamera, walkthroughCamRef.current)
          walkthroughCamRef.current = null
        }
        setWalkthroughActive(false)
      }
    },
    [walkthroughActive],
  )

  return { walkthroughActive, toggleWalkthrough }
}
