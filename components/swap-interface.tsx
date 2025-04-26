"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, RefreshCw, Settings, ArrowDownUp, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { COMMON_TOKENS } from "@/constants/tokens"

type Token = {
  symbol: string
  name: string
  logo: string
  balance: string
}

const tokens = COMMON_TOKENS.map((token) => ({
  ...token,
  logo: `/tokens/${token.symbol.toLowerCase()}.svg`,
}))

export function SwapInterface() {
  const [fromToken, setFromToken] = useState<Token>(tokens[0])
  const [toToken, setToToken] = useState<Token>(tokens[1])
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [showFromTokenList, setShowFromTokenList] = useState(false)
  const [showToTokenList, setShowToTokenList] = useState(false)
  const [slippage, setSlippage] = useState("0.5")
  const [showSettings, setShowSettings] = useState(false)

  const handleSwapTokens = () => {
    const temp = fromToken
    setFromToken(toToken)
    setToToken(temp)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFromAmount(value)
    // In a real app, this would calculate the expected output amount based on the exchange rate
    setToAmount(value ? (Number.parseFloat(value) * 1825.75).toString() : "")
  }

  const handleToAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setToAmount(value)
    // In a real app, this would calculate the expected input amount based on the exchange rate
    setFromAmount(value ? (Number.parseFloat(value) / 1825.75).toString() : "")
  }

  const selectFromToken = (token: Token) => {
    if (token.symbol === toToken.symbol) {
      setToToken(fromToken)
    }
    setFromToken(token)
    setShowFromTokenList(false)
  }

  const selectToToken = (token: Token) => {
    if (token.symbol === fromToken.symbol) {
      setFromToken(toToken)
    }
    setToToken(token)
    setShowToTokenList(false)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl"
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-lg" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />

        <div className="relative p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Swap</h2>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors" onClick={() => {}}>
                <RefreshCw size={16} className="text-zinc-400" />
              </button>
              <button
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings size={16} className="text-zinc-400" />
              </button>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="mb-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-sm font-medium text-white mb-3">Transaction Settings</h3>
              <div className="space-y-2">
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-zinc-400">Slippage Tolerance</label>
                    <div className="flex items-center">
                      <Info size={12} className="text-zinc-500 mr-1" />
                      <span className="text-xs text-zinc-500">0.5% recommended</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      className={`px-2 py-1 rounded-md text-xs ${slippage === "0.1" ? "bg-purple-600/30 text-purple-300" : "bg-white/5 text-zinc-400"}`}
                      onClick={() => setSlippage("0.1")}
                    >
                      0.1%
                    </button>
                    <button
                      className={`px-2 py-1 rounded-md text-xs ${slippage === "0.5" ? "bg-purple-600/30 text-purple-300" : "bg-white/5 text-zinc-400"}`}
                      onClick={() => setSlippage("0.5")}
                    >
                      0.5%
                    </button>
                    <button
                      className={`px-2 py-1 rounded-md text-xs ${slippage === "1.0" ? "bg-purple-600/30 text-purple-300" : "bg-white/5 text-zinc-400"}`}
                      onClick={() => setSlippage("1.0")}
                    >
                      1.0%
                    </button>
                    <div className="relative flex-1">
                      <input
                        type="text"
                        id="slippage-input"
                        name="slippage"
                        value={slippage}
                        onChange={(e) => setSlippage(e.target.value)}
                        className="w-full px-2 py-1 rounded-md text-xs bg-white/5 text-white border border-white/10 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-zinc-400">%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* From Token */}
          <div className="mb-2 p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex justify-between mb-2">
              <span className="text-xs text-zinc-400">From</span>
              <span className="text-xs text-zinc-400">Balance: {fromToken.balance}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  id="from-amount"
                  name="fromAmount"
                  value={fromAmount}
                  onChange={handleFromAmountChange}
                  placeholder="0.0"
                  className="w-full bg-transparent text-xl font-medium text-white focus:outline-none"
                />
                <div className="absolute right-0 top-0 flex items-center gap-1">
                  <button className="text-xs text-purple-400 hover:text-purple-300">MAX</button>
                </div>
              </div>
              <button
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                onClick={() => setShowFromTokenList(!showFromTokenList)}
              >
                <img
                  src={fromToken.logo || "/placeholder.svg"}
                  alt={fromToken.symbol}
                  className="w-5 h-5 rounded-full"
                />
                <span className="font-medium text-white">{fromToken.symbol}</span>
                <ChevronDown size={16} className="text-zinc-400" />
              </button>
            </div>

            {/* From Token List */}
            {showFromTokenList && (
              <div className="absolute left-0 right-0 mt-2 p-2 rounded-xl bg-black/80 backdrop-blur-lg border border-white/10 z-10 max-h-60 overflow-y-auto">
                <div className="mb-2 px-2">
                  <h3 className="text-sm font-medium text-white">Select Token</h3>
                </div>
                <div className="space-y-1">
                  {tokens.map((token) => (
                    <button
                      key={token.symbol}
                      className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                      onClick={() => selectFromToken(token)}
                    >
                      <img src={token.logo || "/placeholder.svg"} alt={token.symbol} className="w-6 h-6 rounded-full" />
                      <div className="text-left">
                        <div className="font-medium text-white">{token.symbol}</div>
                        <div className="text-xs text-zinc-400">{token.name}</div>
                      </div>
                      <div className="ml-auto text-xs text-zinc-400">Balance: {token.balance}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Swap Button */}
          <div className="flex justify-center -my-2 z-10 relative">
            <button
              className="p-2 rounded-full bg-black/60 border border-white/10 hover:bg-black/80 transition-colors"
              onClick={handleSwapTokens}
            >
              <ArrowDownUp size={16} className="text-purple-400" />
            </button>
          </div>

          {/* To Token */}
          <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex justify-between mb-2">
              <span className="text-xs text-zinc-400">To</span>
              <span className="text-xs text-zinc-400">Balance: {toToken.balance}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  id="to-amount"
                  name="toAmount"
                  value={toAmount}
                  onChange={handleToAmountChange}
                  placeholder="0.0"
                  className="w-full bg-transparent text-xl font-medium text-white focus:outline-none"
                />
              </div>
              <button
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                onClick={() => setShowToTokenList(!showToTokenList)}
              >
                <img src={toToken.logo || "/placeholder.svg"} alt={toToken.symbol} className="w-5 h-5 rounded-full" />
                <span className="font-medium text-white">{toToken.symbol}</span>
                <ChevronDown size={16} className="text-zinc-400" />
              </button>
            </div>

            {/* To Token List */}
            {showToTokenList && (
              <div className="absolute left-0 right-0 mt-2 p-2 rounded-xl bg-black/80 backdrop-blur-lg border border-white/10 z-10 max-h-60 overflow-y-auto">
                <div className="mb-2 px-2">
                  <h3 className="text-sm font-medium text-white">Select Token</h3>
                </div>
                <div className="space-y-1">
                  {tokens.map((token) => (
                    <button
                      key={token.symbol}
                      className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                      onClick={() => selectToToken(token)}
                    >
                      <img src={token.logo || "/placeholder.svg"} alt={token.symbol} className="w-6 h-6 rounded-full" />
                      <div className="text-left">
                        <div className="font-medium text-white">{token.symbol}</div>
                        <div className="text-xs text-zinc-400">{token.name}</div>
                      </div>
                      <div className="ml-auto text-xs text-zinc-400">Balance: {token.balance}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Price Info */}
          {fromAmount && toAmount && (
            <div className="mb-6 p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex justify-between items-center">
                <span className="text-xs text-zinc-400">Price</span>
                <span className="text-xs text-white">
                  1 {fromToken.symbol} = 1825.75 {toToken.symbol}
                </span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-zinc-400">Minimum received</span>
                <span className="text-xs text-white">1815.62 {toToken.symbol}</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-zinc-400">Price Impact</span>
                <span className="text-xs text-green-400">{"<"}0.01%</span>
              </div>
            </div>
          )}

          {/* Swap Button */}
          <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-xl h-12 text-base shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            Connect Wallet
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
