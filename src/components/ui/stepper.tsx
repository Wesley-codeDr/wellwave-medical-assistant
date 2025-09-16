"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

export interface StepperProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  unit?: string
  className?: string
  label?: string
}

export function Stepper({ 
  value, 
  onChange, 
  min = 0, 
  max = 999, 
  step = 1, 
  unit = "",
  className,
  label 
}: StepperProps) {
  const handleIncrement = () => {
    if (value + step <= max) {
      onChange(value + step)
    }
  }

  const handleDecrement = () => {
    if (value - step >= min) {
      onChange(value - step)
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="text-sm font-medium">{label}</label>
      )}
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleDecrement}
          disabled={value <= min}
          className="h-8 w-8 p-0"
        >
          -
        </Button>
        <div className="flex items-center gap-1 min-w-[80px] justify-center">
          <span className="text-lg font-medium">{value}</span>
          {unit && <span className="text-sm text-gray-500">{unit}</span>}
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleIncrement}
          disabled={value >= max}
          className="h-8 w-8 p-0"
        >
          +
        </Button>
      </div>
    </div>
  )
}
