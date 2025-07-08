"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Mail, Send, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Get Support</h1>
          <p className="text-gray-600">We're here to help you 24/7</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-all cursor-pointer">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <CardTitle>WhatsApp</CardTitle>
              <CardDescription>Chat with us instantly</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => window.open("https://wa.me/2348012345678", "_blank")}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat on WhatsApp
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all cursor-pointer">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Send className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Telegram</CardTitle>
              <CardDescription>Join our support channel</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={() => window.open("https://t.me/paygofinance", "_blank")}
              >
                <Send className="w-4 h-4 mr-2" />
                Open Telegram
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all cursor-pointer">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Email</CardTitle>
              <CardDescription>Send us an email</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button
                className="w-full bg-red-600 hover:bg-red-700"
                onClick={() => window.open("mailto:support@paygofinance.com", "_blank")}
              >
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-semibold mb-2">How do I buy PAY ID tokens?</h3>
              <p className="text-gray-600">
                Visit our packages page and select your preferred plan. Payment can be made via bank transfer or card.
              </p>
            </div>
            <div className="border-b pb-4">
              <h3 className="font-semibold mb-2">How long does airtime/data delivery take?</h3>
              <p className="text-gray-600">
                All purchases are processed instantly. If you don't receive your airtime/data within 5 minutes, contact
                support.
              </p>
            </div>
            <div className="border-b pb-4">
              <h3 className="font-semibold mb-2">How do referrals work?</h3>
              <p className="text-gray-600">
                Share your referral link with friends. When they make their first purchase, you earn commission based on
                your PAY ID level.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I upgrade my PAY ID package?</h3>
              <p className="text-gray-600">
                Yes! You can upgrade anytime from your dashboard. The new benefits will apply immediately.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
