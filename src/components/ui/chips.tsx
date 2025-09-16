"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ChipsProps {
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
  multiple?: boolean
  className?: string
  placeholder?: string
  label?: string
}

export function Chips({ 
  options, 
  selected, 
  onChange, 
  multiple = true, 
  className,
  placeholder = "Selecione as opções...",
  label
}: ChipsProps) {
  const handleToggle = (option: string) => {
    if (multiple) {
      if (selected.includes(option)) {
        onChange(selected.filter(item => item !== option))
      } else {
        onChange([...selected, option])
      }
    } else {
      onChange(selected.includes(option) ? [] : [option])
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="text-sm font-medium">{label}</label>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleToggle(option)}
            className={cn(
              "px-3 py-2 text-sm rounded-lg border transition-all duration-200",
              selected.includes(option)
                ? "bg-blue-100 text-blue-800 border-blue-300 shadow-sm"
                : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
            )}
          >
            {option}
          </button>
        ))}
      </div>
      {selected.length > 0 && (
        <div className="text-xs text-gray-500">
          Selecionado: {selected.join(", ")}
        </div>
      )}
    </div>
  )
}
