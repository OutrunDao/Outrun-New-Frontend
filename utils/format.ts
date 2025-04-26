/**
 * 格式化货币值
 */
export function formatCurrency(value: string): string {
  if (!value) return ""
  const num = Number.parseFloat(value)
  if (isNaN(num)) return value

  if (num < 0.000001) return num.toExponential(4)
  if (num < 0.001) return num.toFixed(6)
  if (num < 1) return num.toFixed(4)
  if (num < 10000) return num.toFixed(2)
  return num.toLocaleString("en-US", { maximumFractionDigits: 2 })
}

/**
 * 格式化美元值
 */
export function formatDollarValue(value: number): string {
  if (value < 0.01) return "<$0.01"
  return `$${value.toFixed(2)}`
}

/**
 * 格式化地址，显示前6位和后4位
 */
export function formatAddress(address?: string): string {
  if (!address) return ""
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
}

/**
 * 根据价格影响获取颜色
 */
export function getPriceImpactColor(priceImpact: string): string {
  const impact = Number.parseFloat(priceImpact)
  if (impact < 0.1) return "text-green-400"
  if (impact < 0.5) return "text-green-300"
  if (impact < 1) return "text-yellow-400"
  return "text-red-400"
}
