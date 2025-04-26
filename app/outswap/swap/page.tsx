"use client"

import { motion } from "framer-motion"
import { ParticleCanvas } from "@/components/particle-canvas"
import { EnhancedSwapInterface } from "@/components/enhanced-swap-interface"

export default function SwapPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background elements */}
      {/* <div className="fixed inset-0 bg-gradient-to-b from-[#0f0326] via-[#1a0445] to-[#000000] -z-20" /> */}
      <ParticleCanvas className="fixed inset-0 -z-10" />

      <div className="container px-4 md:px-6 mx-auto py-24">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <EnhancedSwapInterface />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
