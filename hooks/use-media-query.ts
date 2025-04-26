"use client"

import { useState, useEffect, useCallback } from "react"

/**
 * 使用媒体查询检测屏幕尺寸
 * @param query 媒体查询字符串
 * @returns 媒体查询是否匹配
 */
export function useMediaQuery(query: string): boolean {
  const getMatches = useCallback((query: string): boolean => {
    // 在服务器端渲染时，始终返回 false
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches
    }
    return false
  }, [])

  const [matches, setMatches] = useState<boolean>(getMatches(query))

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)

    // 定义回调函数
    const handleChange = () => {
      setMatches(getMatches(query))
    }

    // 初始检查
    handleChange()

    // 添加事件监听器
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange)
    } else {
      // 兼容旧版浏览器
      mediaQuery.addListener(handleChange)
    }

    // 清理函数
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange)
      } else {
        // 兼容旧版浏览器
        mediaQuery.removeListener(handleChange)
      }
    }
  }, [getMatches, query])

  return matches
}
