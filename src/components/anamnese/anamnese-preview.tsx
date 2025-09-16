"use client"

import * as React from "react"
import { AnamneseData } from "@/types/anamnese"
import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Copy } from "lucide-react"
import { generateSectionContent, generateFullAnamnese, copyToClipboard, showCopyNotification } from "@/lib/copy-utils"

interface AnamnesePreviewProps {
  data: AnamneseData
  maiusculas: boolean
  onToggleMaiusculas: (checked: boolean) => void
  onCopySection: (section: string) => void
  onCopyAll: () => void
}

export function AnamnesePreview({ 
  data, 
  maiusculas, 
  onToggleMaiusculas, 
  onCopySection,
  onCopyAll 
}: AnamnesePreviewProps) {
  const handleCopySection = async (section: string) => {
    const content = generateSectionContent(section, data, maiusculas)
    const success = await copyToClipboard(content)
    showCopyNotification(section, success)
    onCopySection(section)
  }

  const handleCopyAll = async () => {
    const content = generateFullAnamnese(data, maiusculas)
    const success = await copyToClipboard(content)
    showCopyNotification("anamnese completa", success)
    onCopyAll()
  }

  const generateText = () => {
    let text = ""

    // Início
    if (data.faixa && data.sexo && data.queixa_principal && data.tempo_final) {
      text += `PACIENTE ${data.faixa}, ${data.sexo}, PROCURA PS POR ${data.queixa_principal} COM INÍCIO HÁ ${data.tempo_final}.\n\n`
    }

    // Caracterização
    if (data.eva !== undefined || data.carater_dor || data.fatores_melhoria.length > 0 || data.fatores_piora.length > 0 || data.sintomas_associados.length > 0) {
      text += "CARACTERIZAÇÃO: "
      if (data.eva !== undefined) {
        text += `EVA ${data.eva}/10`
      }
      if (data.carater_dor) {
        text += `, CARÁTER ${data.carater_dor}`
      }
      if (data.fatores_melhoria.length > 0) {
        text += `; FATORES DE MELHORA ${data.fatores_melhoria.join(", ")}`
      }
      if (data.fatores_piora.length > 0) {
        text += `; PIORA ${data.fatores_piora.join(", ")}`
      }
      if (data.sintomas_associados.length > 0) {
        text += `; SINTOMAS ASSOCIADOS ${data.sintomas_associados.join(", ")}`
      }
      text += ".\n\n"
    }

    // Negativas importantes
    if (data.neg_alarmes === "no") {
      text += "NEGA SINAIS DE ALARME PERTINENTES (FEBRE ALTA, RIGIDEZ DE NUCA, DÉFICIT NEUROLÓGICO, DOR TORÁCICA/DISPNEIA EM REPOUSO, HIPOTENSÃO, SANGRAMENTO).\n\n"
    } else if (data.neg_alarmes === "nd") {
      text += "SEM SINAIS DE ALARME DOCUMENTADOS ATÉ O MOMENTO.\n\n"
    }

    // Antecedentes
    if (data.comorbidades.length > 0) {
      text += `ANTECEDENTES: ${data.comorbidades.join(", ")}.\n\n`
    }

    // Alergias
    if (data.alergias_tri === "yes") {
      text += "ALERGIAS: RELATA ALERGIA MEDICAMENTOSA.\n\n"
    } else if (data.alergias_tri === "no") {
      text += "ALERGIAS: NEGA.\n\n"
    } else if (data.alergias_tri === "nd") {
      text += "ALERGIAS: NÃO DOCUMENTADAS NESTA AVALIAÇÃO.\n\n"
    }

    // MUC
    if (data.mucs.length > 0) {
      text += `MUC RELEVANTES: ${data.mucs.join(", ")}.\n\n`
    }

    // Sinais vitais
    if (data.sinais_vitais.pa && data.sinais_vitais.fc && data.sinais_vitais.fr && data.sinais_vitais.tax && data.sinais_vitais.spo2) {
      text += `SINAIS VITAIS: PA ${data.sinais_vitais.pa} MMHG, FC ${data.sinais_vitais.fc} BPM, FR ${data.sinais_vitais.fr} IRPM, TAX ${data.sinais_vitais.tax} °C, SpO2 ${data.sinais_vitais.spo2}%`
      if (data.sinais_vitais.dxt) {
        text += `, DXT ${data.sinais_vitais.dxt} MG/DL`
      }
      text += ".\n\n"
    }

    // Exame físico
    if (data.achados_ef.length > 0) {
      text += `EXAME FÍSICO: ${data.achados_ef.join(", ")}.\n\n`
    }

    // Hipóteses
    if (data.hipoteses.length > 0) {
      const hipotesesText = data.hipoteses.map(h => `${h.dx} (${h.cid})`).join("; ")
      text += `HIPÓTESES DIAGNÓSTICAS: ${hipotesesText}.\n\n`
    }

    // Detalhamento
    if (data.justificativas.length > 0 || data.scores.length > 0) {
      text += "DETALHAMENTO: "
      if (data.justificativas.length > 0) {
        text += `JUSTIFICATIVAS ${data.justificativas.join(", ")}`
      }
      if (data.scores.length > 0) {
        text += `; SCORES ${data.scores.join(", ")}`
      }
      text += ".\n\n"
    }

    // Conduta medicamentosa
    if (data.prescricao.length > 0) {
      text += `CONDUTA MEDICAMENTOSA: ${data.prescricao.join(", ")} – CONFORME PROTOCOLO INSTITUCIONAL.\n\n`
    }

    // Orientações
    if (data.orientacoes.length > 0) {
      text += `ORIENTAÇÕES: ${data.orientacoes.join(", ")}; DOCUMENTO PADRÃO: PACIENTE ORIENTADO SOBRE SINAIS DE ALARME E RETORNO IMEDIATO SE NECESSÁRIO. VERBALIZOU COMPREENSÃO.\n\n`
    }

    // Critérios de alta/internação
    if (data.criterios.length > 0) {
      text += `CRITÉRIOS DE ALTA/INTERNAÇÃO: ${data.criterios.join(", ")}.\n\n`
    }

    // Pendências
    if (data.pendências.length > 0) {
      text += `PENDÊNCIAS: ${data.pendências.join(", ")}.\n\n`
    }

    // Aviso legal
    text += "SISTEMA AUXILIAR – NÃO SUBSTITUI JULGAMENTO CLÍNICO MÉDICO."

    return maiusculas ? text : text.toLowerCase()
  }

  const text = generateText()

  const sections = [
    { id: "hda", label: "HDA", shortcut: "Ctrl+1" },
    { id: "ef", label: "EF", shortcut: "Ctrl+2" },
    { id: "hd", label: "HD", shortcut: "Ctrl+3" },
    { id: "conduta", label: "Conduta", shortcut: "Ctrl+4" },
    { id: "exames", label: "Exames", shortcut: "Ctrl+5" },
    { id: "prescricao", label: "Prescrição", shortcut: "Ctrl+6" }
  ]

  const stats = React.useMemo(() => {
    const lines = text ? text.split(/\n/).length : 0
    const chars = text ? text.length : 0
    return { lines, chars }
  }, [text])

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Preview da Anamnese</CardTitle>
            <CardDescription>Texto pronto para colar no prontuário</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Toggle label="Maiúsculas" checked={maiusculas} onChange={onToggleMaiusculas} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Copiar</DropdownMenuLabel>
                <DropdownMenuItem onClick={handleCopyAll}>
                  Anamnese completa (Ctrl+0)
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {sections.map((s) => (
                  <DropdownMenuItem key={s.id} onClick={() => handleCopySection(s.id)}>
                    {s.label} ({s.shortcut})
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {sections.map((section) => (
            <Button
              key={section.id}
              onClick={() => handleCopySection(section.id)}
              variant="outline"
              size="sm"
              className="text-xs"
            >
              {section.label} ({section.shortcut})
            </Button>
          ))}
        </div>
        <ScrollArea className="max-h-96">
          <pre className="whitespace-pre-wrap text-sm font-mono leading-relaxed bg-muted border rounded-lg p-4">
            {text || "Preencha os campos para ver o preview da anamnese..."}
          </pre>
        </ScrollArea>
      </CardContent>

      <CardFooter className="justify-between text-xs text-muted-foreground">
        <span>Dica: use os atalhos Ctrl+0–6 para copiar rapidamente.</span>
        <span>{stats.lines} linhas • {stats.chars} caracteres</span>
      </CardFooter>
    </Card>
  )
}
