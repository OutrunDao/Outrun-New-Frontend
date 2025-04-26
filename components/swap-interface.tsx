"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/contexts/wallet-context"
import { TokenSelectionModal } from "@/components/token-selection-modal"
import { TokenIcon } from "@/components/ui/token-icon"
import { ArrowDown, Settings, RefreshCw, Loader2 } from "lucide-react"
import { TOKENS } from "@/constants/tokens"
import { useDebouncedState } from "@/hooks/use-debounced-state"
import { useTokenSwap } from "@/hooks/use-token-swap"

export function SwapInterface() {
  const { isConnected, isConnecting, connectWallet } = useWallet()
  const [fromToken, setFromToken] = useState(TOKENS[0])
  const [toToken, setToToken] = useState(TOKENS[1])
  const [fromAmount, setFromAmount] = useDebouncedState("", 500)
  const [toAmount, setToAmount] = useState("")
  const [isFromModalOpen, setIsFromModalOpen] = useState(false)
  const [isToModalOpen, setIsToModalOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [slippage, setSlippage] = useState("0.5")
  const [isCalculating, setIsCalculating] = useState(false)

  const { calculateSwap } = useTokenSwap()

  useEffect(() => {
    if (fromAmount && fromAmount !== "0" && fromToken && toToken) {
      setIsCalculating(true)
      const timeout = setTimeout(() => {
        const result = calculateSwap(fromToken, toToken, Number.parseFloat(fromAmount))
        setToAmount(result.toString())
        setIsCalculating(false)
      }, 500)

      return () => clearTimeout(timeout)
    } else {
      setToAmount("")
    }
  }, [fromAmount, fromToken, toToken, calculateSwap])

  const handleFromTokenSelect = (token: any) => {
    setFromToken(token)
    setIsFromModalOpen(false)
  }

  const handleToTokenSelect = (token: any) => {
    setToToken(token)
    setIsToModalOpen(false)
  }

  const handleSwapTokens = () => {
    const temp = fromToken
    setFromToken(toToken)
    setToToken(temp)
    setFromAmount("")
    setToAmount("")
  }

  const handleConnectWallet = async () => {
    try {
      await connectWallet()
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto bg-black/30 backdrop-blur-md rounded-xl border border-purple-500/20 shadow-lg shadow-purple-500/10 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Swap</h2>
        <button
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <Settings size={20} />
        </button>
      </div>

      {isSettingsOpen && (
        <div className="mb-4 p-3 bg-black/50 rounded-lg border border-purple-500/20">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-300">Slippage Tolerance</span>
            <div className="flex gap-2">
              {["0.1", "0.5", "1.0"].map((value) => (
                <button
                  key={value}
                  className={`px-2 py-1 text-xs rounded ${
                    slippage === value ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                  onClick={() => setSlippage(value)}
                >
                  {value}%
                </button>
              ))}
              <div className="relative">
                <input
                  type="text"
                  value={slippage}
                  onChange={(e) => setSlippage(e.target.value)}
                  className="w-16 px-2 py-1 text-xs bg-gray-800 border border-gray-700 rounded text-white"
                />
                <span className="absolute right-2 top-1 text-xs text-gray-400">%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="p-4 bg-black/40 rounded-lg border border-purple-500/20">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-400">From</span>
            <span className="text-sm text-gray-400">Balance: {fromToken ? "0.00" : "-"}</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value.replace(/[^0-9.]/g, ""))}
              placeholder="0.00"
              className="w-full bg-transparent text-2xl font-medium text-white outline-none"
            />
            <button
              onClick={() => setIsFromModalOpen(true)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              {fromToken && <TokenIcon symbol={fromToken.symbol} className="w-5 h-5" />}
              <span className="text-white font-medium">{fromToken ? fromToken.symbol : "Select"}</span>
              <ArrowDown size={16} className="text-gray-400" />
            </button>
          </div>
        </div>

        <div className="flex justify-center -my-2 z-10 relative">
          <button
            onClick={handleSwapTokens}
            className="w-8 h-8 rounded-full bg-gray-800 border border-purple-500/30 flex items-center justify-center hover:bg-gray-700 transition-colors"
          >
            <ArrowDown size={16} className="text-purple-400" />
          </button>
        </div>

        <div className="p-4 bg-black/40 rounded-lg border border-purple-500/20">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-400">To</span>
            <span className="text-sm text-gray-400">Balance: {toToken ? "0.00" : "-"}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-full relative">
              <input
                type="text"
                value={toAmount}
                readOnly
                placeholder="0.00"
                className="w-full bg-transparent text-2xl font-medium text-white outline-none"
              />
              {isCalculating && <RefreshCw size={16} className="absolute right-2 top-3 text-gray-400 animate-spin" />}
            </div>
            <button
              onClick={() => setIsToModalOpen(true)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              {toToken && <TokenIcon symbol={toToken.symbol} className="w-5 h-5" />}
              <span className="text-white font-medium">{toToken ? toToken.symbol : "Select"}</span>
              <ArrowDown size={16} className="text-gray-400" />
            </button>
          </div>
        </div>

        {isConnected ? (
          <Button
            className="w-full py-6 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-medium rounded-lg transition-all duration-200 shadow-lg shadow-purple-500/20"
            disabled={!fromAmount || !toAmount || isCalculating}
          >
            Swap
          </Button>
        ) : (
          <Button
            className="w-full py-6 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-medium rounded-lg transition-all duration-200 shadow-lg shadow-purple-500/20"
            onClick={handleConnectWallet}
            disabled={isConnecting}
          >
            {isConnecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              "Connect Wallet"
            )}
          </Button>
        )}

        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Rate</span>
            <span className="text-white">
              {fromAmount && toAmount && fromToken && toToken
                ? `1 ${fromToken.symbol} = ${(Number.parseFloat(toAmount) / Number.parseFloat(fromAmount)).toFixed(
                    6,
                  )} ${toToken.symbol}`
                : "-"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Slippage Tolerance</span>
            <span className="text-white">{slippage}%</span>
          </div>
        </div>
      </div>

      {isFromModalOpen && (
        <TokenSelectionModal
          isOpen={isFromModalOpen}
          onClose={() => setIsFromModalOpen(false)}
          onSelect={handleFromTokenSelect}
          selectedToken={fromToken}
          otherToken={toToken}
        />
      )}

      {isToModalOpen && (
        <TokenSelectionModal
          isOpen={isToModalOpen}
          onClose={() => setIsToModalOpen(false)}
          onSelect={handleToTokenSelect}
          selectedToken={toToken}
          otherToken={fromToken}
        />
      )}
    </div>
  )
}
