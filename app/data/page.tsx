"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Wifi, Zap, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface DataPlan {
  id: string
  size: string
  duration: string
  price: number
  originalPrice: number
}

interface Network {
  id: string
  name: string
  color: string
  dataPlans: DataPlan[]
}

export default function DataPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [networks, setNetworks] = useState<Network[]>([])
  const [selectedNetwork, setSelectedNetwork] = useState<string>("")
  const [selectedPlan, setSelectedPlan] = useState<DataPlan | null>(null)
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [processing, setProcessing] = useState<boolean>(false)

  useEffect(() => {
    const storedUser = localStorage.getItem("user_data")
    if (!storedUser) {
      router.replace("/login")
    } else {
      setUser(JSON.parse(storedUser))
      fetchNetworks()
    }
  }, [router])

  const fetchNetworks = async () => {
    try {
      const res = await fetch("/api/data/networks")
      if (!res.ok) throw new Error("Failed to fetch networks")
      const data: Network[] = await res.json()
      setNetworks(data)
      if (data.length > 0) setSelectedNetwork(data[0].name)
    } catch (err) {
      console.error(err)
      toast.error("Could not load data bundles")
    } finally {
      setLoading(false)
    }
  }

  const handlePurchase = async () => {
    if (!selectedPlan || !phoneNumber || !user) {
      toast.error("Please select a plan and enter phone number.")
      return
    }

    setProcessing(true)
    try {
      const res = await fetch("/api/data/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: selectedPlan.id,
          phoneNumber,
          userId: user.id,
        }),
      })
      const result = await res.json()
      if (!res.ok) {
        // Show specific error if available
        toast.error(result.message || "Purchase failed")
      } else {
        toast.success(result.message || "Data bundle purchase successful!")
      }
    } catch (err: any) {
      console.error(err)
      toast.error(err.message || "An error occurred.")
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const currentNetwork = networks.find((n) => n.name === selectedNetwork)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Navigation */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-700">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>
        </div>

        {/* User Info */}
        <Card className="mb-8">
          <CardContent className="py-4 flex items-center justify-between">
            <div>
              <span className="block text-xs text-gray-500 mb-1">Logged in as:</span>
              <span className="font-bold text-lg text-purple-800">{user?.name || user?.email}</span>
            </div>
            <Badge className="bg-purple-600 text-white">USER</Badge>
          </CardContent>
        </Card>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wifi className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Buy Data Bundles</h1>
          <p className="text-gray-600">Affordable data plans for all networks</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Network Selection */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Select Network</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-3">
                  {networks.map((network) => (
                    <Button
                      key={network.id}
                      variant={selectedNetwork === network.name ? "default" : "outline"}
                      className={`h-16 ${selectedNetwork === network.name ? network.color : ""}`}
                      onClick={() => {
                        setSelectedNetwork(network.name)
                        setSelectedPlan(null)
                      }}
                      type="button"
                    >
                      <div className="text-center">
                        <div className="font-semibold">{network.name}</div>
                        <div className="text-xs opacity-75">Data Plans</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Data Plans */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm sm:text-base md:text-lg">{selectedNetwork} Data Plans</CardTitle>
                <CardDescription className="text-[11px] sm:text-xs md:text-sm">Choose your preferred data bundle</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                  {currentNetwork?.dataPlans.map((plan) => (
                    <Card
                      key={plan.id}
                      className={`cursor-pointer transition-all h-full ${
                        selectedPlan?.id === plan.id ? "ring-2 ring-purple-500 bg-purple-50" : "hover:shadow-md"
                      }`}
                      onClick={() => setSelectedPlan(plan)}
                    >
                      <CardContent className="p-2 sm:p-3 md:p-4 flex flex-col h-full justify-between">
                        <div>
                          <h3 className="text-xs sm:text-sm md:text-base font-semibold">{plan.size}</h3>
                          <div className="flex items-center text-[10px] sm:text-xs md:text-sm text-gray-600">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> {plan.duration}
                          </div>
                        </div>
                        <div className="text-right mt-2">
                          <div className="text-sm sm:text-base md:text-lg font-bold text-green-600 leading-tight">
                            ₦{plan.price}
                          </div>
                          <div className="text-[10px] sm:text-xs md:text-sm text-gray-500 line-through">
                            ₦{plan.originalPrice}
                          </div>
                        </div>
                        <Badge variant="secondary" className="mt-2 text-[9px] sm:text-[11px] md:text-xs">
                          Save ₦{plan.originalPrice - plan.price}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Phone Number Input */}
            <Card>
              <CardHeader>
                <CardTitle>Phone Number</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="phone">Enter phone number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="08012345678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Network:</span>
                  <span className="font-medium">{selectedNetwork}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Data Plan:</span>
                  <span className="font-medium">{selectedPlan?.size || "Not selected"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{selectedPlan?.duration || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium">{phoneNumber || "Not entered"}</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-green-600">₦{selectedPlan?.price || 0}</span>
                </div>

                <Button
                  type="button"
                  onClick={handlePurchase}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={!selectedPlan || !phoneNumber || processing}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  {processing ? "Processing..." : "Buy Data Bundle"}
                </Button>
              </CardContent>
            </Card>

            {/* Benefits Card */}
            <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Wifi className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-purple-800">Why Choose Us?</span>
                </div>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Instant data delivery</li>
                  <li>• Best rates guaranteed</li>
                  <li>• 24/7 customer support</li>
                  <li>• PAY ID discounts available</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
