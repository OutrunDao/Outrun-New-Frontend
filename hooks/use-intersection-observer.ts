"use client"

import { useState, useEffect, useRef, type RefObject } from "react"

interface UseIntersectionObserverProps {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
  freezeOnceVisible?: boolean
}

/**
 * 使用 Intersection Observer API 检测元素是否在视口中
 * @param elementRef 要观察的元素引用
 * @param options 配置选项
 * @returns 元素是否在视口中
 */
export function useIntersectionObserver(
  elementRef: RefObject<Element>,
  { root = null, rootMargin = "0px", threshold = 0, freezeOnceVisible = false }: UseIntersectionObserverProps = {},
): boolean {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false)
  const frozen = useRef<boolean>(false)

  useEffect(() => {
    const element = elementRef?.current
    if (!element || (freezeOnceVisible && frozen.current)) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting
        setIsIntersecting(isElementIntersecting)

        if (isElementIntersecting && freezeOnceVisible) {
          frozen.current = true
        }
      },
      { root, rootMargin, threshold },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [elementRef, root, rootMargin, threshold, freezeOnceVisible])

  return isIntersecting
}
