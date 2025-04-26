"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, ArrowUpDown, ChevronUp, ChevronDown } from "lucide-react"
import { TokenIcon } from "@/components/ui/token-icon"
import { Button } from "@/components/ui/button"

// Mock data for the pools
const poolsData = [
  {
    id: 1,
    pair: "ezETH/WETH",
    fee: "0.05%",
    volume: "$1.9k",
    tvl: "$2.80m",
    apr: "0.05%",
    fees: "$0.96",
  },
  {
    id: 2,
    pair: "USDB/WETH",
    fee: "0.05%",
    volume: "$951.04k",
    tvl: "$2.39m",
    apr: "7.62%",
    fees: "$475.52",
  },
  {
    id: 3,
    pair: "USDB/WETH",
    fee: "0.3%",
    volume: "$1.13k",
    tvl: "$1.62m",
    apr: "0.41%",
    fees: "$3.39",
  },
  {
    id: 4,
    pair: "USDB/USDC",
    fee: "0.05%",
    volume: "$18.49k",
    tvl: "$1.29m",
    apr: "0.76%",
    fees: "$9.24",
  },
  {
    id: 5,
    pair: "WETH/bPEPE",
    fee: "0.3%",
    volume: "$1.09k",
    tvl: "$1.24m",
    apr: "0.05%",
    fees: "$3.27",
  },
  {
    id: 6,
    pair: "WETH/BLAST",
    fee: "0.3%",
    volume: "$107.28k",
    tvl: "$490.28k",
    apr: "16.36%",
    fees: "$321.83",
  },
  {
    id: 7,
    pair: "sUSD/USDB",
    fee: "0.05%",
    volume: "$4.13k",
    tvl: "$415.89k",
    apr: "0.99%",
    fees: "$2.06",
  },
  {
    id: 8,
    pair: "WETH/OLE",
    fee: "0.3%",
    volume: "$8.70k",
    tvl: "$374.23k",
    apr: "1.70%",
    fees: "$26.09",
  },
  {
    id: 9,
    pair: "USDB/WETH",
    fee: "0.3%",
    volume: "$17.02k",
    tvl: "$340.63k",
    apr: "14.52%",
    fees: "$51.07",
  },
  {
    id: 10,
    pair: "USDB/axlUSD",
    fee: "0.05%",
    volume: "$131.98k",
    tvl: "$333.72k",
    apr: "3.61%",
    fees: "$65.99",
  },
]

