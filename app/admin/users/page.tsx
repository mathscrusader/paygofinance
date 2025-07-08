"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Users, Search, Filter, Eye, Edit, Trash2, UserPlus } from "lucide-react"
import { motion } from "framer-motion"

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const [users] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "08012345678",
      country: "Nigeria",
      plan: "Premium",
      tokens: "2,450",
      status: "Active",
      joinDate: "2024-01-10",
      lastLogin: "2 hours ago",
      totalSpent: "₦45,000",
      referrals: 5,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "08087654321",
      country: "Ghana",
      plan: "VIP",
      tokens: "5,200",
      status: "Active",
      joinDate: "2024-01-08",
      lastLogin: "1 day ago",
      totalSpent: "₦78,000",
      referrals: 12,
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "08098765432",
      country: "Kenya",
      plan: "Basic",
      tokens: "850",
      status: "Suspended",
      joinDate: "2024-01-05",
      lastLogin: "1 week ago",
      totalSpent: "₦15,000",
      referrals: 2,
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      phone: "08076543210",
      country: "South Africa",
      plan: "Diamond",
      tokens: "8,750",
      status: "Active",
      joinDate: "2024-01-03",
      lastLogin: "30 minutes ago",
      totalSpent: "₦125,000",
      referrals: 25,
    },
  ])

  const handleUserAction = (userId: number, action: string) => {
    console.log(`${action} user with ID: ${userId}`)
    alert(`${action} action completed!`)
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600">Manage platform users and their accounts</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Users", value: "1,234", color: "blue", icon: Users },
            { label: "Active Users", value: "1,156", color: "green", icon: Users },
            { label: "Suspended", value: "78", color: "red", icon: Users },
            { label: "New This Month", value: "156", color: "purple", icon: Users },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <stat.icon className={`w-8 h-8 text-${stat.color}-600`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search users by name or email..."
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

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>Complete list of platform users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border rounded-lg p-4 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-sm text-gray-500">
                          {user.phone} • {user.country}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div>
                        <p className="text-sm text-gray-600">Plan</p>
                        <Badge className="text-xs">{user.plan}</Badge>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Tokens</p>
                        <p className="font-semibold">{user.tokens}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Spent</p>
                        <p className="font-semibold">{user.totalSpent}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Referrals</p>
                        <p className="font-semibold">{user.referrals}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Badge variant={user.status === "Active" ? "default" : "destructive"}>{user.status}</Badge>
                      <div className="flex space-x-1">
                        <Button variant="outline" size="sm" onClick={() => handleUserAction(user.id, "View")}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleUserAction(user.id, "Edit")}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUserAction(user.id, "Suspend")}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t grid grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>Joined: {user.joinDate}</div>
                    <div>Last Login: {user.lastLogin}</div>
                    <div>Total Spent: {user.totalSpent}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
