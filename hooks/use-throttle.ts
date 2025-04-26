"use client"

import { useState, useEffect, useRef, useCallback } from "react"

/**
 * 节流函数，限制函数的执行频率
 * @param value 要节流的值
 * @param limit 节流时间间隔（毫秒）
 * @returns 节流后的值
 */
export function useThrottle<T>(value: T, limit = 200): T {
  const [throttledValue, setThrottledValue] = useState<T>(value)
  const lastRan = useRef<number>(Date.now())

  useEffect(() => {
    const handler = setTimeout(
      () => {
        const now = Date.now()
        if (now - lastRan.current >= limit) {
          setThrottledValue(value)
          lastRan.current = now
        }
      },
      limit - (Date.now() - lastRan.current),
    )

    return () => {
      clearTimeout(handler)
    }
  }, [value, limit])

  return throttledValue
}

/**
 * 节流函数，限制函数的执行频率
 * @param fn 要节流的函数
 * @param limit 节流时间间隔（毫秒）
 * @returns 节流后的函数
 */
export function useThrottleFn<T extends (...args: any[]) => any>(fn: T, limit = 200): T {
  const lastRan = useRef<number>(Date.now())
  const lastArgs = useRef<any[]>([])
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const throttledFn = useCallback(
    (...args: Parameters<T>) => {
      lastArgs.current = args

      const now = Date.now()
      if (now - lastRan.current >= limit) {
        fn(...args)
        lastRan.current = now
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(
          () => {
            lastRan.current = Date.now()
            fn(...lastArgs.current)
            timeoutRef.current = null
          },
          limit - (now - lastRan.current),
        )
      }
    },
    [fn, limit],
  ) as T

  // 清理函数
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return throttledFn
}
