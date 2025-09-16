"use client"

import * as React from "react"
import { Chips } from "@/components/ui/chips"
import { AnamneseData } from "@/types/anamnese"

interface SecaoCondutasProps {
  data: AnamneseData
  onChange: (data: Partial<AnamneseData>) => void
}

export function SecaoCondutas({ data, onChange }: SecaoCondutasProps) {
  const orientacoesOptions = [
    "SINAIS DE ALARME ESPECÍFICOS ORIENTADOS",
    "RETORNO IMEDIATO SE PIORA",
    "SEGUIMENTO AMBULATORIAL"
  ]

  const criteriosAltaInternacaoOptions = [
    "ALTA COM CRITÉRIOS ATENDIDOS",
    "INTERNAR POR CRITÉRIOS CLÍNICOS",
    "OBSERVAÇÃO COM REAVALIAÇÃO PROGRAMADA"
  ]

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg border">
      <h2 className="text-xl font-semibold text-gray-900">Condutas</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Medicações PS</h3>
          <div className="p-4 bg-gray-50 border rounded-lg">
            <p className="text-sm text-gray-600 mb-2">
              Medicações já selecionadas na seção anterior serão exibidas aqui com alertas de interação.
            </p>
            {data.prescricao.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {data.prescricao.map((med, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm">
                    {med}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">Nenhuma medicação selecionada</p>
            )}
          </div>
        </div>

        <Chips
          label="Orientações"
          options={orientacoesOptions}
          selected={data.orientacoes}
          onChange={(selected) => onChange({ orientacoes: selected })}
          multiple={true}
        />

        <Chips
          label="Critérios de Alta/Internação"
          options={criteriosAltaInternacaoOptions}
          selected={data.criterios}
          onChange={(selected) => onChange({ criterios: selected })}
          multiple={true}
        />
      </div>

      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-sm text-green-800">
          <strong>Documento Padrão:</strong> "PACIENTE ORIENTADO SOBRE SINAIS DE ALARME E RETORNO IMEDIATO SE NECESSÁRIO. VERBALIZOU COMPREENSÃO DAS ORIENTAÇÕES."
        </p>
      </div>
    </div>
  )
}
