import { AnamneseData } from "@/types/anamnese"

export interface SindromeTemplate {
  negativos_relevantes: string[]
  sugestoes_scores: string[]
  exames_sugeridos: string[]
  medicacoes_sugeridas: string[]
  regras_extra: Array<{
    se: Record<string, any>
    entao_alerta: string
  }>
}

export const sindromeTemplates: Record<string, SindromeTemplate> = {
  "CEFALEIA": {
    negativos_relevantes: [
      "FEBRE",
      "RIGIDEZ DE NUCA", 
      "DÉFICIT NEUROLÓGICO",
      "INÍCIO SÚBITO EXPLOSIVO"
    ],
    sugestoes_scores: ["Canadian Head CT"],
    exames_sugeridos: ["HEMOGRAMA", "PCR/VS", "TC CRÂNIO SE INDICADO"],
    medicacoes_sugeridas: ["DIPIRONA", "ONDANSETRONA"],
    regras_extra: [
      {
        se: { idade: ">=50", sintomas_associados: ["DÉFICIT NEUROLÓGICO FOCAL"] },
        entao_alerta: "AVALIAR HSA/AVE – SINAIS DE ALARME."
      }
    ]
  },
  "DOR TORÁCICA": {
    negativos_relevantes: [
      "DISPNEIA EM REPOUSO",
      "DOR À PALPAÇÃO REPRODUTÍVEL",
      "SUDORESE IMPORTANTE"
    ],
    sugestoes_scores: ["HEART", "TIMI", "WELLS PE"],
    exames_sugeridos: ["ECG", "TROPONINA", "DÍMERO-D", "RX TÓRAX"],
    medicacoes_sugeridas: ["AAS"],
    regras_extra: [
      {
        se: { dor_toracica_opressiva: true, idade: ">=40" },
        entao_alerta: "ALTO RISCO – APLICAR HEART/TIMI E MONITORAR."
      }
    ]
  },
  "DISPNEIA": {
    negativos_relevantes: [
      "SIBILOS AUSENTES",
      "USO DE MUSCULATURA ACESSÓRIA",
      "CIANOSE"
    ],
    sugestoes_scores: ["WELLS PE", "PSI/PORT"],
    exames_sugeridos: ["GASOMETRIA", "RX TÓRAX"],
    medicacoes_sugeridas: ["ONDANSETRONA"],
    regras_extra: [
      {
        se: { spo2: "<92" },
        entao_alerta: "SATURAÇÃO BAIXA – CONSIDERAR O2/VENTILAÇÃO DE SUPORTE."
      }
    ]
  },
  "DOR ABDOMINAL": {
    negativos_relevantes: [
      "DEFESA/REBOTE",
      "FEBRE",
      "VÔMITOS PERSISTENTES"
    ],
    sugestoes_scores: ["Alvarado (futuro)"],
    exames_sugeridos: ["HEMOGRAMA", "AMILASE/LIPASE", "USG ABDOMINAL"],
    medicacoes_sugeridas: ["DIPIRONA", "METOCLOPRAMIDA"],
    regras_extra: []
  },
  "FEBRE": {
    negativos_relevantes: [
      "RIGIDEZ DE NUCA",
      "ALTERAÇÃO DO ESTADO MENTAL",
      "TAQUIPNEIA"
    ],
    sugestoes_scores: ["qSOFA"],
    exames_sugeridos: ["HEMOCULTURAS SE SEPSE SUSPEITA", "RX TÓRAX SE TOSSE", "EAS/URICULTURA"],
    medicacoes_sugeridas: ["PARACETAMOL"],
    regras_extra: [
      {
        se: { tax: ">=38.0", fc: ">=90", fr: ">=22" },
        entao_alerta: "AVALIAR SIRS/SEPSE – INICIAR BUNDLE SE INDICADO."
      }
    ]
  }
}

export function getSindromeTemplate(queixaPrincipal: string): SindromeTemplate | null {
  // Busca o template baseado na queixa principal
  if (sindromeTemplates[queixaPrincipal]) {
    return sindromeTemplates[queixaPrincipal]
  }
  return null
}

export function applySindromeTemplate(data: AnamneseData): Partial<AnamneseData> {
  const template = getSindromeTemplate(data.queixa_principal)
  if (!template) return {}

  const updates: Partial<AnamneseData> = {}

  // Aplica sugestões de scores
  if (template.sugestoes_scores.length > 0) {
    updates.scores = [
      ...new Set([...data.scores, ...template.sugestoes_scores])
    ]
  }

  // Aplica sugestões de medicamentos
  if (template.medicacoes_sugeridas.length > 0) {
    updates.prescricao = [
      ...new Set([...data.prescricao, ...template.medicacoes_sugeridas])
    ]
  }

  return updates
}

export function checkSindromeRules(data: AnamneseData): string[] {
  const template = getSindromeTemplate(data.queixa_principal)
  if (!template) return []

  const alertas: string[] = []

  for (const regra of template.regras_extra) {
    let condicaoAtendida = true

    for (const [campo, valor] of Object.entries(regra.se)) {
      if (campo === "faixa") {
        if (data.faixa !== valor) {
          condicaoAtendida = false
          break
        }
      } else if (campo === "sintomas_associados") {
        if (!data.sintomas_associados.some(sintoma => valor.includes(sintoma))) {
          condicaoAtendida = false
          break
        }
      } else if (campo === "spo2") {
        if (valor.startsWith("<")) {
          const limite = parseInt(valor.substring(1))
          if (data.sinais_vitais.spo2 && data.sinais_vitais.spo2 >= limite) {
            condicaoAtendida = false
            break
          }
        }
      } else if (campo === "tax") {
        if (valor.startsWith(">=")) {
          const limite = parseFloat(valor.substring(2))
          if (data.sinais_vitais.tax && data.sinais_vitais.tax < limite) {
            condicaoAtendida = false
            break
          }
        }
      } else if (campo === "fc") {
        if (valor.startsWith(">=")) {
          const limite = parseInt(valor.substring(2))
          if (data.sinais_vitais.fc && data.sinais_vitais.fc < limite) {
            condicaoAtendida = false
            break
          }
        }
      } else if (campo === "fr") {
        if (valor.startsWith(">=")) {
          const limite = parseInt(valor.substring(2))
          if (data.sinais_vitais.fr && data.sinais_vitais.fr < limite) {
            condicaoAtendida = false
            break
          }
        }
      }
    }

    if (condicaoAtendida) {
      alertas.push(regra.entao_alerta)
    }
  }

  return alertas
}
