"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Currency = {
  code: string
  symbol: string
  name: string
  flag: string
}

const currencies: Currency[] = [
  { code: "NGN", symbol: "₦", name: "Nigerian Naira", flag: "🇳🇬" },
  { code: "GHS", symbol: "₵", name: "Ghanaian Cedi", flag: "🇬🇭" },
  { code: "KES", symbol: "KSh", name: "Kenyan Shilling", flag: "🇰🇪" },
  { code: "XAF", symbol: "FCFA", name: "Central African CFA Franc", flag: "🇨🇲" },
  { code: "ZAR", symbol: "R", name: "South African Rand", flag: "🇿🇦" },
]

type CurrencyContextType = {
  currency: Currency
  setCurrency: (currency: Currency) => void
  currencies: Currency[]
  formatAmount: (amount: number) => string
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(currencies[0])

  useEffect(() => {
    const saved = localStorage.getItem("paygo-currency")
    if (saved) {
      const savedCurrency = currencies.find((c) => c.code === saved)
      if (savedCurrency) {
        setCurrencyState(savedCurrency)
      }
    }
  }, [])

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency)
    localStorage.setItem("paygo-currency", newCurrency.code)
  }

  const formatAmount = (amount: number) => {
    return `${currency.symbol}${amount.toLocaleString()}`
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, currencies, formatAmount }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider")
  }
  return context
}
