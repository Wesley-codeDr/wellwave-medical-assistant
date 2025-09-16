import { AnamneseData } from "@/types/anamnese"

export interface CopySection {
  id: string
  label: string
  content: string
}

export function generateSectionContent(section: string, data: AnamneseData, maiusculas: boolean = false): string {
  let content = ""

  switch (section) {
    case "hda":
      // História da Doença Atual
      if (data.faixa && data.sexo && data.queixa_principal && data.tempo_final) {
        content += `PACIENTE ${data.faixa}, ${data.sexo}, PROCURA PS POR ${data.queixa_principal} COM INÍCIO HÁ ${data.tempo_final}.\n\n`
      }

      if (data.eva !== undefined || data.carater_dor || data.fatores_melhoria.length > 0 || data.fatores_piora.length > 0 || data.sintomas_associados.length > 0) {
        content += "CARACTERIZAÇÃO: "
        if (data.eva !== undefined) {
          content += `EVA ${data.eva}/10`
        }
        if (data.carater_dor) {
          content += `, CARÁTER ${data.carater_dor}`
        }
        if (data.fatores_melhoria.length > 0) {
          content += `; FATORES DE MELHORA ${data.fatores_melhoria.join(", ")}`
        }
        if (data.fatores_piora.length > 0) {
          content += `; PIORA ${data.fatores_piora.join(", ")}`
        }
        if (data.sintomas_associados.length > 0) {
          content += `; SINTOMAS ASSOCIADOS ${data.sintomas_associados.join(", ")}`
        }
        content += ".\n\n"
      }

      if (data.neg_alarmes === "no") {
        content += "NEGA SINAIS DE ALARME PERTINENTES (FEBRE ALTA, RIGIDEZ DE NUCA, DÉFICIT NEUROLÓGICO, DOR TORÁCICA/DISPNEIA EM REPOUSO, HIPOTENSÃO, SANGRAMENTO).\n\n"
      } else if (data.neg_alarmes === "nd") {
        content += "SEM SINAIS DE ALARME DOCUMENTADOS ATÉ O MOMENTO.\n\n"
      }
      break

    case "ef":
      // Exame Físico
      if (data.sinais_vitais.pa && data.sinais_vitais.fc && data.sinais_vitais.fr && data.sinais_vitais.tax && data.sinais_vitais.spo2) {
        content += `SINAIS VITAIS: PA ${data.sinais_vitais.pa} MMHG, FC ${data.sinais_vitais.fc} BPM, FR ${data.sinais_vitais.fr} IRPM, TAX ${data.sinais_vitais.tax} °C, SpO2 ${data.sinais_vitais.spo2}%`
        if (data.sinais_vitais.dxt) {
          content += `, DXT ${data.sinais_vitais.dxt} MG/DL`
        }
        content += ".\n\n"
      }

      if (data.achados_ef.length > 0) {
        content += `EXAME FÍSICO: ${data.achados_ef.join(", ")}.\n\n`
      }
      break

    case "hd":
      // Hipóteses Diagnósticas
      if (data.hipoteses.length > 0) {
        const hipotesesText = data.hipoteses.map(h => h.dx).join("; ")
        content += `HIPÓTESES DIAGNÓSTICAS: ${hipotesesText}.\n\n`
      }

      if (data.hipoteses.length > 0 || data.justificativas.length > 0 || data.scores.length > 0) {
        content += "DETALHAMENTO: "
        if (data.hipoteses.length > 0) {
          const cidsText = data.hipoteses.map(h => h.cid).join("; ")
          content += `CID-10 ${cidsText}`
        }
        if (data.justificativas.length > 0) {
          content += `; JUSTIFICATIVAS ${data.justificativas.join(", ")}`
        }
        if (data.scores.length > 0) {
          content += `; SCORES ${data.scores.join(", ")}`
        }
        content += ".\n\n"
      }
      break

    case "conduta":
      // Condutas
      if (data.prescricao.length > 0) {
        content += `CONDUTA MEDICAMENTOSA: ${data.prescricao.join(", ")} – CONFORME PROTOCOLO INSTITUCIONAL.\n\n`
      }

      if (data.orientacoes.length > 0) {
        content += `ORIENTAÇÕES: ${data.orientacoes.join(", ")}; DOCUMENTO PADRÃO: PACIENTE ORIENTADO SOBRE SINAIS DE ALARME E RETORNO IMEDIATO SE NECESSÁRIO. VERBALIZOU COMPREENSÃO.\n\n`
      }

      if (data.criterios.length > 0) {
        content += `CRITÉRIOS DE ALTA/INTERNAÇÃO: ${data.criterios.join(", ")}.\n\n`
      }
      break

    case "exames":
      // Exames
      content += "EXAMES COMPLEMENTARES:\n"
      content += "- HEMOGRAMA\n"
      content += "- PCR/VS\n"
      content += "- EXAMES ESPECÍFICOS CONFORME HIPÓTESES\n\n"
      break

    case "prescricao":
      // Prescrição
      if (data.prescricao.length > 0) {
        content += "PRESCRIÇÃO:\n"
        data.prescricao.forEach(med => {
          content += `- ${med} - CONFORME PROTOCOLO INSTITUCIONAL\n`
        })
        content += "\n"
      }
      break

    default:
      content = "Seção não encontrada."
  }

  return maiusculas ? content : content.toLowerCase()
}

export function generateFullAnamnese(data: AnamneseData, maiusculas: boolean = false): string {
  const sections = ["hda", "ef", "hd", "conduta"]
  let fullContent = ""

  sections.forEach(section => {
    const sectionContent = generateSectionContent(section, data, maiusculas)
    if (sectionContent.trim()) {
      fullContent += sectionContent
    }
  })

  // Adiciona informações adicionais
  if (data.comorbidades.length > 0) {
    fullContent += `ANTECEDENTES: ${data.comorbidades.join(", ")}.\n\n`
  }

  if (data.alergias_tri === "yes") {
    fullContent += "ALERGIAS: RELATA ALERGIA MEDICAMENTOSA.\n\n"
  } else if (data.alergias_tri === "no") {
    fullContent += "ALERGIAS: NEGA.\n\n"
  } else if (data.alergias_tri === "nd") {
    fullContent += "ALERGIAS: NÃO DOCUMENTADAS NESTA AVALIAÇÃO.\n\n"
  }

  if (data.mucs.length > 0) {
    fullContent += `MUC RELEVANTES: ${data.mucs.join(", ")}.\n\n`
  }

  if (data.pendências.length > 0) {
    fullContent += `PENDÊNCIAS: ${data.pendências.join(", ")}.\n\n`
  }

  fullContent += "SISTEMA AUXILIAR – NÃO SUBSTITUI JULGAMENTO CLÍNICO MÉDICO."

  return fullContent
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // Fallback para navegadores mais antigos
      const textArea = document.createElement("textarea")
      textArea.value = text
      textArea.style.position = "fixed"
      textArea.style.left = "-999999px"
      textArea.style.top = "-999999px"
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      
      try {
        document.execCommand('copy')
        document.body.removeChild(textArea)
        return true
      } catch (err) {
        document.body.removeChild(textArea)
        return false
      }
    }
  } catch (err) {
    console.error('Erro ao copiar para clipboard:', err)
    return false
  }
}

export function showCopyNotification(section: string, success: boolean): void {
  // Esta função será implementada com o sistema de toast
  // Por enquanto, apenas log no console
  if (success) {
    console.log(`✅ Seção ${section} copiada com sucesso!`)
  } else {
    console.log(`❌ Erro ao copiar seção ${section}`)
  }
}
