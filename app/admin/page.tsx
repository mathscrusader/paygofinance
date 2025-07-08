"use client"

import { Suspense, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { Float, Text3D, OrbitControls, Environment } from "@react-three/drei"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users, CreditCard, Bell, CheckCircle, XCircle, Eye, Mail, Search, User, Wallet, TrendingUp
} from "lucide-react"
import { motion } from "framer-motion"

function AdminScene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} />
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <Text3D font="/fonts/Geist_Bold.json" size={0.5} height={0.1} position={[-2, 0, 0]}>
          ADMIN
          <meshStandardMaterial color="#dc2626" />
        </Text3D>
      </Float>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
      <Environment preset="city" />
    </>
  )
}

export default function AdminDashboard() {
  // Placeholder state, replace with real data as needed
  const [totalUsers] = useState(1234)
  const [revenue] = useState(2500000) // ₦2.5M
  const [pending] = useState(45)
  const [loading] = useState(false)

  // New: for viewing payment proofs
  const [proofModal, setProofModal] = useState<{ open: boolean, img?: string }>(
    { open: false, img: "" }
  )

  // Wallet funding/transfer
  const [fundAmount, setFundAmount] = useState("")
  const [fundEmail, setFundEmail] = useState("")
  const [transferAmount, setTransferAmount] = useState("")
  const [transferFrom, setTransferFrom] = useState("")
  const [transferTo, setTransferTo] = useState("")
  const [message, setMessage] = useState("")

  // New: Admin messaging
  const [notifMessage, setNotifMessage] = useState("")
  const [notifTarget, setNotifTarget] = useState("all")
  const [notifResult, setNotifResult] = useState("")

  // Approvals
  const [pendingApprovals, setPendingApprovals] = useState([
    {
      id: 1,
      user: "John Doe",
      email: "john@example.com",
      type: "Premium Upgrade",
      amount: "₦15,000",
      date: "2024-01-15",
      proof: "/proofs/payment_proof_1.jpg", // image URL
      status: "Pending",
      note: "",
    },
    {
      id: 2,
      user: "Jane Smith",
      email: "jane@example.com",
      type: "VIP Upgrade",
      amount: "₦30,000",
      date: "2024-01-14",
      proof: "/proofs/payment_proof_2.jpg",
      status: "Pending",
      note: "",
    },
  ])

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, type: "payment", message: "New PAY ID package purchase by John Doe", time: "2 minutes ago", read: false },
    { id: 2, type: "upgrade", message: "User upgrade request pending approval", time: "5 minutes ago", read: false },
    { id: 3, type: "user", message: "New user registration", time: "10 minutes ago", read: true },
  ])

  // Package & VTU
  const [packagePrices, setPackagePrices] = useState({
    basic: 5000,
    premium: 15000,
    vip: 30000,
    diamond: 50000,
  })
  const [vtuPrices, setVtuPrices] = useState({
    mtnAirtime: 0.95,
    airtelAirtime: 0.95,
    gloAirtime: 0.95,
    nineMobileAirtime: 0.95,
    mtnData: 0.9,
    airtelData: 0.9,
    gloData: 0.9,
    nineMobileData: 0.9,
  })

  // Handle approval
  const handleApproval = (id: number, action: "approve" | "reject", note?: string) => {
    setPendingApprovals((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: action === "approve" ? "Approved" : "Declined", note: note || "" } : item
      )
    )
    setMessage(
      action === "approve" ? "Transaction approved!" : "Transaction declined."
    )
  }

  // Send notification (to all or to a user)
  const handleSendNotification = async () => {
    if (!notifMessage.trim()) {
      setNotifResult("Message cannot be empty.")
      return
    }
    setNotifResult("Sending...")
    // Simulate API send
    setTimeout(() => {
      setNotifResult("Notification sent successfully!")
      setNotifMessage("")
    }, 1000)
  }

  // Fund wallet handler
  const handleFundWallet = async () => {
    setMessage("")
    if (!fundEmail || !fundAmount) {
      setMessage("Please enter email and amount.")
      return
    }
    setMessage("Sending...")
    setTimeout(() => {
      setMessage("Wallet funded!")
      setFundAmount("")
      setFundEmail("")
    }, 1000)
  }

  // Transfer handler
  const handleTransfer = async () => {
    setMessage("")
    if (!transferFrom || !transferTo || !transferAmount) {
      setMessage("Fill all transfer fields.")
      return
    }
    setMessage("Transferring...")
    setTimeout(() => {
      setMessage("Transfer successful!")
      setTransferFrom("")
      setTransferTo("")
      setTransferAmount("")
    }, 1200)
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with 3D Scene */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-6"
        >
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage PayGo Finance platform</p>
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{totalUsers.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Total Users</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">₦{revenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Revenue</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">{pending}</p>
                  <p className="text-sm text-gray-600">Pending</p>
                </div>
              </div>
              {/* Wallet Funding and Transfer Section */}
              <div className="mt-6 space-y-3">
                <h3 className="font-semibold text-lg">Wallet Actions</h3>
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex items-center gap-2">
                    <Input
                      className="w-44"
                      type="email"
                      placeholder="User Email"
                      value={fundEmail}
                      onChange={e => setFundEmail(e.target.value)}
                    />
                    <Input
                      className="w-28"
                      type="number"
                      min={1}
                      placeholder="Amount"
                      value={fundAmount}
                      onChange={e => setFundAmount(e.target.value)}
                    />
                    <Button onClick={handleFundWallet}>Fund Wallet</Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      className="w-44"
                      type="email"
                      placeholder="From Email"
                      value={transferFrom}
                      onChange={e => setTransferFrom(e.target.value)}
                    />
                    <Input
                      className="w-44"
                      type="email"
                      placeholder="To Email"
                      value={transferTo}
                      onChange={e => setTransferTo(e.target.value)}
                    />
                    <Input
                      className="w-28"
                      type="number"
                      min={1}
                      placeholder="Amount"
                      value={transferAmount}
                      onChange={e => setTransferAmount(e.target.value)}
                    />
                    <Button onClick={handleTransfer}>Transfer</Button>
                  </div>
                </div>
                {message && <div className="text-center text-green-600">{message}</div>}
              </div>
              {/* Admin messaging */}
              <div className="mt-6">
                <h3 className="font-semibold text-lg mb-1">Send Notification</h3>
                <div className="flex items-center gap-2">
                  <Input
                    className="w-64"
                    placeholder="Type notification message..."
                    value={notifMessage}
                    onChange={e => setNotifMessage(e.target.value)}
                  />
                  <Input
                    className="w-48"
                    placeholder="Recipient Email or 'all'"
                    value={notifTarget}
                    onChange={e => setNotifTarget(e.target.value)}
                  />
                  <Button onClick={handleSendNotification}><Mail className="w-4 h-4 mr-1" />Send</Button>
                </div>
                {notifResult && <div className="text-green-600 text-sm mt-1">{notifResult}</div>}
              </div>
            </div>
            <div className="h-48">
              <Canvas camera={{ position: [0, 0, 4] }}>
                <Suspense fallback={null}>
                  <AdminScene />
                </Suspense>
              </Canvas>
            </div>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Recent Notifications
                <Badge className="ml-2 bg-red-100 text-red-800">
                  {notifications.filter((n) => !n.read).length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    className={`p-3 rounded-lg border ${notification.read ? "bg-gray-50" : "bg-blue-50 border-blue-200"}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${notification.read ? "bg-gray-400" : "bg-blue-600"}`} />
                        <div>
                          <p className="font-medium">{notification.message}</p>
                          <p className="text-sm text-gray-600">{notification.time}</p>
                        </div>
                      </div>
                      {notification.type === "payment" && (
                        <Badge className="bg-green-100 text-green-800">Payment</Badge>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Admin Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Tabs defaultValue="approvals" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="approvals">Approvals</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Payment Approvals */}
            <TabsContent value="approvals">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Payment Approvals</CardTitle>
                  <CardDescription>Review and approve user upgrade payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingApprovals.map((approval) => (
                      <motion.div
                        key={approval.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.01 }}
                        className={`border rounded-lg p-4 ${approval.status === "Pending"
                          ? "bg-yellow-50 border-yellow-200"
                          : approval.status === "Approved"
                            ? "bg-green-50 border-green-200"
                            : "bg-red-50 border-red-200"
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                              <CreditCard className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{approval.user}</h3>
                              <p className="text-sm text-gray-600">{approval.type}</p>
                              <p className="text-sm text-gray-500">{approval.date}</p>
                              <p className="text-sm text-gray-700">{approval.email}</p>
                              <p className="text-xs mt-1">
                                Status: <span className={`font-bold ${approval.status === "Pending" ? "text-yellow-700" : approval.status === "Approved" ? "text-green-700" : "text-red-700"}`}>{approval.status}</span>
                              </p>
                              {approval.note && (
                                <p className="text-xs text-gray-500">Note: {approval.note}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <p className="font-bold text-lg">{approval.amount}</p>
                              <Button variant="outline" size="sm" className="mt-1 bg-transparent"
                                onClick={() => setProofModal({ open: true, img: approval.proof })}
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                View Proof
                              </Button>
                            </div>
                            {approval.status === "Pending" && (
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={() => handleApproval(approval.id, "approve")}
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleApproval(approval.id, "reject")}
                                >
                                  <XCircle className="w-4 h-4 mr-1" />
                                  Reject
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  {/* Proof Modal */}
                  {proofModal.open && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                      <div className="bg-white rounded-lg p-6 relative w-full max-w-md">
                        <button
                          className="absolute top-2 right-2 text-gray-500 hover:text-gray-900"
                          onClick={() => setProofModal({ open: false })}
                        >✕</button>
                        <h3 className="font-bold text-lg mb-3">Payment Proof</h3>
                        {proofModal.img ? (
                          <img src={proofModal.img} alt="Payment proof" className="w-full rounded shadow" />
                        ) : (
                          <div className="text-gray-600">No proof available.</div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pricing Management */}
            <TabsContent value="pricing">
              <div className="grid md:grid-cols-2 gap-6">
                {/* PAY ID Package Pricing */}
                <Card>
                  <CardHeader>
                    <CardTitle>PAY ID Package Prices</CardTitle>
                    <CardDescription>Set prices for PAY ID token packages</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(packagePrices).map(([packageType, price]) => (
                      <motion.div
                        key={packageType}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <Label className="capitalize font-semibold">{packageType} Package</Label>
                          <p className="text-sm text-gray-600">Current: ₦{price.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="number"
                            defaultValue={price}
                            className="w-24"
                            onBlur={(e) =>
                              setPackagePrices((prev) => ({
                                ...prev,
                                [packageType]: Number(e.target.value),
                              }))
                            }
                          />
                          <Button size="sm">Update</Button>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
                {/* VTU Service Rates */}
                <Card>
                  <CardHeader>
                    <CardTitle>VTU Service Rates</CardTitle>
                    <CardDescription>Set discount rates for VTU services</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(vtuPrices).map(([service, rate]) => (
                      <motion.div
                        key={service}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <Label className="capitalize font-semibold">
                            {service.replace(/([A-Z])/g, " $1").trim()}
                          </Label>
                          <p className="text-sm text-gray-600">Rate: {(rate * 100).toFixed(0)}%</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            max="1"
                            defaultValue={rate}
                            className="w-20"
                            onBlur={(e) =>
                              setVtuPrices((prev) => ({
                                ...prev,
                                [service]: Number(e.target.value),
                              }))
                            }
                          />
                          <Button size="sm">Update</Button>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* User Management */}
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Search, manage users, see details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex items-center gap-2">
                    <Input placeholder="Search by email/name..." className="w-64" />
                    <Button variant="outline"><Search className="w-4 h-4" /> Search</Button>
                  </div>
                  <div className="space-y-4">
                    {[ // Replace with API data
                      {
                        name: "John Doe",
                        email: "john@example.com",
                        plan: "Premium",
                        tokens: "2,450",
                        status: "Active",
                      },
                      {
                        name: "Jane Smith",
                        email: "jane@example.com",
                        plan: "VIP",
                        tokens: "5,200",
                        status: "Active",
                      },
                      {
                        name: "Mike Johnson",
                        email: "mike@example.com",
                        plan: "Basic",
                        tokens: "850",
                        status: "Suspended",
                      },
                    ].map((user, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.01 }}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{user.name}</h3>
                            <p className="text-sm text-gray-600">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <p className="font-semibold">{user.tokens} PAY ID</p>
                            <Badge className="text-xs">{user.plan}</Badge>
                          </div>
                          <Badge variant={user.status === "Active" ? "default" : "destructive"}>{user.status}</Badge>
                          <Button variant="outline" size="sm">
                            Manage
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics */}
            <TabsContent value="analytics">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Total Revenue</span>
                        <span className="font-bold text-2xl text-green-600">₦2,450,000</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>This Month</span>
                        <span className="font-bold text-lg">₦450,000</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>PAY ID Sales</span>
                        <span className="font-bold text-lg">₦380,000</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>VTU Commission</span>
                        <span className="font-bold text-lg">₦70,000</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Active Users</span>
                        <span className="font-bold text-lg">1,234</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Total Transactions</span>
                        <span className="font-bold text-lg">15,678</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Success Rate</span>
                        <span className="font-bold text-lg text-green-600">99.2%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Referral Rate</span>
                        <span className="font-bold text-lg">23%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Settings */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                  <CardDescription>Configure platform-wide settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <Label>Platform Maintenance Mode</Label>
                      <div className="flex items-center space-x-2 mt-2">
                        <Button variant="outline">Enable</Button>
                        <Button variant="outline">Disable</Button>
                      </div>
                    </div>
                    <div>
                      <Label>Notification Settings</Label>
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked />
                          <span>Email notifications for new payments</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked />
                          <span>SMS alerts for high-value transactions</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label>System Backup</Label>
                      <div className="flex items-center space-x-2 mt-2">
                        <Button>Create Backup</Button>
                        <Button variant="outline">Schedule Backup</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
