import { FC } from "react"
import { Image, type ImageStyle, ScrollView, type TextStyle, View, ViewStyle } from "react-native"

import { PressableIcon, Screen, Text } from "@/components"
import { dadosDashboard } from "@/data/DadosDashboard"
import { AppStackScreenProps } from "@/navigators"
import { $styles, type ThemedStyle } from "@/theme"
import { alert } from "@/utils/alert"
import { useAppTheme } from "@/utils/useAppTheme"

import { $loginStyles } from "./Login/styles"

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = function HomeScreen() {
  const { theme, themed } = useAppTheme()

  const graph = require("assets/images/grafico.png")

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount)
  }

  return (
    <Screen contentContainerStyle={themed([$root, $styles.toggleInner])} preset="scroll">
      <View style={themed($headerBar)}>
        <View style={themed($headerGreeting)}>
          <Text
            preset="subheading"
            size="md"
            style={themed($greetingText)}
            text="Olá [usuário], Bem Vindo"
          />

          {/* FIXME: Fazer isso falar boa noite quando estiver de noite :D */}
          <Text preset="default" size="xs" style={themed($greetingText)} text="Bom dia!" />
        </View>
        <PressableIcon
          icon="bell"
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
          text="R$400,500.00"
        />
      </View>

      <ScrollView
        style={themed($loginStyles.$formContainer)}
        contentContainerStyle={themed([$loginStyles.$formContent, $dashContainer])}
        // Deixar uma ScrollView por enquanto, mas vamos
        // monitorar como o comportamento fica assim
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
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
      </ScrollView>
    </Screen>
  )
}

const $root: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.tint,
  paddingTop: spacing.sm,
})

const $headerBar: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "100%",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: spacing.sm,
  paddingHorizontal: spacing.xl,
})

const $headerGreeting: ThemedStyle<ViewStyle> = () => ({
  // width: "100%",
})
const $greetingText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral100,
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

const $summaryContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "center",
  paddingBottom: spacing.md,
})

const $dashContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.md,
  gap: spacing.lg,
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
