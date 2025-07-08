"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, XCircle, Eye, Search, Filter, CreditCard, TrendingUp, Clock } from "lucide-react"
import { motion } from "framer-motion"

export default function ApprovalsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const [pendingPayments] = useState([
    {
      id: 1,
      user: "John Doe",
      email: "john@example.com",
      type: "Premium Package",
      amount: "₦15,000",
      date: "2024-01-15",
      time: "10:30 AM",
      proof: "payment_proof_1.jpg",
      reference: "TXN123456789",
      status: "pending",
    },
    {
      id: 2,
      user: "Jane Smith",
      email: "jane@example.com",
      type: "VIP Package",
      amount: "₦30,000",
      date: "2024-01-14",
      time: "2:15 PM",
      proof: "payment_proof_2.jpg",
      reference: "TXN987654321",
      status: "pending",
    },
    {
      id: 3,
      user: "Mike Johnson",
      email: "mike@example.com",
      type: "Diamond Package",
      amount: "₦50,000",
      date: "2024-01-13",
      time: "9:45 AM",
      proof: "payment_proof_3.jpg",
      reference: "TXN456789123",
      status: "pending",
    },
  ])

  const [upgradeRequests] = useState([
    {
      id: 1,
      user: "Sarah Wilson",
      email: "sarah@example.com",
      currentPlan: "Basic",
      requestedPlan: "Premium",
      amount: "₦10,000",
      date: "2024-01-15",
      proof: "upgrade_proof_1.jpg",
      status: "pending",
    },
    {
      id: 2,
      user: "David Brown",
      email: "david@example.com",
      currentPlan: "Premium",
      requestedPlan: "VIP",
      amount: "₦15,000",
      date: "2024-01-14",
      proof: "upgrade_proof_2.jpg",
      status: "pending",
    },
  ])

  const handleApproval = (id: number, action: "approve" | "reject", type: "payment" | "upgrade") => {
    console.log(`${action} ${type} for ID: ${id}`)
    alert(`${action.charAt(0).toUpperCase() + action.slice(1)} action completed!`)
  }

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Payment Approvals</h1>
            <p className="text-gray-600">Review and approve user payments and upgrades</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-orange-100 text-orange-800">
              <Clock className="w-3 h-3 mr-1" />
              {pendingPayments.length + upgradeRequests.length} Pending
            </Badge>
          </div>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by user name, email, or reference..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="payments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="payments">Package Payments</TabsTrigger>
            <TabsTrigger value="upgrades">Upgrade Requests</TabsTrigger>
          </TabsList>

          {/* Package Payments */}
          <TabsContent value="payments">
            <div className="space-y-4">
              {pendingPayments.map((payment, index) => (
                <motion.div
                  key={payment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <CreditCard className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{payment.user}</h3>
                            <p className="text-sm text-gray-600">{payment.email}</p>
                            <p className="text-sm text-gray-500">
                              {payment.date} at {payment.time}
                            </p>
                          </div>
                        </div>

                        <div className="text-center">
                          <p className="font-semibold text-gray-700">{payment.type}</p>
                          <p className="text-2xl font-bold text-green-600">{payment.amount}</p>
                          <p className="text-xs text-gray-500">Ref: {payment.reference}</p>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View Proof
                          </Button>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleApproval(payment.id, "approve", "payment")}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleApproval(payment.id, "reject", "payment")}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Upgrade Requests */}
          <TabsContent value="upgrades">
            <div className="space-y-4">
              {upgradeRequests.map((upgrade, index) => (
                <motion.div
                  key={upgrade.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{upgrade.user}</h3>
                            <p className="text-sm text-gray-600">{upgrade.email}</p>
                            <p className="text-sm text-gray-500">{upgrade.date}</p>
                          </div>
                        </div>

                        <div className="text-center">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="secondary">{upgrade.currentPlan}</Badge>
                            <span>→</span>
                            <Badge className="bg-purple-100 text-purple-800">{upgrade.requestedPlan}</Badge>
                          </div>
                          <p className="text-xl font-bold text-green-600">{upgrade.amount}</p>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View Proof
                          </Button>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleApproval(upgrade.id, "approve", "upgrade")}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleApproval(upgrade.id, "reject", "upgrade")}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
