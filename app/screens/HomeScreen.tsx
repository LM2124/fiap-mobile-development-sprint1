import { FC, useEffect } from "react"
import { Image, type ImageStyle, type TextStyle, View, ViewStyle } from "react-native"

import { PressableIcon, Screen, Text } from "@/components"
import { useAuth } from "@/contexts/AuthContext"
import { dadosDashboard } from "@/data/DadosDashboard"
import { AppStackScreenProps } from "@/navigators"
import { $styles, type ThemedStyle } from "@/theme"
import { alert } from "@/utils/alert"
import { useAppTheme } from "@/utils/useAppTheme"

import { $loginStyles } from "./Login/styles"

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

const graph = require("assets/images/grafico.png")

export const HomeScreen: FC<HomeScreenProps> = function HomeScreen({ navigation }) {
  const { theme, themed } = useAppTheme()
  const { user } = useAuth()

  // Redirecionar para o questionário se o usuário não preencheu ainda
  useEffect(() => {
    if (user && !user.questionnaireAnswers) {
      navigation.replace("Questionnaire")
    }
  }, [user, navigation])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount)
  }

  return (
    <Screen style={$root} contentContainerStyle={themed($rootContentContainer)} preset="scroll">
      <View style={themed($headerBar)}>
        <View style={themed($headerGreeting)}>
          <Text
            preset="subheading"
            size="md"
            style={themed($styles.$negativeText)}
            text={`Olá ${user?.name}, Bem Vindo`}
          />

          {/* FIXME: Fazer isso falar boa noite quando estiver de noite :D */}
          <Text preset="default" size="xs" style={themed($styles.$negativeText)} text="Bom dia!" />
        </View>
        <PressableIcon
          icon="bell"
          containerStyle={themed($iconContainer)}
          color={theme.colors.palette.neutral100}
          onPress={() => alert("Erro", "Não implementado :(")}
        />
      </View>

      <View style={themed($summaryContainer)}>
        <Text
          style={themed([$styles.$negativeText, { marginBottom: theme.spacing.md }])}
          size="xl"
          weight="semiBold"
          text="Recomendação"
        />
        <Text style={themed($styles.$negativeText)} weight="light" text="Aporte Inicial" />
        <Text
          style={themed($styles.$negativeText)}
          size="xl"
          weight="semiBold"
          // Somando o valor de todos os dados registrados
          text={formatCurrency(dadosDashboard.map((x) => x[2]).reduce((a, b) => a + b, 0))}
        />
      </View>

      <View
        style={themed([$loginStyles.$formContainer, $loginStyles.$formContent, $dashContainer])}
      >
        <Image style={themed($graph)} resizeMode="contain" source={graph} />

        {dadosDashboard.map(([name, percentageShare, valueRS], index) => (
          <View key={index} style={themed($dashItem)}>
            <Text style={themed($dashText)} size="xs" weight="medium" text={name} />
            <View style={themed($dashSeparator)} />
            <Text style={themed($dashText)} size="xs" weight="light" text={`${percentageShare}%`} />
            <View style={themed($dashSeparator)} />
            <Text
              style={themed($dashText)}
              size="xs"
              weight="medium"
              text={formatCurrency(valueRS)}
            />
          </View>
        ))}
      </View>
    </Screen>
  )
}

const $root: ViewStyle = {
  // Com a screen em preset "scroll", alguma coisa fora do meu controle
  // adiciona uma div aleatória no final dela com paddingBottom de 1px.
  // Não tenho a menor ideia por quê, mas aqui estou compensando.
  marginBottom: -1,
}
const $rootContentContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexGrow: 1,
  backgroundColor: colors.tint,
  paddingTop: spacing.sm,
  alignItems: "center",
})

// Parte de cima (azul)
const $headerBar: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "100%",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: spacing.sm,
  paddingHorizontal: spacing.md,
})
const $headerGreeting: ThemedStyle<ViewStyle> = () => ({
  // reservado
})
const $iconContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.primary600,
  padding: spacing.xs,
  borderRadius: spacing.sm * 2,
})
const $summaryContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "center",
  paddingBottom: spacing.md,
})

// Parte de baixo (branca)
const $dashContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  paddingHorizontal: spacing.md,
  gap: spacing.lg,
})
const $graph: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  // Essas são as dimensões da imagem do gráfico.
  // Não vejo problema em fazer assim por enquanto,
  // já que o gráfico inteiro é placeholder por ora.
  // ps. Eu sei que é difícil de ler o gráfico.
  // Culpe o Figma. Eu só estava seguindo ordens!
  aspectRatio: 750 / 456,
  width: "100%",
  height: "auto",
  marginBottom: spacing.xs,
  borderRadius: spacing.lg,
})
const $dashItem: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
})
const $dashSeparator: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 2,
  height: "100%",
  backgroundColor: colors.separator,
})
const $dashText: ThemedStyle<TextStyle> = () => ({
  width: "33%",
  textAlign: "center",
  textAlignVertical: "center",
})
