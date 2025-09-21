import { FC } from "react"
import { View } from "react-native"

import { Icon, PressableIcon } from "@/components/Icon"
import { ProgressBarWithText } from "@/components/ProgressBarWithText"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { dadosTransaction, dadosFluxo } from "@/data/DadosTransaction"
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
  $saldoContainer,
  $incomeContainer,
  $infoContainer,
  $iconContentContainer,
  $sliderContainer,
  $progressContainer,
  $progressBar,
  $dashItem,
  $dashSeparator,
  $dashText,
  $dashTextNoCenter,
  $blueFont,
} from "./styles"
import { $loginStyles } from "../../Login/styles"

interface HomeScreenProps extends HomeTabScreenProps<"Transaction"> {}

export const TransactionScreen: FC<HomeScreenProps> = function TransactionScreen() {
  const { theme, themed } = useAppTheme()

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount)
  }

  return (
    <Screen style={$root} contentContainerStyle={themed($rootContentContainer)} preset="scroll">
      {/* Header */}
      <View style={themed($headerBar)}>
        <Text text={`           `} />
        <View style={themed($headerGreeting)}>
          <Text
            preset="subheading"
            size="xl"
            style={themed($styles.$negativeText)}
            text={`Transação`}
          />
        </View>
        <PressableIcon
          icon="bell"
          containerStyle={themed($iconContainer)}
          color={theme.colors.palette.neutral100}
          onPress={() => alert("Erro", "Não implementado :(")}
        />
      </View>

      {/* Área Saldo Total */}
      <View style={themed([$loginStyles.$scaleWithSize, $summaryContainer])}>
        <View style={themed($saldoContainer)}>
          <Text size="sm" weight="semiBold" text="Saldo Total" />
          <Text
            size="xl"
            weight="semiBold"
            // Formatando os dados de fluxo (profit)
            text={formatCurrency(dadosFluxo.map((x) => x[0]).reduce((a, b) => a + b, 0))}
          />
        </View>
      </View>

      {/* Fluxo de caixa */}
      <View style={themed($dashItem)}>
        <View style={themed($incomeContainer)}>
          <Text
            style={themed($styles.$negativeText)}
            size="xs"
            weight="normal"
            text="Lucro Total"
          />
          <Text
            style={themed($styles.$negativeText)}
            size="xl"
            weight="semiBold"
            // Formatando os dados de fluxo (profit)
            text={formatCurrency(dadosFluxo.map((x) => x[0]).reduce((a, b) => a + b, 0))}
          />
        </View>
        <View style={themed($dashSeparator)} />
        <View style={themed($incomeContainer)}>
          <Text
            style={themed($styles.$negativeText)}
            size="xs"
            weight="normal"
            text="Prejuizo Total"
          />
          <Text
            style={themed($styles.$negativeText)}
            size="xl"
            weight="semiBold"
            // Formatando os dados de fluxo (loss)
            text={formatCurrency(dadosFluxo.map((x) => x[1]).reduce((a, b) => a + b, 0))}
          />
        </View>
      </View>

      {/* Barra de proporção */}
      <View style={themed($sliderContainer)}>
        <ProgressBarWithText
          progress={1 - (dadosFluxo[0][0] + dadosFluxo[0][1]) / dadosFluxo[0][0]}
          containerStyle={$progressContainer}
          style={$progressBar}
          reversed={true}
          startText={formatCurrency(dadosFluxo.map((x) => x[1]).reduce((a, b) => a + b, 0))}
          endText={formatCurrency(dadosFluxo.map((x) => x[0]).reduce((a, b) => a + b, 0))}
        ></ProgressBarWithText>
      </View>

      {/* Histórico de investimentos */}
      <View
        style={themed([$loginStyles.$formContainer, $loginStyles.$formContent, $dashContainer])}
      >
        {["Abril", "Março"].map((month, monthIndex) => (
          <View key={monthIndex}>
            <Text size="lg" weight="semiBold" text={month} />
            {dadosTransaction
              .filter(([monthData]) => month === monthData)
              .map(([, icon, name, dayHour, source, valueRS], index) => (
                <View key={index} style={themed($dashItem)}>
                  <View style={themed($iconContentContainer)}>
                    <Icon icon={icon} color="#ffff"></Icon>
                  </View>
                  <View style={themed($infoContainer)}>
                    <Text style={themed($dashTextNoCenter)} weight="medium" text={name} />
                    <Text
                      style={themed([$dashTextNoCenter, $blueFont])}
                      weight="semiBold"
                      text={`${dayHour}`}
                    />
                  </View>
                  <View style={themed($dashSeparator)} />
                  <Text style={themed($dashText)} size="xs" weight="light" text={source} />
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
        ))}
      </View>
    </Screen>
  )
}
