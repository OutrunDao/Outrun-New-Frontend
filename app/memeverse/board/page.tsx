"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, ChevronDown, ChevronLeft, ChevronRight, Star, SortDesc, SortAsc } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/ui/section-heading"
import { useRouter } from "next/navigation"
import { MOCK_PROJECTS } from "@/data/memeverse-projects"
import { ChainTooltip } from "@/components/memeverse/chain-tooltip"

// Stage label color mapping
const STAGE_COLORS: Record<string, { bg: string; text: string; glow: string; gradient: string }> = {
  Genesis: {
    bg: "bg-purple-600",
    text: "text-white",
    glow: "shadow-[0_0_8px_rgba(168,85,247,0.6)]",
    gradient: "from-purple-600 to-pink-500",
  },
  Refund: {
    bg: "bg-red-600",
    text: "text-white",
    glow: "shadow-[0_0_8px_rgba(239,68,68,0.6)]",
    gradient: "from-red-600 to-orange-500",
  },
  Locked: {
    bg: "bg-pink-600",
    text: "text-white",
    glow: "shadow-[0_0_8px_rgba(236,72,153,0.6)]",
    gradient: "from-pink-600 to-purple-500",
  },
  Unlocked: {
    bg: "bg-cyan-600",
    text: "text-white",
    glow: "shadow-[0_0_8px_rgba(6,182,212,0.6)]",
    gradient: "from-cyan-500 to-blue-500",
  },
}

// Chain filter options
const CHAIN_FILTERS = [
  { id: "all", label: "All Chains" },
  { id: "ethereum", label: "Ethereum", icon: "/networks/ethereum.svg" },
  { id: "base", label: "Base", icon: "/networks/base.svg" },
  { id: "arbitrum", label: "Arbitrum", icon: "/networks/arbitrum.svg" },
  { id: "polygon", label: "Polygon", icon: "/networks/polygon.svg" },
  { id: "bnb", label: "BNB Chain", icon: "/networks/bnb.svg" },
]

// Stage filter options
const STAGE_FILTERS = [
  { id: "genesis", label: "Genesis" },
  { id: "refund", label: "Refund" },
  { id: "locked", label: "Locked" },
  { id: "unlocked", label: "Unlocked" },
]

// Sort options
const SORT_OPTIONS: any = {
  genesis: {
    normal: [
      { id: "createdAt", label: "Creation Time" },
      { id: "genesisEndTime", label: "Genesis Endtime" },
      { id: "raisedAmount", label: "Total Raised" },
      { id: "population", label: "Population" },
    ],
    flash: [
      { id: "createdAt", label: "Creation Time" },
      { id: "genesisEndTime", label: "Genesis Endtime" },
      { id: "raisedAmount", label: "Total Raised" },
      { id: "population", label: "Population" },
      { id: "progress", label: "Progress" },
    ],
  },
  refund: [],
  locked: [
    { id: "createdAt", label: "Creation Time" },
    { id: "unlockTime", label: "Unlock Time" },
    { id: "marketCap", label: "Trading Volume" },
    { id: "stakingApy", label: "Staking APY" },
    { id: "treasuryFund", label: "Treasury Fund" },
  ],
  unlocked: [
    { id: "createdAt", label: "Creation Time" },
    { id: "marketCap", label: "Trading Volume" },
    { id: "stakingApy", label: "Staking APY" },
  ],
}

// Projects per page
const PROJECTS_PER_PAGE = 15

// Minimum total fundraising amount
const MIN_TOTAL_FUND = 10

// Custom date time formatting function using local timezone
function formatDateTime(dateTimeStr: string): string {
  const date = new Date(dateTimeStr)

  // Get local time
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  const hours = String(date.getHours()).padStart(2, "0")
  const minutes = String(date.getMinutes()).padStart(2, "0")

  // Get timezone offset (minutes)
  const offsetMinutes = date.getTimezoneOffset()
  // Convert to hours and minutes
  const offsetHours = Math.abs(Math.floor(offsetMinutes / 60))
  const offsetMinutesPart = Math.abs(offsetMinutes % 60)

  // Format as UTC+X:XX or UTC-X:XX
  const sign = offsetMinutes <= 0 ? "+" : "-"
  const formattedOffset = `UTC${sign}${offsetHours.toString().padStart(1, "0")}${
    offsetMinutesPart > 0 ? `:${offsetMinutesPart.toString().padStart(2, "0")}` : ""
  }`

  // Return formatted date time string with timezone info
  return `${year}-${month}-${day} ${hours}:${minutes} ${formattedOffset}`
}

