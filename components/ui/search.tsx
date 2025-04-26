"use client"

import * as React from "react"
import { X, SearchIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void
}

const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  ({ className, type, value, onChange, onClear, ...props }, ref) => {
    const [inputValue, setInputValue] = React.useState<string>("")

    // 使用受控组件模式，同时支持外部value和内部状态
    const currentValue = value !== undefined ? String(value) : inputValue
    const showClearButton = currentValue.length > 0

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (value === undefined) {
        setInputValue(e.target.value)
      }
      onChange?.(e)
    }

    const handleClear = () => {
      if (value === undefined) {
        setInputValue("")
      }
      onClear?.()
    }

    return (
      <div className="relative w-full">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
          <SearchIcon className="h-4 w-4" />
        </div>
        <input
          type={type || "text"}
          value={currentValue}
          onChange={handleChange}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:border-purple-500/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300",
            className,
          )}
          ref={ref}
          {...props}
        />
        {showClearButton && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>
    )
  },
)

Search.displayName = "Search"

export { Search }
