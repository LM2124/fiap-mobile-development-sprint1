import { FC } from "react"
import { View } from "react-native"

import { Icon } from "@/components/Icon"
import { ProgressBarWithText } from "@/components/ProgressBarWithText"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { dadosTransaction, dadosFluxo } from "@/data/DadosTransaction"
import type { HomeTabScreenProps } from "@/navigators/HomeTabsNavigator"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"

import {
  $root,
  $rootContentContainer,
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
  $dashTitleContainer,
} from "./styles"
import { $loginStyles } from "../../Login/styles"
import { HomeBottomBarSpacer } from "../_components/HomeBottomBarSpacer"

interface HomeScreenProps extends HomeTabScreenProps<"Transaction"> {}

export const TransactionScreen: FC<HomeScreenProps> = function TransactionScreen() {
  const { themed } = useAppTheme()

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
      {/* Área Saldo Total */}
      <View style={themed([$loginStyles.$aspectRatioSmartSizing, $summaryContainer])}>
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
                  <View style={themed($dashTitleContainer)}>
                    <Icon
                      containerStyle={themed($iconContentContainer)}
                      icon={icon}
                      color="#ffff"
                    />
                    <View style={themed($infoContainer)}>
                      <Text style={themed($dashTextNoCenter)} weight="medium" text={name} />
                      <Text
                        style={themed([$dashTextNoCenter, $blueFont])}
                        weight="semiBold"
                        text={`${dayHour}`}
                      />
                    </View>
                  </View>
                  <View style={themed($dashSeparator)} />
                  <Text style={themed($dashText)} size="xs" weight="light" text={source} />
                  <View style={themed($dashSeparator)} />
                  <Text
                    adjustsFontSizeToFit={true}
                    numberOfLines={1}
                    style={themed($dashText)}
                    size="xs"
                    weight="medium"
                    text={formatCurrency(valueRS)}
                  />
                </View>
              ))}
          </View>
        ))}
        <HomeBottomBarSpacer />
      </View>
    </Screen>
  )
}
