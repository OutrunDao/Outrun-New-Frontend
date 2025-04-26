"use client"

import { useState, useEffect, useRef, useCallback } from "react"

/**
 * 创建一个防抖状态，当值快速变化时，只在指定延迟后更新状态
 * @param initialValue 初始值
 * @param delay 延迟时间（毫秒）
 * @returns [debouncedValue, setValue, immediateValue]
 */
export function useDebouncedState<T>(initialValue: T, delay = 300): [T, (value: T) => void, T] {
  const [immediateValue, setImmediateValue] = useState<T>(initialValue)
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // 清理定时器
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  // 设置值的函数
  const setValue = useCallback(
    (value: T) => {
      setImmediateValue(value)

      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }

      timerRef.current = setTimeout(() => {
        setDebouncedValue(value)
        timerRef.current = null
      }, delay)
    },
    [delay],
  )

  return [debouncedValue, setValue, immediateValue]
}
