"use client"

import * as React from "react"
import { Stepper } from "@/components/ui/stepper"
import { Segmented } from "@/components/ui/segmented"
import { Chips } from "@/components/ui/chips"
import { DurationPicker } from "@/components/ui/duration-picker"
import { AnamneseData } from "@/types/anamnese"

interface SecaoInicioProps {
  data: AnamneseData
  onChange: (data: Partial<AnamneseData>) => void
}

export function SecaoInicio({ data, onChange }: SecaoInicioProps) {
  const queixaPrincipalOptions = [
    "DOR TORÁCICA",
    "CEFALEIA", 
    "DISPNEIA",
    "DOR ABDOMINAL",
    "FEBRE",
    "OUTRA"
  ]

  const classificacaoTemporalOptions = [
    "AGUDO (<24H)",
    "SUBAGUDO (1–7 DIAS)", 
    "CRÔNICO (>7 DIAS)"
  ]

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg border">
      <h2 className="text-xl font-semibold text-gray-900">Informações Iniciais</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="space-y-2">
          <label className="text-sm font-medium">Sexo</label>
          <Segmented
            options={["MASCULINO", "FEMININO"]}
            value={data.sexo}
            onChange={(value) => onChange({ sexo: value as "MASCULINO" | "FEMININO" })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Classificação Temporal</label>
          <Segmented
            options={classificacaoTemporalOptions}
            value={data.tempo_preset}
            onChange={(value) => onChange({ tempo_preset: value as any })}
          />
        </div>
      </div>

      <div className="space-y-4">
        <Chips
          label="Queixa Principal"
          options={queixaPrincipalOptions}
          selected={[data.queixa_principal]}
          onChange={(selected) => onChange({ queixa_principal: selected[0] || "" })}
          multiple={false}
        />

        <DurationPicker
          label="Tempo de Evolução"
          value={data.tempo_final}
          onChange={(value) => onChange({ tempo_final: value })}
          presets={["agora", "30min", "1h", "6h", "24h", ">72h"]}
          units={["min", "h", "d"]}
        />
      </div>
    </div>
  )
}
