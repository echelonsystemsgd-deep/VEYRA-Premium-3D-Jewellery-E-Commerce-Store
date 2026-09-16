import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import { ProceduralRing } from './ProceduralRing'
import { StudioLighting } from './StudioLighting'
import { MaterialType } from '../../data/products'

interface ProductDetailViewerProps {
  modelType: 'signet' | 'cabochon' | 'stack' | 'carved' | 'sovereign'
  materialType: MaterialType
}

export const ProductDetailViewer: React.FC<ProductDetailViewerProps> = ({
  modelType,
  materialType
}) => {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing select-none">
      <Canvas
        camera={{ position: [0, 0.8, 3.8], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <StudioLighting intensity={1.25} shadowOpacity={0.6} />
          
          <Float
            speed={1.5}
            rotationIntensity={0.2}
            floatIntensity={0.25}
            floatingRange={[-0.05, 0.05]}
          >
            <ProceduralRing
              modelType={modelType}
              materialType={materialType}
              scale={1.05}
            />
          </Float>

          {/* Damped Luxury Orbit Controls with constrained angles */}
          <OrbitControls
            enablePan={false}
            minDistance={2.4}
            maxDistance={5.2}
            minPolarAngle={Math.PI / 3.5}
            maxPolarAngle={(Math.PI * 2.8) / 4}
            enableDamping
            dampingFactor={0.04}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>

      {/* Subtle bottom indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none text-[0.625rem] tracking-[0.25em] uppercase text-veyra-muted font-mono whitespace-nowrap">
        Drag to inspect 360° · Scroll to magnify
      </div>
    </div>
  )
}
