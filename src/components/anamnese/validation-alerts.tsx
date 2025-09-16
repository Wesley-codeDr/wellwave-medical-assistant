"use client"

import * as React from "react"
import { AnamneseData } from "@/types/anamnese"
import { 
  validateAnamnese, 
  checkInteracoesMedicamentosas, 
  getValidationColor,
  getSeverityColor,
  ValidationResult,
  InteracaoAlert
} from "@/lib/anamnese-validations"
import { AlertTriangle, XCircle, Info, AlertCircle } from "lucide-react"

interface ValidationAlertsProps {
  data: AnamneseData
  className?: string
}

export function ValidationAlerts({ data, className }: ValidationAlertsProps) {
  const [validations, setValidations] = React.useState<ValidationResult[]>([])
  const [interacoes, setInteracoes] = React.useState<InteracaoAlert[]>([])

  React.useEffect(() => {
    const validationResults = validateAnamnese(data)
    setValidations(validationResults)

    const interacaoResults = checkInteracoesMedicamentosas(data.prescricao)
    setInteracoes(interacaoResults)
  }, [data])

  const getIcon = (severity: "error" | "warning" | "info") => {
    switch (severity) {
      case "error":
        return <XCircle className="h-4 w-4" />
      case "warning":
        return <AlertTriangle className="h-4 w-4" />
      case "info":
        return <Info className="h-4 w-4" />
    }
  }

  const getInteracaoIcon = (severity: "leve" | "moderada" | "grave") => {
    switch (severity) {
      case "leve":
        return <Info className="h-4 w-4" />
      case "moderada":
        return <AlertTriangle className="h-4 w-4" />
      case "grave":
        return <XCircle className="h-4 w-4" />
    }
  }

  if (validations.length === 0 && interacoes.length === 0) {
    return null
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Validações gerais */}
      {validations.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Validações
          </h3>
          {validations.map((validation, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border flex items-start gap-2 ${getValidationColor(validation.severity)}`}
            >
              {getIcon(validation.severity)}
              <span className="text-sm">{validation.message}</span>
            </div>
          ))}
        </div>
      )}

      {/* Alertas de interação medicamentosa */}
      {interacoes.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Interações Medicamentosas
          </h3>
          {interacoes.map((interacao, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border ${getSeverityColor(interacao.severidade)}`}
            >
              <div className="flex items-start gap-2">
                {getInteracaoIcon(interacao.severidade)}
                <div className="flex-1">
                  <div className="text-sm font-medium">
                    {interacao.medicamento1} + {interacao.medicamento2}
                  </div>
                  <div className="text-sm mt-1">
                    {interacao.descricao}
                  </div>
                  {interacao.alternativas && (
                    <div className="text-sm mt-2">
                      <strong>Alternativas sugeridas:</strong> {interacao.alternativas.join(", ")}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
