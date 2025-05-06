"use client"

import { ParticleCanvas } from "@/components/particle-canvas"
import { SeamlessStarryBackground } from "@/components/seamless-starry-background"
import { useBackground } from "@/contexts/background-context"

export function GlobalBackground() {
  const { isVisible } = useBackground()

  return (
    <>
      {/* 星空背景 */}
      <SeamlessStarryBackground />

      {/* 网格背景 - 添加全局网格背景 */}
      <div
        className="fixed inset-0 bg-grid-pattern bg-center opacity-10 -z-20 pointer-events-none"
        style={{
          opacity: isVisible ? 0.14 : 0, // 网格透明度
          transition: "opacity 0.3s ease-in-out",
        }}
      />

      {/* 粒子效果 - 仅在客户��水合后显示，避免闪烁 */}
      <ParticleCanvas className="fixed inset-0 w-full h-full -z-10" />

      {/* 固定的深色背景，作为底层背景，防止闪白 */}
      <div
        className="fixed inset-0 -z-30"
        style={{
          background: "linear-gradient(to bottom, #0f0326, #170b3b, #0f0326)",
          pointerEvents: "none",
        }}
      />
    </>
  )
}
