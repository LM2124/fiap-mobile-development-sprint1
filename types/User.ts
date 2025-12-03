import type { QuestionnaireAnalysisResponseData } from "@/services/realApi/types"

export type User = {
  id: string
  name: string
  email: string
  phone: string
  birthdate: string
  password: string
  // ID do questionário respondido na API
  questionnaireId?: number
  // Análise do questionário (perfil, recomendações, etc)
  questionnaireAnalysis?: QuestionnaireAnalysisResponseData
}
