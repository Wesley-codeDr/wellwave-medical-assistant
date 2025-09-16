"use client"

import * as React from "react"
import { Chips } from "@/components/ui/chips"
import { AnamneseData } from "@/types/anamnese"

interface SecaoHipotesesProps {
  data: AnamneseData
  onChange: (data: Partial<AnamneseData>) => void
}

export function SecaoHipoteses({ data, onChange }: SecaoHipotesesProps) {
  const hipotesesOptions = [
    "ENXAQUECA",
    "CEF. TENSIONAL",
    "HSA",
    "MENINGITE",
    "SINUSITE",
    "IAM/SCA",
    "TEP",
    "DISSECÇÃO",
    "PERICARDITE",
    "PNEUMONIA",
    "ASMA/DPOC",
    "ICC",
    "APENDICITE",
    "COLECISTITE",
    "PANCREATITE",
    "ITU",
    "SEPSE"
  ]

  const handleHipotesesChange = (selected: string[]) => {
    // Limita a 3 hipóteses conforme especificado
    const limitedSelection = selected.slice(0, 3).map(dx => ({ dx, cid: "" }))
    onChange({ hipoteses: limitedSelection })
  }

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg border">
      <h2 className="text-xl font-semibold text-gray-900">Hipóteses Diagnósticas</h2>
      
      <div className="space-y-4">
        <Chips
          label="Hipóteses Diagnósticas (máximo 3)"
          options={hipotesesOptions}
          selected={data.hipoteses.map(h => h.dx)}
          onChange={handleHipotesesChange}
          multiple={true}
        />

        {data.hipoteses.length >= 3 && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Limite atingido:</strong> Máximo de 3 hipóteses diagnósticas conforme protocolo.
            </p>
          </div>
        )}

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Orientação:</strong> Liste as hipóteses em ordem de probabilidade, 
            considerando a apresentação clínica e fatores de risco.
          </p>
        </div>
      </div>
    </div>
  )
}
