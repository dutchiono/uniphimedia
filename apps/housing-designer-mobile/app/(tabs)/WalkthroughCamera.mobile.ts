import * as THREE from 'three'

export const FLOOR_HEIGHT = 1.65 // eye level in metres

const LOOK_SENSITIVITY = 0.003
const WALK_SPEED       = 0.04
const PITCH_LIMIT      = Math.PI / 3 // +/-60 deg

export interface WalkthroughState {
  active: boolean
  yaw: number
  pitch: number
  touchStartX: number
  touchStartY: number
  prevTouchCount: number
}

/** Creates a fresh WalkthroughState with the supplied initial yaw. */
export function createWalkthroughState(initialYaw = 0): WalkthroughState {
  return {
    active: false,
    yaw: initialYaw,
    pitch: 0,
    touchStartX: 0,
    touchStartY: 0,
    prevTouchCount: 0,
  }
}

/**
 * Call from your render loop each frame while walkthrough is active.
 * Applies yaw/pitch to the camera and locks Y to floor height.
 */
export function applyWalkthroughOrientation(
  camera: THREE.PerspectiveCamera,
  state: WalkthroughState,
): void {
  camera.rotation.order = 'YXZ'
  camera.rotation.y = state.yaw
  camera.rotation.x = state.pitch
  camera.position.y = FLOOR_HEIGHT
}

/** Handle a single-finger touchstart event. */
export function onWalkthroughTouchStart(
  state: WalkthroughState,
  touches: { clientX: number; clientY: number }[],
): void {
  state.touchStartX    = touches[0].clientX
  state.touchStartY    = touches[0].clientY
  state.prevTouchCount = touches.length
}

/**
 * Handle touchmove:
 * - 1 finger  -> look (yaw + clamped pitch)
 * - 2 fingers -> walk forward/backward along look direction
 */
export function onWalkthroughTouchMove(
  state: WalkthroughState,
  camera: THREE.PerspectiveCamera,
  touches: { clientX: number; clientY: number }[],
): void {
  if (touches.length === 1) {
    const dx = touches[0].clientX - state.touchStartX
    const dy = touches[0].clientY - state.touchStartY
    state.touchStartX = touches[0].clientX
    state.touchStartY = touches[0].clientY

    state.yaw   -= dx * LOOK_SENSITIVITY
    state.pitch -= dy * LOOK_SENSITIVITY
    state.pitch  = Math.max(-PITCH_LIMIT, Math.min(PITCH_LIMIT, state.pitch))
  } else if (touches.length === 2) {
    const dy = touches[0].clientY - state.touchStartY
    state.touchStartX = touches[0].clientX
    state.touchStartY = touches[0].clientY

    // Walk forward if dragging up (negative dy), backward if down
    const direction = dy < 0 ? 1 : -1
    const forward = new THREE.Vector3(
      -Math.sin(state.yaw),
      0,
      -Math.cos(state.yaw),
    )
    camera.position.addScaledVector(forward, direction * WALK_SPEED)
    camera.position.y = FLOOR_HEIGHT // re-lock floor height after move
  }
}

/**
 * Enters walkthrough mode: repositions camera at floor height.
 */
export function enterWalkthroughMobile(
  camera: THREE.PerspectiveCamera,
  state: WalkthroughState,
  startX = 0,
  startZ = 0,
): void {
  state.active  = true
  state.yaw     = 0
  state.pitch   = 0
  camera.position.set(startX, FLOOR_HEIGHT, startZ)
  camera.rotation.order = 'YXZ'
  camera.rotation.set(0, 0, 0)
}

/**
 * Exits walkthrough mode: restores spherical orbit camera position.
 */
export function exitWalkthroughMobile(
  camera: THREE.PerspectiveCamera,
  state: WalkthroughState,
  orbitRadius = 35,
  orbitTheta  = -0.6,
  orbitPhi    = 1.0,
  orbitTarget = new THREE.Vector3(10, 0, 10),
): void {
  state.active = false
  camera.rotation.order = 'YXZ'
  camera.rotation.set(0, 0, 0)

  camera.position.set(
    orbitRadius * Math.sin(orbitPhi) * Math.cos(orbitTheta),
    orbitRadius * Math.cos(orbitPhi),
    orbitRadius * Math.sin(orbitPhi) * Math.sin(orbitTheta),
  )
  camera.lookAt(orbitTarget)
}
