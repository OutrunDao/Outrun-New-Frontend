"use client"

import { motion } from "framer-motion"

export function LiquidityStatsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-4"
    >
      <div className="flex flex-col items-center sm:items-start">
        <span className="text-sm text-zinc-400">Volume (24H):</span>
        <span className="text-3xl md:text-4xl font-mono font-bold text-white drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">
          $1.26M
        </span>
      </div>

      <div className="flex flex-col items-center sm:items-start">
        <span className="text-sm text-zinc-400">TVL:</span>
        <span className="text-3xl md:text-4xl font-mono font-bold text-white drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">
          $23.52M
        </span>
      </div>
    </motion.div>
  )
}
