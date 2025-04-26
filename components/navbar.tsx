"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import { WalletButton } from "@/components/wallet-button"

// 导入 useThrottleFn
import { useThrottleFn } from "@/hooks/use-throttle"

type NavItem = {
  title: string
  href: string
  children?: {
    title: string
    href: string
  }[]
}

const navItems: NavItem[] = [
  {
    title: "OutStake",
    href: "/outstake",
    children: [
      { title: "Markets", href: "/outstake/markets" },
      { title: "Position", href: "/outstake/position" },
    ],
  },
  {
    title: "OutSwap",
    href: "/outswap",
    children: [
      { title: "Swap", href: "/outswap/swap" },
      { title: "Liquidity", href: "/outswap/liquidity" },
      { title: "Referral", href: "/outswap/referral" },
    ],
  },
  {
    title: "FFLaunch",
    href: "/fflaunch",
  },
  {
    title: "Memeverse",
    href: "/memeverse",
  },
]

export function Navbar() {
  const isMobile = useMobile()
  const pathname = usePathname() // Get the current path
  const isHomePage = pathname === "/" // Check if we're on the home page
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [hoverPosition, setHoverPosition] = useState({ x: 0, width: 0 })
  const navRef = useRef<HTMLDivElement>(null)
  // 在 useState 声明部分添加一个新的状态来跟踪当前活动的导航项
  const [currentActiveItem, setCurrentActiveItem] = useState<string | null>(null)

  // 在 Navbar 组件内部，将 handleScroll 函数替换为节流版本
  const handleScroll = useThrottleFn(() => {
    setIsScrolled(window.scrollY > 10)
  }, 100) // 100ms 节流

  // 然后在 useEffect 中使用这个节流函数
  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  // 在 useEffect 中添加一个新的 effect 来根据当前路径设置活动项
  useEffect(() => {
    // 找到匹配当前路径的导航项
    const matchingItem = navItems.find(
      (item) => pathname === item.href || (item.children && item.children.some((child) => pathname === child.href)),
    )

    // 设置当前活动项
    setCurrentActiveItem(matchingItem?.title || null)

    // 如果鼠标不在导航上，更新高亮条位置
    if (!activeDropdown) {
      updateHighlightForCurrentPath()
    }
  }, [pathname, activeDropdown])

  // 添加一个函数来更新当前路径的高亮
  const updateHighlightForCurrentPath = () => {
    if (navRef.current) {
      // 如果是首页，不显示高亮
      if (isHomePage) {
        setHoverPosition({ x: 0, width: 0 })
        return
      }

      // 查找匹配当前路径的导航项
      const activeNavItem = navRef.current.querySelector(`[data-nav-item="${currentActiveItem}"]`)
      if (activeNavItem) {
        const rect = (activeNavItem as HTMLElement).getBoundingClientRect()
        setHoverPosition({ x: rect.left, width: rect.width })
      } else {
        setHoverPosition({ x: 0, width: 0 })
      }
    } else {
      // 如果是首页或没有匹配项，不显示高亮
      setHoverPosition({ x: 0, width: 0 })
    }
  }

  const updateHoverPosition = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect()
      setHoverPosition({ x: rect.left, width: rect.width })
    }
  }

  // 修改 resetHoverPosition 函数
  const resetHoverPosition = () => {
    if (activeDropdown) return // 如果有下拉菜单激活，不重置位置
    updateHighlightForCurrentPath()
  }

  // 在组件加载时立即执行一次高亮更新
  useEffect(() => {
    // 短暂延迟确保DOM已完全加载
    const timer = setTimeout(() => {
      updateHighlightForCurrentPath()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-gradient-to-r from-[#0f0326]/90 via-[#1a0445]/90 to-[#0f0326]/90 backdrop-blur-lg border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-10 w-10 transition-transform duration-300 group-hover:scale-110">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 blur-sm opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
                <div className="relative h-full w-full rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">O</span>
                </div>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)] transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(168,85,247,0.7)]">
                Outrun
              </span>
            </Link>

            {!isMobile && (
              <div className="relative ml-8">
                <nav className="flex items-center gap-1 md:gap-2" ref={navRef}>
                  {navItems.map((item) => {
                    // 检查当前路径是否匹配此导航项或其子项
                    const isActive =
                      pathname === item.href ||
                      (item.children && item.children.some((child) => pathname === child.href))

                    return (
                      <div
                        key={item.title}
                        className="relative group"
                        data-nav-item={item.title}
                        data-active={currentActiveItem === item.title}
                        onMouseEnter={(e) => {
                          setActiveDropdown(item.title)
                          updateHoverPosition(e)
                        }}
                        onMouseLeave={() => {
                          setActiveDropdown(null)
                          resetHoverPosition()
                        }}
                      >
                        <Link
                          href={item.href}
                          className={`px-4 py-2 text-sm font-medium nav-text flex items-center gap-1 relative overflow-hidden group nav-item rounded-lg ${
                            isActive ? "text-white font-semibold" : ""
                          }`}
                        >
                          <span className="relative z-10">Trade</span>
                          {item.children && (
                            <ChevronDown className="h-4 w-4 opacity-70 relative z-10 transition-transform duration-300 group-hover:rotate-180" />
                          )}
                          <div
                            className={`nav-item-bg absolute inset-0 opacity-0 ${
                              isActive ? "opacity-20" : ""
                            } group-hover:opacity-100 transition-opacity duration-300 -z-0`}
                          ></div>
                        </Link>

                        {item.children && (
                          <AnimatePresence>
                            {activeDropdown === item.title && (
                              <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="absolute left-0 top-full mt-1 w-48 rounded-xl overflow-hidden dropdown-menu"
                              >
                                <div className="dropdown-bg absolute inset-0 -z-10"></div>
                                <div className="dropdown-grid absolute inset-0 -z-5"></div>
                                <div className="relative z-10 p-2">
                                  <div className="py-1 grid gap-1">
                                    {item.children.map((child) => {
                                      // 检查子项是否匹配当前路径
                                      const isChildActive = pathname === child.href

                                      return (
                                        <Link
                                          key={child.title}
                                          href={child.href}
                                          className={`dropdown-item flex items-center px-4 py-2 text-sm dropdown-text rounded-lg transition-all duration-300 relative overflow-hidden group ${
                                            isChildActive ? "bg-purple-600/20 text-white font-medium" : ""
                                          }`}
                                        >
                                          <span className="relative z-10">{child.title}</span>
                                          <ChevronRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1" />
                                          <div className="dropdown-item-bg absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></div>
                                        </Link>
                                      )
                                    })}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        )}
                      </div>
                    )
                  })}
                </nav>

                {/* Animated hover indicator */}
                <motion.div
                  className="absolute bottom-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full nav-indicator"
                  animate={{
                    x: hoverPosition.x - (navRef.current?.getBoundingClientRect().left || 0),
                    width: hoverPosition.width,
                    opacity: hoverPosition.width ? 0.8 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </div>
            )}
          </div>

          {!isMobile ? (
            <div>
              <WalletButton isHomePage={isHomePage} />
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="text-white hover:bg-white/10 rounded-full relative overflow-hidden group"
            >
              <span className="relative z-10">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </span>
              <div className="mobile-menu-btn-bg absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></div>
            </Button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-20 z-40 mobile-menu-bg overflow-auto"
          >
            <div className="mobile-menu-grid absolute inset-0 -z-5"></div>
            <div className="container mx-auto px-4 py-8 relative z-10">
              <nav className="flex flex-col gap-6">
                {navItems.map((item) => (
                  <div key={item.title} className="border-b border-white/10 pb-6">
                    <Link
                      href={item.href}
                      className="text-lg font-medium mobile-nav-text mb-4 block mobile-nav-item"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.title}
                    </Link>

                    {item.children && (
                      <div className="grid gap-2 pl-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.title}
                            href={child.href}
                            className="text-sm mobile-dropdown-text py-2 flex items-center mobile-dropdown-item group"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <span>{child.title}</span>
                            <ChevronRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              <div className="mt-8">
                <WalletButton isHomePage={isHomePage} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
