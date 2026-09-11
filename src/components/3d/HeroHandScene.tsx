import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { ProceduralRing } from './ProceduralRing'
import { StudioLighting } from './StudioLighting'

export const HeroHandScene: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null!)
  const handRef = useRef<THREE.Group>(null!)
  const indexFingerRef = useRef<THREE.Group>(null!)
  const middleFingerRef = useRef<THREE.Group>(null!)
  const ringFingerRef = useRef<THREE.Group>(null!)
  const sparkleRef = useRef<THREE.PointLight>(null!)

  // Sculptural porcelain/alabaster studio skin material (clean, elegant, luxury editorial)
  const skinMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#e8e4df'),
      roughness: 0.72,
      metalness: 0.05
    })
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    // 1. Slow camera drift
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, Math.sin(t * 0.25) * 0.25, 0.05)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 0.2 + Math.cos(t * 0.2) * 0.15, 0.05)
    state.camera.lookAt(0.3, 0.1, 0)

    // 2. Subtle natural breathing motion
    if (handRef.current) {
      handRef.current.position.y = Math.sin(t * 0.5) * 0.05
      handRef.current.position.z = Math.cos(t * 0.4) * 0.04
      handRef.current.rotation.x = 0.2 + Math.sin(t * 0.35) * 0.02
    }

    if (indexFingerRef.current) {
      indexFingerRef.current.rotation.x = Math.sin(t * 0.7) * 0.03
    }
    if (middleFingerRef.current) {
      middleFingerRef.current.rotation.x = Math.sin(t * 0.65 + 0.3) * 0.035
    }
    if (ringFingerRef.current) {
      ringFingerRef.current.rotation.x = Math.sin(t * 0.6 + 0.6) * 0.03
    }

    // 3. Dynamic Flare Sparkle
    if (sparkleRef.current) {
      const pulse = Math.sin(t * 1.8)
      sparkleRef.current.intensity = pulse > 0.4 ? 4.5 * (pulse - 0.4) : 0
      sparkleRef.current.position.x = 0.4 + Math.sin(t * 0.5) * 0.6
      sparkleRef.current.position.y = 0.6 + Math.cos(t * 0.5) * 0.4
    }
  })

  return (
    <group ref={groupRef} position={[0.2, -0.1, 0]}>
      {/* Studio Lighting */}
      <StudioLighting intensity={1.1} shadowOpacity={0.22} />

      {/* Dynamic Glimmering Lens Flare */}
      <pointLight
        ref={sparkleRef}
        position={[0.5, 0.7, 1.2]}
        intensity={2.5}
        color="#ffffff"
        distance={6}
      />

      {/* Sculptural Hand with Heavy VEYRA Rings */}
      <group
        ref={handRef}
        position={[0.5, -0.75, 0.1]}
        rotation={[0.22, -0.42, -0.08]}
        scale={0.58}
      >
        {/* Palm base */}
        <mesh position={[-0.3, -1.1, 0]} material={skinMaterial} receiveShadow>
          <boxGeometry args={[1.9, 1.8, 0.55]} />
        </mesh>

        {/* 1. Index Finger carrying The Monolith Signet I (Oxidised 925 Silver) */}
        <group ref={indexFingerRef} position={[-0.75, 0.5, 0.18]}>
          <mesh material={skinMaterial} castShadow receiveShadow>
            <cylinderGeometry args={[0.2, 0.23, 2.5, 32]} />
          </mesh>
          <group position={[0, 0.3, 0]} rotation={[0, 0, 0.06]}>
            <ProceduralRing
              modelType="signet"
              materialType="oxidised-silver"
              scale={0.36}
            />
          </group>
        </group>

        {/* 2. Middle Finger carrying The Solitary Cabochon (Blackened Bronze + Garnet Cabochon) */}
        <group ref={middleFingerRef} position={[-0.15, 0.85, 0.05]}>
          <mesh material={skinMaterial} castShadow receiveShadow>
            <cylinderGeometry args={[0.22, 0.25, 2.9, 32]} />
          </mesh>
          <group position={[0, 0.5, 0]} rotation={[0, 0.2, -0.04]}>
            <ProceduralRing
              modelType="cabochon"
              materialType="blackened-bronze"
              scale={0.38}
            />
          </group>
        </group>

        {/* 3. Ring Finger carrying Triptych Bands (Raw Brass Trio Stack) */}
        <group ref={ringFingerRef} position={[0.45, 0.52, -0.1]}>
          <mesh material={skinMaterial} castShadow receiveShadow>
            <cylinderGeometry args={[0.19, 0.22, 2.6, 32]} />
          </mesh>
          <group position={[0, 0.22, 0]} rotation={[0, -0.18, 0.06]}>
            <ProceduralRing
              modelType="stack"
              materialType="raw-brass"
              scale={0.35}
            />
          </group>
        </group>
      </group>
    </group>
  )
}
