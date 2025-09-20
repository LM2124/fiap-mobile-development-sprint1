import { createContext, useContext, useEffect, useState } from "react"

import type { User } from "types/User"

import {
  type AuthToken,
  sendPasswordResetEmail,
  signIn,
  signOut,
  signUp,
  STORAGE_KEYS,
  submitConfirmationCode,
  submitPasswordChange,
  submitQuestionnaire,
} from "@/services/fakeApi"
import * as storage from "@/utils/storage"

type AuthResult = { success: true } | { success: false; error: string }

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  authToken: AuthToken | null
  // Tipagem forte sempre é bom, mas as vezes fica tão verbose...
  signUp: (..._: Parameters<typeof signUp>) => Promise<AuthResult>
  signIn: (..._: Parameters<typeof signIn>) => Promise<AuthResult>
  signOut: (..._: Parameters<typeof signOut>) => Promise<AuthResult>

  sendPasswordResetEmail: (..._: Parameters<typeof sendPasswordResetEmail>) => Promise<AuthResult>
  submitConfirmationCode: (..._: Parameters<typeof submitConfirmationCode>) => Promise<AuthResult>
  submitPasswordChange: (..._: Parameters<typeof submitPasswordChange>) => Promise<AuthResult>
  submitQuestionnaire: (answers: Record<number, string>) => Promise<AuthResult>
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
    const res = await signIn(email, password)
    if (res.ok) {
      setUser(res.data.user)
      setAuthToken(res.data.authToken)
      storage.save(STORAGE_KEYS.USER, res.data.user)
      storage.saveString(STORAGE_KEYS.AUTHTOKEN, res.data.authToken)
      return { success: true }
    }
    return { success: false, error: res.error }
  }

  const handleSignOut = async (): Promise<AuthResult> => {
    setUser(null)
    setAuthToken(null)
    const res = await signOut()
    if (res.ok) {
      // FIXME: Será que deveríamos apagar os dados
      // independente da resposta do "servidor"?
      // Por enquanto ele sempre vai dar true, então tanto faz
      storage.remove(STORAGE_KEYS.USER)
      storage.remove(STORAGE_KEYS.AUTHTOKEN)
      return { success: true }
    }
    return { success: false, error: res.error }
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

  const handleQuestionnaire = async (answers: Record<number, string>): Promise<AuthResult> => {
    if (!user || !isAuthenticated()) return { success: false, error: "Não autenticado" }

    const res = await submitQuestionnaire(user, answers)
    if (res.ok) {
      setUser(res.data.user)
      storage.save(STORAGE_KEYS.USER, res.data.user)

      return { success: true }
    }
    return { success: false, error: res.error }
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
