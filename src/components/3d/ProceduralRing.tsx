import React, { useMemo } from 'react'
import * as THREE from 'three'
import { MaterialType } from '../../data/products'
import { createPBRJewelleryMaterial, createCabochonMaterial } from './RingMaterials'

interface ProceduralRingProps {
  modelType: 'signet' | 'cabochon' | 'stack' | 'carved' | 'sovereign'
  materialType?: MaterialType
  scale?: number
  innerEngraving?: boolean
}

export const ProceduralRing: React.FC<ProceduralRingProps> = ({
  modelType,
  materialType = 'oxidised-silver',
  scale = 1,
  innerEngraving = true
}) => {
  const metalMaterial = useMemo(() => {
    return createPBRJewelleryMaterial(materialType)
  }, [materialType])

  const cabochonMaterial = useMemo(() => {
    return createCabochonMaterial()
  }, [])

  // Create high-detail geometry based on modelType
  const content = useMemo(() => {
    switch (modelType) {
      case 'signet': {
        // Main tapered shank
        const shankGeo = new THREE.TorusGeometry(1.2, 0.28, 36, 72)
        
        // Flattened heavy signet face
        const bezelGeo = new THREE.CylinderGeometry(0.85, 0.72, 0.5, 48)
        
        // Recessed oval plateau
        const facePlateauGeo = new THREE.CylinderGeometry(0.72, 0.72, 0.08, 48)
        
        // Inner comfort bore
        const innerBoreGeo = new THREE.CylinderGeometry(1.0, 1.0, 0.5, 36)

        return (
          <group>
            {/* Shank */}
            <mesh geometry={shankGeo} material={metalMaterial} castShadow receiveShadow />
            {/* Signet Head */}
            <group position={[0, 1.25, 0]}>
              <mesh geometry={bezelGeo} material={metalMaterial} castShadow receiveShadow />
              {/* Recessed face */}
              <mesh 
                geometry={facePlateauGeo} 
                material={metalMaterial} 
                position={[0, 0.24, 0]} 
                castShadow 
                receiveShadow 
              />
              {/* "VEYRA" engraved plate emblem */}
              <mesh position={[0, 0.285, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.2, 0.55, 32]} />
                <meshStandardMaterial 
                  color="#111113" 
                  roughness={0.9} 
                  metalness={0.6} 
                />
              </mesh>
            </group>
          </group>
        )
      }

      case 'cabochon': {
        // Organic brutalist shank
        const shankGeo = new THREE.TorusGeometry(1.18, 0.32, 32, 64)
        
        // Sculpted bezel mount
        const bezelGeo = new THREE.CylinderGeometry(0.78, 0.62, 0.65, 36)
        
        // Cabochon Gemstone (Squashed glass/garnet dome)
        const gemGeo = new THREE.SphereGeometry(0.55, 36, 24)

        return (
          <group>
            <mesh geometry={shankGeo} material={metalMaterial} castShadow receiveShadow />
            <group position={[0, 1.28, 0]}>
              {/* Outer metal bezel with organic lip */}
              <mesh geometry={bezelGeo} material={metalMaterial} castShadow receiveShadow />
              {/* Gemstone Dome */}
              <mesh 
                geometry={gemGeo} 
                material={cabochonMaterial} 
                position={[0, 0.22, 0]} 
                scale={[1, 0.65, 1]} 
                castShadow 
                receiveShadow 
              />
            </group>
          </group>
        )
      }

      case 'stack': {
        // 3 organic nested bands with slight offsets
        const bandGeo1 = new THREE.TorusGeometry(1.18, 0.2, 32, 64)
        const bandGeo2 = new THREE.TorusGeometry(1.18, 0.22, 32, 64)
        const bandGeo3 = new THREE.TorusGeometry(1.18, 0.19, 32, 64)

        return (
          <group>
            <mesh 
              geometry={bandGeo1} 
              material={metalMaterial} 
              position={[0, 0, -0.28]} 
              rotation={[0.08, 0, 0.05]} 
              castShadow 
              receiveShadow 
            />
            <mesh 
              geometry={bandGeo2} 
              material={metalMaterial} 
              position={[0, 0, 0]} 
              rotation={[-0.05, 0.04, -0.04]} 
              castShadow 
              receiveShadow 
            />
            <mesh 
              geometry={bandGeo3} 
              material={metalMaterial} 
              position={[0, 0, 0.28]} 
              rotation={[0.04, -0.03, 0.07]} 
              castShadow 
              receiveShadow 
            />
          </group>
        )
      }

      case 'carved': {
        // High relief ceremonial pattern band
        const mainBand = new THREE.TorusGeometry(1.2, 0.35, 36, 64)
        const beadRing1 = new THREE.TorusGeometry(1.2, 0.08, 16, 48)
        const beadRing2 = new THREE.TorusGeometry(1.2, 0.08, 16, 48)

        return (
          <group>
            <mesh geometry={mainBand} material={metalMaterial} castShadow receiveShadow />
            {/* Flanking granular rims */}
            <mesh 
              geometry={beadRing1} 
              material={metalMaterial} 
              position={[0, 0, -0.25]} 
              castShadow 
            />
            <mesh 
              geometry={beadRing2} 
              material={metalMaterial} 
              position={[0, 0, 0.25]} 
              castShadow 
            />
          </group>
        )
      }

      case 'sovereign':
      default: {
        // Chamfered heavy sovereign band
        const bandGeo = new THREE.CylinderGeometry(1.35, 1.35, 0.85, 48, 1, true)
        const outerLipGeo = new THREE.TorusGeometry(1.35, 0.12, 24, 48)

        return (
          <group rotation={[Math.PI / 2, 0, 0]}>
            <mesh geometry={bandGeo} material={metalMaterial} castShadow receiveShadow />
            <mesh geometry={outerLipGeo} material={metalMaterial} position={[0, 0, 0.42]} castShadow />
            <mesh geometry={outerLipGeo} material={metalMaterial} position={[0, 0, -0.42]} castShadow />
          </group>
        )
      }
    }
  }, [modelType, metalMaterial, cabochonMaterial])

  return (
    <group scale={scale}>
      {content}
    </group>
  )
}
