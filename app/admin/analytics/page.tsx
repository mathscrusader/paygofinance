"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Users, CreditCard, DollarSign, Smartphone } from "lucide-react"
import { motion } from "framer-motion"

export default function AnalyticsPage() {
  const stats = [
    {
      title: "Total Revenue",
      value: "₦2,450,000",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "green",
    },
    {
      title: "Active Users",
      value: "1,234",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      color: "blue",
    },
    {
      title: "PAY ID Sales",
      value: "₦1,850,000",
      change: "+15.3%",
      trend: "up",
      icon: CreditCard,
      color: "purple",
    },
    {
      title: "VTU Transactions",
      value: "15,678",
      change: "-2.1%",
      trend: "down",
      icon: Smartphone,
      color: "orange",
    },
  ]

  const packageSales = [
    { name: "Premium", sales: 450, revenue: "₦6,750,000", percentage: 45 },
    { name: "VIP", sales: 280, revenue: "₦8,400,000", percentage: 28 },
    { name: "Basic", sales: 320, revenue: "₦1,600,000", percentage: 32 },
    { name: "Diamond", sales: 150, revenue: "₦7,500,000", percentage: 15 },
  ]

  const monthlyData = [
    { month: "Jan", revenue: 180000, users: 95 },
    { month: "Feb", revenue: 220000, users: 120 },
    { month: "Mar", revenue: 280000, users: 145 },
    { month: "Apr", revenue: 320000, users: 180 },
    { month: "May", revenue: 380000, users: 210 },
    { month: "Jun", revenue: 450000, users: 250 },
  ]

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Platform performance and business insights</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <div className="flex items-center mt-1">
                        {stat.trend === "up" ? (
                          <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                        )}
                        <span className={`text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    <stat.icon className={`w-8 h-8 text-${stat.color}-600`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Package Sales Performance */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>PAY ID Package Performance</CardTitle>
                <CardDescription>Sales breakdown by package type</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {packageSales.map((pkg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{pkg.name}</Badge>
                        <span className="text-sm text-gray-600">{pkg.sales} sales</span>
                      </div>
                      <span className="font-semibold">{pkg.revenue}</span>
                    </div>
                    <Progress value={pkg.percentage} className="h-2" />
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Monthly Growth */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Monthly Growth</CardTitle>
                <CardDescription>Revenue and user acquisition trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((data, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-semibold">{data.month} 2024</p>
                        <p className="text-sm text-gray-600">{data.users} new users</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">₦{data.revenue.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Revenue</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Additional Analytics */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Transaction Success Rate */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Transaction Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">99.2%</div>
                  <p className="text-gray-600">15,678 successful transactions</p>
                  <p className="text-sm text-gray-500 mt-2">125 failed transactions</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Top Countries */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Top Countries</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { country: "Nigeria", users: 856, flag: "🇳🇬" },
                  { country: "Ghana", users: 234, flag: "🇬🇭" },
                  { country: "Kenya", users: 89, flag: "🇰🇪" },
                  { country: "South Africa", users: 55, flag: "🇿🇦" },
                ].map((country, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{country.flag}</span>
                      <span className="font-medium">{country.country}</span>
                    </div>
                    <span className="text-gray-600">{country.users} users</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Referral Performance */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Referral Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total Referrals</span>
                    <span className="font-bold">2,456</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Conversion Rate</span>
                    <span className="font-bold text-green-600">23%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg. per User</span>
                    <span className="font-bold">2.1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Commission Paid</span>
                    <span className="font-bold">₦245,600</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
