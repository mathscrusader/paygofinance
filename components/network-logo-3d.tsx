"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import type { Mesh } from "three"

interface NetworkLogo3DProps {
  network: "mtn" | "airtel" | "glo" | "9mobile"
  size?: number
}

function RotatingLogo({ network, size = 1 }: NetworkLogo3DProps) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5
      meshRef.current.rotation.x += delta * 0.2
    }
  })

  const getNetworkConfig = () => {
    switch (network) {
      case "mtn":
        return { color: "#FFCC00", symbol: "bar" }
      case "airtel":
        return { color: "#FF0000", symbol: "sphere" }
      case "glo":
        return { color: "#00A651", symbol: "cone" }
      case "9mobile":
        return { color: "#0066CC", symbol: "octahedron" }
      default:
        return { color: "#FFCC00", symbol: "bar" }
    }
  }

  const config = getNetworkConfig()

  const renderSymbol = () => {
    switch (config.symbol) {
      case "sphere":
        return <sphereGeometry args={[0.3 * size, 16, 16]} />
      case "cone":
        return <coneGeometry args={[0.3 * size, 0.6 * size, 8]} />
      case "octahedron":
        return <octahedronGeometry args={[0.3 * size]} />
      default:
        return <boxGeometry args={[0.6 * size, 0.2 * size, 0.1 * size]} />
    }
  }

  return (
    <mesh ref={meshRef}>
      <cylinderGeometry args={[0.5 * size, 0.5 * size, 0.1 * size, 32]} />
      <meshStandardMaterial color={config.color} />
      <mesh position={[0, 0.1 * size, 0]}>
        {renderSymbol()}
        <meshStandardMaterial color="white" />
      </mesh>
    </mesh>
  )
}

export default function NetworkLogo3D({ network, size = 1 }: NetworkLogo3DProps) {
  return (
    <div className="w-12 h-12">
      <Canvas camera={{ position: [0, 0, 2], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <RotatingLogo network={network} size={size} />
      </Canvas>
    </div>
  )
}
