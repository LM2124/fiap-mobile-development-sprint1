import { createContext, useContext, useEffect, useState } from "react"

import type { User } from "types/User"

// Manter importações da fake API para funções ainda não migradas
import {
  deleteQuestionnaire,
  sendPasswordResetEmail,
  STORAGE_KEYS,
  submitConfirmationCode,
  submitPasswordChange,
} from "@/services/fakeApi"
import { authService, questionnaireService, type AuthToken } from "@/services/realApi"
import * as storage from "@/utils/storage"

export type AuthContextResult<T extends Exclude<object, "success" | "message"> | void = void> =
  | (T extends object
      ? { success: true; message?: string } & T
      : { success: true; message?: string })
  | { success: false; error: string }

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  authToken: AuthToken | null
  // Tipagem forte sempre é bom, mas as vezes fica tão verbose...
  signUp: (..._: Parameters<typeof authService.signUp>) => Promise<AuthContextResult>
  signIn: (..._: Parameters<typeof authService.signIn>) => Promise<AuthContextResult>
  signOut: () => Promise<AuthContextResult>

  sendPasswordResetEmail: (
    ..._: Parameters<typeof sendPasswordResetEmail>
  ) => Promise<AuthContextResult>

  submitConfirmationCode: (
    ..._: Parameters<typeof submitConfirmationCode>
  ) => Promise<AuthContextResult>

  submitPasswordChange: (
    ..._: Parameters<typeof submitPasswordChange>
  ) => Promise<AuthContextResult>

  submitQuestionnaire: (
    ..._: Parameters<typeof questionnaireService.submitQuestionnaire>
  ) => Promise<AuthContextResult<{ questionnaireId: number }>>

  analyzeQuestionnaire: (
    ..._: Parameters<typeof questionnaireService.analyzeQuestionnaire>
  ) => Promise<AuthContextResult>

  deleteQuestionnaire: () => Promise<AuthContextResult>
}

