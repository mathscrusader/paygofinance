"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { TrendingUp, Upload, Clock } from "lucide-react"
import { useState } from "react"

const upgradePlans = [
  {
    from: "Basic",
    to: "Premium",
    price: "₦10,000",
    benefits: ["5% → 10% discount", "₦50 → ₦100 per referral", "Priority support"],
  },
  {
    from: "Premium",
    to: "VIP",
    price: "₦15,000",
    benefits: ["10% → 15% discount", "₦100 → ₦200 per referral", "24/7 support", "VIP community"],
  },
  {
    from: "VIP",
    to: "Diamond",
    price: "₦20,000",
    benefits: ["15% → 20% discount", "₦200 → ₦300 per referral", "Personal manager", "Monthly bonuses"],
  },
]

export default function UpgradePage() {
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [paymentProof, setPaymentProof] = useState<File | null>(null)
  const [transactionRef, setTransactionRef] = useState("")
  const [notes, setNotes] = useState("")

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentProof(e.target.files[0])
    }
  }

  const handleSubmitUpgrade = () => {
    console.log("Upgrade request:", { selectedPlan, paymentProof, transactionRef, notes })
    // Handle upgrade request submission
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upgrade Your Plan</h1>
          <p className="text-gray-600">Get better rates and higher commissions</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Current Plan */}
            <Card className="mb-6 bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">Your Current Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <Badge className="bg-blue-600 text-white mb-2">Premium PAY ID</Badge>
                    <p className="text-sm text-blue-700">• 10% discount on VTU services</p>
                    <p className="text-sm text-blue-700">• ₦100 per referral</p>
                    <p className="text-sm text-blue-700">• Priority support</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-800">₦15,000</p>
                    <p className="text-sm text-blue-600">Current Value</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upgrade Options */}
            <Card>
              <CardHeader>
                <CardTitle>Available Upgrades</CardTitle>
                <CardDescription>Choose your new plan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upgradePlans.map((plan, index) => (
                  <Card
                    key={index}
                    className={`cursor-pointer transition-all ${
                      selectedPlan?.to === plan.to ? "ring-2 ring-green-500 bg-green-50" : "hover:shadow-md"
                    }`}
                    onClick={() => setSelectedPlan(plan)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">Upgrade to {plan.to}</h3>
                          <p className="text-sm text-gray-600">From {plan.from}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-green-600">{plan.price}</p>
                          <p className="text-sm text-gray-500">Upgrade fee</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        {plan.benefits.map((benefit, benefitIndex) => (
                          <p key={benefitIndex} className="text-sm text-gray-600">
                            ✓ {benefit}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Payment Instructions */}
            {selectedPlan && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Payment Instructions</CardTitle>
                  <CardDescription>Complete your upgrade payment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Bank Transfer Details</h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <strong>Bank:</strong> First Bank of Nigeria
                      </p>
                      <p>
                        <strong>Account Name:</strong> PayGo Finance Ltd
                      </p>
                      <p>
                        <strong>Account Number:</strong> 1234567890
                      </p>
                      <p>
                        <strong>Amount:</strong> <span className="text-green-600 font-bold">{selectedPlan.price}</span>
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="transactionRef">Transaction Reference</Label>
                      <Input
                        id="transactionRef"
                        placeholder="Enter transaction reference"
                        value={transactionRef}
                        onChange={(e) => setTransactionRef(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="paymentProof">Upload Payment Proof</Label>
                      <Input id="paymentProof" type="file" accept="image/*,.pdf" onChange={handleFileUpload} />
                      {paymentProof && <p className="text-sm text-green-600">✓ File uploaded: {paymentProof.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Additional Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        placeholder="Any additional information..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </div>

                    <Button
                      onClick={handleSubmitUpgrade}
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={!transactionRef || !paymentProof}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Submit Upgrade Request
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            {/* Upgrade Process */}
            <Card>
              <CardHeader>
                <CardTitle>Upgrade Process</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Choose Plan</p>
                    <p className="text-sm text-gray-600">Select your upgrade option</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Make Payment</p>
                    <p className="text-sm text-gray-600">Transfer to our bank account</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Submit Proof</p>
                    <p className="text-sm text-gray-600">Upload payment screenshot</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <div>
                    <p className="font-medium">Get Approved</p>
                    <p className="text-sm text-gray-600">Admin approves within 24hrs</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pending Requests */}
            <Card className="bg-yellow-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-yellow-800">Pending Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div>
                      <p className="font-medium">Premium → VIP</p>
                      <p className="text-sm text-gray-600">Submitted 2 days ago</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">
                      <Clock className="w-3 h-3 mr-1" />
                      Pending
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Benefits Summary */}
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Why Upgrade?</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>✓ Higher discount rates on all services</li>
                  <li>✓ Increased referral commissions</li>
                  <li>✓ Priority customer support</li>
                  <li>✓ Exclusive community access</li>
                  <li>✓ Special bonuses and rewards</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
