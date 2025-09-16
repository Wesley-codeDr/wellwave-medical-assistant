"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

export interface DurationPickerProps {
  value: string
  onChange: (value: string) => void
  presets?: string[]
  units?: string[]
  className?: string
  label?: string
}

export function DurationPicker({ 
  value, 
  onChange, 
  presets = ["agora", "30min", "1h", "6h", "24h", ">72h"],
  units = ["min", "h", "d"],
  className,
  label 
}: DurationPickerProps) {
  const [customValue, setCustomValue] = React.useState("")
  const [customUnit, setCustomUnit] = React.useState("h")

  const handlePresetSelect = (preset: string) => {
    onChange(preset)
  }

  const handleCustomSubmit = () => {
    if (customValue && customUnit) {
      onChange(`${customValue}${customUnit}`)
    }
  }

  return (
    <div className={cn("space-y-3", className)}>
      {label && (
        <label className="text-sm font-medium">{label}</label>
      )}
      
      {/* Presets */}
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <Button
            key={preset}
            type="button"
            variant={value === preset ? "default" : "outline"}
            size="sm"
            onClick={() => handlePresetSelect(preset)}
            className="text-xs"
          >
            {preset}
          </Button>
        ))}
      </div>

      {/* Custom input */}
      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="Valor"
          value={customValue}
          onChange={(e) => setCustomValue(e.target.value)}
          className="w-20 px-2 py-1 text-sm border rounded-md"
        />
        <select
          value={customUnit}
          onChange={(e) => setCustomUnit(e.target.value)}
          className="px-2 py-1 text-sm border rounded-md"
          aria-label="Unidade de tempo"
        >
          {units.map((unit) => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>
        <Button
          type="button"
          size="sm"
          onClick={handleCustomSubmit}
          disabled={!customValue}
        >
          Definir
        </Button>
      </div>

      {value && (
        <div className="text-sm text-gray-600">
          Selecionado: <span className="font-medium">{value}</span>
        </div>
      )}
    </div>
  )
}
