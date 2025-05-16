"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

// Import components
import { ProjectDetails } from "@/components/memeverse/project-details"
import { DepositSection } from "@/components/memeverse/deposit-section"
import { OverviewTab } from "@/components/memeverse/overview-tab"

// Mock data - only DDIN and MDRG projects
const MOCK_VERSE = [
  {
    id: 30, // DDIN ID in projects list
    name: "Digital Dinosaurs",
    symbol: "DDIN",
    description:
      "Prehistoric reptilian token with evolutionary governance and cross-chain compatibility. Digital Dinosaurs combines ancient wisdom with cutting-edge blockchain technology to create a sustainable ecosystem for long-term growth.",
    stage: "Genesis",
    mode: "normal",
    raisedAmount: 30.75,
    raisedToken: "UETH",
    population: 62,
    marketCap: 270000,
    progress: 21.5,
    genesisEndTime: "2023-09-30T15:30:00Z",
    createdAt: "2023-06-30T14:15:00Z",
    unlockTime: "2023-10-30T15:30:00Z",
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Arbitrum", chainid: 42161, icon: "/networks/arbitrum.svg" },
      { name: "Polygon", chainid: 137, icon: "/networks/polygon.svg" },
    ],
    website: "https://digitaldinosaurs.io",
    twitter: "https://twitter.com/digitaldinosaurs",
    telegram: "https://t.me/digitaldinosaurs",
    discord: "https://discord.gg/digitaldinosaurs",
    features: [
      "Deflationary tokenomics with automatic burn mechanism",
      "Cross-chain compatibility for maximum accessibility",
      "DAO governance allowing token holders to vote on ecosystem decisions",
      "Staking rewards with variable APY based on lock-up period",
      "NFT integration planned for Q4 2023",
    ],
    development: [
      "Metaverse integration with virtual dinosaur sanctuary",
      "Mobile app for tracking portfolio and staking rewards",
      "Strategic partnerships with major blockchain projects",
      "Educational platform for blockchain and paleontology enthusiasts",
    ],
  },
  {
    id: 23, // MDRG ID in projects list
    name: "Meta Dragons",
    symbol: "MDRG",
    description:
      "Metaverse dragon collectibles with play-to-earn mechanics and cross-chain interoperability. Meta Dragons creates an immersive virtual world where players can collect, breed, and battle digital dragons while earning rewards.",
    stage: "Genesis",
    mode: "flash",
    raisedAmount: 145.2,
    raisedToken: "UETH",
    population: 92,
    marketCap: 420000,
    progress: 45.2,
    genesisEndTime: "2023-06-19T15:30:00Z",
    createdAt: "2023-05-06T14:20:00Z",
    unlockTime: "2023-07-19T15:30:00Z",
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Polygon", chainid: 137, icon: "/networks/polygon.svg" },
    ],
    website: "https://metadragons.io",
    twitter: "https://twitter.com/metadragons",
    telegram: "https://t.me/metadragons",
    discord: "https://discord.gg/metadragons",
    features: [
      "Play-to-earn game mechanics with daily quests and rewards",
      "Unique dragon NFTs with genetic traits and breeding system",
      "Cross-chain marketplace for trading dragons and items",
      "Guild system for cooperative gameplay and shared rewards",
      "Weekly tournaments with substantial prize pools",
    ],
    development: [
      "Mobile app for on-the-go dragon management",
      "3D metaverse expansion with customizable dragon lairs",
      "Cross-game partnerships for dragon usage in multiple games",
      "Real-world merchandise and collectibles",
    ],
    stakingApy: 1250.75,
    treasuryFund: 1800000,
  },
]

// Format date time function to display in UTC time
function formatDateTime(dateTimeStr: string): string {
  const date = new Date(dateTimeStr)

  // 获取 UTC 年、月、日
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, "0")
  const day = String(date.getUTCDate()).padStart(2, "0")

  // 获取 UTC 小时、分钟
  const hours = String(date.getUTCHours()).padStart(2, "0")
  const minutes = String(date.getUTCMinutes()).padStart(2, "0")

  // 返回格式化的 UTC 日期时间字符串
  return `${year}-${month}-${day} ${hours}:${minutes} (UTC)`
}

