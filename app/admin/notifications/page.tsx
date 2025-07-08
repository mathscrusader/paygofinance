"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Send, Users, CreditCard, AlertCircle, CheckCircle, X } from "lucide-react"
import { motion } from "framer-motion"

export default function NotificationsPage() {
  const [notifications] = useState([
    {
      id: 1,
      type: "payment",
      title: "New PAY ID package purchase",
      message: "John Doe purchased Premium package for ₦15,000",
      time: "2 minutes ago",
      read: false,
      priority: "high",
    },
    {
      id: 2,
      type: "upgrade",
      title: "User upgrade request",
      message: "Jane Smith requested upgrade from Basic to VIP",
      time: "5 minutes ago",
      read: false,
      priority: "medium",
    },
    {
      id: 3,
      type: "user",
      title: "New user registration",
      message: "Mike Johnson created a new account",
      time: "10 minutes ago",
      read: true,
      priority: "low",
    },
    {
      id: 4,
      type: "system",
      title: "System maintenance completed",
      message: "Scheduled maintenance completed successfully",
      time: "1 hour ago",
      read: true,
      priority: "low",
    },
    {
      id: 5,
      type: "payment",
      title: "Large transaction alert",
      message: "Diamond package purchase for ₦50,000 by Sarah Wilson",
      time: "2 hours ago",
      read: false,
      priority: "high",
    },
  ])

  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    type: "general",
    target: "all",
  })

  const handleSendNotification = () => {
    console.log("Sending notification:", newNotification)
    alert("Notification sent successfully!")
    setNewNotification({ title: "", message: "", type: "general", target: "all" })
  }

  const markAsRead = (id: number) => {
    console.log(`Marking notification ${id} as read`)
  }

  const deleteNotification = (id: number) => {
    console.log(`Deleting notification ${id}`)
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "payment":
        return <CreditCard className="w-5 h-5 text-green-600" />
      case "upgrade":
        return <AlertCircle className="w-5 h-5 text-orange-600" />
      case "user":
        return <Users className="w-5 h-5 text-blue-600" />
      case "system":
        return <CheckCircle className="w-5 h-5 text-purple-600" />
      default:
        return <Bell className="w-5 h-5 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600">Manage system notifications and send announcements</p>
          </div>
          <Badge className="bg-red-100 text-red-800">
            <Bell className="w-3 h-3 mr-1" />
            {notifications.filter((n) => !n.read).length} Unread
          </Badge>
        </div>

        <Tabs defaultValue="inbox" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="inbox">Notification Inbox</TabsTrigger>
            <TabsTrigger value="send">Send Notification</TabsTrigger>
          </TabsList>

          {/* Notification Inbox */}
          <TabsContent value="inbox">
            <Card>
              <CardHeader>
                <CardTitle>Recent Notifications</CardTitle>
                <CardDescription>System alerts and user activity notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`p-4 border rounded-lg transition-all hover:shadow-md ${
                        notification.read ? "bg-gray-50" : "bg-blue-50 border-blue-200"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold">{notification.title}</h3>
                              <Badge className={`text-xs ${getPriorityColor(notification.priority)}`}>
                                {notification.priority}
                              </Badge>
                              {!notification.read && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                            </div>
                            <p className="text-gray-600 text-sm">{notification.message}</p>
                            <p className="text-gray-500 text-xs mt-1">{notification.time}</p>
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          {!notification.read && (
                            <Button variant="outline" size="sm" onClick={() => markAsRead(notification.id)}>
                              Mark Read
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteNotification(notification.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Send Notification */}
          <TabsContent value="send">
            <div className="grid lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Send New Notification</CardTitle>
                    <CardDescription>Create and send notifications to users</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Notification Title</Label>
                      <Input
                        id="title"
                        placeholder="Enter notification title"
                        value={newNotification.title}
                        onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Enter notification message"
                        value={newNotification.message}
                        onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
                        rows={4}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="type">Type</Label>
                        <select
                          id="type"
                          className="w-full p-2 border rounded-md"
                          value={newNotification.type}
                          onChange={(e) => setNewNotification({ ...newNotification, type: e.target.value })}
                        >
                          <option value="general">General</option>
                          <option value="announcement">Announcement</option>
                          <option value="maintenance">Maintenance</option>
                          <option value="promotion">Promotion</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="target">Target Audience</Label>
                        <select
                          id="target"
                          className="w-full p-2 border rounded-md"
                          value={newNotification.target}
                          onChange={(e) => setNewNotification({ ...newNotification, target: e.target.value })}
                        >
                          <option value="all">All Users</option>
                          <option value="basic">Basic Users</option>
                          <option value="premium">Premium Users</option>
                          <option value="vip">VIP Users</option>
                          <option value="diamond">Diamond Users</option>
                        </select>
                      </div>
                    </div>

                    <Button
                      onClick={handleSendNotification}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={!newNotification.title || !newNotification.message}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Notification
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">1,234</p>
                        <p className="text-sm text-blue-700">Total Sent</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">98.5%</p>
                        <p className="text-sm text-green-700">Delivery Rate</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold">Recent Activity</h4>
                      {[
                        { action: "Maintenance notification sent", time: "2 hours ago", users: "1,234" },
                        { action: "Promotion announcement", time: "1 day ago", users: "856" },
                        { action: "System update notice", time: "3 days ago", users: "1,156" },
                      ].map((activity, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <div>
                            <p className="font-medium">{activity.action}</p>
                            <p className="text-gray-600">{activity.time}</p>
                          </div>
                          <p className="text-gray-600">{activity.users} users</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Bell className="w-4 h-4 mr-2" />
                      Mark All as Read
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Users className="w-4 h-4 mr-2" />
                      Send to All Users
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Emergency Alert
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
