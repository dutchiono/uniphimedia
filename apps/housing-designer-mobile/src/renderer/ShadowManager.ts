import * as THREE from 'three'
import type { Renderer } from 'expo-three'

/**
 * Enable PCFSoft shadow maps on the expo-three renderer,
 * configure the directional light shadow camera, and
 * mark every room mesh as caster + receiver.
 *
 * Call once after renderer creation, then call addMeshToShadows
 * for each room mesh created afterwards.
 */
export function enableShadows(
  renderer: Renderer,
  dirLight: THREE.DirectionalLight,
  meshes: THREE.Mesh[],
): void {
  // Enable shadow map on renderer
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  // Configure directional light shadow
  dirLight.castShadow = true
  dirLight.shadow.mapSize.width = 1024
  dirLight.shadow.mapSize.height = 1024
  dirLight.shadow.camera.near = 0.5
  dirLight.shadow.camera.far = 200
  ;(dirLight.shadow.camera as THREE.OrthographicCamera).left = -40
  ;(dirLight.shadow.camera as THREE.OrthographicCamera).right = 40
  ;(dirLight.shadow.camera as THREE.OrthographicCamera).top = 40
  ;(dirLight.shadow.camera as THREE.OrthographicCamera).bottom = -40
  dirLight.shadow.bias = -0.0005

  for (const mesh of meshes) {
    mesh.castShadow = true
    mesh.receiveShadow = true
  }
}

/**
 * Add a single mesh to shadow casting/receiving.
 * Call this each time a new room mesh is added to the scene.
 */
export function addMeshToShadows(mesh: THREE.Mesh): void {
  mesh.castShadow = true
  mesh.receiveShadow = true
}
