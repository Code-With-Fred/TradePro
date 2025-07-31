"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CreditCard, Smartphone, Building, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const paymentMethods = [
  {
    id: "card",
    name: "Credit/Debit Card",
    icon: CreditCard,
    description: "Instant deposit via Stripe",
    fees: "2.9% + $0.30",
    processingTime: "Instant",
  },
  {
    id: "bank",
    name: "Bank Transfer",
    icon: Building,
    description: "Direct bank transfer",
    fees: "Free",
    processingTime: "1-3 business days",
  },
  {
    id: "mobile",
    name: "Mobile Money",
    icon: Smartphone,
    description: "Pay with mobile money",
    fees: "1.5%",
    processingTime: "Instant",
  },
]

export default function DepositPage() {
  const [selectedMethod, setSelectedMethod] = useState("card")
  const [amount, setAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()

  const handleDeposit = async () => {
    if (!amount || Number.parseFloat(amount) <= 0) {
      alert("Please enter a valid amount")
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      // Update user balance in localStorage
      const userData = localStorage.getItem("demo_user")
      if (userData) {
        const user = JSON.parse(userData)
        user.balance += Number.parseFloat(amount)
        localStorage.setItem("demo_user", JSON.stringify(user))
      }

      alert(`Demo deposit of $${amount} successful! This is a simulation - no real money was processed.`)
      setIsProcessing(false)
      router.push("/dashboard")
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-white mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Deposit Funds</h1>
            <p className="text-slate-400">Add demo funds to your account</p>
          </div>
        </div>

        {/* Warning Banner */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <Card className="bg-yellow-500/10 border-yellow-500/30">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="text-yellow-200 font-medium">Demo Mode Active</p>
                  <p className="text-yellow-200/80 text-sm">
                    This is a simulation. No real money will be processed. All transactions are for demonstration
                    purposes only.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Amount Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Deposit Amount</CardTitle>
              <CardDescription className="text-slate-400">Enter the amount you want to deposit</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="amount" className="text-white">
                    Amount (USD)
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-2xl font-bold bg-slate-700 border-slate-600 text-white mt-2"
                    min="1"
                    step="0.01"
                  />
                </div>
                <div className="flex space-x-2">
                  {[100, 500, 1000, 5000].map((preset) => (
                    <Button
                      key={preset}
                      variant="outline"
                      size="sm"
                      onClick={() => setAmount(preset.toString())}
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      ${preset}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Payment Method</CardTitle>
              <CardDescription className="text-slate-400">Choose how you want to deposit funds</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedMethod === method.id
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-slate-600 hover:border-slate-500"
                  }`}
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <method.icon className="h-6 w-6 text-blue-400" />
                      <div>
                        <div className="font-medium text-white">{method.name}</div>
                        <div className="text-sm text-slate-400">{method.description}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-300">Fees: {method.fees}</div>
                      <div className="text-xs text-slate-400">{method.processingTime}</div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Summary and Submit */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Deposit Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Deposit Amount:</span>
                <span className="text-white font-medium">${amount || "0.00"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Processing Fee:</span>
                <span className="text-white font-medium">
                  {selectedMethod === "card"
                    ? `$${((Number.parseFloat(amount) || 0) * 0.029 + 0.3).toFixed(2)}`
                    : selectedMethod === "mobile"
                      ? `$${((Number.parseFloat(amount) || 0) * 0.015).toFixed(2)}`
                      : "$0.00"}
                </span>
              </div>
              <div className="border-t border-slate-600 pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-white">Total:</span>
                  <span className="text-white">
                    $
                    {selectedMethod === "card"
                      ? ((Number.parseFloat(amount) || 0) + (Number.parseFloat(amount) || 0) * 0.029 + 0.3).toFixed(2)
                      : selectedMethod === "mobile"
                        ? ((Number.parseFloat(amount) || 0) + (Number.parseFloat(amount) || 0) * 0.015).toFixed(2)
                        : (Number.parseFloat(amount) || 0).toFixed(2)}
                  </span>
                </div>
              </div>

              <Button
                onClick={handleDeposit}
                disabled={!amount || Number.parseFloat(amount) <= 0 || isProcessing}
                className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
              >
                {isProcessing ? "Processing Demo Deposit..." : "Confirm Demo Deposit"}
              </Button>

              <div className="text-center text-xs text-slate-500">
                By proceeding, you acknowledge this is a demo transaction for educational purposes only.
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