export default function MemeverseBoardPage() {
  const [activeChainFilter, setActiveChainFilter] = useState("all")
  const [activeStageFilter, setActiveStageFilter] = useState("genesis")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProjects, setFilteredProjects] = useState<any[]>([])
  const [isChainDropdownOpen, setIsChainDropdownOpen] = useState(false)
  const [isStageDropdownOpen, setIsStageDropdownOpen] = useState(false)
  const [selectedMode, setSelectedMode] = useState("normal") // "normal", "flash"
  const [showListedOnOutSwap, setShowListedOnOutSwap] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortOption, setSortOption] = useState<string>("createdAt") // 默认按创建时间排序
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc") // 默认降序
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const router = useRouter()

  // Get sort options applicable to the current stage and mode
  const getSortOptions = () => {
    if (activeStageFilter === "genesis") {
      return SORT_OPTIONS.genesis[selectedMode] || []
    }
    return SORT_OPTIONS[activeStageFilter] || []
  }

  // Get the label of the current sort option
  const getCurrentSortLabel = () => {
    const options = getSortOptions()
    const option = options.find((opt) => opt.id === sortOption)
    return option ? option.label : "Creation Time"
  }

  // Handle filtering logic
  useEffect(() => {
    let result = [...MOCK_PROJECTS]

    // Apply stage filter
    const stageMap: Record<string, string> = {
      genesis: "Genesis",
      refund: "Refund",
      locked: "Locked",
      unlocked: "Unlocked",
    }
    result = result.filter((project) => project.stage === stageMap[activeStageFilter])

    // Apply mode filter (only in Genesis stage)
    if (activeStageFilter === "genesis") {
      result = result.filter((project) => project.mode === selectedMode)
    }

    // Apply OutSwap listing filter (only in Genesis stage)
    if (activeStageFilter === "genesis" && showListedOnOutSwap) {
      result = result.filter((project) => project.listedOnOutSwap)
    }

    // Apply chain filter
    if (activeChainFilter !== "all") {
      result = result.filter((project) => project.chain?.toLowerCase() === activeChainFilter)
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (project) =>
          project.name.toLowerCase().includes(query) ||
          project.symbol.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query),
      )
    }

    // Apply sorting
    if (sortOption) {
      result.sort((a, b) => {
        let valueA = a[sortOption]
        let valueB = b[sortOption]

        // Handle date strings
        if (
          typeof valueA === "string" &&
          (sortOption === "createdAt" || sortOption === "genesisEndTime" || sortOption === "unlockTime")
        ) {
          valueA = new Date(valueA).getTime()
          valueB = new Date(valueB).getTime()
        }

        if (sortDirection === "asc") {
          return valueA > valueB ? 1 : -1
        } else {
          return valueA < valueB ? 1 : -1
        }
      })
    }

    setFilteredProjects(result)
    // Reset to first page
    setCurrentPage(1)
  }, [activeChainFilter, activeStageFilter, searchQuery, selectedMode, showListedOnOutSwap, sortOption, sortDirection])

  // Calculate total pages
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE)

  // Get current page projects
  const currentProjects = filteredProjects.slice((currentPage - 1) * PROJECTS_PER_PAGE, currentPage * PROJECTS_PER_PAGE)

  // Handle page number change
  const handlePageChange = (pageNumber: number) => {
    // Ensure page number is within valid range
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
      // Scroll to the top of the page
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // Toggle sort direction
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc")
  }

  // Generate page number buttons
  const renderPagination = () => {
    // If total pages is less than or equal to 1, don't show pagination
    if (totalPages <= 1) return null

    const pageNumbers = []

    // Show at most 5 page number buttons
    const maxButtonsToShow = 5
    let startPage: number
    let endPage: number

    if (totalPages <= maxButtonsToShow) {
      // If total pages is less than or equal to max buttons to show, show all page numbers
      startPage = 1
      endPage = totalPages
    } else {
      // Otherwise, calculate start and end page numbers
      const maxPagesBeforeCurrentPage = Math.floor(maxButtonsToShow / 2)
      const maxPagesAfterCurrentPage = Math.ceil(maxButtonsToShow / 2) - 1

      if (currentPage <= maxPagesBeforeCurrentPage) {
        // Current page is close to the beginning
        startPage = 1
        endPage = maxButtonsToShow
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        // Current page is close to the end
        startPage = totalPages - maxButtonsToShow + 1
        endPage = totalPages
      } else {
        // Current page is in the middle
        startPage = currentPage - maxPagesBeforeCurrentPage
        endPage = currentPage + maxPagesAfterCurrentPage
      }
    }

    // Generate page number buttons
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }

    return (
      <div className="flex items-center justify-center mt-8 space-x-2">
        {/* Previous page button */}
        <Button
          variant="outline"
          size="sm"
          className={`rounded-full w-8 h-8 flex items-center justify-center p-0 bg-black/30 border ${
            currentPage === 1
              ? "border-purple-500/20 text-pink-300/50 cursor-not-allowed"
              : "border-purple-500/30 text-pink-300 hover:border-pink-400/50"
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Page number buttons */}
        {pageNumbers.map((number) => (
          <Button
            key={number}
            variant="outline"
            size="sm"
            className={`rounded-full w-8 h-8 flex items-center justify-center p-0 ${
              currentPage === number
                ? "bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-white border-transparent shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                : "bg-black/30 border border-purple-500/30 text-pink-300 hover:border-pink-400/50"
            }`}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </Button>
        ))}

        {/* Next page button */}
        <Button
          variant="outline"
          size="sm"
          className={`rounded-full w-8 h-8 flex items-center justify-center p-0 bg-black/30 border ${
            currentPage === totalPages
              ? "border-purple-500/20 text-pink-300/50 cursor-not-allowed"
              : "border-purple-500/30 text-pink-300 hover:border-pink-400/50"
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  const toggleChainDropdown = () => {
    if (activeDropdown === "chain") {
      setActiveDropdown(null)
      setIsChainDropdownOpen(false)
    } else {
      setActiveDropdown("chain")
      setIsChainDropdownOpen(true)
      setIsStageDropdownOpen(false)
      setIsSortDropdownOpen(false)
    }
  }

  const toggleStageDropdown = () => {
    if (activeDropdown === "stage") {
      setActiveDropdown(null)
      setIsStageDropdownOpen(false)
    } else {
      setActiveDropdown("stage")
      setIsStageDropdownOpen(true)
      setIsChainDropdownOpen(false)
      setIsSortDropdownOpen(false)
    }
  }

  const toggleSortDropdown = () => {
    if (activeDropdown === "sort") {
      setActiveDropdown(null)
      setIsSortDropdownOpen(false)
    } else {
      setActiveDropdown("sort")
      setIsSortDropdownOpen(true)
      setIsChainDropdownOpen(false)
      setIsStageDropdownOpen(false)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown) {
        const target = event.target as HTMLElement
        if (!target.closest(".dropdown-container")) {
          setActiveDropdown(null)
          setIsChainDropdownOpen(false)
          setIsStageDropdownOpen(false)
          setIsSortDropdownOpen(false)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [activeDropdown])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page content */}
      <div className="container px-4 md:px-6 mx-auto py-24">
        {/* Page title */}
        <SectionHeading
          title="Consensus Board"
          description="Discover and participate in the latest consensus launching through the Memeverse"
          gradient="from-purple-400 via-pink-500 to-blue-500"
          align="center"
          className="mb-12 lg:mb-12 mb-8"
        />

        {/* Search and filters */}
        <div className="mb-8">
          {/* 移动端布局 - 只在移动端显示 */}
          <div className="flex flex-col gap-6 lg:hidden">
            {/* Consensus Launch按钮 - 移动端位置 */}
            <Button
              className="bg-gradient-to-r from-purple-600/80 via-pink-500/80 to-purple-600/80 border-[1.5px] border-cyan-400/70 hover:border-cyan-300 text-white font-bold py-2.5 px-6 rounded-lg shadow-[0_0_15px_rgba(236,72,153,0.6)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(236,72,153,0.8)] relative overflow-hidden group w-auto mx-auto -mt-2 lg:mt-0"
              onClick={() => router.push("/memeverse/create")}
            >
              <div className="flex items-center justify-center gap-2 relative z-10">
                <span className="text-base font-semibold bg-gradient-to-r from-cyan-300 via-white to-cyan-300 bg-clip-text text-transparent">
                  Consensus Launch
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>

            {/* 搜索框 - 移动端位置 */}
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-pink-400" />
              </div>
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2 bg-black/30 border border-purple-500/30 rounded-lg text-white placeholder:text-pink-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 focus:border-pink-500/50 hover:border-pink-400/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* 筛选器 - 移动端位置 */}
            <div className="flex flex-wrap gap-2 w-full items-center">
              {/* Chain filter dropdown menu */}
              <div className="relative dropdown-container">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-black/30 border border-purple-500/30 text-pink-300 hover:bg-purple-900/30 hover:border-pink-400/50 rounded-full transition-all duration-300 px-4"
                  onClick={toggleChainDropdown}
                >
                  <div className="flex items-center justify-center gap-1">
                    {activeChainFilter !== "all" ? (
                      <div className="flex items-center gap-1.5">
                        <img
                          src={CHAIN_FILTERS.find((c) => c.id === activeChainFilter)?.icon || "/placeholder.svg"}
                          alt={activeChainFilter}
                          className="w-4 h-4"
                        />
                        {CHAIN_FILTERS.find((c) => c.id === activeChainFilter)?.label}
                      </div>
                    ) : (
                      "All Chains"
                    )}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </div>
                </Button>
                {isChainDropdownOpen && (
                  <div className="absolute z-50 mt-2 w-48 rounded-md bg-gradient-to-br from-purple-950/90 via-[#150538]/95 to-indigo-950/90 backdrop-blur-md border border-purple-500/40 shadow-[0_4px_20px_rgba(138,75,175,0.3)] animate-in fade-in-50 zoom-in-95 duration-200">
                    <div className="py-1">
                      {CHAIN_FILTERS.map((chain) => (
                        <button
                          key={chain.id}
                          className={`flex items-center w-full px-4 py-2 text-sm ${
                            activeChainFilter === chain.id
                              ? "bg-gradient-to-r from-purple-600/40 to-pink-500/40 text-pink-200 shadow-[0_0_10px_rgba(168,85,247,0.2)_inset]"
                              : "text-pink-300 hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-pink-500/30 hover:text-pink-200"
                          } transition-all duration-300 rounded-sm`}
                          onClick={() => {
                            setActiveChainFilter(chain.id)
                            setIsChainDropdownOpen(false)
                            setActiveDropdown(null) // Reset activeDropdown state
                          }}
                        >
                          {chain.icon && (
                            <img src={chain.icon || "/placeholder.svg"} alt={chain.label} className="w-4 h-4 mr-2" />
                          )}
                          {chain.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Stage filter dropdown menu */}
              <div className="relative dropdown-container">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-black/30 border border-purple-500/30 text-pink-300 hover:bg-purple-900/30 hover:border-pink-400/50 rounded-full transition-all duration-300 px-4"
                  onClick={toggleStageDropdown}
                >
                  <div className="flex items-center justify-center gap-1">
                    {STAGE_FILTERS.find((s) => s.id === activeStageFilter)?.label}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </div>
                </Button>
                {isStageDropdownOpen && (
                  <div className="absolute z-50 mt-2 w-48 rounded-md bg-gradient-to-br from-purple-950/90 via-[#150538]/95 to-indigo-950/90 backdrop-blur-md border border-purple-500/40 shadow-[0_4px_20px_rgba(138,75,175,0.3)] animate-in fade-in-50 zoom-in-95 duration-200">
                    <div className="py-1">
                      {STAGE_FILTERS.map((stage) => (
                        <button
                          key={stage.id}
                          className={`w-full text-left px-4 py-2 text-sm ${
                            activeStageFilter === stage.id
                              ? "bg-gradient-to-r from-purple-600/40 to-pink-500/40 text-pink-200 shadow-[0_0_10px_rgba(168,85,247,0.2)_inset]"
                              : "text-pink-300 hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-pink-500/30 hover:text-pink-200"
                          } transition-all duration-300 rounded-sm`}
                          onClick={() => {
                            setActiveStageFilter(stage.id)
                            setIsStageDropdownOpen(false)
                            setActiveDropdown(null) // Reset activeDropdown state
                            setSortOption("createdAt") // Reset to default sorting
                          }}
                        >
                          {stage.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sort filter */}
              <div className="relative dropdown-container">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-black/30 border border-purple-500/30 text-pink-300 hover:bg-purple-900/30 hover:border-pink-400/50 rounded-full transition-all duration-300 px-4"
                  onClick={toggleSortDropdown}
                >
                  <div className="flex items-center justify-center gap-1">
                    {getCurrentSortLabel()}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </div>
                </Button>
                {isSortDropdownOpen && (
                  <div className="absolute z-50 mt-2 w-48 rounded-md bg-gradient-to-br from-purple-950/90 via-[#150538]/95 to-indigo-950/90 backdrop-blur-md border border-purple-500/40 shadow-[0_4px_20px_rgba(138,75,175,0.3)] animate-in fade-in-50 zoom-in-95 duration-200">
                    <div className="py-1">
                      {getSortOptions().map((option) => (
                        <button
                          key={option.id}
                          className={`flex items-center w-full px-4 py-2 text-sm ${
                            sortOption === option.id
                              ? "bg-gradient-to-r from-purple-600/40 to-pink-500/40 text-pink-200 shadow-[0_0_10px_rgba(168,85,247,0.2)_inset]"
                              : "text-pink-300 hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-pink-500/30 hover:text-pink-200"
                          } transition-all duration-300 rounded-sm`}
                          onClick={() => {
                            setSortOption(option.id)
                            setIsSortDropdownOpen(false)
                            setActiveDropdown(null) // Reset activeDropdown state
                          }}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sort direction button */}
              <Button
                variant="outline"
                size="sm"
                className="p-0 w-8 h-8 flex justify-center items-center bg-black/30 border border-purple-500/30 rounded-full hover:bg-purple-900/30 hover:border-pink-400/50"
                onClick={toggleSortDirection}
              >
                {sortDirection === "asc" ? (
                  <SortAsc className="h-4 w-4 text-pink-300" />
                ) : (
                  <SortDesc className="h-4 w-4 text-pink-300" />
                )}
              </Button>
            </div>
          </div>

          {/* PC端布局 - 只在PC端显示 */}
          <div className="hidden lg:flex lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search box */}
            <div className="relative w-full lg:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-pink-400" />
              </div>
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2 bg-black/30 border border-purple-500/30 rounded-lg text-white placeholder:text-pink-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 focus:border-pink-500/50 hover:border-pink-400/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Create button - PC端位置 */}
            <Button
              className="bg-gradient-to-r from-purple-600/80 via-pink-500/80 to-purple-600/80 border-[1.5px] border-cyan-400/70 hover:border-cyan-300 text-white font-bold py-2.5 px-6 rounded-lg shadow-[0_0_15px_rgba(236,72,153,0.6)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(236,72,153,0.8)] relative overflow-hidden group"
              onClick={() => router.push("/memeverse/create")}
            >
              <div className="flex items-center gap-2 relative z-10">
                <span className="text-base font-semibold bg-gradient-to-r from-cyan-300 via-white to-cyan-300 bg-clip-text text-transparent">
                  Consensus Launch
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>

            {/* Filters - PC端位置 */}
            <div className="flex flex-wrap gap-2 w-full lg:w-auto items-center">
              {/* Chain filter dropdown menu */}
              <div className="relative dropdown-container">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-black/30 border border-purple-500/30 text-pink-300 hover:bg-purple-900/30 hover:border-pink-400/50 rounded-full transition-all duration-300 px-4"
                  onClick={toggleChainDropdown}
                >
                  <div className="flex items-center justify-center gap-1">
                    {activeChainFilter !== "all" ? (
                      <div className="flex items-center gap-1.5">
                        <img
                          src={CHAIN_FILTERS.find((c) => c.id === activeChainFilter)?.icon || "/placeholder.svg"}
                          alt={activeChainFilter}
                          className="w-4 h-4"
                        />
                        {CHAIN_FILTERS.find((c) => c.id === activeChainFilter)?.label}
                      </div>
                    ) : (
                      "All Chains"
                    )}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </div>
                </Button>
                {isChainDropdownOpen && (
                  <div className="absolute z-50 mt-2 w-48 rounded-md bg-gradient-to-br from-purple-950/90 via-[#150538]/95 to-indigo-950/90 backdrop-blur-md border border-purple-500/40 shadow-[0_4px_20px_rgba(138,75,175,0.3)] animate-in fade-in-50 zoom-in-95 duration-200">
                    <div className="py-1">
                      {CHAIN_FILTERS.map((chain) => (
                        <button
                          key={chain.id}
                          className={`flex items-center w-full px-4 py-2 text-sm ${
                            activeChainFilter === chain.id
                              ? "bg-gradient-to-r from-purple-600/40 to-pink-500/40 text-pink-200 shadow-[0_0_10px_rgba(168,85,247,0.2)_inset]"
                              : "text-pink-300 hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-pink-500/30 hover:text-pink-200"
                          } transition-all duration-300 rounded-sm`}
                          onClick={() => {
                            setActiveChainFilter(chain.id)
                            setIsChainDropdownOpen(false)
                            setActiveDropdown(null) // Reset activeDropdown state
                          }}
                        >
                          {chain.icon && (
                            <img src={chain.icon || "/placeholder.svg"} alt={chain.label} className="w-4 h-4 mr-2" />
                          )}
                          {chain.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Stage filter dropdown menu */}
              <div className="relative dropdown-container">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-black/30 border border-purple-500/30 text-pink-300 hover:bg-purple-900/30 hover:border-pink-400/50 rounded-full transition-all duration-300 px-4"
                  onClick={toggleStageDropdown}
                >
                  <div className="flex items-center justify-center gap-1">
                    {STAGE_FILTERS.find((s) => s.id === activeStageFilter)?.label}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </div>
                </Button>
                {isStageDropdownOpen && (
                  <div className="absolute z-50 mt-2 w-48 rounded-md bg-gradient-to-br from-purple-950/90 via-[#150538]/95 to-indigo-950/90 backdrop-blur-md border border-purple-500/40 shadow-[0_4px_20px_rgba(138,75,175,0.3)] animate-in fade-in-50 zoom-in-95 duration-200">
                    <div className="py-1">
                      {STAGE_FILTERS.map((stage) => (
                        <button
                          key={stage.id}
                          className={`w-full text-left px-4 py-2 text-sm ${
                            activeStageFilter === stage.id
                              ? "bg-gradient-to-r from-purple-600/40 to-pink-500/40 text-pink-200 shadow-[0_0_10px_rgba(168,85,247,0.2)_inset]"
                              : "text-pink-300 hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-pink-500/30 hover:text-pink-200"
                          } transition-all duration-300 rounded-sm`}
                          onClick={() => {
                            setActiveStageFilter(stage.id)
                            setIsStageDropdownOpen(false)
                            setActiveDropdown(null) // Reset activeDropdown state
                            setSortOption("createdAt") // Reset to default sorting
                          }}
                        >
                          {stage.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sort filter */}
              <div className="relative dropdown-container">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-black/30 border border-purple-500/30 text-pink-300 hover:bg-purple-900/30 hover:border-pink-400/50 rounded-full transition-all duration-300 px-4"
                  onClick={toggleSortDropdown}
                >
                  <div className="flex items-center justify-center gap-1">
                    {getCurrentSortLabel()}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </div>
                </Button>
                {isSortDropdownOpen && (
                  <div className="absolute z-50 mt-2 w-48 rounded-md bg-gradient-to-br from-purple-950/90 via-[#150538]/95 to-indigo-950/90 backdrop-blur-md border border-purple-500/40 shadow-[0_4px_20px_rgba(138,75,175,0.3)] animate-in fade-in-50 zoom-in-95 duration-200">
                    <div className="py-1">
                      {getSortOptions().map((option) => (
                        <button
                          key={option.id}
                          className={`flex items-center w-full px-4 py-2 text-sm ${
                            sortOption === option.id
                              ? "bg-gradient-to-r from-purple-600/40 to-pink-500/40 text-pink-200 shadow-[0_0_10px_rgba(168,85,247,0.2)_inset]"
                              : "text-pink-300 hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-pink-500/30 hover:text-pink-200"
                          } transition-all duration-300 rounded-sm`}
                          onClick={() => {
                            setSortOption(option.id)
                            setIsSortDropdownOpen(false)
                            setActiveDropdown(null) // Reset activeDropdown state
                          }}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sort direction button */}
              <Button
                variant="outline"
                size="sm"
                className="p-0 w-8 h-8 flex justify-center items-center bg-black/30 border border-purple-500/30 rounded-full hover:bg-purple-900/30 hover:border-pink-400/50"
                onClick={toggleSortDirection}
              >
                {sortDirection === "asc" ? (
                  <SortAsc className="h-4 w-4 text-pink-300" />
                ) : (
                  <SortDesc className="h-4 w-4 text-pink-300" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Genesis stage special filters */}
        {activeStageFilter === "genesis" && (
          <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Mode toggle buttons */}
            <div className="flex items-center bg-black/30 backdrop-blur-sm rounded-full p-1 border border-purple-500/30">
              <button
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedMode === "normal"
                    ? "bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                    : "text-pink-300 hover:text-pink-200"
                }`}
                onClick={() => setSelectedMode("normal")}
              >
                Normal Mode
              </button>
              <button
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedMode === "flash"
                    ? "bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                    : "text-pink-300 hover:text-pink-200"
                }`}
                onClick={() => setSelectedMode("flash")}
              >
                Flash Mode
              </button>
            </div>
          </div>
        )}

        {/* Project list */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {currentProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* No results message */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="text-2xl font-bold text-pink-400 mb-2">No projects found</div>
            <p className="text-pink-300/70">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Pagination component */}
        {renderPagination()}
      </div>
    </div>
  )
}

// Format market cap
function formatMarketCap(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M`
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(2)}K`
  } else {
    return `${value}`
  }
}

// Format USD amount
function formatUSD(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}

// Project card component - redesigned scaling and transition effects
function ProjectCard({ project }: { project: any }) {
  const router = useRouter()

  const stageStyle = STAGE_COLORS[project.stage] || {
    bg: "bg-gray-600",
    text: "text-white",
    glow: "",
    gradient: "from-gray-600 to-gray-500",
  }

  // Determine card border gradient color
  const getBorderGradient = () => {
    switch (project.stage) {
      case "Genesis":
        return "from-purple-500/70 via-pink-500/70 to-purple-500/70"
      case "Locked":
        return "from-pink-500/70 via-purple-500/70 to-pink-500/70"
      case "Unlocked":
        return "from-cyan-400/80 via-blue-500/80 to-indigo-400/80" // 增强亮度和对比度
      case "Refund":
        return "from-red-400/80 via-orange-500/80 to-yellow-500/80" // 增强亮度和对比度
      default:
        return "from-white/10 to-white/5"
    }
  }

  // Determine card background gradient color
  const getBackgroundGradient = () => {
    switch (project.stage) {
      case "Genesis":
        return "from-purple-950/90 via-[#0f0326]/95 to-purple-950/90"
      case "Locked":
        return "from-pink-950/90 via-[#0f0326]/95 to-pink-950/90"
      case "Unlocked":
        return "from-cyan-950/90 via-[#0f0326]/95 to-cyan-950/90"
      case "Refund":
        return "from-red-950/90 via-[#0f0326]/95 to-red-950/90"
      default:
        return "from-[#0f0326]/95 to-[#0f0326]/95"
    }
  }

  // Get shadow color when hovering over the card
  const getHoverShadowColor = () => {
    switch (project.stage) {
      case "Genesis":
        return "rgba(168,85,247,0.4)"
      case "Locked":
        return "rgba(236,72,153,0.4)"
      case "Unlocked":
        return "rgba(6,182,212,0.5)" // 增强亮度
      case "Refund":
        return "rgba(239,68,68,0.5)" // 增强亮度
      default:
        return "rgba(168,85,247,0.4)"
    }
  }

  // Calculate progress percentage for Genesis stage
  const calculateProgress = () => {
    if (project.stage === "Genesis") {
      // Calculate progress by dividing raisedAmount by MIN_TOTAL_FUND (10 UETH)
      const progressPercent = (project.raisedAmount / MIN_TOTAL_FUND) * 100
      // Don't limit maximum progress, allow exceeding 100%
      return progressPercent
    }
    return project.progress || 0
  }

  // Get progress bar gradient color
  const getProgressGradient = () => {
    const progress = calculateProgress()
    if (progress >= 100) {
      // Use brighter gradient colors when exceeding 100%
      return "from-cyan-400 via-purple-400 to-pink-400"
    }
    return "from-purple-500 via-pink-500 to-purple-500"
  }

  // High APY indicator
  const isHighApy = project.stakingApy && project.stakingApy > 1000

  // Handle card click event
  const handleCardClick = () => {
    // 所有项目都导航到detail页面
    if (project.symbol === "DDIN" || project.symbol === "MDRG" || project.symbol === "QPEPE") {
      router.push(`/memeverse/${project.id}/detail/`)
    } else {
      // 对于其他项目，显示提示信息
      alert("详情页面正在建设中...")
    }
  }

  // Determine if the project is clickable
  const isClickable = project.symbol === "DDIN" || project.symbol === "MDRG" || project.symbol === "QPEPE"

  return (
    <div
      className={`card-container relative ${isClickable ? "cursor-pointer" : "cursor-default"} group`}
      onClick={handleCardClick}
      data-stage={project.stage}
    >
      {/* Use an outer container to handle hover effects */}
      <div
        className="card-float-wrapper"
        style={
          {
            "--hover-shadow-color": getHoverShadowColor(),
          } as React.CSSProperties
        }
      >
        {/* Card body - contains border and content */}
        <div className="relative rounded-lg overflow-hidden md:h-auto">
          {/* Gradient border */}
          <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${getBorderGradient()} opacity-90`}></div>

          {/* Card content */}
          <div
            className={`bg-gradient-to-br ${getBackgroundGradient()} rounded-lg overflow-hidden relative z-10 m-[1px]`}
          >
            <div className="p-2.5 relative z-10">
              <div className="flex justify-between items-center mb-1.5">
                <div className="flex items-center max-w-[180px] overflow-hidden">
                  <span
                    className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 text-base whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px]"
                    title={project.symbol}
                  >
                    {project.symbol}
                  </span>{" "}
                  <span
                    className="text-sm text-pink-200/90 ml-1 whitespace-nowrap overflow-hidden text-ellipsis max-w-[70px]"
                    title={project.name}
                  >
                    {project.name}
                  </span>
                </div>

                {/* Market Cap */}
                <div className="text-cyan-300/80 text-xs mx-auto">
                  Market Cap: <span className="text-cyan-200 font-medium">{formatMarketCap(project.marketCap)}</span>
                </div>

                {/* Stage label */}
                <div
                  className={`text-xs px-3 py-1 rounded-md bg-gradient-to-r ${stageStyle.gradient} ${stageStyle.text} ${stageStyle.glow} transition-all duration-300`}
                >
                  {project.stage}
                </div>
              </div>

              <div className="flex">
                {/* Left project image */}
                <div className="w-[120px] h-[120px] flex-shrink-0 relative flex items-center justify-center rounded-md overflow-hidden transition-all duration-300">
                  <img
                    src={"/placeholder.svg"}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />

                  {/* High APY indicator */}
                  {isHighApy && (
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-white text-xs font-bold px-2 py-0.5 rounded-md flex items-center shadow-[0_0_8px_rgba(234,179,8,0.5)]">
                      <Star className="w-3 h-3 mr-1 fill-white" />
                      High APY
                    </div>
                  )}
                </div>

                {/* Right project information */}
                <div className="flex-1 pl-3 flex flex-col min-w-0 h-[120px] lg:h-auto lg:min-h-[120px] relative">
                  {/* Project description - fixed at the top */}
                  <p
                    className="text-cyan-300/70 text-xs mb-1.5 whitespace-nowrap overflow-hidden text-ellipsis transition-colors duration-200 hover:text-cyan-200/90"
                    title={project.description}
                  >
                    {project.description}
                  </p>

                  {/* Other information - bottom aligned */}
                  <div className="mt-auto space-y-1 overflow-hidden">
                    {/* Omnichain support */}
                    <div className="text-pink-300/70 text-xs flex items-center relative">
                      <span className="text-pink-300/90 mr-1">Omnichain:</span>
                      <div className="flex">
                        {project.omnichain?.map((chain, index) => (
                          <ChainTooltip key={index} chainName={chain.name} chainIcon={chain.icon} />
                        ))}
                      </div>
                    </div>

                    {/* Show Total Raised in Genesis and Refund stages */}
                    {(project.stage === "Genesis" || project.stage === "Refund") && (
                      <div className="text-pink-300/70 text-xs">
                        Total Raised:{" "}
                        <span className="text-pink-200 font-medium">
                          {project.raisedAmount.toFixed(2)} {project.raisedToken}
                        </span>
                      </div>
                    )}

                    {/* Show Genesis Endtime in Genesis stage */}
                    {project.stage === "Genesis" && project.genesisEndTime && (
                      <div className="text-pink-300/70 text-xs">
                        Genesis Endtime:{" "}
                        <span className="text-pink-200 font-medium">{formatDateTime(project.genesisEndTime)}</span>
                      </div>
                    )}

                    {/* Show Unlock Time in Locked stage */}
                    {project.stage === "Locked" && project.unlockTime && (
                      <div className="text-pink-300/70 text-xs">
                        Unlock Time:{" "}
                        <span className="text-pink-200 font-medium">{formatDateTime(project.unlockTime)}</span>
                      </div>
                    )}

                    {/* Show Staking APY in Locked and Unlocked stages */}
                    {(project.stage === "Locked" || project.stage === "Unlocked") && project.stakingApy && (
                      <div className="text-pink-300/70 text-xs">
                        Staking APY:{" "}
                        <span className={`${isHighApy ? "text-yellow-400" : "text-green-400"} font-medium`}>
                          {project.stakingApy.toFixed(2)}%
                        </span>
                      </div>
                    )}

                    {/* Show Treasury Fund in Locked and Unlocked stages */}
                    {(project.stage === "Locked" || project.stage === "Unlocked") && project.treasuryFund && (
                      <div className="text-pink-300/70 text-xs">
                        Treasury Fund:{" "}
                        <span className="text-pink-200 font-medium">{formatUSD(project.treasuryFund)}</span>
                      </div>
                    )}

                    {/* Show Unlock Time in Genesis stage, Population in other stages */}
                    {/* 对于Genesis阶段，显示Unlock Time而不是Population */}
                    {project.stage === "Genesis" ? (
                      <div className="text-pink-300/70 text-xs">
                        Unlock Time:{" "}
                        <span className="text-pink-200 font-medium">
                          {project.unlockTime ? formatDateTime(project.unlockTime) : "TBA"}
                        </span>
                      </div>
                    ) : (
                      <div className="text-pink-300/70 text-xs">
                        Population:{" "}
                        <span className="text-pink-200 font-medium">{project.population.toLocaleString()}</span>
                      </div>
                    )}

                    {/* Progress bar and percentage - displayed in Genesis stage */}
                    {project.stage === "Genesis" && (
                      <div className="flex items-center">
                        <div className="flex-grow">
                          <div className="w-full bg-black/50 rounded-full h-2 overflow-hidden">
                            <div
                              className={`bg-gradient-to-r ${getProgressGradient()} h-full transition-all duration-500`}
                              style={{
                                width: `${Math.min(calculateProgress(), 100)}%`,
                                boxShadow: calculateProgress() >= 100 ? "0 0 8px rgba(236,72,153,0.6)" : "none",
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-right text-xs ml-2">
                          <span
                            className={
                              calculateProgress() >= 100 ? "text-cyan-300 font-medium" : "text-pink-400 font-medium"
                            }
                          >
                            {calculateProgress().toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
