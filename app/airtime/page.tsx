"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Phone, Zap, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface Network {
  id: string
  name: string
  color: string
  rates: {
    amount: number
    discount: number
  }[]
}

export default function AirtimePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [networks, setNetworks] = useState<Network[]>([])
  const [selectedNetwork, setSelectedNetwork] = useState("")
  const [selectedAmount, setSelectedAmount] = useState<any>(null)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [processing, setProcessing] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("user_data")
    if (!storedUser) {
      router.replace("/login")
    } else {
      setUser(JSON.parse(storedUser))
      fetchNetworks()
    }
  }, [])

  const fetchNetworks = async () => {
    try {
      const res = await fetch("/api/airtime/networks")
      if (!res.ok) throw new Error("Failed to fetch networks")
      const data = await res.json()
      setNetworks(data)
      if (data.length > 0) setSelectedNetwork(data[0].name)
    } catch (err) {
      toast.error("Could not load networks")
    } finally {
      setLoading(false)
    }
  }

  const currentNetwork = networks.find((n) => n.name === selectedNetwork)

  const handlePurchase = async () => {
    if (!selectedAmount || !phoneNumber || !user) return

    setProcessing(true)
    try {
      const res = await fetch("/api/airtime/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          network: selectedNetwork,
          amount: selectedAmount.amount,
          phoneNumber,
          discount: selectedAmount.discount,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Purchase failed")
      toast.success("Airtime purchase successful!")
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

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
            <Phone className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Buy Airtime</h1>
          <p className="text-gray-600">Recharge your phone with PAY ID discount</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Select Network</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {networks.map((network) => (
                    <Button
                      key={network.id}
                      variant={selectedNetwork === network.name ? "default" : "outline"}
                      className={`h-16 ${selectedNetwork === network.name ? network.color : ""}`}
                      onClick={() => {
                        setSelectedNetwork(network.name)
                        setSelectedAmount(null)
                      }}
                    >
                      <div className="text-center">
                        <div className="font-semibold">{network.name}</div>
                        <div className="text-xs opacity-75">Airtime</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{selectedNetwork} Airtime</CardTitle>
                <p className="text-gray-500">Choose your recharge amount</p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {currentNetwork?.rates.map((rate, index) => (
                    <Card
                      key={index}
                      className={`cursor-pointer transition-all ${
                        selectedAmount?.amount === rate.amount
                          ? "ring-2 ring-purple-500 bg-purple-50"
                          : "hover:shadow-md"
                      }`}
                      onClick={() => setSelectedAmount(rate)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <h3 className="text-lg font-semibold">₦{rate.amount}</h3>
                            <p className="text-sm text-gray-600">Airtime</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-600">
                              ₦{rate.amount - (rate.amount * rate.discount) / 100}
                            </div>
                            <div className="text-sm text-gray-500 line-through">₦{rate.amount}</div>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          Save {rate.discount}%
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
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
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium">₦{selectedAmount?.amount || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount:</span>
                  <span className="font-medium text-green-600">{selectedAmount?.discount || 0}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium">{phoneNumber || "Not entered"}</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-green-600">
                    ₦
                    {selectedAmount
                      ? selectedAmount.amount - (selectedAmount.amount * selectedAmount.discount) / 100
                      : 0}
                  </span>
                </div>
                <Button
                  onClick={handlePurchase}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={!selectedAmount || !phoneNumber || processing}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  {processing ? "Processing..." : "Buy Airtime"}
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Phone className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-purple-800">Why Choose Us?</span>
                </div>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Instant airtime delivery</li>
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
