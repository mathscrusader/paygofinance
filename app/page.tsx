"use client"

import { Suspense, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Float, Text3D } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  CreditCard, Phone, Wifi, Users, DollarSign, User, 
  ChevronRight, Shield, Zap, Globe, Eye, EyeOff 
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useCurrency } from "@/contexts/currency-context"
import Header from "@/components/header"
import Footer from "@/components/footer"

function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} />
      <Float speed={2} rotationIntensity={1.2} floatIntensity={0.8}>
        <Text3D
          font="/fonts/Geist_Bold.json"
          size={0.8}
          height={0.1}
          position={[-3, 2, 0]}
        >
          PayGo Finance
          <meshStandardMaterial color="#c084fc" emissive="#e9d5ff" emissiveIntensity={0.7} />
        </Text3D>
      </Float>
      <OrbitControls enableZoom={false} enablePan={false} />
      <Environment preset="sunset" />
    </>
  )
}

export default function HomePage() {
  const [showBalance, setShowBalance] = useState(true)
  const [balance] = useState(180000.0)
  const [weeklyRewards] = useState(180000.0)
  const { formatAmount } = useCurrency()

  const features = [
    {
      icon: CreditCard,
      title: "PAY ID Wallet",
      description: "Manage your digital currency",
      href: "/wallet",
      color: "bg-purple-100"
    },
    {
      icon: Phone,
      title: "Airtime",
      description: "Instant top-up with 5% bonus",
      href: "/airtime",
      color: "bg-purple-50"
    },
    {
      icon: Wifi,
      title: "Data Bundles",
      description: "Best value data plans",
      href: "/data",
      color: "bg-purple-100"
    },
    {
      icon: Users,
      title: "Community",
      description: "Join our network",
      href: "/community",
      color: "bg-purple-50"
    }
  ]

  const networks = [
    { name: "MTN", color: "bg-yellow-400" },
    { name: "Airtel", color: "bg-red-500" },
    { name: "Glo", color: "bg-green-500" },
    { name: "9mobile", color: "bg-blue-600" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      
      {/* Hero Section */}
      <section className="relative pt-10 pb-10 md:pt-20 md:pb-28 bg-gradient-to-br from-purple-800 via-purple-600 to-fuchsia-500 h-[300px] md:h-auto min-h-[300px]">
        <div className="container mx-auto px-6 h-full flex flex-col justify-center">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 h-full">
            <div className="lg:w-1/2">
              <h1 className="text-2xl md:text-6xl font-extrabold text-white mb-3 md:mb-6 leading-tight drop-shadow-lg">
                <span className="block">Welcome to</span>
                <span className="block text-fuchsia-200">PayGo Finance</span>
              </h1>
              <p className="text-base md:text-2xl text-purple-100 mb-4 md:mb-10 font-medium max-w-xl drop-shadow">
                Experience the future of digital finance. Instantly manage airtime, data, and your PAY ID wallet with Africa’s most rewarding platform. Fast. Secure. Effortless.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Link href="/register">
                  <Button className="px-6 py-3 md:px-8 md:py-4 bg-white hover:bg-purple-100 text-base md:text-lg text-purple-900 font-bold shadow-lg">
                    Get Started
                  </Button>
                </Link>
                <Link href="/login">
                  <Button className="px-6 py-3 md:px-8 md:py-4 bg-purple-700 hover:bg-purple-800 text-base md:text-lg text-white font-bold shadow-lg border-none">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 h-32 md:h-96">
              <Canvas camera={{ position: [0, 0, 10] }}>
                <Suspense fallback={null}>
                  <Scene3D />
                </Suspense>
              </Canvas>
            </div>
          </div>
        </div>
      </section>

      {/* Networks Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-purple-900 mb-12">
            Supported Networks
          </h2>
          <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
            {networks.map((network) => (
              <div key={network.name} className="flex flex-col items-center">
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full ${network.color} flex items-center justify-center mb-2 md:mb-3`}>
                  <span className="text-white font-bold text-lg md:text-2xl">{network.name.charAt(0)}</span>
                </div>
                <span className="font-medium text-purple-900 text-xs md:text-base">{network.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-purple-900 mb-12">
            Everything You Need
          </h2>
          <div className="grid grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <Link href={feature.href} key={feature.title}>
                <Card className={`h-full hover:shadow-md transition-all ${feature.color}`}>
                  <CardContent className="p-4 md:p-6">
                    <div className="bg-purple-600 w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                      <feature.icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                    </div>
                    <CardHeader className="p-0">
                      <CardTitle className="text-purple-900 text-base md:text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <p className="text-purple-700 mt-1 md:mt-2 text-xs md:text-base">{feature.description}</p>
                    <div className="mt-3 md:mt-4 flex items-center text-purple-600">
                      <span className="text-xs md:text-sm font-medium">Explore</span>
                      <ChevronRight className="ml-1 h-3 w-3 md:h-4 md:w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-purple-200 mb-8 max-w-2xl mx-auto">
            Join thousands of users enjoying seamless transactions and exclusive benefits.
          </p>
          <Link href="/register">
            <Button className="px-10 py-6 text-lg bg-white text-purple-900 hover:bg-purple-100 font-bold shadow-lg">
              Create Account
            </Button>
          </Link>
        </div>
      </section>

    </div>
  )
}