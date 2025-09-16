"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface TriCheckProps {
  value: "yes" | "no" | "not_documented"
  onChange: (value: "yes" | "no" | "not_documented") => void
  items: string[]
  className?: string
}

export function TriCheck({ value, onChange, items, className }: TriCheckProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center justify-between p-2 border rounded-lg">
          <span className="text-sm font-medium">{item}</span>
          <div className="flex gap-2">
            <button
              onClick={() => onChange("yes")}
              className={cn(
                "px-3 py-1 text-xs rounded-md border transition-colors",
                value === "yes" 
                  ? "bg-green-100 text-green-800 border-green-300" 
                  : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
              )}
            >
              SIM
            </button>
            <button
              onClick={() => onChange("no")}
              className={cn(
                "px-3 py-1 text-xs rounded-md border transition-colors",
                value === "no" 
                  ? "bg-red-100 text-red-800 border-red-300" 
                  : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
              )}
            >
              NÃO
            </button>
            <button
              onClick={() => onChange("not_documented")}
              className={cn(
                "px-3 py-1 text-xs rounded-md border transition-colors",
                value === "not_documented" 
                  ? "bg-yellow-100 text-yellow-800 border-yellow-300" 
                  : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
              )}
            >
              NÃO DOCUMENTADO
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
