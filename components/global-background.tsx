"use client"

import { ParticleCanvas } from "@/components/particle-canvas"
import { SeamlessStarryBackground } from "@/components/seamless-starry-background"
import { useBackground } from "@/contexts/background-context"

export function GlobalBackground() {
  const { isVisible } = useBackground()

  return (
    <>
      {/* Starry background */}
      <SeamlessStarryBackground />

      {/* Grid background - Add global grid background */}
      <div
        className="fixed inset-0 bg-grid-pattern bg-center opacity-10 -z-20 pointer-events-none"
        style={{
          opacity: isVisible ? 0.14 : 0, // Grid opacity
          transition: "opacity 0.3s ease-in-out",
        }}
      />

      {/* Particle effect - Only show after client-side hydration to avoid flickering */}
      <ParticleCanvas className="fixed inset-0 w-full h-full -z-10" />

      {/* Fixed dark background as base layer to prevent white flashing */}
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