// 修改Stage颜色映射，使用更加统一的渐变和阴影效果
const STAGE_COLORS: Record<string, { bg: string; text: string; glow: string; gradient: string }> = {
  Genesis: {
    bg: "bg-purple-600",
    text: "text-white",
    glow: "shadow-[0_0_10px_rgba(168,85,247,0.7)]",
    gradient: "from-purple-600 via-pink-500 to-purple-600",
  },
  Refund: {
    bg: "bg-red-600",
    text: "text-white",
    glow: "shadow-[0_0_10px_rgba(239,68,68,0.7)]",
    gradient: "from-red-600 via-orange-500 to-red-600",
  },
  Locked: {
    bg: "bg-pink-600",
    text: "text-white",
    glow: "shadow-[0_0_10px_rgba(236,72,153,0.7)]",
    gradient: "from-pink-600 via-purple-500 to-pink-600",
  },
  Unlocked: {
    bg: "bg-cyan-600",
    text: "text-white",
    glow: "shadow-[0_0_10px_rgba(6,182,212,0.7)]",
    gradient: "from-cyan-500 via-blue-500 to-cyan-500",
  },
}

// Available tokens list
const AVAILABLE_TOKENS = [
  { symbol: "ETH", name: "Ethereum", icon: "/tokens/eth.svg", balance: 1.25 },
  { symbol: "weETH", name: "Wrapped Ethereum", icon: "/tokens/weth.svg", balance: 0.5 },
  { symbol: "stETH", name: "Staked Ethereum", icon: "/tokens/eth.svg", balance: 0.75 },
  { symbol: "UETH", name: "USD Ethereum", icon: "/tokens/eth.svg", balance: 1000.0 },
]

// OutStake providers list
const OUTSTAKE_PROVIDERS = [
  { id: "etherfi", name: "weETH (Etherfi)" },
  { id: "lido", name: "stETH (Lido)" },
]

// 定义可用的标签
const TABS = [
  { id: "overview", label: "Overview" },
  // 可以在这里添加更多标签
  // { id: "tokenomics", label: "Tokenomics" },
  // { id: "roadmap", label: "Roadmap" },
]

