"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TrendingUp, TrendingDown } from "lucide-react"

interface MemeversePriceChartProps {
  project: any
}

export function MemeversePriceChart({ project }: MemeversePriceChartProps) {
  const [chartData, setChartData] = useState<any[]>([])
  const [timeframe, setTimeframe] = useState<"24h" | "7d" | "30d" | "all">("7d")
  const [priceChange, setPriceChange] = useState<{ value: number; percentage: number }>({ value: 0, percentage: 0 })
  const [isPositive, setIsPositive] = useState(true)

  // 生成模拟价格数据
  useEffect(() => {
    const generateChartData = () => {
      const now = new Date()
      const data: any[] = []

      // 基础价格 - 使用市值除以总供应量的估计值
      const basePrice = project.marketCap / 1000000000

      // 根据时间范围确定数据点数量和时间间隔
      let points = 0
      let interval = 0

      switch (timeframe) {
        case "24h":
          points = 24
          interval = 60 * 60 * 1000 // 1小时
          break
        case "7d":
          points = 7 * 24
          interval = 60 * 60 * 1000 // 1小时
          break
        case "30d":
          points = 30
          interval = 24 * 60 * 60 * 1000 // 1天
          break
        case "all":
          points = 90
          interval = 24 * 60 * 60 * 1000 // 1天
          break
      }

      // 生成随机波动的价格数据
      for (let i = points; i >= 0; i--) {
        const time = new Date(now.getTime() - i * interval)

        // 添加一些随机波动，但保持整体趋势
        const volatility = 0.05 // 5%的波动率
        const trend = timeframe === "all" ? 0.001 : 0.0005 // 长期上升趋势
        const randomFactor = (Math.random() - 0.5) * 2 * volatility

        // 根据时间计算价格，越近期的数据越接近当前价格
        const priceFactor = 1 + randomFactor + trend * i
        const price = basePrice * priceFactor

        data.push({
          time: time.toISOString(),
          price: price,
        })
      }

      // 计算价格变化
      const firstPrice = data[0].price
      const lastPrice = data[data.length - 1].price
      const change = lastPrice - firstPrice
      const percentageChange = (change / firstPrice) * 100

      setPriceChange({
        value: change,
        percentage: percentageChange,
      })

      setIsPositive(change >= 0)
      setChartData(data)
    }

    generateChartData()
  }, [timeframe, project.marketCap])

  // 找到价格范围以便绘制图表
  const minPrice = Math.min(...chartData.map((d) => d.price))
  const maxPrice = Math.max(...chartData.map((d) => d.price))
  const priceRange = maxPrice - minPrice

  // 格式化价格
  const formatPrice = (price: number) => {
    if (price < 0.000001) {
      return price.toExponential(2)
    }
    return price.toFixed(price < 0.01 ? 6 : price < 1 ? 4 : 2)
  }

  return (
    <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Price Chart</h3>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-white mr-2">
                ${formatPrice(chartData.length ? chartData[chartData.length - 1].price : 0)}
              </span>
              <div className={`flex items-center ${isPositive ? "text-green-500" : "text-red-500"}`}>
                {isPositive ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                <span className="font-medium">
                  {isPositive ? "+" : ""}
                  {priceChange.percentage.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 sm:mt-0 flex items-center bg-black/40 rounded-lg p-1">
            {(["24h", "7d", "30d", "all"] as const).map((tf) => (
              <button
                key={tf}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                  timeframe === tf
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
                onClick={() => setTimeframe(tf)}
              >
                {tf === "all" ? "All" : tf}
              </button>
            ))}
          </div>
        </div>

        {/* 价格图表 */}
        <div className="h-64 relative">
          <div className="absolute inset-0 flex items-end">
            {chartData.map((point, index) => {
              // 计算高度百分比
              const heightPercent = priceRange === 0 ? 50 : ((point.price - minPrice) / priceRange) * 100

              return (
                <div
                  key={index}
                  className="flex-1 flex items-end h-full"
                  style={{ minWidth: `${100 / chartData.length}%` }}
                >
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPercent}%` }}
                    transition={{ duration: 0.5, delay: index * 0.01 }}
                    className={`w-full ${
                      isPositive
                        ? "bg-gradient-to-t from-green-500/20 to-green-500/5"
                        : "bg-gradient-to-t from-red-500/20 to-red-500/5"
                    }`}
                  />
                </div>
              )
            })}
          </div>

          {/* 价格线 */}
          <svg className="absolute inset-0 w-full h-full overflow-visible">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={isPositive ? "#10b981" : "#ef4444"} />
                <stop offset="100%" stopColor={isPositive ? "#059669" : "#dc2626"} />
              </linearGradient>
            </defs>
            <path
              d={
                chartData.length > 0
                  ? `M${chartData
                      .map((point, i) => {
                        const x = (i / (chartData.length - 1)) * 100
                        const y = 100 - ((point.price - minPrice) / priceRange) * 100
                        return `${x},${y}`
                      })
                      .join(" L")}`
                  : ""
              }
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Y轴标签 */}
          <div className="absolute top-0 right-0 h-full flex flex-col justify-between text-xs text-zinc-500 py-2">
            <div>${formatPrice(maxPrice)}</div>
            <div>${formatPrice(minPrice + priceRange / 2)}</div>
            <div>${formatPrice(minPrice)}</div>
          </div>
        </div>

        {/* 时间轴标签 */}
        <div className="flex justify-between mt-2 text-xs text-zinc-500">
          {timeframe === "24h" && (
            <>
              <div>24h ago</div>
              <div>12h ago</div>
              <div>Now</div>
            </>
          )}
          {timeframe === "7d" && (
            <>
              <div>7d ago</div>
              <div>3d ago</div>
              <div>Now</div>
            </>
          )}
          {timeframe === "30d" && (
            <>
              <div>30d ago</div>
              <div>15d ago</div>
              <div>Now</div>
            </>
          )}
          {timeframe === "all" && (
            <>
              <div>Launch</div>
              <div>Mid</div>
              <div>Now</div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
