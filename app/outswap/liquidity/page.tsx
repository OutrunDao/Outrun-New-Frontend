"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
// 导入部分，将 Input 替换为 Search
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ParticleCanvas } from "@/components/particle-canvas"
import { LiquidityPoolsTable } from "@/components/liquidity-pools-table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "@/components/ui/search"

export default function LiquidityPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const { scrollYProgress } = useScroll()
  const containerRef = useRef<HTMLDivElement>(null)

  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8])
  const titleY = useTransform(scrollYProgress, [0, 0.1], [0, -20])

  return (
    <div ref={containerRef} className="relative flex flex-col min-h-screen">
      {/* Background elements */}
      <ParticleCanvas className="fixed inset-0 -z-10" />

      {/* Hero Section */}
      <section className="relative pt-24 pb-6 overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 bg-grid-pattern bg-center opacity-10" />

        {/* Hero overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0326]/40 via-[#1a0445]/40 to-[#000000]/30 opacity-30" />

        <div className="container px-4 md:px-6 mx-auto max-w-5xl">
          <div className="flex flex-col items-start text-left space-y-6 max-w-4xl">
            <motion.div style={{ opacity: titleOpacity, y: titleY }} className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#ff6b6b] drop-shadow-[0_0_8px_rgba(255,107,107,0.5)]">
                EARN WITH
                <br />
                YOUR LIQUIDITY
              </h1>

              <div className="grid grid-cols-2 gap-8 max-w-md">
                <div className="space-y-1">
                  <p className="text-zinc-400 text-sm">Volume (24H):</p>
                  <p className="text-2xl md:text-4xl font-mono font-bold text-white">$1.26M</p>
                </div>
                <div className="space-y-1">
                  <p className="text-zinc-400 text-sm">TVL:</p>
                  <p className="text-2xl md:text-4xl font-mono font-bold text-white">$23.52M</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pools Section */}
      <section className="py-4 relative">
        <div className="container px-4 md:px-6 mx-auto max-w-5xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e] drop-shadow-[0_0_8px_rgba(255,107,107,0.5)]">
                TOP POOLS
              </h2>
            </div>
            <Button className="bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e] hover:from-[#ff5a5a] hover:to-[#ff7a7a] text-white border-0 rounded-full px-4 h-9 text-sm shadow-[0_0_15px_rgba(255,107,107,0.5)] w-auto flex items-center justify-center">
              <Plus className="mr-0.25 h-4 w-4" />
              Create Position
            </Button>
          </div>

          {/* 将搜索框部分替换为新的 Search 组件 */}
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-3">
            <div className="relative w-full md:w-2/5">
              <Search
                placeholder="Search pools by tokens"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClear={() => setSearchQuery("")}
                className="bg-black/40 border border-white/10 text-white rounded-lg focus:outline-none focus:ring-0 focus:border-[#ff6b6b]/50 transition-all duration-300 shadow-inner shadow-black/20"
              />
            </div>

            <div className="flex justify-end">
              <Tabs defaultValue="all" className="w-auto">
                <TabsList className="bg-black/40 border border-white/10">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="stablecoin">Stablecoin</TabsTrigger>
                  <TabsTrigger value="memecoin">Memecoin</TabsTrigger>
                  <TabsTrigger value="defi">DeFi</TabsTrigger>
                  <TabsTrigger value="game">Game</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          <div className="bg-black/30 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden max-w-5xl mx-auto mt-2">
            <LiquidityPoolsTable />
          </div>
        </div>
      </section>
    </div>
  )
}
