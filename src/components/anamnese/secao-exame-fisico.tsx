"use client"

import * as React from "react"
import { Stepper } from "@/components/ui/stepper"
import { Chips } from "@/components/ui/chips"
import { AnamneseData } from "@/types/anamnese"

interface SecaoExameFisicoProps {
  data: AnamneseData
  onChange: (data: Partial<AnamneseData>) => void
}

export function SecaoExameFisico({ data, onChange }: SecaoExameFisicoProps) {
  const achadosEfOptions = [
    "NORMAL GLOBAL",
    "DOR À PALPAÇÃO",
    "SINAIS MENÍNGEOS",
    "MURPHY POSITIVO",
    "SIBILOS",
    "ESTERTORES",
    "EDEMA MMII"
  ]

  const handleSinaisVitaisChange = (field: keyof AnamneseData['sinais_vitais'], value: number) => {
    onChange({
      sinais_vitais: {
        ...data.sinais_vitais,
        [field]: value
      }
    })
  }

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg border">
      <h2 className="text-xl font-semibold text-gray-900">Exame Físico</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Sinais Vitais</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Stepper
              label="PA (mmHg)"
              value={data.sinais_vitais.pa || 0}
              onChange={(value) => handleSinaisVitaisChange('pa', value)}
              min={60}
              max={250}
              unit="mmHg"
            />

            <Stepper
              label="FC (bpm)"
              value={data.sinais_vitais.fc || 0}
              onChange={(value) => handleSinaisVitaisChange('fc', value)}
              min={40}
              max={200}
              unit="bpm"
            />

            <Stepper
              label="FR (irpm)"
              value={data.sinais_vitais.fr || 0}
              onChange={(value) => handleSinaisVitaisChange('fr', value)}
              min={8}
              max={40}
              unit="irpm"
            />

            <Stepper
              label="TAX (°C)"
              value={data.sinais_vitais.tax || 0}
              onChange={(value) => handleSinaisVitaisChange('tax', value)}
              min={30}
              max={45}
              step={0.1}
              unit="°C"
            />

            <Stepper
              label="SpO2 (%)"
              value={data.sinais_vitais.spo2 || 0}
              onChange={(value) => handleSinaisVitaisChange('spo2', value)}
              min={70}
              max={100}
              unit="%"
            />

            <Stepper
              label="DXT (se indicado)"
              value={data.sinais_vitais.dxt || 0}
              onChange={(value) => handleSinaisVitaisChange('dxt', value)}
              min={0}
              max={600}
              unit="mg/dL"
            />
          </div>
        </div>

        <Chips
          label="Achados Pertinentes"
          options={achadosEfOptions}
          selected={data.achados_ef}
          onChange={(selected) => onChange({ achados_ef: selected })}
          multiple={true}
        />
      </div>

      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-sm text-green-800">
          <strong>Dica:</strong> Registre apenas achados relevantes para a queixa principal. 
          Use "NORMAL GLOBAL" quando apropriado.
        </p>
      </div>
    </div>
  )
}
