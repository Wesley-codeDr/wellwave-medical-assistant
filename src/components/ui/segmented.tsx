"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface SegmentedProps {
  options: string[]
  value: string
  onChange: (value: string) => void
  className?: string
}

export function Segmented({ options, value, onChange, className }: SegmentedProps) {
  return (
    <div className={cn("inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1", className)}>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
            value === option
              ? "bg-white text-gray-900 shadow-sm border border-gray-200"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          )}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
