export type User = {
  id: string
  name: string
  email: string
  phone: string
  birthdate: string
  password: string
  questionnaireAnswers?: Record<number, string>
}
