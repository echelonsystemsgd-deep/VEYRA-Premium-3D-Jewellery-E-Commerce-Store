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
  const flareLightRef = useRef<THREE.PointLight>(null!)

  // Create subtle organic hand/finger skin material (soft, matte, sculptural)
  const skinMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#222123'),
      roughness: 0.88,
      metalness: 0.05
    })
  }, [])

  // Light flare particle points
  const microMotes = useMemo(() => {
    const count = 40
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [])

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()

    // 1. Slow camera drift
    state.camera.position.x = Math.sin(t * 0.18) * 0.35
    state.camera.position.y = 0.5 + Math.cos(t * 0.15) * 0.2
    state.camera.lookAt(0, 0, 0)

    // 2. Very subtle natural finger movement / breathing animation
    if (handRef.current) {
      handRef.current.position.y = Math.sin(t * 0.4) * 0.04
      handRef.current.rotation.z = -0.15 + Math.sin(t * 0.3) * 0.015
    }

    if (indexFingerRef.current) {
      indexFingerRef.current.rotation.x = Math.sin(t * 0.6) * 0.02
    }
    if (middleFingerRef.current) {
      middleFingerRef.current.rotation.x = Math.sin(t * 0.55 + 0.4) * 0.022
    }
    if (ringFingerRef.current) {
      ringFingerRef.current.rotation.x = Math.sin(t * 0.5 + 0.8) * 0.018
    }

    // 3. Moving light flare across metal
    if (flareLightRef.current) {
      flareLightRef.current.position.x = Math.sin(t * 0.35) * 3.8
      flareLightRef.current.position.y = 1.2 + Math.cos(t * 0.4) * 0.8
    }
  })

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* Studio Lighting with custom flare */}
      <StudioLighting intensity={1.15} />

      {/* Moving Cinema Flare Light */}
      <pointLight
        ref={flareLightRef}
        position={[2.5, 1.2, 2.5]}
        intensity={3.5}
        color="#fff4e8"
        distance={10}
      />

      {/* Sculptural Hand with Heavy VEYRA Rings */}
      <group ref={handRef} position={[0.4, -0.9, -0.4]} rotation={[0.25, -0.35, -0.1]} scale={0.55}>
        {/* Palm base */}
        <mesh position={[-0.4, -1.2, 0]} material={skinMaterial} receiveShadow>
          <boxGeometry args={[2.0, 1.8, 0.6]} />
        </mesh>

        {/* 1. Index Finger carrying The Monolith Signet I (Oxidised Silver) */}
        <group ref={indexFingerRef} position={[-0.8, 0.5, 0.2]}>
          {/* Digit */}
          <mesh material={skinMaterial} castShadow receiveShadow>
            <cylinderGeometry args={[0.22, 0.25, 2.6, 32]} />
          </mesh>
          {/* Ring */}
          <group position={[0, 0.25, 0]} rotation={[0, 0, 0.05]}>
            <ProceduralRing 
              modelType="signet" 
              materialType="oxidised-silver" 
              scale={0.38} 
            />
          </group>
        </group>

        {/* 2. Middle Finger carrying The Solitary Cabochon (Blackened Bronze + Garnet) */}
        <group ref={middleFingerRef} position={[-0.2, 0.85, 0.05]}>
          {/* Digit */}
          <mesh material={skinMaterial} castShadow receiveShadow>
            <cylinderGeometry args={[0.24, 0.26, 3.0, 32]} />
          </mesh>
          {/* Ring */}
          <group position={[0, 0.45, 0]} rotation={[0, 0.25, -0.04]}>
            <ProceduralRing 
              modelType="cabochon" 
              materialType="blackened-bronze" 
              scale={0.4} 
            />
          </group>
        </group>

        {/* 3. Ring Finger carrying Triptych Bands (Raw Brass & Dark Bronze) */}
        <group ref={ringFingerRef} position={[0.45, 0.5, -0.1]}>
          {/* Digit */}
          <mesh material={skinMaterial} castShadow receiveShadow>
            <cylinderGeometry args={[0.21, 0.23, 2.7, 32]} />
          </mesh>
          {/* Ring Stack */}
          <group position={[0, 0.15, 0]} rotation={[0, -0.2, 0.06]}>
            <ProceduralRing 
              modelType="stack" 
              materialType="raw-brass" 
              scale={0.36} 
            />
          </group>
        </group>
      </group>

      {/* Floating micro dust sparkles in the beam */}
      <points geometry={microMotes}>
        <pointsMaterial
          size={0.025}
          color="#e0d5c1"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}
