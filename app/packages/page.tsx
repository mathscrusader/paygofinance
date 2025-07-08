"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft, Building2, User, Hash, Copy, CheckCircle, Shield,
  Star, Zap, Crown, Sparkles, X
} from "lucide-react"
import { useCurrency } from "@/contexts/currency-context"

export default function PackagesPage() {
  const router = useRouter()
  const { currency } = useCurrency()
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [resultMsg, setResultMsg] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const packages = [
    // ...same as before (keep your packages array unchanged)
    {
      id: 1,
      name: "Starter",
      price: 5000,
      bonus: 500,
      total: 5500,
      popular: false,
      features: ["Basic VTU services", "5% referral commission", "Email support", "Mobile app access"],
      icon: Star,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 2,
      name: "Premium",
      price: 15000,
      bonus: 3000,
      total: 18000,
      popular: true,
      features: [
        "All VTU services",
        "10% referral commission",
        "Priority support",
        "Advanced analytics",
        "Bulk transactions",
      ],
      icon: Crown,
      color: "from-purple-500 to-purple-600",
    },
    {
      id: 3,
      name: "Business",
      price: 50000,
      bonus: 15000,
      total: 65000,
      popular: false,
      features: [
        "Enterprise features",
        "15% referral commission",
        "24/7 phone support",
        "API access",
        "Custom integrations",
        "Dedicated account manager",
      ],
      icon: Sparkles,
      color: "from-green-500 to-green-600",
    },
    {
      id: 4,
      name: "Enterprise",
      price: 100000,
      bonus: 35000,
      total: 135000,
      popular: false,
      features: [
        "All premium features",
        "20% referral commission",
        "White-label solution",
        "Custom branding",
        "Advanced reporting",
        "Multi-user accounts",
        "SLA guarantee",
      ],
      icon: Zap,
      color: "from-orange-500 to-red-500",
    },
  ]

  const bankDetails = {
    bank: "Sterling Bank",
    accountName: "Ebuka Nwite FLW",
    accountNumber: "8520206854",
  }

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const copyAllDetails = async () => {
    const allDetails = `Bank: ${bankDetails.bank}\nAccount Name: ${bankDetails.accountName}\nAccount Number: ${bankDetails.accountNumber}`
    await copyToClipboard(allDetails, "all")
  }

  // Modal Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)
    if (!file || !selectedPackage) {
      setError("Please upload your payment receipt or screenshot.")
      return
    }
    setUploading(true)
    try {
      // Get user email from localStorage
      const userData = typeof window !== "undefined" ? localStorage.getItem("user_data") : null
      const userEmail = userData ? JSON.parse(userData).email : ""
      if (!userEmail) {
        setError("Could not identify user. Please log in again.")
        setUploading(false)
        return
      }
      const pkg = packages.find((p) => p.id === selectedPackage)
      if (!pkg) {
        setError("Invalid package selected.")
        setUploading(false)
        return
      }
      // Prepare FormData
      const formData = new FormData()
      formData.append("email", userEmail)
      formData.append("packageId", pkg.id.toString())
      formData.append("amount", pkg.price.toString())
      formData.append("receipt", file)

      const res = await fetch("/api/fund-wallet", {
        method: "POST",
        body: formData,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Could not submit payment")
      setSuccess(true)
      setResultMsg(
        "Your payment was submitted successfully! Our team will review your receipt and credit your wallet shortly. You’ll be notified once your funds are available. Thank you for choosing PayGo Finance."
      )
      setShowResult(true)
      setShowModal(false)
      setFile(null)
      if (fileInputRef.current) fileInputRef.current.value = ""
      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        setShowResult(false)
        router.push("/dashboard")
      }, 3000)
    } catch (err: any) {
      setSuccess(false)
      setResultMsg(
        "Sorry, your payment could not be submitted. " +
          (err.message
            ? `Reason: ${err.message}`
            : "Please try again or contact support.")
      )
      setShowResult(true)
      // Optionally: Do not redirect on error, just show message
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your PAY ID Package</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select the perfect package for your needs and start earning rewards with every transaction
            </p>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {packages.map((pkg) => {
            const IconComponent = pkg.icon
            return (
              <Card
                key={pkg.id}
                className={`relative cursor-pointer transition-all duration-300 hover:shadow-xl ${
                  selectedPackage === pkg.id ? "ring-2 ring-purple-500 shadow-lg scale-105" : "hover:scale-102"
                } ${pkg.popular ? "border-purple-500" : ""}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-purple-500 text-white px-4 py-1">Most Popular</Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${pkg.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{pkg.name}</CardTitle>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-gray-900">
                      {currency.symbol}
                      {pkg.price.toLocaleString()}
                    </div>
                    <div className="text-sm text-green-600 font-medium">
                      + {currency.symbol}
                      {pkg.bonus.toLocaleString()} bonus
                    </div>
                    <div className="text-lg font-semibold text-purple-600">
                      Total: {currency.symbol}
                      {pkg.total.toLocaleString()}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-3">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex justify-center">
                    <Button
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      onClick={() => {
                        setSelectedPackage(pkg.id)
                        setShowModal(true)
                      }}
                    >
                      Buy Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Payment Modal */}
        {showModal && selectedPackage !== null && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-lg w-full p-6 relative shadow-2xl">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-red-600"
                onClick={() => {
                  setShowModal(false)
                  setFile(null)
                  setError("")
                  setSuccess(false)
                  if (fileInputRef.current) fileInputRef.current.value = ""
                }}
              >
                <X className="h-6 w-6" />
              </button>
              <h2 className="text-2xl font-bold text-center mb-2">Bank Transfer Details</h2>
              <p className="text-center text-gray-600 mb-4">
                Transfer <span className="font-bold text-purple-600">{currency.symbol}{packages.find(p => p.id === selectedPackage)?.price.toLocaleString()}</span> to the bank details below. Then upload your payment receipt to complete your purchase.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Card className="bg-white/10 border-gray-200">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Building2 className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="text-xs text-gray-500">Bank Name</p>
                        <p className="font-bold">{bankDetails.bank}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(bankDetails.bank, "bank")}
                    >
                      {copiedField === "bank" ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-gray-200">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="text-xs text-gray-500">Account Name</p>
                        <p className="font-bold">{bankDetails.accountName}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(bankDetails.accountName, "name")}
                    >
                      {copiedField === "name" ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-gray-200 md:col-span-2">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Hash className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="text-xs text-gray-500">Account Number</p>
                        <p className="font-mono font-bold text-lg">{bankDetails.accountNumber}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(bankDetails.accountNumber, "number")}
                    >
                      {copiedField === "number" ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </CardContent>
                </Card>
              </div>
              <div className="text-center mb-4">
                <Button
                  onClick={copyAllDetails}
                  className="bg-purple-100 text-purple-700 border border-purple-200 hover:bg-purple-200 px-6"
                >
                  {copiedField === "all" ? (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Copied All Details!
                    </>
                  ) : (
                    <>
                      <Copy className="h-5 w-5 mr-2" />
                      Copy All Bank Details
                    </>
                  )}
                </Button>
              </div>
              {/* Receipt Upload Form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block font-medium mb-2" htmlFor="receipt">
                    Upload Payment Receipt/Screenshot
                  </label>
                  <input
                    id="receipt"
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => {
                      setFile(e.target.files?.[0] || null)
                      setError("")
                      setSuccess(false)
                    }}
                    ref={fileInputRef}
                    required
                    className="block w-full rounded border border-gray-300 p-2"
                  />
                </div>
                {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={uploading}
                >
                  {uploading ? "Submitting..." : "Submit Payment"}
                </Button>
              </form>
              <div className="mt-4 text-sm text-gray-500">
                Need help? <Link href="/support" className="text-purple-600 hover:underline">Contact Support</Link>
              </div>
            </div>
          </div>
        )}

        {/* Success/Error Pop-Up */}
        {showResult && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full relative text-center">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-red-600"
                onClick={() => setShowResult(false)}
              >
                <X className="h-6 w-6" />
              </button>
              {success ? (
                <CheckCircle className="mx-auto mb-4 text-green-600" size={48} />
              ) : (
                <X className="mx-auto mb-4 text-red-600" size={48} />
              )}
              <h3 className="text-2xl font-semibold mb-3">{success ? "Payment Submitted!" : "Submission Failed"}</h3>
              <p className="text-gray-700 mb-4">{resultMsg}</p>
              {success ? (
                <p className="text-sm text-gray-500">Redirecting to your dashboard...</p>
              ) : (
                <Button className="mt-2" onClick={() => setShowResult(false)}>
                  Close
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Contact Support */}
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">Need help with your purchase?</p>
          <Link href="/support">
            <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50 bg-transparent">
              Contact Support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
