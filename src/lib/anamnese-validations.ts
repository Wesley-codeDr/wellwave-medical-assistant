import { AnamneseData, InteracaoMedicamentosa } from "@/types/anamnese"

export interface ValidationResult {
  isValid: boolean
  message: string
  severity: "error" | "warning" | "info"
}

export interface InteracaoAlert {
  medicamento1: string
  medicamento2: string
  severidade: "leve" | "moderada" | "grave"
  descricao: string
  alternativas?: string[]
}

// Base de dados de interações medicamentosas (simplificada)
const interacoesMedicamentosas: InteracaoAlert[] = [
  {
    medicamento1: "AAS",
    medicamento2: "DIPIRONA",
    severidade: "moderada",
    descricao: "Aumento do risco de sangramento gastrointestinal",
    alternativas: ["PARACETAMOL"]
  },
  {
    medicamento1: "AAS",
    medicamento2: "PARACETAMOL",
    severidade: "leve",
    descricao: "Pode potencializar efeitos anticoagulantes do AAS"
  },
  {
    medicamento1: "METOCLOPRAMIDA",
    medicamento2: "ONDANSETRONA",
    severidade: "moderada",
    descricao: "Antagonismo farmacológico - reduz eficácia de ambos"
  }
]

export function validateAnamnese(data: AnamneseData): ValidationResult[] {
  const validations: ValidationResult[] = []

  // Validação de campos obrigatórios
  if (!data.faixa) {
    validations.push({
      isValid: false,
      message: "Faixa etária é obrigatória",
      severity: "error"
    })
  }

  if (!data.queixa_principal) {
    validations.push({
      isValid: false,
      message: "Queixa principal é obrigatória",
      severity: "error"
    })
  }

  if (!data.tempo_final) {
    validations.push({
      isValid: false,
      message: "Tempo de evolução é obrigatório",
      severity: "error"
    })
  }

  // Validação de sinais vitais
  if (data.sinais_vitais.pa && (data.sinais_vitais.pa < 60 || data.sinais_vitais.pa > 250)) {
    validations.push({
      isValid: false,
      message: "Pressão arterial fora dos valores esperados (60-250 mmHg)",
      severity: "warning"
    })
  }

  if (data.sinais_vitais.fc && (data.sinais_vitais.fc < 40 || data.sinais_vitais.fc > 200)) {
    validations.push({
      isValid: false,
      message: "Frequência cardíaca fora dos valores esperados (40-200 bpm)",
      severity: "warning"
    })
  }

  if (data.sinais_vitais.tax && (data.sinais_vitais.tax < 30 || data.sinais_vitais.tax > 45)) {
    validations.push({
      isValid: false,
      message: "Temperatura axilar fora dos valores esperados (30-45°C)",
      severity: "warning"
    })
  }

  if (data.sinais_vitais.spo2 && (data.sinais_vitais.spo2 < 70 || data.sinais_vitais.spo2 > 100)) {
    validations.push({
      isValid: false,
      message: "Saturação de oxigênio fora dos valores esperados (70-100%)",
      severity: "warning"
    })
  }

  // Validação de hipóteses
  if (data.hipoteses.length === 0) {
    validations.push({
      isValid: false,
      message: "Pelo menos uma hipótese diagnóstica deve ser informada",
      severity: "error"
    })
  }

  if (data.hipoteses.length > 3) {
    validations.push({
      isValid: false,
      message: "Máximo de 3 hipóteses diagnósticas permitidas",
      severity: "warning"
    })
  }

  // Validação de alergias vs medicamentos
  if (data.alergias_tri === "yes" && data.prescricao.length > 0) {
    validations.push({
      isValid: false,
      message: "⚠️ ATENÇÃO: Paciente relata alergias medicamentosas. Verifique compatibilidade antes de prescrever.",
      severity: "error"
    })
  }

  // Validação de gestante vs AINE
  // Nota: Esta validação seria implementada se tivéssemos campo de gestante
  // if (data.gestante && data.medicacoes_ps.includes("AINE")) {
  //   validations.push({
  //     isValid: false,
  //     message: "CONTRAINDICAÇÃO: AINE em gestante",
  //     severity: "error"
  //   })
  // }

  return validations
}

export function checkInteracoesMedicamentosas(medicamentos: string[]): InteracaoAlert[] {
  const alertas: InteracaoAlert[] = []

  for (let i = 0; i < medicamentos.length; i++) {
    for (let j = i + 1; j < medicamentos.length; j++) {
      const med1 = medicamentos[i]
      const med2 = medicamentos[j]

      const interacao = interacoesMedicamentosas.find(
        int => 
          (int.medicamento1 === med1 && int.medicamento2 === med2) ||
          (int.medicamento1 === med2 && int.medicamento2 === med1)
      )

      if (interacao) {
        alertas.push(interacao)
      }
    }
  }

  return alertas
}

export function getSeverityColor(severity: "leve" | "moderada" | "grave"): string {
  switch (severity) {
    case "leve":
      return "text-yellow-800 bg-yellow-100 border-yellow-300"
    case "moderada":
      return "text-orange-800 bg-orange-100 border-orange-300"
    case "grave":
      return "text-red-800 bg-red-100 border-red-300"
    default:
      return "text-gray-800 bg-gray-100 border-gray-300"
  }
}

export function getValidationColor(severity: "error" | "warning" | "info"): string {
  switch (severity) {
    case "error":
      return "text-red-800 bg-red-100 border-red-300"
    case "warning":
      return "text-yellow-800 bg-yellow-100 border-yellow-300"
    case "info":
      return "text-blue-800 bg-blue-100 border-blue-300"
    default:
      return "text-gray-800 bg-gray-100 border-gray-300"
  }
}
