import * as THREE from 'three'
import { MaterialType, MATERIAL_CONFIG } from '../../data/products'

// Cache generated procedural textures so they don't recreate every frame
let cachedTextures: {
  bumpTexture: THREE.CanvasTexture
  roughnessTexture: THREE.CanvasTexture
} | null = null

export function getProceduralMetalTextures() {
  if (cachedTextures) return cachedTextures

  const size = 1024
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  if (ctx) {
    // 1. Base metal noise and micro-pitting
    ctx.fillStyle = '#808080'
    ctx.fillRect(0, 0, size, size)

    // Add granular sand-cast micro-texture
    const imgData = ctx.getImageData(0, 0, size, size)
    const data = imgData.data

    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 45
      const val = Math.min(255, Math.max(0, 128 + noise))
      data[i] = val
      data[i + 1] = val
      data[i + 2] = val
      data[i + 3] = 255
    }
    ctx.putImageData(imgData, 0, 0)

    // Add fine hand-burnishing scratches and tool strokes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)'
    ctx.lineWidth = 1
    for (let j = 0; j < 350; j++) {
      ctx.beginPath()
      const x = Math.random() * size
      const y = Math.random() * size
      const len = 15 + Math.random() * 45
      const angle = (Math.random() - 0.5) * 0.4 // horizontal-biased brushed strokes
      ctx.moveTo(x, y)
      ctx.lineTo(x + Math.cos(angle) * len, y + Math.sin(angle) * len)
      ctx.stroke()
    }

    // Add darker crevice pitting
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.18)'
    for (let k = 0; k < 200; k++) {
      ctx.beginPath()
      const x = Math.random() * size
      const y = Math.random() * size
      const len = 5 + Math.random() * 20
      ctx.moveTo(x, y)
      ctx.lineTo(x + len, y)
      ctx.stroke()
    }
  }

  const bumpTexture = new THREE.CanvasTexture(canvas)
  bumpTexture.wrapS = THREE.RepeatWrapping
  bumpTexture.wrapT = THREE.RepeatWrapping
  bumpTexture.repeat.set(4, 2)
  bumpTexture.needsUpdate = true

  // Roughness variation map
  const rCanvas = document.createElement('canvas')
  rCanvas.width = size
  rCanvas.height = size
  const rCtx = rCanvas.getContext('2d')
  if (rCtx) {
    rCtx.fillStyle = '#b0b0b0'
    rCtx.fillRect(0, 0, size, size)
    // Soft noise patches for irregular natural oxidation
    for (let p = 0; p < 80; p++) {
      const rad = 20 + Math.random() * 70
      const x = Math.random() * size
      const y = Math.random() * size
      const grad = rCtx.createRadialGradient(x, y, 0, x, y, rad)
      const alpha = 0.08 + Math.random() * 0.15
      grad.addColorStop(0, `rgba(40, 40, 40, ${alpha})`)
      grad.addColorStop(1, 'rgba(180, 180, 180, 0)')
      rCtx.fillStyle = grad
      rCtx.beginPath()
      rCtx.arc(x, y, rad, 0, Math.PI * 2)
      rCtx.fill()
    }
  }
  const roughnessTexture = new THREE.CanvasTexture(rCanvas)
  roughnessTexture.wrapS = THREE.RepeatWrapping
  roughnessTexture.wrapT = THREE.RepeatWrapping
  roughnessTexture.repeat.set(3, 2)
  roughnessTexture.needsUpdate = true

  cachedTextures = { bumpTexture, roughnessTexture }
  return cachedTextures
}

export function createPBRJewelleryMaterial(materialType: MaterialType): THREE.MeshStandardMaterial {
  const config = MATERIAL_CONFIG[materialType]
  const textures = typeof window !== 'undefined' ? getProceduralMetalTextures() : null

  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(config.color),
    roughness: config.roughness,
    metalness: config.metalness,
    bumpMap: textures ? textures.bumpTexture : null,
    bumpScale: 0.012,
    roughnessMap: textures ? textures.roughnessTexture : null,
    envMapIntensity: 1.8
  })
}

export function createCabochonMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#940e1b'),
    emissive: new THREE.Color('#380308'),
    emissiveIntensity: 0.12,
    roughness: 0.15,
    metalness: 0.05,
    transmission: 0.65,
    thickness: 1.4,
    ior: 1.77, // Garnet index of refraction
    clearcoat: 0.9,
    clearcoatRoughness: 0.08,
    attenuationColor: new THREE.Color('#4a0309'),
    attenuationDistance: 0.8,
    envMapIntensity: 2.2
  })
}
