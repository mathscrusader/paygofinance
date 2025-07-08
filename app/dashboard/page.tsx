"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  CreditCard,
  Phone,
  Wifi,
  Users,
  DollarSign,
  TrendingUp,
  Wallet,
  Gift,
  Eye,
  EyeOff,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react"
import { motion } from "framer-motion"

type TransactionType = {
  id: number
  type: string
  amount: number
  status: string
  network: string | null
  timestamp: string
  userId: number
}

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [showBalance, setShowBalance] = useState(true)
  const [transactions, setTransactions] = useState<TransactionType[]>([])

  // Refetch user info
  const fetchUser = async (userEmail: string) => {
    try {
      const res = await fetch("/api/me", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to load user.")
      setUser(data.user)
      setTransactions(data.user.transactions || [])
    } catch (err) {
      localStorage.removeItem("user_token")
      localStorage.removeItem("user_data")
      router.replace("/login")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("user_token")
    const userData = localStorage.getItem("user_data")
    if (!token || !userData) {
      router.replace("/login")
      return
    }
    const { email } = JSON.parse(userData)
    fetchUser(email)
    // eslint-disable-next-line
  }, [router])

  const stats = [
    {
      icon: Wallet,
      label: "Wallet Balance",
      value: user ? `${user.balance?.toLocaleString?.() ?? user.balance} PAY ID` : "—",
      color: "blue",
    },
    {
      icon: TrendingUp,
      label: "Referral Earnings",
      value: user?.referralEarnings ? `${user.referralEarnings} PAY ID` : "0 PAY ID",
      color: "green",
    },
    {
      icon: Users,
      label: "Referrals",
      value: user?.referralCount || "0",
      color: "purple",
    },
    {
      icon: Gift,
      label: "Current Plan",
      value: user?.plan?.name || "—",
      color: "yellow",
    },
  ]

  // Dashboard quick actions
  const quickActions = [
    { href: "/airtime", icon: Phone, title: "Airtime", desc: "Buy with tokens", color: "green" },
    { href: "/data", icon: Wifi, title: "Data", desc: "Buy with tokens", color: "purple" },
    { href: "/packages", icon: CreditCard, title: "Buy Tokens", desc: "Get more PAY ID", color: "blue" },
    { href: "/earn", icon: DollarSign, title: "Earn More", desc: "Referrals", color: "yellow" },
  ]

  if (loading) return <div>Loading...</div>
  if (!user) return <div>User not found.</div>

  // Helper: transaction color/icon by status
  function getStatusStyle(status: string) {
    if (/pending/i.test(status)) {
      return {
        badge: "bg-yellow-100 text-yellow-800 border-yellow-300",
        text: "text-yellow-600",
        icon: <Clock className="w-5 h-5 text-yellow-500" />
      }
    }
    if (/approved|completed|success/i.test(status)) {
      return {
        badge: "bg-green-100 text-green-800 border-green-300",
        text: "text-green-700",
        icon: <CheckCircle className="w-5 h-5 text-green-600" />
      }
    }
    if (/declined|failed|rejected/i.test(status)) {
      return {
        badge: "bg-red-100 text-red-800 border-red-300",
        text: "text-red-700",
        icon: <XCircle className="w-5 h-5 text-red-600" />
      }
    }
    // Default
    return {
      badge: "bg-gray-100 text-gray-700 border-gray-200",
      text: "text-gray-700",
      icon: <CreditCard className="w-5 h-5 text-gray-400" />
    }
  }

  return (
    <div className="space-y-6 py-8 px-4 md:px-8 bg-gray-50 min-h-screen">
      {/* Welcome + Wallet */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white"
      >
        <div className="grid md:grid-cols-2 gap-6 items-center">
          {/* left column */}
          <div>
            <motion.h1
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl font-bold mb-2"
            >
              Welcome back, {user.name || user.email}!
            </motion.h1>
            <motion.p
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-blue-100 mb-4"
            >
              Ready to use your PAY ID tokens today?
            </motion.p>
            {/* token balance card */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white/20 backdrop-blur-sm rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-blue-100">PAY ID Wallet</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-white hover:bg-white/20"
                >
                  {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">
                  {showBalance
                    ? `${user.balance?.toLocaleString?.() ?? user.balance} PAY ID`
                    : "••••••"}
                </p>
                <p className="text-sm text-blue-100">
                  ≈ ₦
                  {showBalance
                    ? `${user.balance?.toLocaleString?.() ?? user.balance}`
                    : "••••••"}
                </p>
              </div>
            </motion.div>
          </div>
          {/* right column: simple decorative card */}
          <div className="flex items-center justify-center h-48">
            <Card className="bg-white/10 backdrop-blur-sm p-6">
              <CardContent className="text-center">
                <p className="text-lg font-semibold">PAY&nbsp;ID</p>
                <p className="text-sm text-blue-100">Wallet</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>

      {/* Upgrade Prompt if not upgraded */}
      {(!user.plan || user.plan.name === "Basic") && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          className="mt-2"
        >
          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-yellow-800">Upgrade Your Plan</h3>
                  <p className="text-yellow-700">Upgrade to unlock your wallet and access all features.</p>
                </div>
                <a href="/packages">
                  <Button className="bg-yellow-600 hover:bg-yellow-700">
                    Upgrade Now
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {quickActions.map((action, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href={action.href}>
              <Card className="hover:shadow-lg transition-all cursor-pointer group h-full">
                <CardContent className="p-4 text-center">
                  <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                    <action.icon className={`w-8 h-8 text-${action.color}-600 mx-auto mb-2`} />
                  </motion.div>
                  <h3 className="font-semibold">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.desc}</p>
                </CardContent>
              </Card>
            </a>
          </motion.div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ scale: 1.05 }}>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{s.label}</p>
                    <p className="text-2xl font-bold">
                      {s.label === "Current Plan" && s.value !== "—"
                        ? <Badge className="bg-yellow-100 text-yellow-800">{s.value}</Badge>
                        : s.value}
                    </p>
                  </div>
                  <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                    <s.icon className={`w-8 h-8 text-${s.color}-600`} />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Transactions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}>
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest PAY ID token activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.length === 0 ? (
                <p className="text-center text-gray-500">No transactions yet.</p>
              ) : (
                transactions.map((tx) => {
                  const status = getStatusStyle(tx.status)
                  return (
                    <motion.div key={tx.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      whileHover={{ scale: 1.02 }}
                      className={`flex items-center justify-between p-3 rounded-lg border ${status.badge} bg-white`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${status.badge}`}>
                          {/* Transaction type icon */}
                          {tx.status.toLowerCase() === "pending" ? (
                            status.icon
                          ) : tx.type === "Airtime" ? (
                            <Phone className="w-5 h-5 text-blue-600" />
                          ) : tx.type === "Data" ? (
                            <Wifi className="w-5 h-5 text-blue-600" />
                          ) : (tx.type === "ReferralBonus" || tx.type === "Referral Bonus") ? (
                            <DollarSign className="w-5 h-5 text-blue-600" />
                          ) : tx.type === "TokenPurchase" ? (
                            <CreditCard className="w-5 h-5 text-blue-600" />
                          ) : tx.type === "Fund Wallet" ? (
                            <Wallet className="w-5 h-5 text-green-600" />
                          ) : tx.type === "Transfer In" ? (
                            <TrendingUp className="w-5 h-5 text-green-600" />
                          ) : tx.type === "Transfer Out" ? (
                            <TrendingUp className="w-5 h-5 text-red-600" />
                          ) : (
                            status.icon
                          )}
                        </div>
                        <div>
                          <p className={`font-medium ${status.text}`}>{tx.type} – {tx.network ?? "—"}</p>
                          <p className="text-sm text-gray-600">{new Date(tx.timestamp).toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${tx.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                          {tx.amount > 0 ? "+" : ""}{tx.amount} PAY ID
                        </p>
                        <Badge className={`text-xs border ${status.badge}`}>{tx.status}</Badge>
                      </div>
                    </motion.div>
                  )
                })
              )}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline">View All Transactions</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
