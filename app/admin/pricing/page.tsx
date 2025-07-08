"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Smartphone, Save, RotateCcw } from "lucide-react"
import { motion } from "framer-motion"

export default function PricingPage() {
  const [packagePrices, setPackagePrices] = useState({
    basic: 5000,
    premium: 15000,
    vip: 30000,
    diamond: 50000,
  })

  const [vtuRates, setVtuRates] = useState({
    mtnAirtime: 0.95,
    airtelAirtime: 0.95,
    gloAirtime: 0.95,
    nineMobileAirtime: 0.95,
    mtnData: 0.9,
    airtelData: 0.9,
    gloData: 0.9,
    nineMobileData: 0.9,
  })

  const updatePackagePrice = (packageType: string, newPrice: number) => {
    setPackagePrices((prev) => ({ ...prev, [packageType]: newPrice }))
  }

  const updateVtuRate = (service: string, newRate: number) => {
    setVtuRates((prev) => ({ ...prev, [service]: newRate }))
  }

  const saveAllPrices = () => {
    console.log("Saving all prices:", { packagePrices, vtuRates })
    alert("All prices updated successfully!")
  }

  const resetToDefaults = () => {
    setPackagePrices({
      basic: 5000,
      premium: 15000,
      vip: 30000,
      diamond: 50000,
    })
    setVtuRates({
      mtnAirtime: 0.95,
      airtelAirtime: 0.95,
      gloAirtime: 0.95,
      nineMobileAirtime: 0.95,
      mtnData: 0.9,
      airtelData: 0.9,
      gloData: 0.9,
      nineMobileData: 0.9,
    })
    alert("Prices reset to defaults!")
  }

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Package & Service Pricing</h1>
            <p className="text-gray-600">Manage PAY ID package prices and VTU service rates</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={resetToDefaults}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset to Defaults
            </Button>
            <Button onClick={saveAllPrices} className="bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4 mr-2" />
              Save All Changes
            </Button>
          </div>
        </div>

        <Tabs defaultValue="packages" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="packages">PAY ID Packages</TabsTrigger>
            <TabsTrigger value="vtu">VTU Services</TabsTrigger>
          </TabsList>

          {/* PAY ID Package Pricing */}
          <TabsContent value="packages">
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(packagePrices).map(([packageType, price], index) => (
                <motion.div
                  key={packageType}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <CreditCard className="w-5 h-5 text-blue-600" />
                        <CardTitle className="capitalize">{packageType} Package</CardTitle>
                      </div>
                      <CardDescription>Set the price for {packageType} PAY ID package</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`${packageType}-price`}>Price (₦)</Label>
                        <Input
                          id={`${packageType}-price`}
                          type="number"
                          value={price}
                          onChange={(e) => updatePackagePrice(packageType, Number(e.target.value))}
                          className="text-lg font-semibold"
                        />
                      </div>

                      <div className="bg-gray-50 p-3 rounded-lg">
                        <h4 className="font-semibold mb-2">Package Benefits:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {packageType === "basic" && (
                            <>
                              <li>• 5,000 PAY ID tokens</li>
                              <li>• 5% discount on VTU</li>
                              <li>• ₦50 per referral</li>
                            </>
                          )}
                          {packageType === "premium" && (
                            <>
                              <li>• 15,000 PAY ID tokens</li>
                              <li>• 10% discount on VTU</li>
                              <li>• ₦100 per referral</li>
                              <li>• Priority support</li>
                            </>
                          )}
                          {packageType === "vip" && (
                            <>
                              <li>• 30,000 PAY ID tokens</li>
                              <li>• 15% discount on VTU</li>
                              <li>• ₦200 per referral</li>
                              <li>• 24/7 support</li>
                            </>
                          )}
                          {packageType === "diamond" && (
                            <>
                              <li>• 50,000 PAY ID tokens</li>
                              <li>• 20% discount on VTU</li>
                              <li>• ₦300 per referral</li>
                              <li>• Personal manager</li>
                            </>
                          )}
                        </ul>
                      </div>

                      <Button
                        onClick={() => {
                          console.log(`Updated ${packageType} price to ₦${price}`)
                          alert(`${packageType} package price updated!`)
                        }}
                        className="w-full"
                      >
                        Update {packageType} Price
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* VTU Service Rates */}
          <TabsContent value="vtu">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Airtime Rates */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Smartphone className="w-5 h-5 text-green-600" />
                    <CardTitle>Airtime Rates</CardTitle>
                  </div>
                  <CardDescription>Set discount rates for airtime purchases</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(vtuRates)
                    .filter(([service]) => service.includes("Airtime"))
                    .map(([service, rate], index) => (
                      <motion.div
                        key={service}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <Label className="font-semibold">
                            {service
                              .replace("Airtime", "")
                              .replace(/([A-Z])/g, " $1")
                              .trim()}{" "}
                            Airtime
                          </Label>
                          <p className="text-sm text-gray-600">Current rate: {(rate * 100).toFixed(0)}%</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            max="1"
                            value={rate}
                            onChange={(e) => updateVtuRate(service, Number(e.target.value))}
                            className="w-20"
                          />
                          <Button size="sm">Update</Button>
                        </div>
                      </motion.div>
                    ))}
                </CardContent>
              </Card>

              {/* Data Rates */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Smartphone className="w-5 h-5 text-purple-600" />
                    <CardTitle>Data Bundle Rates</CardTitle>
                  </div>
                  <CardDescription>Set discount rates for data bundle purchases</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(vtuRates)
                    .filter(([service]) => service.includes("Data"))
                    .map(([service, rate], index) => (
                      <motion.div
                        key={service}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <Label className="font-semibold">
                            {service
                              .replace("Data", "")
                              .replace(/([A-Z])/g, " $1")
                              .trim()}{" "}
                            Data
                          </Label>
                          <p className="text-sm text-gray-600">Current rate: {(rate * 100).toFixed(0)}%</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            max="1"
                            value={rate}
                            onChange={(e) => updateVtuRate(service, Number(e.target.value))}
                            className="w-20"
                          />
                          <Button size="sm">Update</Button>
                        </div>
                      </motion.div>
                    ))}
                </CardContent>
              </Card>
            </div>

            {/* Rate Information */}
            <Card className="mt-6 bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h3 className="font-semibold text-blue-800 mb-2">Rate Information</h3>
                <div className="text-sm text-blue-700 space-y-1">
                  <p>• Rates are multiplied by the original price to get the discounted price</p>
                  <p>• Example: 0.95 rate = 5% discount (user pays 95% of original price)</p>
                  <p>• Lower rates = higher discounts for users</p>
                  <p>• Rates should be between 0.50 (50% discount) and 1.00 (no discount)</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
