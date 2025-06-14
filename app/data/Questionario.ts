export interface Questao {
  pergunta: string
  alternativas: string[]
}
export const questionario: Questao[] = [
  {
    pergunta: "Quanto você possui em reserva de emergência (liquidez imediata)?",
    alternativas: [
      "≥ 12 meses de despesas",
      "6-11 meses",
      "3-5 meses",
      "< 3 meses",
      "Nenhuma reserva",
    ],
  },
  {
    pergunta: "Qual é a sua principal fonte de renda?",
    alternativas: [
      "Aposentadoria/pensão estável",
      "Salário CLT fixo",
      "Comissões/variável alta",
      "Renda autônomo",
      "Rendimentos de investimentos",
    ],
  },
  {
    pergunta: "Horizonte para utilizar este dinheiro?",
    alternativas: ["< 1 ano", "1-3 anos", "3-5 anos", "5-10 anos", "> 10 anos"],
  },
  {
    pergunta: "Objetivo principal do investimento?",
    alternativas: [
      "Preservar capital",
      "Renda recorrente",
      "Superar inflação",
      "Multipicar patromônio",
      "Crescimento aceitando alta volatilidade",
    ],
  },
  {
    pergunta: "Perfil de investimento que você já utilizou:",
    alternativas: [
      "Poupança/Tesouro Selic",
      "CDBs/Letras de Crédito",
      "Fundos renda fixa",
      "Ações, cripto ou derivativos",
      "Nunca investi",
    ],
  },
  {
    pergunta: "Se sua carteira caísse 5% em uma semana, você...",
    alternativas: [
      "Resgataria tudo",
      "Resgataria parte",
      "Manteria posição",
      "Compraria mais",
      "Alavancaria posição",
    ],
  },
  {
    pergunta: "Volatilidade anual aceitável:",
    alternativas: ["≤ 2% ", "3-5 %", "6-10 %", "10-20 %", "> 20 %"],
  },
  {
    pergunta: "Percentual do patrimônio que pretende alocar nesse portfólio:",
    alternativas: ["≤ 10 %", "11-25 %", "26-50 %", "51-75 %", "> 75%"],
  },
  {
    pergunta: "Fluxo de caixa mensal após despesas:",
    alternativas: [
      "Sobra ≥ 30 %",
      "Sobra 10-29 %",
      "Equilibra (0-9 %)",
      "Fica ligeiramente negativo",
      "Depende de crédito/parcelamento",
    ],
  },
  {
    pergunta: "Qual frase melhor reflete sua visão de risco?",
    alternativas: [
      "Não aceito perdas.",
      "Pequenas oscilações são ok.",
      "Aceito quedas moderadas por retorno maior.",
      "Disposto a riscos altos por ganhos expressivos.",
      "Busco retorno máximo mesmo podendo perder grande parte do capital.",
    ],
  },
]
