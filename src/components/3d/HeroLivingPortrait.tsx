import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

const LivingPortraitShader = {
  uniforms: {
    uTexture: { value: null },
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uResolution: { value: new THREE.Vector2(1, 1) }
  },
  vertexShader: `
    varying vec2 vUv;
    uniform float uTime;
    uniform vec2 uMouse;

    void main() {
      vUv = uv;
      vec3 pos = position;

      // 1. Organic Breathing Motion (Chest & Hand gentle expansion)
      float breath = sin(uTime * 1.1) * 0.02;
      float handPulse = sin(uTime * 1.4 + 0.5) * 0.015;

      // Vertical & horizontal displacement mapped to UV
      pos.y += breath * (1.0 - uv.y) * 0.4;
      pos.x += sin(uTime * 0.7) * 0.008;
      
      // 2. Interactive Parallax Tilt responding to mouse
      pos.x += uMouse.x * 0.08 * (uv.y - 0.5);
      pos.y += uMouse.y * 0.08 * (uv.x - 0.5);

      // Subtle 2.5D perspective forward push on the hand
      float handMask = smoothstep(0.6, 0.1, length(uv - vec2(0.5, 0.35)));
      pos.z += handMask * 0.05 * sin(uTime * 1.2);

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;

      // 1. Micro-Parallax Warp on hand and background
      vec2 center = vec2(0.5, 0.45);
      float distToCenter = length(uv - center);
      vec2 warp = normalize(uv - center + 0.0001) * sin(distToCenter * 6.0 - uTime * 0.8) * 0.0015;
      
      // Mouse offset with depth falloff
      vec2 mouseOffset = uMouse * 0.012 * (1.0 - distToCenter);
      vec2 finalUv = uv + warp + mouseOffset;

      // 2. Sample texture with subtle chromatic aberration for cinematic lens feel
      float r = texture2D(uTexture, finalUv + vec2(0.0008, 0.0)).r;
      float g = texture2D(uTexture, finalUv).g;
      float b = texture2D(uTexture, finalUv - vec2(0.0008, 0.0)).b;
      vec3 color = vec3(r, g, b);

      // 3. Dynamic Moving Star Lens Flare on the Garnet Ring (Around UV 0.485, 0.485)
      vec2 ringPos = vec2(0.482, 0.488) + vec2(sin(uTime * 0.7) * 0.004, cos(uTime * 0.9) * 0.003);
      vec2 diff = (uv - ringPos) * vec2(1.77, 1.0); // aspect ratio compensation
      float ringDist = length(diff);

      // Rotating Star Rays
      float angle = atan(diff.y, diff.x) + uTime * 0.4;
      float rays = pow(abs(cos(angle * 2.0)), 16.0) * 0.85;
      rays += pow(abs(cos(angle * 4.0 + 0.785)), 24.0) * 0.5;

      // Pulse glimmer intensity
      float shimmer = (sin(uTime * 2.2) * 0.5 + 0.5);
      float coreGlow = smoothstep(0.06, 0.0, ringDist) * 0.9;
      float starBurst = smoothstep(0.18, 0.0, ringDist) * rays * shimmer * 1.4;

      vec3 flareColor = vec3(1.0, 0.96, 0.92);
      color += (coreGlow * 0.6 + starBurst) * flareColor;

      // 4. Subtle Luxury Film Grain & Moving Soft Studio Sunlight Sweep
      float sweep = sin(uv.x * 2.5 - uv.y * 1.5 + uTime * 0.5) * 0.035;
      color += vec3(sweep);

      gl_FragColor = vec4(color, 1.0);
    }
  `
}

const LivingPlane: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null!)
  const materialRef = useRef<THREE.ShaderMaterial>(null!)
  const texture = useTexture('/images/hero-model-hand.jpg')

  const targetMouse = useRef(new THREE.Vector2(0, 0))
  const currentMouse = useRef(new THREE.Vector2(0, 0))

  const uniforms = useMemo(() => {
    return {
      uTexture: { value: texture },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(16, 9) }
    }
  }, [texture])

  useFrame((state, delta) => {
    if (!materialRef.current) return

    // Update time
    materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime()

    // Smoothly lerp mouse coordinates for weighted physical feel
    targetMouse.current.set(state.pointer.x, state.pointer.y)
    currentMouse.current.lerp(targetMouse.current, delta * 3.5)
    materialRef.current.uniforms.uMouse.value.copy(currentMouse.current)

    // Subtle gentle camera tilt
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 0.15, delta * 2.0)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.pointer.y * 0.1, delta * 2.0)
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      {/* Plane geometry with subdivisions for vertex displacement */}
      <planeGeometry args={[7.2, 4.05, 48, 48]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={LivingPortraitShader.vertexShader}
        fragmentShader={LivingPortraitShader.fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}

export const HeroLivingPortrait: React.FC = () => {
  return (
    <div className="w-full h-full relative pointer-events-auto cursor-default">
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 56 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <React.Suspense fallback={null}>
          <LivingPlane />
        </React.Suspense>
      </Canvas>
    </div>
  )
}