export default function VerseDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [verse, setVerse] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [myGenesisFunds, setMyGenesisFunds] = useState(0)

  useEffect(() => {
    const verseId = params.id
    if (!verseId) {
      setError("Verse ID does not exist")
      setLoading(false)
      return
    }

    // Simulate API request
    setTimeout(() => {
      const foundVerse = MOCK_VERSE.find((p) => p.id.toString() === verseId.toString())
      if (foundVerse) {
        setVerse(foundVerse)
        setLoading(false)
      } else {
        setError(`Cannot find memeverse with verseId ${verseId}`)
        setLoading(false)
      }
    }, 500) // Simulate loading delay
  }, [params.id])

  // Handle back button click
  const handleBackClick = () => {
    router.push("/memeverse/board")
  }

  // Handle deposit
  const handleDeposit = (amount: string, token: any, provider: any) => {
    if (!amount || isNaN(Number.parseFloat(amount)) || Number.parseFloat(amount) <= 0) {
      alert("Please enter a valid amount")
      return
    }

    // Update my genesis funds (demo only, should call contract in real app)
    setMyGenesisFunds((prev) => prev + Number.parseFloat(amount))

    // Show success message
    alert(`Successfully deposited ${amount} ${token.symbol}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-purple-500 border-r-transparent border-b-pink-500 border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-pink-300">Loading memeverse details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold text-pink-500 mb-4">Memeverse Not Found</h1>
          <p className="text-pink-300 mb-8">{error}</p>
          <Button
            onClick={handleBackClick}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to board
          </Button>
        </div>
      </div>
    )
  }

  if (!verse) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold text-pink-500 mb-4">Memeverse Not Found</h1>
          <p className="text-pink-300 mb-8">Unable to load verse details. Please return to the board and try again.</p>
          <Button
            onClick={handleBackClick}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            <ChevronLeft className="mr-0.5 h-4 w-4" />
            Back to Board
          </Button>
        </div>
      </div>
    )
  }

  const stageStyle = STAGE_COLORS[verse.stage] || {
    bg: "bg-gray-600",
    text: "text-white",
    glow: "",
    gradient: "from-gray-600 to-gray-500",
  }

  return (
    <div className="min-h-screen">
      {/* Page content - increased top spacing */}
      <div className="max-w-5xl px-4 md:px-6 mx-auto py-12 pt-28">
        {/* Back button - Outrun风格美化 */}
        <Button
          onClick={handleBackClick}
          variant="outline"
          className="mb-6 relative overflow-hidden group"
          style={{
            background: "rgba(15, 3, 38, 0.8)",
            border: "1px solid rgba(236, 72, 153, 0.4)",
            borderRadius: "9999px",
            boxShadow: "0 0 10px rgba(236, 72, 153, 0.3), 0 0 20px rgba(168, 85, 247, 0.2)",
            padding: "8px 16px",
          }}
        >
          {/* 背景渐变效果 */}
          <span className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-500/10 to-purple-600/10 group-hover:opacity-100 opacity-0 transition-opacity duration-500"></span>

          {/* 发光边框效果 */}
          <span
            className="absolute inset-00 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              boxShadow: "inset 0 0 8px rgba(236, 72, 153, 0.6), 0 0 12px rgba(168, 85, 247, 0.4)",
            }}
          ></span>

          {/* 按钮内容 */}
          <div className="flex items-center relative z-10">
            <ChevronLeft className="mr-1 h-4 w-4 text-pink-300 group-hover:text-pink-200 transition-colors duration-300" />
            <span className="text-pink-300 group-hover:text-pink-200 transition-colors duration-300 font-medium">
              Back to Board
            </span>
          </div>
        </Button>

        {/* 调整项目头部信息卡片的背景透明度 */}
        <div
          className="relative rounded-xl overflow-hidden p-4 md:p-6 mb-8"
          style={{
            boxShadow: "0 0 2px #ec4899, 0 0 15px rgba(236,72,153,0.4), 0 0 30px rgba(168,85,247,0.2)",
            border: "1px solid rgba(236,72,153,0.3)",
          }}
        >
          {/* 降低背景渐变的不透明度 */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f0326]/90 via-[#1a0445]/90 to-[#0f0326]/90 backdrop-blur-sm"></div>
          {/* 网格背景 */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
              backgroundPosition: "center center",
            }}
          ></div>

          <div className="relative flex flex-col lg:flex-row gap-4 md:gap-6 items-start">
            {/* Use vertical layout on small and medium screens */}
            <div className="w-full lg:hidden flex flex-col gap-4">
              <ProjectDetails project={verse} stageStyle={stageStyle} onBackClick={handleBackClick} />
              <DepositSection
                availableTokens={AVAILABLE_TOKENS}
                providers={OUTSTAKE_PROVIDERS}
                myGenesisFunds={myGenesisFunds}
                onDeposit={handleDeposit}
              />
            </div>

            {/* Use horizontal layout on large screens - adjust spacing for more uniformity */}
            <div className="hidden lg:flex lg:flex-row gap-6 items-start w-full justify-center">
              <ProjectDetails project={verse} stageStyle={stageStyle} onBackClick={handleBackClick} />
              <DepositSection
                availableTokens={AVAILABLE_TOKENS}
                providers={OUTSTAKE_PROVIDERS}
                myGenesisFunds={myGenesisFunds}
                onDeposit={handleDeposit}
              />
            </div>
          </div>
        </div>

        {/* 同样调整标签内容区域的背景透明度 */}
        <div
          className="relative rounded-xl overflow-hidden"
          style={{
            boxShadow: "0 0 2px #ec4899, 0 0 15px rgba(236,72,153,0.4), 0 0 30px rgba(168,85,247,0.2)",
            border: "1px solid rgba(236,72,153,0.3)",
          }}
        >
          {/* 降低背景渐变的不透明度并减少模糊效果 */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f0326]/90 via-[#1a0445]/90 to-[#0f0326]/90 backdrop-blur-sm"></div>
          {/* 网格背景 */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
              backgroundPosition: "center center",
            }}
          ></div>

          {/* 重新设计的标签导航 */}
          <div className="relative">
            {/* 标签导航 - 使用更加精致的设计 */}
            <div className="flex items-center px-6 pt-4 pb-0 space-x-1">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id ? "text-white" : "text-pink-300/80 hover:text-pink-200 hover:bg-purple-900/20"
                  }`}
                >
                  {/* 活动标签的背景效果 */}
                  {activeTab === tab.id && (
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 animate-gradient-x"></span>
                  )}
                  {/* 标签文本 - 确保在背景之上 */}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* 内容与标签导航之间的分隔线 */}
            <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent mx-6 mt-4"></div>

            {/* 标签内容 */}
            <div className="relative pt-4 px-6 pb-6">
              <OverviewTab
                description={verse.description}
                progress={verse.progress}
                stage={verse.stage}
                mode={verse.mode}
                website={verse.website}
                twitter={verse.twitter}
                telegram={verse.telegram}
                discord={verse.discord}
                name={verse.name}
                symbol={verse.symbol}
                genesisFund={verse.raisedAmount}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
