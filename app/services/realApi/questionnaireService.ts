/**
 * Serviço de Questionário
 * Integração com Backend API
 */
import { api } from "@/services/api"

import type {
  QuestionnaireAnalysisRequest,
  QuestionnaireAnalysisResponse,
  QuestionnaireRequest,
  QuestionnaireResponse,
} from "./types"

/**
 * Converte respostas do formato do app (Record<number, string>)
 * para o formato esperado pela API (questao_1, questao_2, etc)
 */
export function convertAnswersToApiFormat(
  answers: Record<number, string>,
): QuestionnaireRequest["respostas"] {
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
  apiAnswers: QuestionnaireRequest["respostas"],
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
export class RealQuestionnaireService {
  /**
   * Envia respostas do questionário para a API
   */
  async submitQuestionnaire(answers: Record<number, string>): Promise<
    | {
        ok: true
        questionnaireId: number
        score: number
        answers: Record<number, string>
      }
    | { ok: false; error: string }
  > {
    try {
      // Converter respostas para o formato da API
      const respostas = convertAnswersToApiFormat(answers)

      const payload: QuestionnaireRequest = { respostas }

      if (__DEV__) {
        console.log("[QuestionnaireService] Sending answers:", payload)
      }

      const response = await api.apisauce.post<QuestionnaireResponse>(
        "/questionario/resposta",
        payload,
      )

      // Verificar se a requisição foi bem sucedida
      if (!response.ok) {
        // Tratar diferentes tipos de erro
        if (response.status === 401) {
          return { ok: false, error: "Não autorizado. Faça login novamente." }
        }

        if (response.status === 422 && response.data && "errors" in response.data) {
          // Erros de validação
          const errors = (response.data as any).errors as Record<string, string[]>
          const firstError = Object.values(errors || {})[0]?.[0]
          return { ok: false, error: firstError || "Dados inválidos" }
        }

        if (response.status === 500) {
          return { ok: false, error: "Erro no servidor. Tente novamente mais tarde." }
        }

        return {
          ok: false,
          error: response.data?.message || "Erro ao enviar respostas do questionário",
        }
      }

      // Verificar se temos os dados esperados
      if (!response.data || !response.data.success || !response.data.data) {
        return { ok: false, error: "Resposta inválida do servidor" }
      }

      const { data } = response.data

      if (__DEV__) {
        console.log("[QuestionnaireService] Success:", {
          questionnaireId: data.id,
          score: data.pontuacao_total,
          userId: data.user_id,
        })
      }

      // Converter respostas de volta para o formato do app
      const answersConverted = convertAnswersFromApiFormat(data.respostas)

      return {
        ok: true,
        questionnaireId: data.id,
        score: data.pontuacao_total,
        answers: answersConverted,
      }
    } catch (error) {
      // Erros de rede ou outros erros não tratados
      if (__DEV__) {
        console.error("[QuestionnaireService] Error during submit:", error)
      }

      if (error instanceof Error) {
        return { ok: false, error: error.message }
      }

      return { ok: false, error: "Erro desconhecido ao enviar questionário" }
    }
  }

  /**
   * Analisa o questionário e retorna perfil, recomendações e alocação sugerida
   */
  async analyzeQuestionnaire(questionnaireId: number): Promise<
    | {
        ok: true
        analysis: QuestionnaireAnalysisResponse["data"]
      }
    | { ok: false; error: string }
  > {
    try {
      const payload: QuestionnaireAnalysisRequest = {
        questionario_id: questionnaireId,
      }

      if (__DEV__) {
        console.log("[QuestionnaireService] Analyzing questionnaire:", questionnaireId)
      }

      // A análise usa IA e pode demorar até 60 segundos
      const response = await api.apisauce.post<QuestionnaireAnalysisResponse>(
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
          return { ok: false, error: "Não autorizado. Faça login novamente." }
        }

        if (response.status === 404) {
          return { ok: false, error: "Questionário não encontrado." }
        }

        if (response.status === 422 && response.data && "errors" in response.data) {
          // Erros de validação
          const errors = (response.data as any).errors as Record<string, string[]>
          const firstError = Object.values(errors || {})[0]?.[0]
          return { ok: false, error: firstError || "Dados inválidos" }
        }

        if (response.status === 500) {
          return { ok: false, error: "Erro no servidor. Tente novamente mais tarde." }
        }

        return {
          ok: false,
          error: response.data?.message || "Erro ao analisar questionário",
        }
      }

      // Verificar se temos os dados esperados
      if (!response.data || !response.data.success || !response.data.data) {
        return { ok: false, error: "Resposta inválida do servidor" }
      }

      const { data } = response.data

      if (__DEV__) {
        console.log("[QuestionnaireService] Analysis success:", {
          perfil: data.perfil,
          pontuacaoRisco: data.pontuacao_risco,
          fonte: data.fonte,
        })
      }

      return {
        ok: true,
        analysis: data,
      }
    } catch (error) {
      // Erros de rede ou outros erros não tratados
      if (__DEV__) {
        console.error("[QuestionnaireService] Error during analysis:", error)
      }

      if (error instanceof Error) {
        return { ok: false, error: error.message }
      }

      return { ok: false, error: "Erro desconhecido ao analisar questionário" }
    }
  }

  /**
   * Busca questionário do usuário
   * TODO: Implementar quando o endpoint estiver disponível
   */
  async getQuestionnaire(): Promise<{ ok: true; data: any } | { ok: false; error: string }> {
    // TODO: Implementar chamada para endpoint de busca
    // try {
    //   const response = await api.apisauce.get("/questionario")
    //   return response.ok ? { ok: true, data: response.data } : { ok: false, error: "Erro" }
    // } catch (error) {
    //   return { ok: false, error: "Erro ao buscar questionário" }
    // }

    return { ok: false, error: "Endpoint não implementado" }
  }

  /**
   * Deleta questionário do usuário
   * TODO: Implementar quando o endpoint estiver disponível
   */
  async deleteQuestionnaire(): Promise<{ ok: boolean; error?: string }> {
    // TODO: Implementar chamada para endpoint de deleção
    // try {
    //   const response = await api.apisauce.delete("/questionario")
    //   return { ok: response.ok }
    // } catch (error) {
    //   if (__DEV__) {
    //     console.error("[QuestionnaireService] Error during delete:", error)
    //   }
    //   return { ok: false, error: "Erro ao deletar questionário" }
    // }

    return { ok: false, error: "Endpoint não implementado" }
  }
}

// Singleton instance
export const realQuestionnaireService = new RealQuestionnaireService()
