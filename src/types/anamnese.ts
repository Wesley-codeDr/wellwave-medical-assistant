export type Tri = "yes" | "no" | "nd" // Sim | Não | Não documentado
export type TriCheckValue = Tri // Mantido para compatibilidade

export interface Vitals {
  pa?: number // mmHg (sistólica)
  fc?: number // bpm
  fr?: number // irpm
  tax?: number // °C
  spo2?: number // %
  dxt?: number // mg/dL
}

export interface ICDEntry {
  code: string
  desc: string
}

export interface Diagnostico {
  dx: string
  cid: string
}

export interface AnamneseData {
  // Demografia
  faixa: "PEDIÁTRICO" | "ADULTO" | "IDOSO" | ""
  sexo: "MASCULINO" | "FEMININO" | ""
  gestante: Tri

  // Queixa e síndrome
  sindrome: string
  queixa_principal: string
  queixa_livre: string

  // Tempo
  tempo_preset: string
  tempo_valor: number | ""
  tempo_unidade: "min" | "h" | "d"
  tempo_final: string

  // Caracterização
  eva: number
  carater_dor: string
  fatores_melhoria: string[]
  fatores_piora: string[]
  sintomas_associados: string[]

  // Antecedentes
  mucs: string[]
  comorbidades: string[]
  alergias_tri: Tri
  alergias_marcadas: string[]
  neg_alarmes: Tri

  // Exame físico
  sinais_vitais: Vitals
  achados_ef: string[]

  // Hipóteses
  hipoteses: Diagnostico[]
  hipo_custom_dx: string
  hipo_custom_cid: string

  // Detalhamento
  justificativas: string[]
  scores: string[]

  // Conduta
  prescricao: string[]
  orientacoes: string[]
  criterios: string[]
  pendências: string[]

  // Preview
  uppercase: boolean
  edit_preview: boolean
  preview_override: string
}

export interface Medicamento {
  id: string
  nome_generico: string
  rotas: string[]
  posologia_padrao: string
  ajustes: {
    renal: boolean
    hepatico: boolean
  }
}

export interface InteracaoMedicamentosa {
  medicamento1: string
  medicamento2: string
  severidade: "leve" | "moderada" | "grave"
  descricao: string
  alternativas?: string[]
}

export interface TemplateSindrome {
  negativos_relevantes: string[]
  sugestoes_scores: string[]
  exames_sugeridos: string[]
  medicacoes_sugeridas: string[]
  regras_extra: Array<{
    se: Record<string, any>
    entao_alerta: string
  }>
}

export interface AnamneseConfig {
  medicamentos: {
    catalogo: Medicamento[]
    interacoes: {
      provedor_externo: boolean
      provedores_recomendados: string[]
      severidade: string[]
    }
  }
  templates_por_sindrome: Record<string, TemplateSindrome>
  validacoes: Array<{
    id: string
    se: Record<string, any>
    entao: {
      bloquear: boolean
      mensagem: string
    }
  }>
}
