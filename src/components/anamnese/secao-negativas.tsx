"use client"

import * as React from "react"
import { TriCheck } from "@/components/ui/tri-check"
import { AnamneseData, TriCheckValue } from "@/types/anamnese"

interface SecaoNegativasProps {
  data: AnamneseData
  onChange: (data: Partial<AnamneseData>) => void
}

export function SecaoNegativas({ data, onChange }: SecaoNegativasProps) {
  const sinaisAlarmeItems = [
    "FEBRE ALTA",
    "RIGIDEZ DE NUCA",
    "DÉFICIT NEUROLÓGICO FOCAL",
    "DOR TORÁCICA EM REPOUSO",
    "DISPNEIA EM REPOUSO",
    "HIPOTENSÃO",
    "SANGRAMENTO ATIVO"
  ]

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg border">
      <h2 className="text-xl font-semibold text-gray-900">Negativas Importantes</h2>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-3 block">Sinais de Alarme (Gerais)</label>
          <div className="space-y-2">
            {sinaisAlarmeItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                <span className="text-sm font-medium">{item}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => onChange({ neg_alarmes: "yes" })}
                    className={`px-3 py-1 text-xs rounded-md border transition-colors ${
                      data.neg_alarmes === "yes" 
                        ? "bg-green-100 text-green-800 border-green-300" 
                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    SIM
                  </button>
                  <button
                    onClick={() => onChange({ neg_alarmes: "no" })}
                    className={`px-3 py-1 text-xs rounded-md border transition-colors ${
                      data.neg_alarmes === "no" 
                        ? "bg-red-100 text-red-800 border-red-300" 
                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    NÃO
                  </button>
                  <button
                    onClick={() => onChange({ neg_alarmes: "nd" })}
                    className={`px-3 py-1 text-xs rounded-md border transition-colors ${
                      data.neg_alarmes === "nd" 
                        ? "bg-yellow-100 text-yellow-800 border-yellow-300" 
                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    NÃO DOCUMENTADO
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Dica:</strong> Use "NÃO DOCUMENTADO" para não assumir negações quando a informação não foi coletada.
          </p>
        </div>
      </div>
    </div>
  )
}
