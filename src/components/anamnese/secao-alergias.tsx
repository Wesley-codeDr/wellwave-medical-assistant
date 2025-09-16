"use client"

import * as React from "react"
import { AnamneseData, TriCheckValue } from "@/types/anamnese"

interface SecaoAlergiasProps {
  data: AnamneseData
  onChange: (data: Partial<AnamneseData>) => void
}

export function SecaoAlergias({ data, onChange }: SecaoAlergiasProps) {
  const alergiasItems = [
    "PENICILINAS",
    "AAS",
    "AINES", 
    "DIPIRONA",
    "IODO"
  ]

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg border">
      <h2 className="text-xl font-semibold text-gray-900">Alergias Medicamentosas</h2>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-3 block">Alergias Conhecidas</label>
          <div className="space-y-2">
            {alergiasItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                <span className="text-sm font-medium">{item}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => onChange({ alergias_tri: "yes" })}
                    className={`px-3 py-1 text-xs rounded-md border transition-colors ${
                      data.alergias_tri === "yes" 
                        ? "bg-green-100 text-green-800 border-green-300" 
                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    SIM
                  </button>
                  <button
                    onClick={() => onChange({ alergias_tri: "no" })}
                    className={`px-3 py-1 text-xs rounded-md border transition-colors ${
                      data.alergias_tri === "no" 
                        ? "bg-red-100 text-red-800 border-red-300" 
                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    NÃO
                  </button>
                  <button
                    onClick={() => onChange({ alergias_tri: "nd" })}
                    className={`px-3 py-1 text-xs rounded-md border transition-colors ${
                      data.alergias_tri === "nd" 
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

        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">
            <strong>⚠️ Importante:</strong> Alergias medicamentosas são críticas para segurança do paciente. 
            Sempre verifique antes de prescrever medicamentos.
          </p>
        </div>
      </div>
    </div>
  )
}
