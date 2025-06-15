export type ApiResponse<T extends object | undefined = undefined> = {
  status: number
  data?: T
  error?: string
}

export type AuthToken = string
