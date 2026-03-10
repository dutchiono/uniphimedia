import * as BABYLON from '@babylonjs/core'

/**
 * Set up a ShadowGenerator (ESM, 2048 px) on the directional light,
 * registering every room mesh as both caster and receiver.
 */
export function setupShadows(
  scene: BABYLON.Scene,
  dirLight: BABYLON.DirectionalLight,
  meshes: BABYLON.Mesh[],
): BABYLON.ShadowGenerator {
  const shadowGen = new BABYLON.ShadowGenerator(2048, dirLight)
  shadowGen.useExponentialShadowMap = true
  shadowGen.darkness = 0.4

  for (const mesh of meshes) {
    shadowGen.addShadowCaster(mesh, true)
    mesh.receiveShadows = true
  }

  return shadowGen
}

/**
 * Add a new mesh to an existing ShadowGenerator as caster + receiver.
 * Call this whenever a room mesh is created after initial setup.
 */
export function addMeshToShadows(
  shadowGen: BABYLON.ShadowGenerator,
  mesh: BABYLON.Mesh,
): void {
  shadowGen.addShadowCaster(mesh, true)
  mesh.receiveShadows = true
}

/**
 * Set up an SSAO2RenderingPipeline on the scene.
 * radius=0.5, totalStrength=1.2 gives a subtle, physically plausible result.
 */
export function setupSSAO(
  scene: BABYLON.Scene,
  camera: BABYLON.ArcRotateCamera,
): BABYLON.SSAO2RenderingPipeline {
  const pipeline = new BABYLON.SSAO2RenderingPipeline(
    'ssao',
    scene,
    { ssaoRatio: 0.5, blurRatio: 1.0 },
    [camera],
  )
  pipeline.radius = 0.5
  pipeline.totalStrength = 1.2
  pipeline.base = 0.1
  pipeline.minZAspect = 0.1
  return pipeline
}
