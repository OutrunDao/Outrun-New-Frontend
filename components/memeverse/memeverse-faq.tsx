"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function MemeverseFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqItems = [
    {
      question: "What is Memeverse?",
      answer:
        "Memeverse is a platform for creating, launching, and managing memecoins with integrated staking and DAO governance. It provides a secure, transparent, and fair environment for memecoin communities to thrive.",
    },
    {
      question: "How does the Genesis stage work?",
      answer:
        "During the Genesis stage, investors can deposit UPT tokens to participate in the memecoin launch. One-third of these funds are allocated for Protocol-Owned Liquidity (POL), while two-thirds are used for memecoin liquidity. This stage has a set duration and minimum funding requirement.",
    },
    {
      question: "What happens if the minimum funding goal isn't reached?",
      answer:
        "If the Genesis stage doesn't reach the minimum funding goal, the project enters the Refund stage. During this phase, all investors can redeem their deposited UPT tokens in full.",
    },
    {
      question: "What is Flash Mode?",
      answer:
        "Flash Mode is an accelerated Genesis stage with a shorter duration and typically higher momentum. It's designed for projects that want to launch quickly and build immediate community engagement.",
    },
    {
      question: "How does staking work in Memeverse?",
      answer:
        "Memeverse features memecoin staking, allowing users to stake their memecoins to earn yields. Staked memecoins follow the ERC4626 standard, making them composable with other DeFi protocols. Staking also grants governance voting rights in the memecoin's DAO.",
    },
    {
      question: "What is the Liquidity Locking stage?",
      answer:
        "The Liquidity Locking stage occurs after a successful Genesis. During this phase, related contracts are deployed, trading pairs are established on OutrunAMM, and Genesis participants can mint POL tokens. Liquidity remains locked for a predetermined period.",
    },
    {
      question: "How does the DAO governance work?",
      answer:
        "Memeverse includes DAO governance, allowing memecoin communities to make decisions collectively. Token holders can vote on proposals, treasury allocations, and project development directions. The governance process is transparent and decentralized.",
    },
    {
      question: "What chains does Memeverse support?",
      answer:
        "Memeverse is an omnichain platform powered by LayerZero and FFLaunch, allowing users to interact on multiple blockchains including Ethereum, Base, Arbitrum, Polygon, and BNB Chain.",
    },
  ]

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="border-b border-white/10 last:border-b-0 pb-4 last:pb-0">
              <button
                className="flex justify-between items-center w-full text-left py-2"
                onClick={() => toggleItem(index)}
              >
                <h4 className="text-lg font-medium text-white">{item.question}</h4>
                <div
                  className={`bg-black/40 rounded-full p-1 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  <ChevronDown className="h-5 w-5 text-pink-400" />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-zinc-300 pt-2 pb-1">{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
