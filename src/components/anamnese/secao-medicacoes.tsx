"use client"

import * as React from "react"
import { Chips } from "@/components/ui/chips"
import { AnamneseData } from "@/types/anamnese"

interface SecaoMedicacoesProps {
  data: AnamneseData
  onChange: (data: Partial<AnamneseData>) => void
}

export function SecaoMedicacoes({ data, onChange }: SecaoMedicacoesProps) {
  const mucOptions = [
    "AAS",
    "ATENOLOL",
    "ENALAPRIL",
    "METFORMINA",
    "SINVARINA",
    "NENHUM"
  ]

  const medicacoesPsOptions = [
    "DIPIRONA",
    "PARACETAMOL",
    "ONDANSETRONA",
    "METOCLOPRAMIDA"
  ]

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg border">
      <h2 className="text-xl font-semibold text-gray-900">Medicamentos</h2>
      
      <div className="space-y-6">
        <Chips
          label="Medicamentos de Uso Contínuo (Relevantes)"
          options={mucOptions}
          selected={data.mucs}
          onChange={(selected) => onChange({ mucs: selected })}
          multiple={true}
        />

        <Chips
          label="Medicações PS (Pré-registradas)"
          options={medicacoesPsOptions}
          selected={data.prescricao}
          onChange={(selected) => onChange({ prescricao: selected })}
          multiple={true}
        />
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Nota:</strong> O sistema verificará automaticamente interações medicamentosas 
          entre os medicamentos selecionados.
        </p>
      </div>
    </div>
  )
}
