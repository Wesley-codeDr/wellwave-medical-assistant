"use client"

import * as React from "react"
import { Chips } from "@/components/ui/chips"
import { AnamneseData } from "@/types/anamnese"

interface SecaoAntecedentesProps {
  data: AnamneseData
  onChange: (data: Partial<AnamneseData>) => void
}

export function SecaoAntecedentes({ data, onChange }: SecaoAntecedentesProps) {
  const comorbidadesOptions = [
    "HAS",
    "DM", 
    "DPOC",
    "IAM",
    "AVE",
    "TEP",
    "TVP",
    "FA",
    "ICC",
    "IRC",
    "NENHUMA"
  ]

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg border">
      <h2 className="text-xl font-semibold text-gray-900">Antecedentes</h2>
      
      <Chips
        label="Comorbidades"
        options={comorbidadesOptions}
        selected={data.comorbidades}
        onChange={(selected) => onChange({ comorbidades: selected })}
        multiple={true}
      />

      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>Nota:</strong> Use siglas médicas padronizadas (HAS, DM, DPOC, etc.) conforme especificado no protocolo.
        </p>
      </div>
    </div>
  )
}
