/**
 * 安全的 JSON 解析函数，替代 eval
 * @param jsonString JSON 字符串
 * @returns 解析后的对象
 */
export function safeJSONParse<T>(jsonString: string): T {
  try {
    return JSON.parse(jsonString) as T
  } catch (error) {
    console.error("JSON 解析错误:", error)
    throw new Error("无效的 JSON 字符串")
  }
}

/**
 * 安全的函数执行器，替代 new Function() 或 eval
 * @param fn 要执行的函数
 * @param args 函数参数
 * @returns 函数执行结果
 */
export function safeExecute<T, A extends any[]>(fn: (...args: A) => T, ...args: A): T {
  return fn(...args)
}

/**
 * 安全的定时器，替代字符串形式的 setTimeout
 * @param callback 回调函数
 * @param delay 延迟时间（毫秒）
 * @returns 定时器 ID
 */
export function safeSetTimeout(callback: () => void, delay: number): NodeJS.Timeout {
  return setTimeout(callback, delay)
}

/**
 * 安全的定时器，替代字符串形式的 setInterval
 * @param callback 回调函数
 * @param delay 延迟时间（毫秒）
 * @returns 定时器 ID
 */
export function safeSetInterval(callback: () => void, delay: number): NodeJS.Timeout {
  return setInterval(callback, delay)
}
