import { FC, useMemo, useState } from "react"
import { ScrollView, type TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"

import { Button, type ButtonAccessoryProps, Icon, ProgressBar, Screen, Text } from "@/components"
import { questionario } from "@/data/Questionario"
import { AppStackScreenProps } from "@/navigators"
import { $styles, type ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"

import { $loginStyles } from "./Login/styles"

interface QuestionnaireScreenProps extends AppStackScreenProps<"Questionnaire"> {}

export const QuestionnaireScreen: FC<QuestionnaireScreenProps> = function QuestionnaireScreen({
  navigation,
}) {
  const {
    theme: { colors },
    themed,
  } = useAppTheme()

  const [page, setPage] = useState<number>(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})

  const setAnswer = (page: number, answer: string) => {
    // Eu odeio o fato de que o React funciona assim, mas o React funciona assim
    // E com Arrays é pior! https://react.dev/learn/updating-arrays-in-state#replacing-items-in-an-array
    answers[page] = answer
    setAnswers({ ...answers })
  }

  const finish = () => {
    navigation.navigate("Home")
    console.log(answers)
  }

  const optionButton = useMemo(
    () =>
      // Só usando um TouchableOpacity ao invés de um Button porque
      // a opacidade padrão do botão quando pressionado era praticamente
      // um flashbang no Android e não dava pra mudar isso no Button
      function optionButton(opcao: string, idx: number) {
        return (
          <TouchableOpacity
            activeOpacity={0.6} // <-- Usando TouchableOpacity só por isso
            key={idx}
            onPress={() => setAnswer(page, opcao)}
            style={themed([$optionButton, answers[page] === opcao && $optionSelected])}
          >
            <Text
              text={`${idx + 1}.  ${opcao}`}
              style={themed([$optionText, answers[page] === opcao && $optionTextSelected])}
            />
          </TouchableOpacity>
        )
      },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [answers, page],
  )

  const CaretLeftAccessory = useMemo(
    () =>
      function CaretLeftAccessory(props: ButtonAccessoryProps) {
        return <Icon icon="caretLeft" color={colors.palette.neutral100} {...props} />
      },
    [colors.palette.neutral100],
  )
  const CaretRightAccessory = useMemo(
    () =>
      function CaretLeftAccessory(props: ButtonAccessoryProps) {
        return <Icon icon="caretRight" color={colors.palette.neutral100} {...props} />
      },
    [colors.palette.neutral100],
  )

  return (
    <Screen
      style={$styles.toggleInner}
      contentContainerStyle={themed($rootContentContainer)}
      preset="fixed"
    >
      <>
        <Text
          size="md"
          weight="bold"
          style={themed($titleText)}
          text="Análise de Perfil do Investidor"
        />
        <Text
          size="sm"
          weight="light"
          style={themed($progressText)}
          text={`${page + 1}/${questionario.length}`}
        />
        <ProgressBar progress={page / (questionario.length - 1)} style={themed($progressBar)} />
        <Text
          size="lg"
          weight="bold"
          style={themed($questionText)}
          text={questionario[page].pergunta}
        />
      </>

      <ScrollView
        contentContainerStyle={themed($optionsContainer)}
        showsVerticalScrollIndicator={true}
      >
        {questionario[page].alternativas.map(optionButton)}
      </ScrollView>

      <View style={themed($controlButtonsView)}>
        <Button
          text="Voltar"
          onPress={() => setPage(page - 1)}
          LeftAccessory={CaretLeftAccessory}
          style={themed($controlButton)}
          textStyle={themed($controlButtonsText)}
          disabled={page === 0}
          disabledStyle={themed($styles.$buttonDisabled)}
        />
        {page === questionario.length - 1 ? (
          <Button
            text={"Finalizar"}
            onPress={finish}
            style={themed($controlButton)}
            textStyle={themed($controlButtonsText)}
            disabled={!answers[page]}
            disabledStyle={themed($styles.$buttonDisabled)}
          />
        ) : (
          <Button
            text={"Próximo"}
            onPress={() => setPage(page + 1)}
            RightAccessory={CaretRightAccessory}
            style={themed($controlButton)}
            textStyle={themed($controlButtonsText)}
            disabled={!answers[page]}
            disabledStyle={themed($styles.$buttonDisabled)}
          />
        )}
      </View>
    </Screen>
  )
}

const $rootContentContainer: ThemedStyle<ViewStyle> = (theme) => ({
  ...$loginStyles.$aspectRatioSmartSizing(),
  flex: 1,
  paddingVertical: theme.spacing.lg,
  paddingHorizontal: theme.spacing.xl,
})

const $titleText: ThemedStyle<TextStyle> = ({ spacing }) => ({
  textAlign: "center",
  marginBottom: spacing.md,
})

const $progressBar: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  height: spacing.sm,
  borderRadius: spacing.sm,
  backgroundColor: colors.border,
})
const $progressText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral600,
  textAlign: "right",
})

// Seção de Perguntas
const $questionText: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginTop: spacing.sm,
  textAlign: "center",
  fontSize: spacing.lg * 0.85,
  lineHeight: spacing.lg,

  // Dimensionar para caber no mínimo 2 linhas.
  // Isso reduz a quantidade que a interface
  // "se mexe" de uma página pra outra.
  // FIXME: Talvez variar isso dependendo do tamanho da tela.
  minHeight: spacing.lg * 2,
})

const $optionsContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.lg,
  gap: spacing.md,
})

const $optionButton: ThemedStyle<ViewStyle> = (theme) => ({
  ...$styles.$buttonPrimary(theme),
  minHeight: theme.spacing.xxl,
  borderRadius: theme.spacing.sm,
  borderWidth: 0,
  paddingHorizontal: theme.spacing.sm,
})
const $optionSelected: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.primary600,
})
const $optionText: ThemedStyle<TextStyle> = (theme) => ({
  ...$styles.$buttonText(theme),
  fontFamily: theme.typography.primary.medium,
  fontWeight: "normal",
  textAlign: "left",
})
const $optionTextSelected: ThemedStyle<TextStyle> = (theme) => ({
  ...$optionText(theme),
  // fontWeight: "bold", // Não funcionou no Android por algum motivo
  fontFamily: theme.typography.primary.bold,
})

// Botões Voltar/Próximo/Finalizar
const $controlButtonsView: ViewStyle = {
  flexDirection: "row",
  alignItems: "center", // centralizados verticalmente
  justifyContent: "space-between", // um em cada extremo da tela
}
const $controlButton: ThemedStyle<ViewStyle> = (theme) => ({
  ...$styles.$buttonPrimary(theme),
  ...$styles.$buttonThin(theme),
  width: "auto",
})

const $controlButtonsText: ThemedStyle<TextStyle> = (theme) => ({
  ...$styles.$buttonText(theme),
})
