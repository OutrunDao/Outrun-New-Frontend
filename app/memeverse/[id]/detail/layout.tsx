import type React from "react"
import { GlobalBackground } from "@/components/global-background"

export default function MemeVerseDetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen pt-16">
      <GlobalBackground />
      {children}
    </div>
  )
}
