"use client"

import { useMediaQuery } from "@/hooks/use-media-query"

/**
 * 检测是否为移动设备
 * @param breakpoint 断点宽度，默认为 768px
 * @returns 是否为移动设备
 */
export const useMobile = (breakpoint = 768) => {
  return useMediaQuery(`(max-width: ${breakpoint}px)`)
}
