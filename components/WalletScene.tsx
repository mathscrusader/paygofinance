// components/WalletScene.tsx
"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Float, Text3D, OrbitControls, Environment } from "@react-three/drei"

export default function WalletScene() {
  return (
    <Canvas camera={{ position: [0, 0, 4] }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} />

        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
          <mesh>
            <boxGeometry args={[2, 1.2, 0.1]} />
            <meshStandardMaterial color="#2563eb" />
          </mesh>
          <Text3D
            font="/fonts/Geist_Bold.json"
            size={0.2}
            height={0.02}
            position={[-0.8, 0.1, 0.06]}
          >
            PAY ID
            <meshStandardMaterial color="#ffffff" />
          </Text3D>
          <Text3D
            font="/fonts/Geist_Regular.json"
            size={0.15}
            height={0.02}
            position={[-0.6, -0.2, 0.06]}
          >
            WALLET
            <meshStandardMaterial color="#ffffff" />
          </Text3D>
        </Float>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={2}
        />
        <Environment preset="sunset" />
      </Suspense>
    </Canvas>
  )
}
