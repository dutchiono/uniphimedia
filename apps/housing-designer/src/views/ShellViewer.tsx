import React, { useEffect, useRef } from 'react'
import {
  Engine, Scene, ArcRotateCamera, HemisphericLight,
  Vector3, MeshBuilder, StandardMaterial, Color3
} from '@babylonjs/core'

/**
 * ShellViewer — Babylon.js 3D massing model of the assembled rooms.
 * Renders each placed room module as a box with correct dimensions.
 * Materials are placeholder; Interior Mode handles PBR skins.
 *
 * TODO: consume room layout from zustand store
 * TODO: render actual room geometry from @uniphimedia/room-modules
 */
export function ShellViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const engine = new Engine(canvasRef.current, true)
    const scene = new Scene(engine)

    const camera = new ArcRotateCamera('cam', -Math.PI / 4, Math.PI / 3.5, 20, Vector3.Zero(), scene)
    camera.attachControl(canvasRef.current, true)
    camera.lowerRadiusLimit = 5
    camera.upperRadiusLimit = 60

    new HemisphericLight('light', new Vector3(0, 1, 0), scene)

    // Placeholder geometry — two room boxes snapped together
    const rooms = [
      { name: 'Living Room', w: 5, h: 3, d: 6, x: 0, z: 0 },
      { name: 'Kitchen',     w: 4, h: 3, d: 5, x: 5, z: 0 },
      { name: 'Bedroom',     w: 4, h: 3, d: 4, x: 0, z: 6 },
    ]

    rooms.forEach(r => {
      const box = MeshBuilder.CreateBox(r.name, { width: r.w, height: r.h, depth: r.d }, scene)
      box.position = new Vector3(r.x + r.w / 2, r.h / 2, r.z + r.d / 2)
      const mat = new StandardMaterial(r.name + '_mat', scene)
      mat.diffuseColor = new Color3(0.85, 0.82, 0.78)
      mat.wireframe = false
      box.material = mat
    })

    engine.runRenderLoop(() => scene.render())
    const resize = () => engine.resize()
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      engine.dispose()
    }
  }, [])

  return (
    <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
  )
}