"use client"

import * as React from "react"
import { AnamneseData } from "@/types/anamnese"
import { 
  getSindromeTemplate, 
  checkSindromeRules,
  applySindromeTemplate 
} from "@/lib/sindrome-templates"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, AlertTriangle, Stethoscope, Pill, ClipboardList } from "lucide-react"

interface SindromeSuggestionsProps {
  data: AnamneseData
  onApplySuggestions: (updates: Partial<AnamneseData>) => void
  className?: string
}

export function SindromeSuggestions({ data, onApplySuggestions, className }: SindromeSuggestionsProps) {
  const template = getSindromeTemplate(data.sindrome)
  const alertas = checkSindromeRules(data)

  if (!template) {
    return null
  }

  const handleApplySuggestions = () => {
    const updates = applySindromeTemplate(data)
    onApplySuggestions(updates)
  }

  return (
    <Card className={`p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="h-5 w-5 text-yellow-600" />
        <h3 className="text-lg font-semibold text-gray-800">
          Sugestões para {data.queixa_principal}
        </h3>
      </div>

      <div className="space-y-4">
        {/* Negativos relevantes */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Negativos Relevantes</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {template.negativos_relevantes.map((negativo, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {negativo}
              </Badge>
            ))}
          </div>
        </div>

        {/* Scores sugeridos */}
        {template.sugestoes_scores.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Stethoscope className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Scores Sugeridos</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {template.sugestoes_scores.map((score, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {score}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Exames sugeridos */}
        {template.exames_sugeridos.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ClipboardList className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">Exames Sugeridos</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {template.exames_sugeridos.map((exame, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {exame}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Medicamentos sugeridos */}
        {template.medicacoes_sugeridas.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Pill className="h-4 w-4 text-red-600" />
              <span className="text-sm font-medium text-gray-700">Medicamentos Sugeridos</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {template.medicacoes_sugeridas.map((medicamento, index) => (
                <Badge key={index} variant="destructive" className="text-xs">
                  {medicamento}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Alertas específicos */}
        {alertas.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <span className="text-sm font-medium text-gray-700">Alertas Específicos</span>
            </div>
            <div className="space-y-1">
              {alertas.map((alerta, index) => (
                <div key={index} className="p-2 bg-red-50 border border-red-200 rounded text-sm text-red-800">
                  {alerta}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Botão para aplicar sugestões */}
        <Button 
          onClick={handleApplySuggestions}
          variant="outline" 
          size="sm"
          className="w-full"
        >
          Aplicar Sugestões
        </Button>
      </div>
    </Card>
  )
}
