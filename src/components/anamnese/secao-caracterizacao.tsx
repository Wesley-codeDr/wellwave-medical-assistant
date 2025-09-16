"use client"

import * as React from "react"
import { Slider } from "@/components/ui/slider"
import { Segmented } from "@/components/ui/segmented"
import { Chips } from "@/components/ui/chips"
import { AnamneseData } from "@/types/anamnese"

interface SecaoCaracterizacaoProps {
  data: AnamneseData
  onChange: (data: Partial<AnamneseData>) => void
}

export function SecaoCaracterizacao({ data, onChange }: SecaoCaracterizacaoProps) {
  const caraterDorOptions = [
    "PULSÁTIL",
    "OPRESSIVA", 
    "PONTADA",
    "QUEIMAÇÃO",
    "CÓLICA"
  ]

  const fatoresMelhoriaOptions = [
    "REPOUSO",
    "ANALGÉSICO",
    "NÃO IDENTIFICADO"
  ]

  const fatoresPioraOptions = [
    "ESFORÇO",
    "MOVIMENTO", 
    "ALIMENTAÇÃO",
    "NÃO IDENTIFICADO"
  ]

  const sintomasAssociadosOptions = [
    "NÁUSEAS",
    "VÔMITOS",
    "FOTOFOBIA",
    "FEBRE",
    "DISPNEIA",
    "SUDORESE",
    "TOSSE",
    "SINCOPE",
    "PALPITAÇÃO",
    "DOR DORSAL"
  ]

  const medicacoesPreviasOptions = [
    "ANALGÉSICO",
    "AINE",
    "ANTIEMÉTICO",
    "NENHUMA"
  ]

  // Verifica se deve mostrar campos de dor
  const isDorRelated = ["DOR TORÁCICA", "DOR ABDOMINAL", "CEFALEIA"].includes(data.queixa_principal)

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg border">
      <h2 className="text-xl font-semibold text-gray-900">Caracterização da Queixa</h2>
      
      {isDorRelated && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Slider
            label="Intensidade (EVA)"
            value={data.eva || 0}
            onChange={(value) => onChange({ eva: value })}
            min={0}
            max={10}
            step={1}
          />

          <div className="space-y-2">
            <label className="text-sm font-medium">Caráter da Dor</label>
            <Segmented
              options={caraterDorOptions}
              value={data.carater_dor || ""}
              onChange={(value) => onChange({ carater_dor: value })}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Chips
          label="Fatores de Melhora"
          options={fatoresMelhoriaOptions}
          selected={data.fatores_melhoria}
          onChange={(selected) => onChange({ fatores_melhoria: selected })}
          multiple={true}
        />

        <Chips
          label="Fatores de Piora"
          options={fatoresPioraOptions}
          selected={data.fatores_piora}
          onChange={(selected) => onChange({ fatores_piora: selected })}
          multiple={true}
        />
      </div>

      <Chips
        label="Sintomas Associados"
        options={sintomasAssociadosOptions}
        selected={data.sintomas_associados}
        onChange={(selected) => onChange({ sintomas_associados: selected })}
        multiple={true}
      />

    </div>
  )
}
