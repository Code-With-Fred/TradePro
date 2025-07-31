import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TradePro - Demo Trading Platform",
  description: "Professional trading simulation platform for educational and demonstration purposes",
  keywords: "trading, demo, simulation, educational, fintech, broker",
  robots: "noindex, nofollow", // Prevent search engine indexing for demo site
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-slate-900">{children}</div>

        {/* Demo Disclaimer */}
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3 max-w-xs">
            <p className="text-yellow-200 text-xs">⚠️ Demo Platform - Educational Use Only</p>
          </div>
        </div>
      </body>
    </html>
  )
}
