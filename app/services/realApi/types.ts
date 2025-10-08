/**
 * Tipos para a API Real do Backend
 * Base URL: http://localhost:8080/api
 */

// ============================================================================
// User Types
// ============================================================================

export interface RealApiUser {
  id: number
  name: string
  email: string
  email_verified_at: string | null
  cpf: string
  phone: string
  created_at: string
  updated_at: string
  deleted_at: string | null
}

// ============================================================================
// Auth Types
// ============================================================================

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  success: boolean
  message: string
  data: {
    user: RealApiUser
    token: string
  }
}

// ============================================================================
// Generic API Response Types
// ============================================================================

export interface RealApiSuccessResponse<T = any> {
  success: true
  message: string
  data: T
}

export interface RealApiErrorResponse {
  success: false
  message: string
  errors?: Record<string, string[]>
}

export type RealApiResponse<T = any> = RealApiSuccessResponse<T> | RealApiErrorResponse

// ============================================================================
// Questionnaire Types
// ============================================================================

export interface QuestionnaireRequest {
  respostas: {
    questao_1: string
    questao_2: string
    questao_3: string
    questao_4: string
    questao_5: string
    questao_6: string
    questao_7: string
    questao_8: string
    questao_9: string
    questao_10: string
  }
}

export interface QuestionnaireData {
  id: number
  user_id: number
  respostas: {
    questao_1: string
    questao_2: string
    questao_3: string
    questao_4: string
    questao_5: string
    questao_6: string
    questao_7: string
    questao_8: string
    questao_9: string
    questao_10: string
  }
  pontuacao_total: number
  data_resposta: string
  created_at: string
}

export interface QuestionnaireResponse {
  success: boolean
  message: string
  data: QuestionnaireData
}

// ============================================================================
// Questionnaire Analysis Types
// ============================================================================

export interface QuestionnaireAnalysisRequest {
  questionario_id: number
}

export interface QuestionnaireAnalysisData {
  questionario_id: number
  perfil: string
  justificativa: string
  recomendacoes: string[]
  pontuacao_risco: number
  alocacao_sugerida: {
    renda_fixa: string
    renda_variavel: string
    observacao: string
  }
  observacoes: string
  fonte: string
  timestamp: string
}

export interface QuestionnaireAnalysisResponse {
  success: boolean
  message: string
  data: QuestionnaireAnalysisData
}

// ============================================================================
// Helper Types para Integração com App
// ============================================================================

/**
 * Converte RealApiUser para o tipo User do app
 */
export interface UserAdapter {
  id: string
  name: string
  email: string
  phone: string
  birthdate: string
  password: string
  questionnaireAnswers?: Record<number, string>
  // Dados adicionais da API real
  cpf?: string
  emailVerified?: boolean
  createdAt?: string
  updatedAt?: string
  // ID do questionário respondido
  questionnaireId?: number
  // Análise do questionário
  questionnaireAnalysis?: QuestionnaireAnalysisData
}
