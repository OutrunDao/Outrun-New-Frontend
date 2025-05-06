import type React from "react"
import { NavbarWrapper } from "@/components/navbar-wrapper"
import { GlobalBackground } from "@/components/global-background"

export default function MemeverseBoardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <GlobalBackground />
      <NavbarWrapper />
      <main>{children}</main>
    </>
  )
}
