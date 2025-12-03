/**
 * Serviço de Questionário
 * Integração com Backend API
 */
import { api } from "@/services/api"

import {
  ApiServiceError,
  type ApiQuestionnaireAnswers,
  type ApiResponse,
  type QuestionnaireAnalysisRequest,
  type QuestionnaireAnalysisResponseData,
  type QuestionnaireSubmitRequestBody,
  type QuestionnaireSubmitResponse,
} from "./types"

function debugLog(...rest: Parameters<typeof console.log>) {
  if (__DEV__) return console.log("[QuestionnaireService]", ...rest)
}
function debugError(...rest: Parameters<typeof console.error>) {
  if (__DEV__) return console.error("[QuestionnaireService]", ...rest)
}

/**
 * Converte respostas do formato do app (Record<number, string>)
 * para o formato esperado pela API (questao_1, questao_2, etc)
 */
export function convertAnswersToApiFormat(
  answers: Record<number, string>,
): ApiQuestionnaireAnswers {
  return {
    questao_1: answers[0] || "",
    questao_2: answers[1] || "",
    questao_3: answers[2] || "",
    questao_4: answers[3] || "",
    questao_5: answers[4] || "",
    questao_6: answers[5] || "",
    questao_7: answers[6] || "",
    questao_8: answers[7] || "",
    questao_9: answers[8] || "",
    questao_10: answers[9] || "",
  }
}

/**
 * Converte respostas do formato da API para o formato do app
 */
export function convertAnswersFromApiFormat(
  apiAnswers: ApiQuestionnaireAnswers,
): Record<number, string> {
  return {
    0: apiAnswers.questao_1,
    1: apiAnswers.questao_2,
    2: apiAnswers.questao_3,
    3: apiAnswers.questao_4,
    4: apiAnswers.questao_5,
    5: apiAnswers.questao_6,
    6: apiAnswers.questao_7,
    7: apiAnswers.questao_8,
    8: apiAnswers.questao_9,
    9: apiAnswers.questao_10,
  }
}

/**
 * Serviço de Questionário com a API Real
 */
export class QuestionnaireService {
  /**
   * Envia respostas do questionário para a API
   */
  async submitQuestionnaire(answers: Record<number, string>): Promise<{
    questionnaireId: number
    score: number
    answers: Record<number, string>
  }> {
    try {
      // Converter respostas para o formato da API
      const respostas = convertAnswersToApiFormat(answers)

      const payload: QuestionnaireSubmitRequestBody = { respostas }

      debugLog("Sending answers:", payload)

      const response = await api.apisauce.post<ApiResponse<QuestionnaireSubmitResponse>>(
        "/questionario/resposta",
        payload,
      )

      // Verificar se a requisição foi bem sucedida
      if (!response.ok) {
        // Tratar diferentes tipos de erro
        if (response.status === 401) {
          throw new ApiServiceError("Não autorizado. Faça login novamente.")
        }

        if (response.status === 422 && response.data && "errors" in response.data) {
          // Erros de validação
          const errors = (response.data as any).errors as Record<string, string[]>
          const firstError = Object.values(errors || {})[0]?.[0]
          throw new ApiServiceError(firstError || "Dados inválidos")
        }

        if (response.status === 500) {
          throw new ApiServiceError("Erro no servidor. Tente novamente mais tarde.")
        }

        throw new ApiServiceError(
          response.data?.message || "Erro ao enviar respostas do questionário",
        )
      }

      // Verificar se temos os dados esperados
      if (!response.data || !response.data.success || !response.data.data) {
        throw new ApiServiceError("Resposta inválida do servidor")
      }

      const { data } = response.data

      debugLog("Success:", {
        questionnaireId: data.id,
        score: data.pontuacao_total,
        userId: data.user_id,
      })

      // Converter respostas de volta para o formato do app
      const answersConverted = convertAnswersFromApiFormat(data.respostas)

      return {
        questionnaireId: data.id,
        score: data.pontuacao_total,
        answers: answersConverted,
      }
    } catch (error) {
      // Erros de rede ou outros erros não tratados
      debugError("Error during submit:", error)

      if (error instanceof Error) {
        throw error
      }

      throw new Error("Erro desconhecido ao enviar questionário")
    }
  }

  /**
   * Analisa o questionário e retorna perfil, recomendações e alocação sugerida
   */
  async analyzeQuestionnaire(questionnaireId: number): Promise<QuestionnaireAnalysisResponseData> {
    try {
      const payload: QuestionnaireAnalysisRequest = {
        questionario_id: questionnaireId,
      }

      debugLog("Analyzing questionnaire:", questionnaireId)

      // A análise usa IA e pode demorar até 60 segundos
      const response = await api.apisauce.post<ApiResponse<QuestionnaireAnalysisResponseData>>(
        "/questionario/analisar",
        payload,
        {
          timeout: 70000, // 70 segundos para garantir
        },
      )

      // Verificar se a requisição foi bem sucedida
      if (!response.ok) {
        // Tratar diferentes tipos de erro
        if (response.status === 401) {
          throw new ApiServiceError("Não autorizado. Faça login novamente.")
        }

        if (response.status === 404) {
          throw new ApiServiceError("Questionário não encontrado.")
        }

        if (response.status === 422 && response.data && "errors" in response.data) {
          // Erros de validação
          const errors = response.data.errors
          const firstError = Object.values(errors || {}).flat()[0]
          throw new ApiServiceError(firstError || "Dados inválidos")
        }

        if (response.status === 500) {
          throw new ApiServiceError("Erro no servidor. Tente novamente mais tarde.")
        }

        throw new ApiServiceError(response.data?.message || "Erro ao analisar questionário")
      }

      // Verificar se temos os dados esperados
      if (!response.data || !response.data.success || !response.data.data) {
        throw new ApiServiceError("Resposta inválida do servidor")
      }

      const { data } = response.data

      debugLog("Analysis success:", {
        perfil: data.perfil,
        pontuacaoRisco: data.pontuacao_risco,
        fonte: data.fonte,
      })

      return data
    } catch (error) {
      // Erros de rede ou outros erros não tratados
      debugError("Error during analysis:", error)

      if (error instanceof Error) {
        throw error
      }

      throw new Error("Erro desconhecido ao analisar questionário")
    }
  }
}

// Singleton instance
export const questionnaireService = new QuestionnaireService()
