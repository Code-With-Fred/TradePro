"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Users,
  Bell,
  Settings,
  LogOut,
  Eye,
  EyeOff,
  Plus,
  Minus,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface User {
  email: string
  name: string
  balance: number
  loginTime?: string
  registrationTime?: string
}

interface Transaction {
  id: string
  type: "deposit" | "withdrawal" | "trade"
  amount: number
  asset?: string
  timestamp: string
  status: "completed" | "pending" | "failed"
}

interface Position {
  id: string
  asset: string
  type: "buy" | "sell"
  amount: number
  entryPrice: number
  currentPrice: number
  pnl: number
  timestamp: string
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [showBalance, setShowBalance] = useState(true)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [positions, setPositions] = useState<Position[]>([])
  const [marketData, setMarketData] = useState({
    btc: { price: 45234.56, change: 2.34 },
    eth: { price: 3456.78, change: -1.23 },
    aapl: { price: 178.45, change: 0.89 },
    tsla: { price: 234.67, change: -2.45 },
  })
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("demo_user")
    if (!userData) {
      router.push("/auth/login")
      return
    }

    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)

    // Generate mock transactions
    const mockTransactions: Transaction[] = [
      {
        id: "1",
        type: "deposit",
        amount: 10000,
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        status: "completed",
      },
      {
        id: "2",
        type: "trade",
        amount: -500,
        asset: "BTC/USD",
        timestamp: new Date(Date.now() - 43200000).toISOString(),
        status: "completed",
      },
      {
        id: "3",
        type: "trade",
        amount: 750,
        asset: "ETH/USD",
        timestamp: new Date(Date.now() - 21600000).toISOString(),
        status: "completed",
      },
    ]
    setTransactions(mockTransactions)

    // Generate mock positions
    const mockPositions: Position[] = [
      {
        id: "1",
        asset: "BTC/USD",
        type: "buy",
        amount: 0.1,
        entryPrice: 44500,
        currentPrice: 45234.56,
        pnl: 73.46,
        timestamp: new Date(Date.now() - 43200000).toISOString(),
      },
      {
        id: "2",
        asset: "ETH/USD",
        type: "sell",
        amount: 2,
        entryPrice: 3500,
        currentPrice: 3456.78,
        pnl: 86.44,
        timestamp: new Date(Date.now() - 21600000).toISOString(),
      },
    ]
    setPositions(mockPositions)

    // Simulate real-time price updates
    const interval = setInterval(() => {
      setMarketData((prev) => ({
        btc: {
          price: prev.btc.price + (Math.random() - 0.5) * 100,
          change: (Math.random() - 0.5) * 5,
        },
        eth: {
          price: prev.eth.price + (Math.random() - 0.5) * 50,
          change: (Math.random() - 0.5) * 3,
        },
        aapl: {
          price: prev.aapl.price + (Math.random() - 0.5) * 5,
          change: (Math.random() - 0.5) * 2,
        },
        tsla: {
          price: prev.tsla.price + (Math.random() - 0.5) * 10,
          change: (Math.random() - 0.5) * 4,
        },
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("demo_user")
    router.push("/")
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  const totalPnL = positions.reduce((sum, pos) => sum + pos.pnl, 0)

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-white">TradePro</h1>
            <Badge className="bg-blue-600/20 text-blue-300 border-blue-600/30">Demo Mode</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-white">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-white">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Welcome Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome back, {user.name}!</h2>
          <p className="text-slate-400">Here's your trading overview for today</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">Account Balance</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-slate-400 hover:text-white"
                >
                  {showBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {showBalance ? `$${user.balance.toLocaleString()}` : "••••••"}
                </div>
                <p className="text-xs text-slate-400">Demo funds for testing</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">Total P&L</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${totalPnL >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {totalPnL >= 0 ? "+" : ""}${totalPnL.toFixed(2)}
                </div>
                <p className="text-xs text-slate-400">From open positions</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">Open Positions</CardTitle>
                <Activity className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{positions.length}</div>
                <p className="text-xs text-slate-400">Active trades</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">Win Rate</CardTitle>
                <Users className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">78.5%</div>
                <Progress value={78.5} className="mt-2" />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Market Overview */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Market Overview</CardTitle>
                <CardDescription className="text-slate-400">Live market prices (simulated)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(marketData).map(([symbol, data]) => (
                  <div key={symbol} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white uppercase">{symbol}</span>
                      </div>
                      <div>
                        <div className="font-medium text-white">{symbol.toUpperCase()}</div>
                        <div className="text-sm text-slate-400">${data.price.toFixed(2)}</div>
                      </div>
                    </div>
                    <div
                      className={`flex items-center space-x-1 ${data.change >= 0 ? "text-green-500" : "text-red-500"}`}
                    >
                      {data.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      <span className="font-medium">
                        {data.change >= 0 ? "+" : ""}
                        {data.change.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
                <CardDescription className="text-slate-400">Your latest transactions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          transaction.type === "deposit"
                            ? "bg-green-500/20"
                            : transaction.type === "withdrawal"
                              ? "bg-red-500/20"
                              : "bg-blue-500/20"
                        }`}
                      >
                        {transaction.type === "deposit" ? (
                          <Plus className="h-4 w-4 text-green-500" />
                        ) : transaction.type === "withdrawal" ? (
                          <Minus className="h-4 w-4 text-red-500" />
                        ) : (
                          <Activity className="h-4 w-4 text-blue-500" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-white capitalize">
                          {transaction.type}
                          {transaction.asset && ` - ${transaction.asset}`}
                        </div>
                        <div className="text-sm text-slate-400">
                          {new Date(transaction.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className={`font-medium ${transaction.amount >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {transaction.amount >= 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <Link href="/dashboard/deposit">
            <Button className="w-full h-16 bg-green-600 hover:bg-green-700">
              <div className="text-center">
                <Plus className="h-6 w-6 mx-auto mb-1" />
                <div className="text-sm">Deposit</div>
              </div>
            </Button>
          </Link>
          <Link href="/dashboard/withdraw">
            <Button className="w-full h-16 bg-red-600 hover:bg-red-700">
              <div className="text-center">
                <Minus className="h-6 w-6 mx-auto mb-1" />
                <div className="text-sm">Withdraw</div>
              </div>
            </Button>
          </Link>
          <Link href="/dashboard/trade">
            <Button className="w-full h-16 bg-blue-600 hover:bg-blue-700">
              <div className="text-center">
                <Activity className="h-6 w-6 mx-auto mb-1" />
                <div className="text-sm">Trade</div>
              </div>
            </Button>
          </Link>
          <Link href="/dashboard/portfolio">
            <Button className="w-full h-16 bg-purple-600 hover:bg-purple-700">
              <div className="text-center">
                <TrendingUp className="h-6 w-6 mx-auto mb-1" />
                <div className="text-sm">Portfolio</div>
              </div>
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
