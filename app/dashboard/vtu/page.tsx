"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Smartphone } from "lucide-react"
import { toast } from "sonner"

interface Transaction {
  id: number
  type: "Airtime" | "Data"
  network: string
  amount: number
  status: string
  createdAt: string
}

export default function VTUPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ id: string; payIdBalance: number } | null>(null)
  const [loading, setLoading] = useState(true)
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const quickActions = [
    { type: "Airtime", network: "MTN", amount: 100 },
    { type: "Data",    network: "Airtel", amount: 280 },
    { type: "Airtime", network: "Glo", amount: 200 },
    { type: "Data",    network: "9Mobile", amount: 520 },
  ]

  useEffect(() => {
    const stored = localStorage.getItem("user_data")
    if (!stored) {
      router.replace("/login")
      return
    }
    setUser(JSON.parse(stored))
    fetchTransactions()
  }, [router])

  async function fetchTransactions() {
    try {
      const res = await fetch("/api/vtu/transactions")
      if (!res.ok) throw new Error("Failed to load history")
      setTransactions(await res.json())
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleQuickPurchase(item: typeof quickActions[0]) {
    if (!user) return
    setLoading(true)
    try {
      const res = await fetch("/api/vtu/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, ...item }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.message || "Purchase failed")
      toast.success("Purchase recorded!")
      // update balance locally
      setUser({ ...user, payIdBalance: user.payIdBalance - item.amount })
      await fetchTransactions()
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading || !user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">VTU Services</h1>
        <div className="text-right">
          <p className="text-sm text-gray-600">Balance</p>
          <p className="text-2xl font-bold text-blue-600">{user.payIdBalance} PAY ID</p>
        </div>
      </header>

      <Tabs defaultValue="quick" className="space-y-6">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="quick">Quick Actions</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="quick">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {quickActions.map((action, i) => (
              <Card key={i} className="p-4">
                <CardHeader className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{action.network} {action.type}</h3>
                    <p className="text-sm text-gray-600">₦{action.amount}</p>
                  </div>
                  <Button size="sm" onClick={() => handleQuickPurchase(action)}>
                    <Smartphone className="w-4 h-4 mr-1" />
                    Buy
                  </Button>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history">
          <div className="space-y-4">
            {transactions.map((tx) => (
              <Card key={tx.id}>
                <CardContent className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{tx.network} {tx.type}</p>
                    <p className="text-sm text-gray-600">{new Date(tx.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₦{tx.amount}</p>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {tx.status}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
