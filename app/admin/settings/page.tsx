"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Settings,
  Globe,
  DollarSign,
  Bell,
  Shield,
  Database,
  Mail,
  Smartphone,
  Users,
  CreditCard,
  AlertTriangle,
  Save,
  RefreshCw,
} from "lucide-react"
import { useCurrency } from "@/contexts/currency-context"
import { motion } from "framer-motion"

export default function AdminSettings() {
  const { currency, setCurrency, currencies, formatAmount } = useCurrency()
  const [settings, setSettings] = useState({
    siteName: "PayGo Finance",
    siteDescription: "Your gateway to digital finance across Africa",
    maintenanceMode: false,
    registrationEnabled: true,
    emailVerificationRequired: true,
    smsVerificationRequired: false,
    twoFactorRequired: false,
    minTokenPurchase: 1000,
    maxTokenPurchase: 1000000,
    referralBonus: 10,
    weeklyRewardEnabled: true,
    autoApprovalLimit: 50000,
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    adminAlerts: true,
    transactionAlerts: true,
    systemAlerts: true,
  })

  const handleSave = () => {
    // Save settings logic here
    console.log("Admin settings saved", { settings, currency, notifications })
  }

  const handleReset = () => {
    // Reset to defaults
    setSettings({
      siteName: "PayGo Finance",
      siteDescription: "Your gateway to digital finance across Africa",
      maintenanceMode: false,
      registrationEnabled: true,
      emailVerificationRequired: true,
      smsVerificationRequired: false,
      twoFactorRequired: false,
      minTokenPurchase: 1000,
      maxTokenPurchase: 1000000,
      referralBonus: 10,
      weeklyRewardEnabled: true,
      autoApprovalLimit: 50000,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Platform Settings</h1>
            <p className="text-gray-600 mt-1">Configure global platform settings and preferences</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleReset}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* General Settings */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  General Settings
                </CardTitle>
                <CardDescription>Basic platform configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    value={settings.siteDescription}
                    onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                    rows={3}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-gray-500">Temporarily disable the platform</p>
                  </div>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
                  />
                </div>
                {settings.maintenanceMode && (
                  <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-600" />
                      <p className="text-sm text-orange-800">
                        Platform is in maintenance mode. Users cannot access services.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Currency Settings */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Currency & Regional Settings
                </CardTitle>
                <CardDescription>Configure default currency and regional preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Default Platform Currency</Label>
                  <Select
                    value={currency.code}
                    onValueChange={(value) => {
                      const selectedCurrency = currencies.find((c) => c.code === value)
                      if (selectedCurrency) setCurrency(selectedCurrency)
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((curr) => (
                        <SelectItem key={curr.code} value={curr.code}>
                          {curr.flag} {curr.name} ({curr.symbol})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800">
                    All amounts will be displayed in:{" "}
                    <strong>
                      {currency.name} ({currency.symbol})
                    </strong>
                  </p>
                  <p className="text-xs text-blue-600 mt-1">Example: {formatAmount(180000)}</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                    <p className="text-sm text-yellow-800">
                      Changing currency will affect all users and transactions platform-wide.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* User Management Settings */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  User Management
                </CardTitle>
                <CardDescription>Configure user registration and verification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>User Registration</Label>
                    <p className="text-sm text-gray-500">Allow new user registrations</p>
                  </div>
                  <Switch
                    checked={settings.registrationEnabled}
                    onCheckedChange={(checked) => setSettings({ ...settings, registrationEnabled: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Email Verification Required</Label>
                    <p className="text-sm text-gray-500">Require email verification for new accounts</p>
                  </div>
                  <Switch
                    checked={settings.emailVerificationRequired}
                    onCheckedChange={(checked) => setSettings({ ...settings, emailVerificationRequired: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>SMS Verification Required</Label>
                    <p className="text-sm text-gray-500">Require SMS verification for new accounts</p>
                  </div>
                  <Switch
                    checked={settings.smsVerificationRequired}
                    onCheckedChange={(checked) => setSettings({ ...settings, smsVerificationRequired: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Two-Factor Authentication Required</Label>
                    <p className="text-sm text-gray-500">Require 2FA for all users</p>
                  </div>
                  <Switch
                    checked={settings.twoFactorRequired}
                    onCheckedChange={(checked) => setSettings({ ...settings, twoFactorRequired: checked })}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Transaction Settings */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Transaction Settings
                </CardTitle>
                <CardDescription>Configure transaction limits and policies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minTokenPurchase">Min Token Purchase</Label>
                    <Input
                      id="minTokenPurchase"
                      type="number"
                      value={settings.minTokenPurchase}
                      onChange={(e) => setSettings({ ...settings, minTokenPurchase: Number.parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxTokenPurchase">Max Token Purchase</Label>
                    <Input
                      id="maxTokenPurchase"
                      type="number"
                      value={settings.maxTokenPurchase}
                      onChange={(e) => setSettings({ ...settings, maxTokenPurchase: Number.parseInt(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="autoApprovalLimit">Auto-Approval Limit</Label>
                  <Input
                    id="autoApprovalLimit"
                    type="number"
                    value={settings.autoApprovalLimit}
                    onChange={(e) => setSettings({ ...settings, autoApprovalLimit: Number.parseInt(e.target.value) })}
                  />
                  <p className="text-sm text-gray-500">Transactions below this amount will be auto-approved</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="referralBonus">Referral Bonus (%)</Label>
                  <Input
                    id="referralBonus"
                    type="number"
                    value={settings.referralBonus}
                    onChange={(e) => setSettings({ ...settings, referralBonus: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Weekly Rewards</Label>
                    <p className="text-sm text-gray-500">Enable weekly reward system</p>
                  </div>
                  <Switch
                    checked={settings.weeklyRewardEnabled}
                    onCheckedChange={(checked) => setSettings({ ...settings, weeklyRewardEnabled: checked })}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notification Settings */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription>Configure system notifications and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <Label>Email Notifications</Label>
                    </div>
                    <p className="text-sm text-gray-500">Send system notifications via email</p>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4" />
                      <Label>SMS Notifications</Label>
                    </div>
                    <p className="text-sm text-gray-500">Send alerts via SMS</p>
                  </div>
                  <Switch
                    checked={notifications.smsNotifications}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, smsNotifications: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4" />
                      <Label>Push Notifications</Label>
                    </div>
                    <p className="text-sm text-gray-500">Send push notifications to users</p>
                  </div>
                  <Switch
                    checked={notifications.pushNotifications}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, pushNotifications: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      <Label>Admin Alerts</Label>
                    </div>
                    <p className="text-sm text-gray-500">Receive admin-specific alerts</p>
                  </div>
                  <Switch
                    checked={notifications.adminAlerts}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, adminAlerts: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      <Label>Transaction Alerts</Label>
                    </div>
                    <p className="text-sm text-gray-500">Get notified of large transactions</p>
                  </div>
                  <Switch
                    checked={notifications.transactionAlerts}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, transactionAlerts: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4" />
                      <Label>System Alerts</Label>
                    </div>
                    <p className="text-sm text-gray-500">Receive system health notifications</p>
                  </div>
                  <Switch
                    checked={notifications.systemAlerts}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, systemAlerts: checked })}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* System Status */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  System Status
                </CardTitle>
                <CardDescription>Current system health and statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">99.9%</div>
                    <div className="text-sm text-green-700">Uptime</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">1,234</div>
                    <div className="text-sm text-blue-700">Active Users</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{formatAmount(5678900)}</div>
                    <div className="text-sm text-purple-700">Total Volume</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">45</div>
                    <div className="text-sm text-orange-700">Pending Approvals</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Database</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Healthy
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Payment Gateway</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Online
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">SMS Service</span>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      Limited
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Email Service</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
