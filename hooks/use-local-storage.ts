"use client"

import { useState, useEffect, useCallback } from "react"

/**
 * 使用 localStorage 存储和检索数据的 hook
 * @param key localStorage 键
 * @param initialValue 初始值
 * @returns [storedValue, setValue]
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // 获取初始值
  const readValue = useCallback((): T => {
    if (typeof window === "undefined") {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  }, [initialValue, key])

  // 状态保存实际值
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  // 在组件挂载时从 localStorage 读取值
  useEffect(() => {
    setStoredValue(readValue())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 返回一个包装版本的 useState 的 setter 函数，将新值保存到 localStorage
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      if (typeof window === "undefined") {
        console.warn(`Tried setting localStorage key "${key}" even though environment is not a client`)
        return
      }

      try {
        // 允许值是一个函数，就像 useState 的 setter 一样
        const valueToStore = value instanceof Function ? value(storedValue) : value

        // 保存到 state
        setStoredValue(valueToStore)

        // 保存到 localStorage
        window.localStorage.setItem(key, JSON.stringify(valueToStore))

        // 触发自定义事件，以便其他组件可以监听 localStorage 的变化
        window.dispatchEvent(new Event("local-storage"))
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error)
      }
    },
    [key, storedValue],
  )

  // 监听 localStorage 变化
  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(readValue())
    }

    // 监听自定义事件
    window.addEventListener("local-storage", handleStorageChange)
    // 监听 storage 事件（当其他标签页修改 localStorage 时触发）
    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("local-storage", handleStorageChange)
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [readValue])

  return [storedValue, setValue]
}
