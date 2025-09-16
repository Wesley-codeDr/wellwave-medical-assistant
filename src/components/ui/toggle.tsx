"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  className?: string
  disabled?: boolean
}

export function Toggle({ checked, onChange, label, className, disabled }: ToggleProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        disabled={disabled}
        aria-label={label || "Toggle"}
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          checked ? "bg-blue-600" : "bg-gray-200",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        )}
      >
        <span
          className={cn(
            "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
            checked ? "translate-x-6" : "translate-x-1"
          )}
        />
      </button>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
    </div>
  )
}
