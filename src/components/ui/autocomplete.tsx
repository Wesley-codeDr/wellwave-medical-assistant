"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "./input"

export interface AutocompleteProps {
  value: string[]
  onChange: (value: string[]) => void
  options: string[]
  placeholder?: string
  multiple?: boolean
  includeNotDocumented?: boolean
  className?: string
  label?: string
}

export function Autocomplete({ 
  value, 
  onChange, 
  options, 
  placeholder = "Buscar termo…",
  multiple = true,
  includeNotDocumented = true,
  className,
  label 
}: AutocompleteProps) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [isOpen, setIsOpen] = React.useState(false)

  const filteredOptions = React.useMemo(() => {
    if (!searchTerm) return options
    return options.filter(option => 
      option.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [options, searchTerm])

  const handleSelect = (option: string) => {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter(item => item !== option))
      } else {
        onChange([...value, option])
      }
    } else {
      onChange([option])
      setIsOpen(false)
    }
    setSearchTerm("")
  }

  const handleRemove = (option: string) => {
    onChange(value.filter(item => item !== option))
  }

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="text-sm font-medium">{label}</label>
      )}
      
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        />
        
        {isOpen && filteredOptions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
            {filteredOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
              >
                {option}
              </button>
            ))}
            {includeNotDocumented && (
              <button
                onClick={() => handleSelect("NÃO DOCUMENTADO")}
                className="w-full px-3 py-2 text-left text-sm text-gray-500 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none border-t"
              >
                NÃO DOCUMENTADO
              </button>
            )}
          </div>
        )}
      </div>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {value.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-md"
            >
              {item}
              <button
                onClick={() => handleRemove(item)}
                className="text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
