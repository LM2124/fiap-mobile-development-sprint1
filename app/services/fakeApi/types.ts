// Um pouco de magia de Typescript aqui, vou explicar:
// Isso está fazendo o tipo genérico T ser um object ou void, sendo void por padrão
export type ApiResponse<T extends object | void = void> =
  // Se `ok` for false, não haverá `data` e sim `error`
  | { ok: false; status: number; error: string }
  | (T extends void // Se T for void, não haverá `data`
      ? { ok: true; status: number } // Se não fosse por isso, ele nos forçaria a retornar data: void
      : { ok: true; status: number; data: T }) // Caso contrário, `data` será T

export type AuthToken = string