export function LiquidityPoolsTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("desc")
    }
  }

  const renderSortIcon = (column: string) => {
    if (sortColumn !== column) {
      return <ArrowUpDown size={14} className="ml-1 opacity-50" />
    }
    return sortDirection === "asc" ? (
      <ChevronUp size={14} className="ml-1" />
    ) : (
      <ChevronDown size={14} className="ml-1" />
    )
  }

  const renderPairIcons = (pair: string) => {
    const tokens = pair.split("/")
    return (
      <div className="flex items-center">
        <div className="flex -space-x-2 mr-2">
          <TokenIcon symbol={tokens[0]} size={20} />
          <TokenIcon symbol={tokens[1]} size={20} />
        </div>
        <span className="font-bold">{pair}</span>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-b from-black/50 via-[#0f0326]/50 to-black/50 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(168,85,247,0.15),inset_0_0_10px_rgba(236,72,153,0.05)] relative">
      <div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          boxShadow: "0 0 2px #ec4899, 0 0 8px rgba(236,72,153,0.2), 0 0 15px rgba(168,85,247,0.1)",
          opacity: 0.6,
        }}
      ></div>
      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-b border-white/5 bg-gradient-to-r from-black/80 via-[#1a0445]/30 to-black/80">
              <th className="w-[20px]"></th>
              <th className="px-1 py-3 text-center text-xs font-medium text-zinc-300 uppercase tracking-wider w-[14px] text-shadow-sm">
                #
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider w-[140px]">
                <button className="flex items-center focus:outline-none" onClick={() => handleSort("pool")}>
                  Pool {renderSortIcon("pool")}
                </button>
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-zinc-400 uppercase tracking-wider whitespace-nowrap w-[110px]">
                <button
                  className="flex items-center justify-end ml-auto focus:outline-none"
                  onClick={() => handleSort("volume")}
                >
                  Volume (24H) {renderSortIcon("volume")}
                </button>
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-zinc-400 uppercase tracking-wider w-[110px]">
                <button
                  className="flex items-center justify-end ml-auto focus:outline-none"
                  onClick={() => handleSort("tvl")}
                >
                  TVL {renderSortIcon("tvl")}
                </button>
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-zinc-400 uppercase tracking-wider w-[110px]">
                <button
                  className="flex items-center justify-end ml-auto focus:outline-none"
                  onClick={() => handleSort("apr")}
                >
                  APR {renderSortIcon("apr")}
                </button>
              </th>
              <th className="px-2 py-3 text-right text-xs font-medium text-zinc-400 uppercase tracking-wider whitespace-nowrap w-[110px]">
                <button
                  className="flex items-center justify-end ml-auto focus:outline-none"
                  onClick={() => handleSort("fees")}
                >
                  Fees (24H) {renderSortIcon("fees")}
                </button>
              </th>
              <th className="w-[20px]"></th>
            </tr>
          </thead>
          <tbody>
            {poolsData.map((pool) => (
              <tr
                key={pool.id}
                className="border-b border-white/5 hover:bg-gradient-to-r hover:from-[#0f0326]/40 hover:via-[#1a0445]/30 hover:to-[#0f0326]/40 transition-all duration-200"
                onMouseEnter={() => setHoveredRow(pool.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="w-[25px]"></td>
                <td className="px-1 py-4 whitespace-nowrap text-sm font-medium text-zinc-200 text-center">{pool.id}</td>
                <td className="px-2 py-4 whitespace-nowrap overflow-hidden">
                  <div className="flex items-center w-full">
                    <div className="flex -space-x-2 mr-2 flex-shrink-0">
                      <TokenIcon symbol={pool.pair.split("/")[0]} size={18} />
                      <TokenIcon symbol={pool.pair.split("/")[1]} size={18} />
                    </div>
                    <span className="font-bold text-base tracking-tighter font-mono flex-shrink-0">{pool.pair}</span>
                    <span className="ml-2 text-xs px-1.5 py-0.5 rounded-full bg-white/10 flex-shrink-0">
                      {pool.fee}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-zinc-300 text-right">{pool.volume}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-zinc-300 text-right">{pool.tvl}</td>
                <td className="px-4 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end">
                    <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 drop-shadow-[0_0_5px_rgba(168,85,247,0.5)] relative">
                      {pool.apr}
                      <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/30 to-transparent"></span>
                    </span>
                  </div>
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-sm text-zinc-300 relative text-right">
                  {hoveredRow === pool.id ? (
                    <div className="absolute inset-0 flex items-center justify-end pr-2 space-x-2">
                      <Button
                        size="sm"
                        className="w-[60px] bg-[#0c0414] text-white rounded-md text-xs font-medium transition-all duration-200 h-7 px-0 relative hover:bg-[#150a28] hover:text-purple-300 hover:scale-105"
                        style={{
                          boxShadow: "0 0 10px 2px rgba(93, 63, 211, 0.3)",
                        }}
                      >
                        <div
                          className="absolute inset-0 rounded-md"
                          style={{
                            border: "1px solid rgba(93, 63, 211, 0.8)",
                            boxShadow: "inset 0 0 4px rgba(93, 63, 211, 0.5)",
                          }}
                        ></div>
                        Swap
                      </Button>
                      <Button
                        size="sm"
                        className="w-[60px] bg-[#0c0414] text-white rounded-md text-xs font-medium transition-all duration-200 h-7 px-0 relative hover:bg-[#1a0a1e] hover:text-pink-300 hover:scale-105"
                        style={{
                          boxShadow: "0 0 10px 2px rgba(236, 72, 153, 0.3)",
                        }}
                      >
                        <div
                          className="absolute inset-0 rounded-md"
                          style={{
                            border: "1px solid rgba(236, 72, 153, 0.8)",
                            boxShadow: "inset 0 0 4px rgba(236, 72, 153, 0.5)",
                          }}
                        ></div>
                        Add
                      </Button>
                    </div>
                  ) : (
                    pool.fees
                  )}
                </td>
                <td className="w-[25px]"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center px-4 py-3 border-t border-white/5 bg-gradient-to-r from-black/80 via-[#1a0445]/30 to-black/80">
        <nav className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-400 hover:text-white hover:bg-[#1a0445]/40 transition-colors"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
          </Button>

          <div className="flex items-center space-x-1 mx-2">
            <Button
              variant="ghost"
              size="sm"
              className={
                currentPage === 1
                  ? "bg-[#1a0445]/60 text-white font-medium border border-purple-500/30 shadow-[0_0_8px_rgba(168,85,247,0.2)] hover:bg-[#1a0445]/80 hover:border-purple-500/50 hover:shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                  : "text-zinc-400 hover:text-white hover:bg-[#1a0445]/40 transition-colors"
              }
              onClick={() => setCurrentPage(1)}
            >
              1
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={
                currentPage === 2
                  ? "bg-[#1a0445]/60 text-white font-medium border border-purple-500/30 shadow-[0_0_8px_rgba(168,85,247,0.2)] hover:bg-[#1a0445]/80 hover:border-purple-500/50 hover:shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                  : "text-zinc-400 hover:text-white hover:bg-[#1a0445]/40 transition-colors"
              }
              onClick={() => setCurrentPage(2)}
            >
              2
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-400 hover:text-white hover:bg-[#1a0445]/40 transition-colors"
            onClick={() => setCurrentPage(Math.min(2, currentPage + 1))}
            disabled={currentPage === 2}
          >
            <ChevronRight size={16} />
          </Button>
        </nav>
      </div>
    </div>
  )
}
