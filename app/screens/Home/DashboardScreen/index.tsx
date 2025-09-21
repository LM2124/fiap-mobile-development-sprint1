import { FC } from "react"
import { Image, View } from "react-native"

import { PressableIcon } from "@/components/Icon"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { useAuth } from "@/contexts/AuthContext"
import { dadosDashboard } from "@/data/DadosDashboard"
import type { HomeTabScreenProps } from "@/navigators/HomeNavigator"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import { alert } from "@/utils/alert"

import {
  $root,
  $rootContentContainer,
  $headerBar,
  $headerGreeting,
  $iconContainer,
  $summaryContainer,
  $dashContainer,
  $graph,
  $dashItem,
  $dashSeparator,
  $dashText,
} from "./styles"
import { $loginStyles } from "../../Login/styles"
import { HomeBottomBarSpacer } from "../components/HomeBottomBarSpacer"

interface DashboardScreenProps extends HomeTabScreenProps<"Dashboard"> {}

const graph = require("assets/images/grafico.png")

export const DashboardScreen: FC<DashboardScreenProps> = function DashboardScreen() {
  const { theme, themed } = useAppTheme()
  const { user } = useAuth()

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount)
  }

  return (
    <Screen
      style={themed($root)}
      contentContainerStyle={[themed($rootContentContainer)]}
      preset="scroll"
    >
      {/* Header */}
      <View style={themed($headerBar)}>
        <View style={themed($headerGreeting)}>
          <Text
            preset="subheading"
            size="md"
            style={themed($styles.$negativeText)}
            text={`Olá ${user?.name}, Bem Vindo`}
          />
          {/* TODO: Fazer isso falar boa noite quando estiver de noite :D */}
          <Text preset="default" size="xs" style={themed($styles.$negativeText)} text="Bom dia!" />
        </View>
        <PressableIcon
          icon="bell"
          containerStyle={themed($iconContainer)}
          color={theme.colors.palette.neutral100}
          onPress={() => alert("WIP", "Não implementado :(")}
        />
      </View>

      {/* Sumário */}
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

      {/* Gráfico e Dados */}
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
        <HomeBottomBarSpacer />
      </View>
    </Screen>
  )
}
