"use client"

import * as React from "react"
import { Chips } from "@/components/ui/chips"
import { Stepper } from "@/components/ui/stepper"
import { Toggle } from "@/components/ui/toggle"
import { AnamneseData } from "@/types/anamnese"

interface SecaoObservacoesProps {
  data: AnamneseData
  onChange: (data: Partial<AnamneseData>) => void
}

export function SecaoObservacoes({ data, onChange }: SecaoObservacoesProps) {
  const informacoesFaltantesOptions = [
    "SEM DADOS DE ALERGIAS",
    "SEM MUC COMPLETO",
    "SEM EXAMES COMPLEMENTARES",
    "NENHUMA"
  ]

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg border">
      <h2 className="text-xl font-semibold text-gray-900">Observações Finais</h2>
      
      <div className="space-y-6">
        <Chips
          label="Informações Faltantes"
          options={informacoesFaltantesOptions}
          selected={data.pendências}
          onChange={(selected) => onChange({ pendências: selected })}
          multiple={true}
        />


      </div>

      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>Fallbacks Automáticos:</strong> O sistema gerará automaticamente textos de fallback 
          para informações não documentadas conforme especificado no protocolo.
        </p>
      </div>

      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-sm text-red-800">
          <strong>Disclaimer:</strong> "SISTEMA AUXILIAR – NÃO SUBSTITUI JULGAMENTO CLÍNICO MÉDICO."
        </p>
      </div>
    </div>
  )
}
