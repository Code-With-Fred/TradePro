"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, TrendingUp, TrendingDown, Activity } from "lucide-react"
import Link from "next/link"

interface Asset {
  symbol: string
  name: string
  price: number
  change: number
  volume: string
  category: "crypto" | "forex" | "stocks"
}

const mockAssets: Asset[] = [
  { symbol: "BTC/USD", name: "Bitcoin", price: 45234.56, change: 2.34, volume: "2.4B", category: "crypto" },
  { symbol: "ETH/USD", name: "Ethereum", price: 3456.78, change: -1.23, volume: "1.8B", category: "crypto" },
  { symbol: "EUR/USD", name: "Euro Dollar", price: 1.0856, change: 0.12, volume: "5.2B", category: "forex" },
  { symbol: "GBP/USD", name: "Pound Dollar", price: 1.2734, change: -0.34, volume: "3.1B", category: "forex" },
  { symbol: "AAPL", name: "Apple Inc", price: 178.45, change: 0.89, volume: "45M", category: "stocks" },
  { symbol: "TSLA", name: "Tesla Inc", price: 234.67, change: -2.45, volume: "32M", category: "stocks" },
]

export default function TradePage() {
  const [selectedAsset, setSelectedAsset] = useState<Asset>(mockAssets[0])
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy")
  const [amount, setAmount] = useState("")
  const [leverage, setLeverage] = useState("1")
  const [isProcessing, setIsProcessing] = useState(false)
  const [activeCategory, setActiveCategory] = useState<"all" | "crypto" | "forex" | "stocks">("all")

  useEffect(() => {
    // Simulate real-time price updates
    const interval = setInterval(() => {
      setSelectedAsset((prev) => ({
        ...prev,
        price: prev.price + (Math.random() - 0.5) * (prev.price * 0.001),
        change: (Math.random() - 0.5) * 5,
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const filteredAssets =
    activeCategory === "all" ? mockAssets : mockAssets.filter((asset) => asset.category === activeCategory)

  const handleTrade = async () => {
    if (!amount || Number.parseFloat(amount) <= 0) {
      alert("Please enter a valid amount")
      return
    }

    setIsProcessing(true)

    // Simulate trade execution
    setTimeout(() => {
      const tradeValue = Number.parseFloat(amount) * selectedAsset.price
      alert(
        `Demo ${tradeType} order executed!\n${amount} ${selectedAsset.symbol} at $${selectedAsset.price.toFixed(2)}\nTotal value: $${tradeValue.toFixed(2)}\n\nThis is a simulation - no real trading occurred.`,
      )
      setIsProcessing(false)
      setAmount("")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-white mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Trade Simulator</h1>
            <p className="text-slate-400">Practice trading with live market simulation</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Asset List */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Markets</CardTitle>
                <CardDescription className="text-slate-400">Select an asset to trade</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeCategory} onValueChange={(value) => setActiveCategory(value as any)}>
                  <TabsList className="grid w-full grid-cols-4 bg-slate-700">
                    <TabsTrigger value="all" className="text-xs">
                      All
                    </TabsTrigger>
                    <TabsTrigger value="crypto" className="text-xs">
                      Crypto
                    </TabsTrigger>
                    <TabsTrigger value="forex" className="text-xs">
                      Forex
                    </TabsTrigger>
                    <TabsTrigger value="stocks" className="text-xs">
                      Stocks
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value={activeCategory} className="mt-4 space-y-2">
                    {filteredAssets.map((asset) => (
                      <div
                        key={asset.symbol}
                        className={`p-3 rounded-lg cursor-pointer transition-all ${
                          selectedAsset.symbol === asset.symbol
                            ? "bg-blue-500/20 border border-blue-500/50"
                            : "bg-slate-700 hover:bg-slate-600"
                        }`}
                        onClick={() => setSelectedAsset(asset)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-white text-sm">{asset.symbol}</div>
                            <div className="text-xs text-slate-400">{asset.name}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-white">
                              ${asset.price.toFixed(asset.category === "forex" ? 4 : 2)}
                            </div>
                            <div
                              className={`text-xs flex items-center ${
                                asset.change >= 0 ? "text-green-500" : "text-red-500"
                              }`}
                            >
                              {asset.change >= 0 ? (
                                <TrendingUp className="h-3 w-3 mr-1" />
                              ) : (
                                <TrendingDown className="h-3 w-3 mr-1" />
                              )}
                              {asset.change >= 0 ? "+" : ""}
                              {asset.change.toFixed(2)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          {/* Trading Interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="space-y-6">
              {/* Selected Asset Info */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white">{selectedAsset.symbol}</CardTitle>
                      <CardDescription className="text-slate-400">{selectedAsset.name}</CardDescription>
                    </div>
                    <Badge
                      className={`${
                        selectedAsset.category === "crypto"
                          ? "bg-orange-500/20 text-orange-300"
                          : selectedAsset.category === "forex"
                            ? "bg-green-500/20 text-green-300"
                            : "bg-blue-500/20 text-blue-300"
                      }`}
                    >
                      {selectedAsset.category.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-slate-400">Current Price</div>
                      <div className="text-2xl font-bold text-white">
                        ${selectedAsset.price.toFixed(selectedAsset.category === "forex" ? 4 : 2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-400">24h Change</div>
                      <div
                        className={`text-xl font-bold flex items-center ${
                          selectedAsset.change >= 0 ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {selectedAsset.change >= 0 ? (
                          <TrendingUp className="h-5 w-5 mr-1" />
                        ) : (
                          <TrendingDown className="h-5 w-5 mr-1" />
                        )}
                        {selectedAsset.change >= 0 ? "+" : ""}
                        {selectedAsset.change.toFixed(2)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-400">Volume</div>
                      <div className="text-xl font-bold text-white">{selectedAsset.volume}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trade Form */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Place Order</CardTitle>
                  <CardDescription className="text-slate-400">Execute a demo trade</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Buy/Sell Toggle */}
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => setTradeType("buy")}
                      className={`flex-1 ${
                        tradeType === "buy" ? "bg-green-600 hover:bg-green-700" : "bg-slate-700 hover:bg-slate-600"
                      }`}
                    >
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Buy
                    </Button>
                    <Button
                      onClick={() => setTradeType("sell")}
                      className={`flex-1 ${
                        tradeType === "sell" ? "bg-red-600 hover:bg-red-700" : "bg-slate-700 hover:bg-slate-600"
                      }`}
                    >
                      <TrendingDown className="h-4 w-4 mr-2" />
                      Sell
                    </Button>
                  </div>

                  {/* Amount Input */}
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-white">
                      Amount ({selectedAsset.symbol.split("/")[0]})
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                      step="0.01"
                      min="0"
                    />
                  </div>

                  {/* Leverage */}
                  <div className="space-y-2">
                    <Label htmlFor="leverage" className="text-white">
                      Leverage
                    </Label>
                    <select
                      id="leverage"
                      value={leverage}
                      onChange={(e) => setLeverage(e.target.value)}
                      className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                    >
                      <option value="1">1:1 (No Leverage)</option>
                      <option value="2">1:2</option>
                      <option value="5">1:5</option>
                      <option value="10">1:10</option>
                      <option value="20">1:20</option>
                    </select>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-slate-700 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Order Type:</span>
                      <span className="text-white capitalize">{tradeType} Market</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Amount:</span>
                      <span className="text-white">
                        {amount || "0"} {selectedAsset.symbol.split("/")[0]}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Price:</span>
                      <span className="text-white">
                        ${selectedAsset.price.toFixed(selectedAsset.category === "forex" ? 4 : 2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Leverage:</span>
                      <span className="text-white">1:{leverage}</span>
                    </div>
                    <div className="border-t border-slate-600 pt-2">
                      <div className="flex justify-between font-medium">
                        <span className="text-white">Total Value:</span>
                        <span className="text-white">
                          ${((Number.parseFloat(amount) || 0) * selectedAsset.price).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    onClick={handleTrade}
                    disabled={!amount || Number.parseFloat(amount) <= 0 || isProcessing}
                    className={`w-full text-lg py-6 ${
                      tradeType === "buy" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    {isProcessing ? (
                      "Processing Demo Trade..."
                    ) : (
                      <>
                        <Activity className="h-5 w-5 mr-2" />
                        {tradeType === "buy" ? "Buy" : "Sell"} {selectedAsset.symbol}
                      </>
                    )}
                  </Button>

                  <div className="text-center text-xs text-slate-500">
                    This is a demo trading environment. No real trades are executed.
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
