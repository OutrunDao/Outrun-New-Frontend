"use client"

import type React from "react"

import { useEffect, useRef } from "react"

/**
 * 使用事件监听器的 hook
 * @param eventName 事件名称
 * @param handler 事件处理函数
 * @param element 要监听的元素，默认为 window
 * @param options 事件监听选项
 */
export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element?: undefined,
  options?: boolean | AddEventListenerOptions,
): void

export function useEventListener<K extends keyof HTMLElementEventMap, T extends HTMLElement = HTMLDivElement>(
  eventName: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  element: React.RefObject<T>,
  options?: boolean | AddEventListenerOptions,
): void

export function useEventListener<K extends keyof DocumentEventMap>(
  eventName: K,
  handler: (event: DocumentEventMap[K]) => void,
  element: React.RefObject<Document>,
  options?: boolean | AddEventListenerOptions,
): void

export function useEventListener<
  KW extends keyof WindowEventMap,
  KH extends keyof HTMLElementEventMap,
  KD extends keyof DocumentEventMap,
  T extends HTMLElement = HTMLDivElement,
>(
  eventName: KW | KH | KD,
  handler: (event: WindowEventMap[KW] | HTMLElementEventMap[KH] | DocumentEventMap[KD] | Event) => void,
  element?: React.RefObject<T> | undefined,
  options?: boolean | AddEventListenerOptions,
) {
  // 创建一个 ref 来存储处理函数
  const savedHandler = useRef(handler)

  // 如果处理函数变化，更新 ref.current 值
  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    // 确保元素支持 addEventListener
    const targetElement: T | Window = element?.current || window

    if (!(targetElement && targetElement.addEventListener)) return

    // 创建事件监听器，调用存储的处理函数
    const eventListener: typeof handler = (event) => savedHandler.current(event)

    targetElement.addEventListener(eventName, eventListener, options)

    // 清理函数
    return () => {
      targetElement.removeEventListener(eventName, eventListener, options)
    }
  }, [eventName, element, options])
}