function debugLog(...rest: Parameters<typeof console.log>) {
  if (__DEV__) return console.log("[AuthContext]", ...rest)
}
function debugError(...rest: Parameters<typeof console.error>) {
  if (__DEV__) return console.error("[AuthContext]", ...rest)
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

  const handleSignUp: AuthContextType["signUp"] = async (userForm) => {
    try {
      const { user, token } = await authService.signUp(userForm)
      setUser(user)
      setAuthToken(token)
      storage.save(STORAGE_KEYS.USER, user)
      storage.saveString(STORAGE_KEYS.AUTHTOKEN, token)

      debugLog("SignUp successful:", {
        userId: user.id,
        userName: user.name,
      })

      return { success: true }
    } catch (error) {
      debugError("SignUp error:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erro ao fazer cadastro",
      }
    }
  }

  const handleSignIn: AuthContextType["signIn"] = async (email, password) => {
    try {
      // Usar API real para login
      const { user, token } = await authService.signIn(email, password)

      setUser(user)
      setAuthToken(token)
      storage.save(STORAGE_KEYS.USER, user)
      storage.saveString(STORAGE_KEYS.AUTHTOKEN, token)

      debugLog("Login successful:", {
        userId: user.id,
        userName: user.name,
      })

      return { success: true }
    } catch (error) {
      debugError("Login error:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erro ao fazer login",
      }
    }
  }

  const handleSignOut: AuthContextType["signOut"] = async () => {
    try {
      // Tentar fazer logout na API real
      if (authToken) {
        await authService.signOut()
      }

      // Limpar estado local independente da resposta
      setUser(null)
      setAuthToken(null)
      storage.remove(STORAGE_KEYS.USER)
      storage.remove(STORAGE_KEYS.AUTHTOKEN)

      debugLog("Logout successful")

      return { success: true }
    } catch (error) {
      debugError("Logout error:", error)

      // Mesmo com erro, tentar limpar dados locais
      try {
        setUser(null)
        setAuthToken(null)
        storage.remove(STORAGE_KEYS.USER)
        storage.remove(STORAGE_KEYS.AUTHTOKEN)
      } catch (_) {}

      return { success: true }
    }
  }

  const handleResetPasswordEmail: AuthContextType["sendPasswordResetEmail"] = async (email) => {
    const res = await sendPasswordResetEmail(email)
    if (res.ok) return { success: true }
    return { success: false, error: res.error }
  }

  const handleConfirmationCode: AuthContextType["submitConfirmationCode"] = async (email, code) => {
    const res = await submitConfirmationCode(email, code)
    if (res.ok) {
      setAuthToken(res.data.token)
      storage.save(STORAGE_KEYS.AUTHTOKEN, res.data.token)
      return { success: true }
    }
    return { success: false, error: res.error }
  }

  const handleChangePassword: AuthContextType["submitPasswordChange"] = async (
    email,
    newPassword,
  ) => {
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

  const handleSubmitQuestionnaire: AuthContextType["submitQuestionnaire"] = async (answers) => {
    if (!user || !isAuthenticated()) return { success: false, error: "Não autenticado" }

    try {
      // Usar API real para enviar questionário
      const res = await questionnaireService.submitQuestionnaire(answers)

      // Atualizar usuário com respostas e ID do questionário
      const updatedUser: User = {
        ...user,
        questionnaireId: res.questionnaireId,
      }

      setUser(updatedUser)
      storage.save(STORAGE_KEYS.USER, updatedUser)

      debugLog("Questionnaire submitted:", {
        questionnaireId: res.questionnaireId,
        score: res.score,
      })

      // Retornar o ID para uso imediato
      return { success: true, questionnaireId: res.questionnaireId } as const
    } catch (error) {
      debugError("Questionnaire submission error:", error)

      return {
        success: false,
        error: error instanceof Error ? error.message : "Erro ao enviar questionário",
      }
    }
  }

  const handleAnalyzeQuestionnaire: AuthContextType["analyzeQuestionnaire"] = async (
    questionnaireId?: number,
  ) => {
    if (!user || !isAuthenticated()) return { success: false, error: "Não autenticado" }

    // Usar o ID passado como parâmetro ou o que está no user
    const idToAnalyze = questionnaireId || user.questionnaireId

    if (!idToAnalyze) {
      return { success: false, error: "Questionário não foi respondido ainda" }
    }

    try {
      // Chamar API de análise
      const res = await questionnaireService.analyzeQuestionnaire(idToAnalyze)

      // Atualizar usuário com a análise
      const updatedUser: User = {
        ...user,
        questionnaireAnalysis: res,
      }

      setUser(updatedUser)
      storage.save(STORAGE_KEYS.USER, updatedUser)

      debugLog("Questionnaire analyzed:", {
        perfil: res.perfil,
        pontuacaoRisco: res.pontuacao_risco,
      })

      return { success: true }
    } catch (error) {
      debugError("Questionnaire analysis error:", error)

      return {
        success: false,
        error: error instanceof Error ? error.message : "Erro ao analisar questionário",
      }
    }
  }

  const handleDeleteQuestionnaire: AuthContextType["deleteQuestionnaire"] = async () => {
    if (!user || !isAuthenticated()) return { success: false, error: "Não autenticado" }

    try {
      // TODO: Usar API real quando o endpoint estiver disponível
      const res = await deleteQuestionnaire(user)

      if (res.ok) {
        // Remover respostas e ID do questionário
        const updatedUser: User = {
          ...user,
          questionnaireId: undefined,
        }

        setUser(updatedUser)
        storage.save(STORAGE_KEYS.USER, updatedUser)

        debugLog("Questionnaire deleted")

        return { success: true }
      }

      return { success: false, error: res.error }
    } catch (error) {
      debugError("Questionnaire deletion error:", error)

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
        submitQuestionnaire: handleSubmitQuestionnaire,
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
