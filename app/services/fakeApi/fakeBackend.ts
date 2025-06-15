import type { User } from "types/User"

import * as storage from "@/utils/storage"

import { loadUsers, saveUsers, STORAGE_KEYS } from "./storage"
import type { ApiResponse, AuthToken } from "./types"
import { fakeApiDelay, generateToken } from "./util"

const users = loadUsers()

// Sacrificando legibilidade aqui por tipagem forte fora daqui
export async function signUp(
  user: Omit<User, "id">,
): Promise<ApiResponse<{ user: User; authToken: AuthToken }>> {
  await fakeApiDelay()

  if (users.some((u) => u.email === user.email)) {
    return { status: 400, error: "Email já está em uso" }
  }

  const newUser = {
    id: `user-${users.length + 1}`,
    ...user,
  }

  users.push(newUser)
  saveUsers(users)

  const token = generateToken(newUser.id)
  return { status: 200, data: { user: newUser, authToken: token } }
}

export async function signIn(
  email: User["email"],
  password: User["password"],
): Promise<ApiResponse<{ authToken: AuthToken }>> {
  await fakeApiDelay()

  // Buscando usuário com esse email e senha
  const user = users.find((u) => u.email === email && u.password === password)

  if (user) {
    const authToken = generateToken(user.id)
    return { status: 200, data: { authToken } }
  } else {
    return { status: 401, error: "Credenciais inválidas" }
  }
}

export async function signOut(): Promise<void> {
  storage.remove(STORAGE_KEYS.USER)
  storage.remove(STORAGE_KEYS.AUTHTOKEN)
}

export async function sendPasswordResetEmail(_email: User["email"]): Promise<ApiResponse> {
  await fakeApiDelay()

  // haha eu com certeza acabei de mandar aquele email :)
  return { status: 200 }
}

export async function submitConfirmationCode(
  _userEmail: User["email"],
  _code: string,
): Promise<ApiResponse<{ token: AuthToken }>> {
  await fakeApiDelay()

  // hmm esse código que eu com certeza mandei
  // para esse email certamente está correto :)
  return { status: 200, data: { token: generateToken("confirmationCode") } }
}

export async function submitPasswordChange(
  userEmail: User["email"],
  newPassword: User["password"],
  _auth: AuthToken,
): Promise<ApiResponse<User>> {
  await fakeApiDelay()
  // haha esse código que certamente estava
  // correto certamente é válido para esse email :)

  // Buscando usuário com esse email
  const user = users.find((u) => u.email === userEmail)
  if (!user) {
    return { status: 404, error: "Usuário não encontrado" }
  }

  user.password = newPassword
  saveUsers(users)

  return { status: 200, data: user }
}
