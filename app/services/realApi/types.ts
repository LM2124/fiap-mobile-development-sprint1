// ============================================================================
// General Typing
// ============================================================================
export type ApiErrorList<T extends object> = Record<keyof T, string[]>

export type ApiDataResponse<T extends object, ErrorSchema extends object = ApiErrorList<T>> =
  | { success: true; message?: string; data?: T }
  // TODO: Descobrir se `errors` é um campo opcional ou se sempre vai ser no mínimo `null`
  | { success: false; message?: string; error?: string; errors?: ErrorSchema | null }

export type ApiVoidResponse =
  | { success: true; message?: string }
  // TODO: ver se errors pode ser alguma coisa além de null se não há body
  | { success: false; message?: string; errors: null }

export type ApiResponse<T extends object | void = void> = T extends object
  ? ApiDataResponse<T>
  : ApiVoidResponse

// Classe vazia para ajudar a diferenciar erros
// jogados pela API de outros erros de runtime
export class ApiServiceError extends Error {}

// ============================================================================
// User Types
// ============================================================================
export type UserId = number

export interface ApiUser {
  id: number
  name: string
  email: string
  phone: string
  updated_at: string
  created_at: string
}

// ============================================================================
// Auth Types
// ============================================================================

export type AuthToken = string

export interface SignUpRequestBody {
  name: string
  email: string
  phone: string
  password: string
  password_confirmation: string
  birthdate: string
}
export interface SignUpResponseData {
  user: ApiUser
  token: AuthToken
}

export interface LoginRequestBody {
  email: string
  password: string
}
export interface LoginResponseData {
  user: ApiUser
  token: AuthToken
  questionario_status: {
    has_answered: boolean
    has_classified_profile: boolean
    ultima_resposta?: {
      id: number
      data_resposta: string
      pontuacao_total: number
      perfil_classificado: string
      foi_analisada: boolean
    }
  }
}

export interface LogoutRequestBody {}
export interface LogoutResponseData {}

// ============================================================================
// Questionnaire Types
// ============================================================================
export type QuestionnaireId = number

export type ApiQuestionnaireAnswers = {
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

export interface QuestionnaireSubmitRequestBody {
  respostas: ApiQuestionnaireAnswers
}

export interface QuestionnaireSubmitResponse {
  id: QuestionnaireId
  user_id: UserId
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

// ============================================================================
// Questionnaire Analysis Types
// ============================================================================

export interface QuestionnaireAnalysisRequest {
  questionario_id: QuestionnaireId
}

export interface QuestionnaireAnalysisResponseData {
  questionario_id: QuestionnaireId
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

// ============================================================================
// Helper Types para Integração com App
// ============================================================================

/**
 * Converte RealApiUser para o tipo User do app
 */
export interface UserAdapter {
  id: UserId
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
  questionnaireId?: QuestionnaireId
  // Análise do questionário
  questionnaireAnalysis?: QuestionnaireAnalysisResponseData
}
