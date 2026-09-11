import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { ProceduralRing } from './ProceduralRing'
import { MaterialType } from '../../data/products'

interface FloatingGalleryRingProps {
  modelType: 'signet' | 'cabochon' | 'stack' | 'carved' | 'sovereign'
  materialType: MaterialType
  isHovered?: boolean
  onClick?: () => void
  floatOffset?: number
}

export const FloatingGalleryRing: React.FC<FloatingGalleryRingProps> = ({
  modelType,
  materialType,
  isHovered = false,
  onClick,
  floatOffset = 0
}) => {
  const groupRef = useRef<THREE.Group>(null!)
  const innerRef = useRef<THREE.Group>(null!)
  
  // Current dynamic rotation speed & target elevation
  const rotSpeed = useRef(0.35)
  const currentY = useRef(0)
  const currentScale = useRef(1)

  useFrame((state, delta) => {
    if (!groupRef.current || !innerRef.current) return

    const t = state.clock.getElapsedTime() + floatOffset

    // 1. Idle Gentle Vertical Float: amplitude ~8-12px equivalent in 3D world units (0.08 to 0.12)
    const floatTargetY = Math.sin(t * 1.1) * 0.12 + (isHovered ? 0.35 : 0)
    currentY.current = THREE.MathUtils.lerp(currentY.current, floatTargetY, delta * 3.5)
    groupRef.current.position.y = currentY.current

    // 2. Slow Continuous Auto-Rotation: on hover, rotation slows down smoothly
    const targetSpeed = isHovered ? 0.08 : 0.42
    rotSpeed.current = THREE.MathUtils.lerp(rotSpeed.current, targetSpeed, delta * 3.0)
    innerRef.current.rotation.y += rotSpeed.current * delta

    // Add subtle organic tilt wave
    innerRef.current.rotation.x = Math.sin(t * 0.7) * 0.06 + 0.25
    innerRef.current.rotation.z = Math.cos(t * 0.6) * 0.05

    // 3. Subtle Scale On Hover
    const targetScale = isHovered ? 1.08 : 1.0
    currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScale, delta * 4.0)
    groupRef.current.scale.setScalar(currentScale.current)
  })

  return (
    <group ref={groupRef} onClick={onClick}>
      <group ref={innerRef}>
        <ProceduralRing 
          modelType={modelType} 
          materialType={materialType} 
          scale={0.95} 
        />
      </group>
    </group>
  )
}
