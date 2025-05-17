"use client"

import { useState, useEffect } from "react"

interface RefundSectionProps {
  totalRefundAmount: number
  userRefundAmount: number
  refundToken: string
  onRefund: () => void
}

export function RefundSection({ totalRefundAmount, userRefundAmount, refundToken, onRefund }: RefundSectionProps) {
  const [processing, setProcessing] = useState(false)
  const [complete, setComplete] = useState(false)

  // Handle refund button click
  const handleRefund = () => {
    if (processing || complete) return

    setProcessing(true)

    // Call the parent's onRefund function
    onRefund()

    // Simulate processing time
    setTimeout(() => {
      setProcessing(false)
      setComplete(true)
    }, 2000)
  }

  // 更精细的响应式布局控制
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">("desktop")

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 768) {
        setDeviceType("mobile")
      } else if (width >= 768 && width < 1024) {
        setDeviceType("tablet")
      } else {
        setDeviceType("desktop")
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const isMobile = deviceType === "mobile"
  const isTablet = deviceType === "tablet"
  const isDesktop = deviceType === "desktop"

  return (
    <div className="w-full lg:w-1/4 flex-shrink-0 deposit-section-container" style={{ overflow: "visible" }}>
      {/* 主容器 - 创建一个新的堆叠上下文 */}
      <div
        className="bg-[#0f0326]/90 rounded-lg border border-purple-500/40 flex flex-col shadow-[0_4px_20px_-4px_rgba(168,85,247,0.25)]"
        style={{
          aspectRatio: !isDesktop ? "auto" : "1/1",
          height: "auto",
          position: "relative", // 创建新的堆叠上下文
          overflow: "visible", // 确保溢出内容可见
        }}
      >
        {/* 内容容器 */}
        <div className="p-3 flex flex-col h-full">
          <div className="flex flex-col space-y-2 px-2">
            <h2 className="text-lg font-bold text-orange-500 text-center -mt-1.5">Refund</h2>

            {/* Total Remaining Refund */}
            <div className="w-[95%] mx-auto bg-[#1a0f3d]/90 rounded-lg border border-purple-500/40 p-2">
              <div className="text-center text-gray-400 mb-0.5 text-xs whitespace-nowrap">Total Remaining Refund:</div>
              <div className="text-center text-white text-base font-bold">
                {totalRefundAmount.toFixed(2)} {refundToken}
              </div>
            </div>

            {/* Your Refund Amount */}
            <div className="w-[95%] mx-auto bg-[#1a0f3d]/90 rounded-lg border border-purple-500/40 p-2">
              <div className="text-center text-gray-400 mb-0.5 text-xs whitespace-nowrap">Your Refund Amount:</div>
              <div className="text-center text-orange-500 text-base font-bold">
                {userRefundAmount.toFixed(2)} {refundToken}
              </div>
            </div>
          </div>

          {/* Claim Refund按钮 */}
          <div className="mt-auto mb-1 pt-3 px-2">
            <button
              onClick={handleRefund}
              disabled={processing || complete}
              className={`w-[95%] mx-auto h-9 rounded-lg ${
                complete
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
              } disabled:opacity-50 disabled:cursor-not-allowed text-white text-base font-medium flex items-center justify-center transition-all duration-300`}
            >
              {processing ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-t-white border-r-transparent border-b-white border-l-transparent rounded-full animate-spin mr-1"></div>
                  <span className="text-xs">Processing...</span>
                </div>
              ) : complete ? (
                <span className="text-xs">Refund Completed</span>
              ) : (
                "Claim"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
