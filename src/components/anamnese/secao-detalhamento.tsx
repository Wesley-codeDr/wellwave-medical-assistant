"use client"

import * as React from "react"
import { Autocomplete } from "@/components/ui/autocomplete"
import { Chips } from "@/components/ui/chips"
import { AnamneseData } from "@/types/anamnese"

interface SecaoDetalhamentoProps {
  data: AnamneseData
  onChange: (data: Partial<AnamneseData>) => void
}

export function SecaoDetalhamento({ data, onChange }: SecaoDetalhamentoProps) {
  const cidOptions = [
    "G43.0", "G43.1", "G43.2", "G43.3", "G43.8", "G43.9", // Enxaqueca
    "G44.0", "G44.1", "G44.2", "G44.3", "G44.4", "G44.8", "G44.9", // Cefaleia
    "I21.0", "I21.1", "I21.2", "I21.3", "I21.4", "I21.9", // IAM
    "I26.0", "I26.9", // TEP
    "I50.0", "I50.1", "I50.9", // ICC
    "J18.0", "J18.1", "J18.8", "J18.9", // Pneumonia
    "K35.0", "K35.1", "K35.2", "K35.3", "K35.8", "K35.9", // Apendicite
    "K80.0", "K80.1", "K80.2", "K80.3", "K80.4", "K80.5", "K80.6", "K80.7", "K80.8", "K80.9", // Colecistite
    "K85.0", "K85.1", "K85.2", "K85.3", "K85.8", "K85.9", // Pancreatite
    "N39.0", "N39.1", "N39.2", "N39.3", "N39.4", "N39.8", "N39.9" // ITU
  ]

  const justificativasOptions = [
    "CRITÉRIOS CLÍNICOS COMPATÍVEIS",
    "EXAMES INICIAIS SUGESTIVOS",
    "PROBABILIDADE INTERMEDIÁRIA",
    "ALTA PROBABILIDADE"
  ]

  const scoresOptions = [
    "HEART",
    "TIMI",
    "WELLS PE",
    "CURB-65",
    "Canadian Head CT",
    "Centor",
    "qSOFA"
  ]

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg border">
      <h2 className="text-xl font-semibold text-gray-900">Detalhamento Final</h2>
      
      <div className="space-y-6">

        <Chips
          label="Justificativas Clínicas"
          options={justificativasOptions}
          selected={data.justificativas}
          onChange={(selected) => onChange({ justificativas: selected })}
          multiple={true}
        />

        <Chips
          label="Scores Aplicáveis"
          options={scoresOptions}
          selected={data.scores}
          onChange={(selected) => onChange({ scores: selected })}
          multiple={true}
        />
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Orientação:</strong> Selecione os códigos CID-10 mais específicos possíveis 
          e justifique suas hipóteses com base nos achados clínicos e exames disponíveis.
        </p>
      </div>
    </div>
  )
}
