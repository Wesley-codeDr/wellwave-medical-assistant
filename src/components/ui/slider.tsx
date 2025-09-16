"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface SliderProps {
  value: number | number[]
  onChange?: (value: number) => void
  onValueChange?: (value: number[]) => void
  min?: number
  max?: number
  step?: number
  className?: string
  label?: string
}

export function Slider({ 
  value, 
  onChange, 
  onValueChange,
  min = 0, 
  max = 10, 
  step = 1, 
  className,
  label 
}: SliderProps) {
  const numericValue = Array.isArray(value) ? (value[0] ?? min) : (value ?? min)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = Number(e.target.value)
    if (onChange) onChange(next)
    if (onValueChange) onValueChange([next])
  }
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">{label}</span>
          <span className="text-sm text-gray-600">{numericValue}</span>
        </div>
      )}
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={numericValue}
          onChange={handleChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          aria-label={label || "Slider"}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    </div>
  )
}
