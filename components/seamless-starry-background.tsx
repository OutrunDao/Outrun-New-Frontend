"use client"

import { useEffect, useRef, useMemo, useCallback } from "react"
import { useBackground } from "@/contexts/background-context"

export function SeamlessStarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { isVisible } = useBackground()

  // 使用 useMemo 缓存颜色数组
  const colors = useMemo(
    () => [
      "rgba(168, 85, 247, 1)", // Purple
      "rgba(236, 72, 153, 1)", // Pink
      "rgba(59, 130, 246, 1)", // Blue
      "rgba(6, 182, 212, 1)", // Cyan
    ],
    [],
  )

  // 使用 useCallback 优化函数
  const setCanvasDimensions = useCallback((canvas: HTMLCanvasElement) => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }, [])

  // 使用 useCallback 优化星星生成逻辑
  const generateStars = useCallback(
    (canvas: HTMLCanvasElement) => {
      const stars: {
        x: number
        y: number
        size: number
        color: string
        opacity: number
        twinkleSpeed: number
        twinklePhase: number
      }[] = []

      // 使用网格分布确保均匀覆盖
      const gridSize = 80 // 每个网格单元的大小
      const cols = Math.ceil(window.innerWidth / gridSize)
      const rows = Math.ceil(window.innerHeight / gridSize)

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          // 每个网格单元添加 1-2 个星星，减少总数以提高性能
          const starsInCell = Math.floor(Math.random() * 2) + 1

          for (let k = 0; k < starsInCell; k++) {
            const x = j * gridSize + Math.random() * gridSize
            const y = i * gridSize + Math.random() * gridSize

            // 确保星星在画布范围内
            if (x <= window.innerWidth && y <= window.innerHeight) {
              stars.push({
                x,
                y,
                size: Math.random() * 1.5 + 0.5, // 较小的星星 (0.5 到 2)
                color: colors[Math.floor(Math.random() * colors.length)],
                opacity: Math.random() * 0.5 + 0.2,
                twinkleSpeed: Math.random() * 0.02 + 0.01,
                twinklePhase: Math.random() * Math.PI * 2, // 随机起始相位
              })
            }
          }
        }
      }

      return stars
    },
    [colors],
  )

  useEffect(() => {
    if (!isVisible) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // 设置画布尺寸
    setCanvasDimensions(canvas)
    window.addEventListener("resize", () => setCanvasDimensions(canvas))

    // 创建星星，确保分布一致
    let stars = generateStars(canvas)

    // 动画
    let animationFrameId: number
    let time = 0
    let lastTime = 0
    const fps = 24 // 限制帧率以提高性能
    const interval = 1000 / fps

    const render = (timestamp: number) => {
      const deltaTime = timestamp - lastTime

      if (deltaTime > interval) {
        lastTime = timestamp - (deltaTime % interval)
        time += 0.01

        // 创建渐变背景
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, "#0f0326") // 顶部深紫色
        gradient.addColorStop(0.5, "#170b3b") // 中间紫色
        gradient.addColorStop(1, "#0f0326") // 底部深紫色

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // 绘制带闪烁效果的星星
        for (const star of stars) {
          // 计算闪烁效果
          const twinkle = Math.sin(time * star.twinkleSpeed * 5 + star.twinklePhase) * 0.3 + 0.7
          const currentOpacity = star.opacity * twinkle

          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
          ctx.fillStyle = star.color.replace("1)", `${currentOpacity})`)
          ctx.fill()

          // 为较大的星星添加微妙的光晕
          if (star.size > 1) {
            ctx.beginPath()
            ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2)
            const glow = ctx.createRadialGradient(star.x, star.y, star.size * 0.5, star.x, star.y, star.size * 2)
            glow.addColorStop(0, star.color.replace("1)", `${currentOpacity * 0.5})`))
            glow.addColorStop(1, star.color.replace("1)", "0)"))
            ctx.fillStyle = glow
            ctx.fill()
          }
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    // 处理窗口大小调整
    const handleResize = () => {
      setCanvasDimensions(canvas)
      stars = generateStars(canvas) // 调整大小时重新生成星星
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [setCanvasDimensions, generateStars, isVisible])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full -z-20 transition-opacity duration-300`}
      style={{
        pointerEvents: "none",
        opacity: isVisible ? 1 : 0,
      }}
    />
  )
}
