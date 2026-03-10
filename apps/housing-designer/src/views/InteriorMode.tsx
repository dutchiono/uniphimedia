import React, { useEffect, useRef } from 'react'
import {
  Engine, Scene, ArcRotateCamera, HemisphericLight,
  Vector3, MeshBuilder, PBRMaterial, Color3, Texture
} from '@babylonjs/core'

/**
 * InteriorMode — full PBR material viewer for applying design skins.
 * Users pick materials/finishes from the panel; scene updates in real time.
 *
 * Design categories:
 *   Exterior:  siding, roofing, windows, doors, trim
 *   Structure: framing, insulation
 *   Interior:  flooring, wall paint/paper/tile, ceiling
 *   Trim:      baseboard style, crown moulding profile, casing
 *   Kitchen:   cabinet style/finish, countertop, backsplash, hardware
 *   Bath:      vanity, tile, fixtures, hardware
 *   HVAC:      duct routing visibility toggle
 *   Plumbing:  pipe routing visibility toggle
 *   Electrical: panel, outlet/switch placement visibility toggle
 *
 * TODO: connect to @uniphimedia/materials-library skin catalog
 * TODO: implement material swap on room mesh
 */
export function InteriorMode() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const engine = new Engine(canvasRef.current, true)
    const scene = new Scene(engine)

    const camera = new ArcRotateCamera('cam', -Math.PI / 2, Math.PI / 3, 10, Vector3.Zero(), scene)
    camera.attachControl(canvasRef.current, true)
    new HemisphericLight('light', new Vector3(0, 1, 0), scene)

    // Placeholder room box with PBR material
    const room = MeshBuilder.CreateBox('room', { width: 5, height: 3, depth: 6 }, scene)
    room.position.y = 1.5
    const mat = new PBRMaterial('wall', scene)
    mat.albedoColor = new Color3(0.95, 0.93, 0.90)
    mat.metallic = 0
    mat.roughness = 0.8
    room.material = mat

    const floor = MeshBuilder.CreateGround('floor', { width: 5, height: 6 }, scene)
    const floorMat = new PBRMaterial('floor', scene)
    floorMat.albedoColor = new Color3(0.6, 0.45, 0.3)
    floorMat.metallic = 0
    floorMat.roughness = 0.6
    floor.material = floorMat

    engine.runRenderLoop(() => scene.render())
    const resize = () => engine.resize()
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      engine.dispose()
    }
  }, [])

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <aside style={{
        width: 240, background: '#161616', borderRight: '1px solid #2a2a2a',
        padding: 16, overflowY: 'auto'
      }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 13, color: '#888', textTransform: 'uppercase' }}>
          Design Categories
        </h3>
        {[
          'Exterior Skin', 'Roofing', 'Windows & Doors',
          'Flooring', 'Wall Finish', 'Ceiling',
          'Trim & Moulding', 'Kitchen', 'Bathrooms',
          'Lighting', 'HVAC', 'Plumbing', 'Electrical'
        ].map(cat => (
          <div key={cat} style={{
            padding: '8px 10px', marginBottom: 6, borderRadius: 4,
            background: '#222', border: '1px solid #333',
            fontSize: 13, cursor: 'pointer'
          }}>
            {cat}
          </div>
        ))}
      </aside>
      <canvas ref={canvasRef} style={{ flex: 1, display: 'block' }} />
    </div>
  )
}