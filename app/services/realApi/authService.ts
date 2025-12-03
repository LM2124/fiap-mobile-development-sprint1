/**
 * Serviço de Autenticação Real
 * Integração com Backend API
 */
import type { User } from "types/User"

import { api } from "@/services/api"

import {
  ApiServiceError,
  type ApiResponse,
  type AuthToken,
  type LoginRequestBody,
  type LoginResponseData,
  type ApiUser,
  type SignUpRequestBody,
  type SignUpResponseData,
  type LogoutRequestBody,
  type LogoutResponseData,
} from "./types"

function debugLog(...rest: Parameters<typeof console.log>) {
  if (__DEV__) return console.log("[AuthService]", ...rest)
}
function debugError(...rest: Parameters<typeof console.error>) {
  if (__DEV__) return console.error("[AuthService]", ...rest)
}

/**
 * Converte o usuário da API real para o formato do app
 */
export function adaptApiUser(apiUser: ApiUser): User {
  return {
    id: apiUser.id.toString(),
    name: apiUser.name,
    email: apiUser.email,
    phone: apiUser.phone,
    // Como a API não retorna birthdate, vamos usar um placeholder
    // TODO: Ajustar quando o backend incluir birthdate
    birthdate: "",
    // Não precisamos da senha no frontend
    password: "",
  }
}

/**
 * Serviço de Autenticação com a API Real
 */
export class AuthService {
  async signUp(payload: SignUpRequestBody) {
    try {
      debugLog("Sending Sign Up form")

      const response = await api.apisauce.post<ApiResponse<SignUpResponseData>>(
        "/auth/register",
        payload,
      )

      // Verificar se a requisição foi bem sucedida
      if (!response.ok) {
        // Tratar diferentes tipos de erro
        if (response.status === 422 && response.data && "errors" in response.data) {
          // Erros de validação
          const errors = (response.data as any).errors as Record<string, string[]>
          const firstError = Object.values(errors || {})[0]?.[0]
          throw new ApiServiceError(firstError || "Dados inválidos")
        }

        if (response.status === 500) {
          throw new ApiServiceError("Erro no servidor. Tente novamente mais tarde.")
        }

        throw new ApiServiceError(response.data?.message || "Erro ao fazer cadastro")
      }

      // Verificar se temos os dados esperados
      if (!response.data || !response.data.success || !response.data.data) {
        throw new ApiServiceError("Resposta inválida do servidor")
      }

      const { user: apiUser, token } = response.data.data

      // Converter usuário para o formato do app
      const user = adaptApiUser(apiUser)

      return { user, token }
    } catch (error) {
      // Erros de rede ou outros erros não tratados
      debugError("Error during signUP:", error)

      if (error instanceof Error) {
        throw error
      }

      throw new Error("Erro desconhecido ao fazer cadastro")
    }
  }
  /**
   * Realiza login na API real
   */
  async signIn(email: string, password: string): Promise<{ user: User; token: AuthToken }> {
    try {
      const payload: LoginRequestBody = { email, password }

      debugLog("Sending login form:", payload)

      const response = await api.apisauce.post<ApiResponse<LoginResponseData>>(
        "/auth/login",
        payload,
      )

      // Verificar se a requisição foi bem sucedida
      if (!response.ok) {
        // Tratar diferentes tipos de erro
        if (response.status === 401) {
          throw new ApiServiceError("Email ou senha incorretos")
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

        throw new ApiServiceError(response.data?.message || "Erro ao fazer login")
      }

      // Verificar se temos os dados esperados
      if (!response.data || !response.data.success || !response.data.data) {
        throw new ApiServiceError("Resposta inválida do servidor")
      }

      const { user: realUser, token, questionario_status } = response.data.data

      // Converter usuário para o formato do app
      const user = adaptApiUser(realUser)

      if (questionario_status.has_answered && questionario_status.ultima_resposta) {
        user.questionnaireId = questionario_status.ultima_resposta.id
      }

      return { user, token }
    } catch (error) {
      // Erros de rede ou outros erros não tratados
      debugError("Error during signIn:", error)

      if (error instanceof Error) {
        throw error
      }

      throw new Error("Erro desconhecido ao fazer login")
    }
  }

  /**
   * Realiza logout na API
   */
  async signOut() {
    try {
      const payload: LogoutRequestBody = {}

      debugLog("Sending Logout request:", payload)

      const response = await api.apisauce.post<ApiResponse<LogoutResponseData>>(
        "/auth/logout",
        payload,
      )

      // Verificar se a requisição foi bem sucedida
      if (!response.ok) {
        if (response.status === 500) {
          throw new ApiServiceError("Erro no servidor. Tente novamente mais tarde.")
        }

        throw new ApiServiceError(response.data?.message || "Erro ao fazer logout")
      }
    } catch (_error) {
      debugError("Error during signOut:", _error)

      throw new ApiServiceError("Erro ao fazer logout")
    }
  }
}

// Singleton instance
export const authService = new AuthService()
