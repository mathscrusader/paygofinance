"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Send, MessageCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function JoinGroupPage() {
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
          <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Our Community</h1>
          <p className="text-gray-600">Connect with thousands of PayGo Finance users</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-all">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Send className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Telegram Group</CardTitle>
              <CardDescription>Join our main community group</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-sm text-gray-600">
                <p>• Get instant updates</p>
                <p>• Share tips and tricks</p>
                <p>• Connect with other users</p>
                <p>• Get exclusive offers</p>
              </div>
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={() => window.open("https://t.me/paygofinancegroup", "_blank")}
              >
                <Send className="w-4 h-4 mr-2" />
                Join Telegram Group
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <CardTitle>WhatsApp Group</CardTitle>
              <CardDescription>Join our WhatsApp community</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-sm text-gray-600">
                <p>• Quick announcements</p>
                <p>• Direct support</p>
                <p>• Community discussions</p>
                <p>• Special promotions</p>
              </div>
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => window.open("https://chat.whatsapp.com/paygofinance", "_blank")}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Join WhatsApp Group
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-center">Community Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 text-purple-800">Do's</h3>
                <ul className="space-y-2 text-sm text-purple-700">
                  <li>✅ Be respectful to all members</li>
                  <li>✅ Share helpful tips and experiences</li>
                  <li>✅ Ask questions when you need help</li>
                  <li>✅ Follow group rules and guidelines</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-purple-800">Don'ts</h3>
                <ul className="space-y-2 text-sm text-purple-700">
                  <li>❌ Spam or send irrelevant messages</li>
                  <li>❌ Share personal financial information</li>
                  <li>❌ Promote other services</li>
                  <li>❌ Use inappropriate language</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
