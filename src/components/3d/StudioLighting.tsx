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
  shadowOpacity = 0.28
}) => {
  const rimLightRef = useRef<THREE.PointLight>(null!)

  useFrame(({ clock }) => {
    if (!interactive) return
    const t = clock.getElapsedTime()

    if (rimLightRef.current) {
      rimLightRef.current.position.x = Math.sin(t * 0.5) * 4.5
      rimLightRef.current.position.z = Math.cos(t * 0.5) * 4.5
    }
  })

  return (
    <>
      {/* Studio Environment Map for Pure PBR Metal Reflections */}
      <Environment preset="studio" environmentIntensity={1.0 * intensity} />

      {/* Main Overhead Soft Key Light */}
      <directionalLight
        position={[4, 8, 5]}
        intensity={2.0 * intensity}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Soft Ground Bounce Fill Light */}
      <directionalLight
        position={[-4, -3, -3]}
        intensity={0.6 * intensity}
        color="#f4f4f6"
      />

      {/* Dynamic Specular Rim Light */}
      <pointLight
        ref={rimLightRef}
        position={[3, 3, 3]}
        intensity={2.4 * intensity}
        color="#ffffff"
        distance={12}
      />

      {/* Clean, Soft Contact Shadows Grounding the Pieces */}
      {showShadows && (
        <ContactShadows
          position={[0, -1.45, 0]}
          opacity={shadowOpacity}
          scale={6.5}
          blur={2.2}
          far={3.2}
          color="#1a1a1f"
        />
      )}
    </>
  )
}
