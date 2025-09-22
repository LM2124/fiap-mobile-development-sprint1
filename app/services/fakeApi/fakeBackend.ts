import type { User } from "types/User"

import { loadUsers, saveUsers } from "./storage"
import type { ApiResponse, AuthToken } from "./types"
import { fakeApiDelay, generateToken } from "./util"

const users = loadUsers()

// Sacrificando legibilidade aqui por tipagem forte fora daqui
export async function signUp(
  user: Omit<User, "id">,
): Promise<ApiResponse<{ user: User; authToken: AuthToken }>> {
  await fakeApiDelay()

  if (users.some((u) => u.email === user.email)) {
    return { ok: false, status: 400, error: "Email já está em uso" }
  }

  const newUser = {
    id: `user-${users.length + 1}`,
    ...user,
  }

  users.push(newUser)
  saveUsers(users)

  const token = generateToken(newUser.id)
  return { ok: true, status: 200, data: { user: newUser, authToken: token } }
}

export async function signIn(
  email: User["email"],
  password: User["password"],
): Promise<ApiResponse<{ user: User; authToken: AuthToken }>> {
  await fakeApiDelay()

  // Buscando usuário com esse email e senha
  const user = users.find((u) => u.email === email && u.password === password)

  if (user) {
    const authToken = generateToken(user.id)
    return { ok: true, status: 200, data: { user, authToken } }
  } else {
    return { ok: false, status: 401, error: "Credenciais inválidas" }
  }
}

export async function signOut(): Promise<ApiResponse> {
  // haha eu com certeza invalidei seu token no meu lado :)
  return { ok: true, status: 200 }
}

export async function sendPasswordResetEmail(email: User["email"]): Promise<ApiResponse<void>> {
  await fakeApiDelay()

  if (!users.find((u) => u.email === email)) {
    return { ok: false, status: 404, error: "Email não cadastrado" }
  }
  return { ok: true, status: 200 }
}

export async function submitConfirmationCode(
  _userEmail: User["email"],
  _code: string,
): Promise<ApiResponse<{ token: AuthToken }>> {
  await fakeApiDelay()

  // hmm esse código que eu com certeza mandei
  // para esse email certamente está correto :)
  return { ok: true, status: 200, data: { token: generateToken("confirmationCode") } }
}

export async function submitPasswordChange(
  userEmail: User["email"],
  newPassword: User["password"],
): Promise<ApiResponse<{ user: User }>> {
  await fakeApiDelay()
  // haha esse código que certamente estava
  // correto certamente é válido para esse email :)

  // Buscando usuário com esse email
  const user = users.find((u) => u.email === userEmail)
  if (!user) {
    return { ok: false, status: 404, error: "Usuário não encontrado" }
  }

  user.password = newPassword
  saveUsers(users)

  return { ok: true, status: 200, data: { user } }
}

export async function submitQuestionnaire(
  user: User,
  answers: Record<number, string>,
): Promise<ApiResponse<{ user: User }>> {
  await fakeApiDelay()

  user.questionnaireAnswers = answers
  saveUsers(users)

  return { ok: true, status: 200, data: { user } }
}
export async function deleteQuestionnaire(user: User): Promise<ApiResponse<{ user: User }>> {
  await fakeApiDelay()

  user.questionnaireAnswers = undefined
  saveUsers(users)

  return { ok: true, status: 200, data: { user } }
}
