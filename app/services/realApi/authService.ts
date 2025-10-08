/**
 * Serviço de Autenticação Real
 * Integração com Backend API
 */
import type { User } from "types/User"

import { api } from "@/services/api"

import type { LoginRequest, LoginResponse, RealApiUser } from "./types"

/**
 * Converte o usuário da API real para o formato do app
 */
export function adaptRealApiUser(realUser: RealApiUser): User {
  return {
    id: realUser.id.toString(),
    name: realUser.name,
    email: realUser.email,
    phone: realUser.phone,
    // Como a API não retorna birthdate, vamos usar um placeholder
    // TODO: Ajustar quando o backend incluir birthdate
    birthdate: "",
    // Não precisamos da senha no frontend
    password: "",
    // Manter undefined se não houver respostas
    questionnaireAnswers: undefined,
  }
}

/**
 * Serviço de Autenticação com a API Real
 */
export class RealAuthService {
  /**
   * Realiza login na API real
   */
  async signIn(
    email: string,
    password: string,
  ): Promise<{ ok: true; user: User; token: string } | { ok: false; error: string }> {
    try {
      const payload: LoginRequest = { email, password }

      const response = await api.apisauce.post<LoginResponse>("/auth/login", payload)

      // Verificar se a requisição foi bem sucedida
      if (!response.ok) {
        // Tratar diferentes tipos de erro
        if (response.status === 401) {
          return { ok: false, error: "Email ou senha incorretos" }
        }

        if (response.status === 422 && response.data && "errors" in response.data) {
          // Erros de validação
          const errors = response.data.errors
          const firstError = Object.values(errors)[0]?.[0]
          return { ok: false, error: firstError || "Dados inválidos" }
        }

        if (response.status === 500) {
          return { ok: false, error: "Erro no servidor. Tente novamente mais tarde." }
        }

        return { ok: false, error: response.data?.message || "Erro ao fazer login" }
      }

      // Verificar se temos os dados esperados
      if (!response.data || !response.data.success || !response.data.data) {
        return { ok: false, error: "Resposta inválida do servidor" }
      }

      const { user: realUser, token } = response.data.data

      // Converter usuário para o formato do app
      const user = adaptRealApiUser(realUser)

      return { ok: true, user, token }
    } catch (error) {
      // Erros de rede ou outros erros não tratados
      if (__DEV__) {
        console.error("[RealAuthService] Error during signIn:", error)
      }

      if (error instanceof Error) {
        return { ok: false, error: error.message }
      }

      return { ok: false, error: "Erro desconhecido ao fazer login" }
    }
  }

  /**
   * Verifica se o token ainda é válido
   * TODO: Implementar quando o endpoint estiver disponível
   */
  async validateToken(_token: string): Promise<boolean> {
    try {
      // TODO: Implementar chamada para endpoint de validação
      // const response = await api.apisauce.get("/auth/me", undefined, {
      //   headers: { Authorization: `Bearer ${_token}` }
      // })
      // return response.ok

      // Por enquanto, sempre retorna true
      return true
    } catch (_error) {
      return false
    }
  }

  /**
   * Realiza logout na API real
   * TODO: Implementar quando o endpoint estiver disponível
   */
  async signOut(_token: string): Promise<{ ok: boolean; error?: string }> {
    try {
      // TODO: Implementar chamada para endpoint de logout
      // const response = await api.apisauce.post("/auth/logout", undefined, {
      //   headers: { Authorization: `Bearer ${_token}` }
      // })
      // return { ok: response.ok }

      // Por enquanto, apenas retorna sucesso
      return { ok: true }
    } catch (_error) {
      if (__DEV__) {
        console.error("[RealAuthService] Error during signOut:", _error)
      }
      return { ok: false, error: "Erro ao fazer logout" }
    }
  }
}

// Singleton instance
export const realAuthService = new RealAuthService()
