import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { CurrencyProvider } from "@/contexts/currency-context"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "PayGo Finance - Your Gateway to Digital Finance",
  description:
    "Experience seamless financial services across Africa. Buy airtime, data, and manage your digital wallet with ease.",
  keywords: "paygo, finance, airtime, data, digital wallet, africa, financial services",
  authors: [{ name: "PayGo Finance Team" }],
  creator: "PayGo Finance",
  publisher: "PayGo Finance",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://paygofinance.com",
    title: "PayGo Finance - Your Gateway to Digital Finance",
    description:
      "Experience seamless financial services across Africa. Buy airtime, data, and manage your digital wallet with ease.",
    siteName: "PayGo Finance",
  },
  twitter: {
    card: "summary_large_image",
    title: "PayGo Finance - Your Gateway to Digital Finance",
    description:
      "Experience seamless financial services across Africa. Buy airtime, data, and manage your digital wallet with ease.",
    creator: "@paygofinance",
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <CurrencyProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </CurrencyProvider>
      </body>
    </html>
  )
}
