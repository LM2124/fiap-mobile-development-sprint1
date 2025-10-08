import { createContext, useContext, useEffect, useState } from "react"

import type { User } from "types/User"

import {
  type AuthToken,
  deleteQuestionnaire,
  sendPasswordResetEmail,
  signUp,
  STORAGE_KEYS,
  submitConfirmationCode,
  submitPasswordChange,
} from "@/services/fakeApi"
import { realAuthService, realQuestionnaireService } from "@/services/realApi"
import * as storage from "@/utils/storage"

// Manter importações da fake API para funções ainda não migradas

type AuthResult = { success: true } | { success: false; error: string }

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  authToken: AuthToken | null
  // Tipagem forte sempre é bom, mas as vezes fica tão verbose...
  signUp: (..._: Parameters<typeof signUp>) => Promise<AuthResult>
  signIn: (email: string, password: string) => Promise<AuthResult>
  signOut: () => Promise<AuthResult>

  sendPasswordResetEmail: (..._: Parameters<typeof sendPasswordResetEmail>) => Promise<AuthResult>
  submitConfirmationCode: (..._: Parameters<typeof submitConfirmationCode>) => Promise<AuthResult>
  submitPasswordChange: (..._: Parameters<typeof submitPasswordChange>) => Promise<AuthResult>
  submitQuestionnaire: (answers: Record<number, string>) => Promise<AuthResult>
  analyzeQuestionnaire: (questionnaireId?: number) => Promise<AuthResult>
  deleteQuestionnaire: () => Promise<AuthResult>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [authToken, setAuthToken] = useState<AuthToken | null>(null)

  // Usando user especificamente - Atualmente, podemos ter
  // um authToken temporário durante o flow de redefinir a senha,
  // mas isso não conta como estar completamente autenticado.
  const isAuthenticated = () => !!user

  useEffect(() => {
    // Carregar Usuário e Token quando o app carrega.
    // O Token por enquanto é *quase* completamente redundante,
    // mas um placeholder é um placeholder.
    const loadAuthData = async () => {
      const storedUser = storage.load<User>(STORAGE_KEYS.USER)
      const storedToken = storage.loadString(STORAGE_KEYS.AUTHTOKEN)
      if (storedUser && storedToken) {
        setUser(storedUser)
        setAuthToken(storedToken)
      }
    }
    loadAuthData()
  }, [])

  const handleSignUp = async (user: Omit<User, "id">): Promise<AuthResult> => {
    const res = await signUp(user)
    if (res.ok) {
      setUser(res.data.user)
      setAuthToken(res.data.authToken)
      storage.save(STORAGE_KEYS.USER, res.data.user)
      storage.saveString(STORAGE_KEYS.AUTHTOKEN, res.data.authToken)
      return { success: true }
    }
    return { success: false, error: res.error }
  }

  const handleSignIn = async (email: string, password: string): Promise<AuthResult> => {
    try {
      // Usar API real para login
      const res = await realAuthService.signIn(email, password)

      if (res.ok) {
        setUser(res.user)
        setAuthToken(res.token)
        storage.save(STORAGE_KEYS.USER, res.user)
        storage.saveString(STORAGE_KEYS.AUTHTOKEN, res.token)

        if (__DEV__) {
          console.log("[AuthContext] Login successful:", {
            userId: res.user.id,
            userName: res.user.name,
          })
        }

        return { success: true }
      }

      return { success: false, error: res.error }
    } catch (error) {
      if (__DEV__) {
        console.error("[AuthContext] Login error:", error)
      }
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erro ao fazer login",
      }
    }
  }

  const handleSignOut = async (): Promise<AuthResult> => {
    try {
      // Tentar fazer logout na API real
      if (authToken) {
        await realAuthService.signOut(authToken)
      }

      // Limpar estado local independente da resposta
      setUser(null)
      setAuthToken(null)
      storage.remove(STORAGE_KEYS.USER)
      storage.remove(STORAGE_KEYS.AUTHTOKEN)

      if (__DEV__) {
        console.log("[AuthContext] Logout successful")
      }

      return { success: true }
    } catch (error) {
      if (__DEV__) {
        console.error("[AuthContext] Logout error:", error)
      }

      // Mesmo com erro, limpar dados locais
      setUser(null)
      setAuthToken(null)
      storage.remove(STORAGE_KEYS.USER)
      storage.remove(STORAGE_KEYS.AUTHTOKEN)

      return { success: true }
    }
  }

  const handleResetPasswordEmail = async (email: string): Promise<AuthResult> => {
    const res = await sendPasswordResetEmail(email)
    if (res.ok) return { success: true }
    return { success: false, error: res.error }
  }

  const handleConfirmationCode = async (email: string, code: string): Promise<AuthResult> => {
    const res = await submitConfirmationCode(email, code)
    if (res.ok) {
      setAuthToken(res.data.token)
      storage.save(STORAGE_KEYS.AUTHTOKEN, res.data.token)
      return { success: true }
    }
    return { success: false, error: res.error }
  }

  const handleChangePassword = async (email: string, newPassword: string): Promise<AuthResult> => {
    if (!isAuthenticated()) return { success: false, error: "Não autenticado" }

    const res = await submitPasswordChange(email, newPassword)
    if (res.ok) {
      // Atualizar o usuário se ele já estiver autenticado
      // (i.e voltar para tela de configurações);
      // Mas não salvar um se o usuário não estiver autenticado
      // (i.e voltar para tela de login)
      if (isAuthenticated()) {
        setUser(res.data.user)
        storage.save(STORAGE_KEYS.USER, res.data.user)
      }
      return { success: true }
    }
    return { success: false, error: res.error }
  }

  const handleQuestionnaire = async (
    answers: Record<number, string>,
  ): Promise<AuthResult & { questionnaireId?: number }> => {
    if (!user || !isAuthenticated()) return { success: false, error: "Não autenticado" }

    try {
      // Usar API real para enviar questionário
      const res = await realQuestionnaireService.submitQuestionnaire(answers)

      if (res.ok) {
        // Atualizar usuário com respostas e ID do questionário
        const updatedUser: User = {
          ...user,
          questionnaireAnswers: res.answers,
          questionnaireId: res.questionnaireId,
        }

        setUser(updatedUser)
        storage.save(STORAGE_KEYS.USER, updatedUser)

        if (__DEV__) {
          console.log("[AuthContext] Questionnaire submitted:", {
            questionnaireId: res.questionnaireId,
            score: res.score,
          })
        }

        // Retornar o ID para uso imediato
        return { success: true, questionnaireId: res.questionnaireId }
      }

      return { success: false, error: res.error }
    } catch (error) {
      if (__DEV__) {
        console.error("[AuthContext] Questionnaire submission error:", error)
      }
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erro ao enviar questionário",
      }
    }
  }

  const handleAnalyzeQuestionnaire = async (questionnaireId?: number): Promise<AuthResult> => {
    if (!user || !isAuthenticated()) return { success: false, error: "Não autenticado" }

    // Usar o ID passado como parâmetro ou o que está no user
    const idToAnalyze = questionnaireId || user.questionnaireId

    if (!idToAnalyze) {
      return { success: false, error: "Questionário não foi respondido ainda" }
    }

    try {
      // Chamar API de análise
      const res = await realQuestionnaireService.analyzeQuestionnaire(idToAnalyze)

      if (res.ok) {
        // Atualizar usuário com a análise
        const updatedUser: User = {
          ...user,
          questionnaireAnalysis: res.analysis,
        }

        setUser(updatedUser)
        storage.save(STORAGE_KEYS.USER, updatedUser)

        if (__DEV__) {
          console.log("[AuthContext] Questionnaire analyzed:", {
            perfil: res.analysis.perfil,
            pontuacaoRisco: res.analysis.pontuacao_risco,
          })
        }

        return { success: true }
      }

      return { success: false, error: res.error }
    } catch (error) {
      if (__DEV__) {
        console.error("[AuthContext] Questionnaire analysis error:", error)
      }
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erro ao analisar questionário",
      }
    }
  }

  const handleDeleteQuestionnaire = async (): Promise<AuthResult> => {
    if (!user || !isAuthenticated()) return { success: false, error: "Não autenticado" }

    try {
      // TODO: Usar API real quando o endpoint estiver disponível
      const res = await deleteQuestionnaire(user)

      if (res.ok) {
        // Remover respostas e ID do questionário
        const updatedUser: User = {
          ...user,
          questionnaireAnswers: undefined,
          questionnaireId: undefined,
        }

        setUser(updatedUser)
        storage.save(STORAGE_KEYS.USER, updatedUser)

        if (__DEV__) {
          console.log("[AuthContext] Questionnaire deleted")
        }

        return { success: true }
      }

      return { success: false, error: res.error }
    } catch (error) {
      if (__DEV__) {
        console.error("[AuthContext] Questionnaire deletion error:", error)
      }
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erro ao deletar questionário",
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        authToken,
        isAuthenticated: isAuthenticated(),
        signUp: handleSignUp,
        signIn: handleSignIn,
        signOut: handleSignOut,
        sendPasswordResetEmail: handleResetPasswordEmail,
        submitConfirmationCode: handleConfirmationCode,
        submitPasswordChange: handleChangePassword,
        submitQuestionnaire: handleQuestionnaire,
        analyzeQuestionnaire: handleAnalyzeQuestionnaire,
        deleteQuestionnaire: handleDeleteQuestionnaire,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    // O dilema de ter uma codebase bilíngue:
    // Os erros devem ser em Português ou Inglês? 🤔
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
