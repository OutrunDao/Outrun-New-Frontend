"use client"

import { useEffect, useLayoutEffect } from "react"

/**
 * 在服务器端渲染时使用 useEffect，在客户端渲染时使用 useLayoutEffect
 * 避免服务器端渲���时的警告
 */
export const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect
