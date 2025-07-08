"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Bell, Shield, CreditCard, Globe, Smartphone, Mail, Eye, EyeOff, Camera, Save, AlertCircle } from "lucide-react"
import { useCurrency } from "@/contexts/currency-context"
import { motion } from "framer-motion"

export default function UserSettings() {
  const router = useRouter()
  const { currency, setCurrency, currencies, formatAmount } = useCurrency()

  // 1) new state
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const [profileData, setProfileData] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    country: "", language: "", avatarUrl: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [twoFactor, setTwoFactor] = useState(false)
  const [notifications, setNotifications] = useState({
    email: false, sms: false, push: false, marketing: false
  })
  const [currencyCode, setCurrencyCode] = useState("")

  // 2) fetch existing settings on mount
  useEffect(() => {
    const stored = localStorage.getItem("user_data")
    if (!stored) {
      router.replace("/login")
      return
    }
    const user = JSON.parse(stored)
    setUserId(user.id)

    fetch(`/api/user/settings?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setProfileData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phone: data.phone || "",
          country: data.country || "",
          language: data.language || "",
          avatarUrl: data.avatarUrl || "",
        })
        setTwoFactor(data.twoFactor)
        setNotifications({
          email: data.notifyEmail,
          sms: data.notifySms,
          push: data.notifyPush,
          marketing: data.notifyMarketing,
        })
        setCurrencyCode(data.currencyCode || "")
      })
      .catch(() => toast.error("Failed to load settings"))
      .finally(() => setLoading(false))
  }, [router])

  // 3) override handleSave to PATCH your API
  async function handleSave() {
    if (!userId) return
    setLoading(true)
    try {
      const res = await fetch("/api/user/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          ...profileData,
          twoFactor,
          notifyEmail: notifications.email,
          notifySms: notifications.sms,
          notifyPush: notifications.push,
          notifyMarketing: notifications.marketing,
          currencyCode,
        }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Save failed")
      toast.success("Settings saved")
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  // 4) loading fallback
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading…</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Account Settings</h1>
            <p className="text-gray-600 mt-1">Manage your account preferences and security</p>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800">Verified Account</Badge>
        </motion.div>

        {/* Profile Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><User className="w-5 h-5" />Profile Information</CardTitle>
              <CardDescription>Update your personal information and profile picture</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={profileData.avatarUrl || "/placeholder.svg?height=80&width=80"} />
                  <AvatarFallback className="text-lg font-semibold bg-purple-100 text-purple-600">
                    {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm" className="mb-2 bg-transparent">
                    <Camera className="w-4 h-4 mr-2" />Change Photo
                  </Button>
                  <p className="text-sm text-gray-500">JPG, PNG or GIF. Max size 2MB.</p>
                </div>
              </div>

              <Separator />

              {/* Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/** First Name **/}
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" value={profileData.firstName}
                    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                  />
                </div>

                {/** Last Name **/}
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" value={profileData.lastName}
                    onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                  />
                </div>

                {/** Email **/}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  />
                </div>

                {/** Phone **/}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  />
                </div>

                {/** Country **/}
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select value={profileData.country}
                    onValueChange={(val) => setProfileData({ ...profileData, country: val })}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Nigeria">🇳🇬 Nigeria</SelectItem>
                      <SelectItem value="Ghana">🇬🇭 Ghana</SelectItem>
                      <SelectItem value="Kenya">🇰🇪 Kenya</SelectItem>
                      <SelectItem value="Cameroon">🇨🇲 Cameroon</SelectItem>
                      <SelectItem value="South Africa">🇿🇦 South Africa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/** Language **/}
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={profileData.language}
                    onValueChange={(val) => setProfileData({ ...profileData, language: val })}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="French">Français</SelectItem>
                      <SelectItem value="Swahili">Kiswahili</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Currency & Security & Notifications */}
        {/** (rest of your JSX remains exactly the same, since notifications, twoFactor, and currency are already wired up) **/}

        {/* Save Button */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex justify-end">
          <Button onClick={handleSave} size="lg" className="bg-purple-600 hover:bg-purple-700">
            <Save className="w-4 h-4 mr-2" /> Save Changes
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
