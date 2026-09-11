import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

interface StudioLightingProps {
  interactive?: boolean
  intensity?: number
  showShadows?: boolean
  shadowOpacity?: number
}

export const StudioLighting: React.FC<StudioLightingProps> = ({
  interactive = true,
  intensity = 1.0,
  showShadows = true,
  shadowOpacity = 0.55
}) => {
  const keyLightRef = useRef<THREE.DirectionalLight>(null!)
  const rimLightRef = useRef<THREE.PointLight>(null!)

  useFrame(({ clock }) => {
    if (!interactive) return
    const t = clock.getElapsedTime()

    // Very subtle moving studio rim/flare light across metal ridges
    if (rimLightRef.current) {
      rimLightRef.current.position.x = Math.sin(t * 0.45) * 4.5
      rimLightRef.current.position.z = Math.cos(t * 0.45) * 4.5
    }
  })

  return (
    <>
      {/* Studio Environment map for realistic PBR metal reflections */}
      <Environment preset="studio" environmentIntensity={1.2 * intensity} />

      {/* Primary Key Light - Soft Neutral White */}
      <directionalLight
        ref={keyLightRef}
        position={[4, 6, 4]}
        intensity={2.2 * intensity}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Secondary Soft Fill Light - Warm Tone */}
      <directionalLight
        position={[-5, -2, -3]}
        intensity={0.8 * intensity}
        color="#fff5ea"
      />

      {/* High-Specular Moving Rim Light - Sharp Cool White to catch micro-scratches */}
      <pointLight
        ref={rimLightRef}
        position={[3, 2, 4]}
        intensity={2.8 * intensity}
        color="#f0f4ff"
        distance={15}
      />

      {/* Under-Glow Bounce Light - Subtle Charcoal Warmth */}
      <pointLight
        position={[0, -3, 0]}
        intensity={0.6 * intensity}
        color="#d0a87a"
        distance={8}
      />

      {/* Soft Contact Shadows to communicate physical weight */}
      {showShadows && (
        <ContactShadows
          position={[0, -1.55, 0]}
          opacity={shadowOpacity}
          scale={7}
          blur={2.4}
          far={3.5}
          color="#000000"
        />
      )}
    </>
  )
}
