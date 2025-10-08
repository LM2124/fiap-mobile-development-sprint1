import { FC } from "react"
import { View, Image, ScrollView } from "react-native"

import { Button } from "@/components/Button"
import { Icon } from "@/components/Icon"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { useAuth } from "@/contexts/AuthContext"
import { HomeStackScreenProps } from "@/navigators/HomeNavigator"
import { colors } from "@/theme/colors"
import { useAppTheme } from "@/theme/context"

import {
  $img,
  $rootContentContainer,
  $recomendationContainer,
  $infoContainer,
  $infoLineContainer,
  $iconContentContainer,
  $recomendationButton,
  $buttonText,
  $headerContainer,
  $headerText,
  $cardContainer,
  $sectionContainer,
  $sectionTitle,
  $sectionText,
  $alocacaoContainer,
  $alocacaoRow,
  $alocacaoItem,
  $alocacaoObservacao,
  $recomendacoesContainer,
  $recomendacaoItem,
  $observacoesContainer,
  $observacoesTitle,
  $observacoesText,
  $fonteText,
  $badgeContainer,
  $badgeText,
} from "./styles"

interface UserTypeScreenProps extends HomeStackScreenProps<"UserType"> {}

const img = require("assets/images/giftbox.png")

export const UserTypeScreen: FC<UserTypeScreenProps> = ({ navigation }) => {
  const { themed } = useAppTheme()
  const { user } = useAuth()

  // Pegar dados da análise real
  const analysis = user?.questionnaireAnalysis
  const pontuacao = analysis?.pontuacao_risco || 0
  const perfil = analysis?.perfil || "Não definido"

  const goToHome = () => {
    navigation.navigate("HomeTabs", { screen: "Dashboard" })
  }

  return (
    <Screen contentContainerStyle={themed($rootContentContainer)} preset="scroll">
      <View style={themed($recomendationContainer)}>
        {/* Cabeçalho */}
        <View style={themed($headerContainer)}>
          <Image style={themed($img)} resizeMode="contain" source={img} />
          <Text weight="bold" style={themed($headerText)}>
            Resultado da Análise
          </Text>
          <View style={themed($badgeContainer)}>
            <Text style={themed($badgeText)}>Análise Completa ✨</Text>
          </View>
        </View>

        {/* Card Perfil e Pontuação */}
        <View style={themed($infoContainer)}>
          <View style={themed($infoLineContainer)}>
            <Icon
              containerStyle={themed($iconContentContainer)}
              icon={"category"}
              size={24}
              color={colors.palette.primary500}
            />
            <View style={{ flex: 1 }}>
              <Text size="xs" style={{ color: colors.palette.neutral600, marginBottom: 2 }}>
                Seu Perfil
              </Text>
              <Text weight="bold" size="lg">
                {perfil}
              </Text>
            </View>
          </View>

          <View style={themed($infoLineContainer)}>
            <Icon
              containerStyle={themed($iconContentContainer)}
              icon={"check"}
              size={24}
              color={colors.palette.primary500}
            />
            <View style={{ flex: 1 }}>
              <Text size="xs" style={{ color: colors.palette.neutral600, marginBottom: 2 }}>
                Pontuação de Risco
              </Text>
              <Text weight="bold" size="lg">
                {pontuacao}/10
              </Text>
            </View>
          </View>
        </View>

        {/* Justificativa */}
        {analysis?.justificativa && (
          <View style={themed($sectionContainer)}>
            <Text weight="bold" style={themed($sectionTitle)}>
              📋 Justificativa
            </Text>
            <Text style={themed($sectionText)}>{analysis.justificativa}</Text>
          </View>
        )}

        {/* Alocação Sugerida */}
        {analysis?.alocacao_sugerida && (
          <View style={themed($alocacaoContainer)}>
            <Text weight="bold" style={themed($sectionTitle)}>
              📊 Alocação Sugerida
            </Text>
            <View style={themed($alocacaoRow)}>
              <View style={themed($alocacaoItem)}>
                <Text weight="bold" size="xxl" style={{ color: colors.palette.primary600 }}>
                  {analysis.alocacao_sugerida.renda_fixa}
                </Text>
                <Text size="xs" weight="medium" style={{ color: colors.palette.neutral600 }}>
                  Renda Fixa
                </Text>
              </View>
              <View style={themed($alocacaoItem)}>
                <Text weight="bold" size="xxl" style={{ color: colors.palette.secondary500 }}>
                  {analysis.alocacao_sugerida.renda_variavel}
                </Text>
                <Text size="xs" weight="medium" style={{ color: colors.palette.neutral600 }}>
                  Renda Variável
                </Text>
              </View>
            </View>
            {analysis.alocacao_sugerida.observacao && (
              <Text style={themed($alocacaoObservacao)}>
                💡 {analysis.alocacao_sugerida.observacao}
              </Text>
            )}
          </View>
        )}

        {/* Recomendações */}
        {analysis?.recomendacoes && analysis.recomendacoes.length > 0 && (
          <View style={themed($recomendacoesContainer)}>
            <Text weight="bold" style={themed($sectionTitle)}>
              💡 Produtos Recomendados
            </Text>
            {analysis.recomendacoes.map((recomendacao, index) => (
              <View key={index} style={themed($recomendacaoItem)}>
                <Icon icon={"check"} size={20} color={colors.palette.secondary500} />
                <Text size="sm" style={{ flex: 1 }}>
                  {recomendacao}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Observações */}
        {analysis?.observacoes && (
          <View style={themed($observacoesContainer)}>
            <Text weight="bold" style={themed($observacoesTitle)}>
              ℹ️ Observações Importantes
            </Text>
            <Text style={themed($observacoesText)}>{analysis.observacoes}</Text>
          </View>
        )}

        {/* Info da Fonte */}
        {analysis?.fonte && (
          <Text style={themed($fonteText)}>
            Fonte: {analysis.fonte} • {new Date(analysis.timestamp).toLocaleString("pt-BR")}
          </Text>
        )}

        {/* Botão */}
        <Button
          onPress={goToHome}
          style={themed($recomendationButton)}
          text="Ir para Dashboard"
          textStyle={themed($buttonText)}
        />
      </View>
    </Screen>
  )
}
