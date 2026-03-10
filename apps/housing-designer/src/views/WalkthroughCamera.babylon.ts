import * as BABYLON from '@babylonjs/core'

export const FLOOR_HEIGHT = 1.65 // eye level in metres above floor

/**
 * Creates and returns a configured UniversalCamera for first-person walkthrough.
 * The camera is NOT attached to the canvas yet — call enterWalkthrough() to activate.
 */
export function createWalkthroughCamera(
  scene: BABYLON.Scene,
  canvas: HTMLCanvasElement,
  startPosition?: BABYLON.Vector3,
): BABYLON.UniversalCamera {
  const pos = startPosition ?? new BABYLON.Vector3(0, FLOOR_HEIGHT, 0)
  const cam = new BABYLON.UniversalCamera('walkthroughCam', pos, scene)

  // WASD keybindings
  cam.keysUp    = [87] // W
  cam.keysDown  = [83] // S
  cam.keysLeft  = [65] // A
  cam.keysRight = [68] // D

  cam.speed  = 3
  cam.minZ   = 0.1
  cam.fov    = 1.2 // ~69 deg

  // Collision capsule & gravity
  cam.checkCollisions = true
  cam.applyGravity    = true
  cam.ellipsoid       = new BABYLON.Vector3(0.4, 0.9, 0.4)

  // Scene-level physics
  scene.gravity           = new BABYLON.Vector3(0, -9.81, 0)
  scene.collisionsEnabled = true

  return cam
}

/**
 * Marks every mesh whose name contains 'door_opening' or 'doorway',
 * or has metadata.isDoorOpening === true, as collision-free so the
 * walkthrough camera passes through doorway openings.
 */
export function disableDoorCollisions(scene: BABYLON.Scene): void {
  for (const mesh of scene.meshes) {
    if (
      mesh.name.toLowerCase().includes('door_opening') ||
      mesh.name.toLowerCase().includes('doorway') ||
      (mesh.metadata && mesh.metadata.isDoorOpening === true)
    ) {
      mesh.checkCollisions = false
      mesh.isPickable      = false
    }
  }
}

/**
 * Switches the scene to walkthrough (first-person) mode.
 * Requests pointer-lock so the mouse drives look direction.
 * Returns the newly active UniversalCamera.
 */
export function enterWalkthrough(
  scene: BABYLON.Scene,
  canvas: HTMLCanvasElement,
  orbitCamera: BABYLON.ArcRotateCamera,
): BABYLON.UniversalCamera {
  // Derive a sensible start position from the current orbit target
  const target  = orbitCamera.target
  const startPos = new BABYLON.Vector3(target.x, FLOOR_HEIGHT, target.z)

  orbitCamera.detachControl()

  const wCam = createWalkthroughCamera(scene, canvas, startPos)
  wCam.attachControl(canvas, true)
  scene.activeCamera = wCam

  // Mark door openings collision-free
  disableDoorCollisions(scene)

  // Request pointer-lock on the canvas
  canvas.requestPointerLock()

  // Re-attach / detach on pointer-lock change
  const onPLChange = () => {
    if (document.pointerLockElement === canvas) {
      wCam.attachControl(canvas, true)
    } else {
      wCam.detachControl()
    }
  }
  document.addEventListener('pointerlockchange', onPLChange)
  // Store cleanup reference on camera metadata
  wCam.metadata = { ...(wCam.metadata ?? {}), _plListener: onPLChange }

  return wCam
}

/**
 * Restores ArcRotateCamera (orbit) mode and exits pointer-lock.
 */
export function exitWalkthrough(
  scene: BABYLON.Scene,
  canvas: HTMLCanvasElement,
  orbitCamera: BABYLON.ArcRotateCamera,
  walkthroughCamera: BABYLON.UniversalCamera,
): void {
  // Remove pointer-lock listener
  const listener = walkthroughCamera.metadata?._plListener
  if (listener) document.removeEventListener('pointerlockchange', listener)

  document.exitPointerLock()
  walkthroughCamera.detachControl()
  walkthroughCamera.dispose()

  scene.activeCamera = orbitCamera
  orbitCamera.attachControl(canvas, true)
}
