"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { X, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export type Network = {
  id: string
  name: string
  icon: string
  chainId: number
  color: string
}

interface NetworkSelectorModalProps {
  isOpen: boolean
  onClose: () => void
  networks: Network[]
  selectedNetwork: Network
  onSelectNetwork: (network: Network) => void
}

export function NetworkSelectorModal({
  isOpen,
  onClose,
  networks,
  selectedNetwork,
  onSelectNetwork,
}: NetworkSelectorModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node) && isOpen) {
        onClose()
      }
    }

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscKey)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [isOpen, onClose])

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY

      // Add styles to body to prevent scrolling
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = "100%"
      document.body.style.overflowY = "scroll"

      return () => {
        // Restore scrolling when modal is closed
        document.body.style.position = ""
        document.body.style.top = ""
        document.body.style.width = ""
        document.body.style.overflowY = ""

        // Restore scroll position
        window.scrollTo(0, scrollY)
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        ref={modalRef}
        className="w-full max-w-xs overflow-hidden rounded-2xl mx-4 z-50"
        style={{
          background: "linear-gradient(to bottom, rgba(15, 3, 38, 0.95), rgba(10, 2, 25, 0.95))",
          boxShadow: "0 0 2px #ec4899, 0 0 15px rgba(236,72,153,0.4), 0 0 30px rgba(168,85,247,0.2)",
          border: "1px solid rgba(236,72,153,0.3)",
        }}
      >
        {/* Header */}
        <div className="relative flex items-center justify-between border-b border-pink-500/20 py-3 px-4">
          <h2
            className="text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500"
            style={{
              textShadow: "0 0 6px rgba(236,72,153,0.4), 0 0 10px rgba(236,72,153,0.2)",
            }}
          >
            SELECT NETWORK
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        {/* Network List */}
        <div className="p-2">
          {networks.map((network) => (
            <button
              key={network.id}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 mb-1",
                selectedNetwork.id === network.id
                  ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-pink-500/30"
                  : "hover:bg-white/5 border border-transparent",
              )}
              onClick={() => {
                onSelectNetwork(network)
                onClose()
              }}
            >
              <div
                className="w-8 h-8 flex items-center justify-center flex-shrink-0 overflow-hidden"
                style={{
                  backgroundColor: "transparent",
                }}
              >
                <img
                  src={network.icon || "/placeholder.svg"}
                  alt={network.name}
                  className="w-6 h-6 object-contain"
                  onError={(e) => {
                    // If icon fails to load, display the first letter of the network name
                    e.currentTarget.style.display = "none"
                    e.currentTarget.parentElement!.innerHTML = network.name.charAt(0)
                  }}
                />
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium text-white">{network.name}</div>
              </div>
              {selectedNetwork.id === network.id && <Check size={16} className="text-green-400" />}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
