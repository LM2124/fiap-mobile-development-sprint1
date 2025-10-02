import { FC } from "react"
import { View, Image } from "react-native"

import { Button } from "@/components/Button"
import { Icon } from "@/components/Icon"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { dadosUserType } from "@/data/DadosUserType"
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
} from "./styles"
import { $loginStyles } from "../../Login/styles"

interface UserTypeScreenProps extends HomeStackScreenProps<"UserType"> {}

const img = require("assets/images/giftbox.png")

export const UserTypeScreen: FC<UserTypeScreenProps> = ({ navigation }) => {
  const { theme, themed } = useAppTheme()

  const goToHome = () => {
    navigation.navigate("HomeTabs", { screen: "Dashboard" })
  }

  return (
    <Screen
      contentContainerStyle={themed([$loginStyles.$formContainer, $rootContentContainer])}
      preset="scroll"
    >
      <View style={themed([$recomendationContainer])}>
        <View>
          <Image style={themed($img)} resizeMode="contain" source={img} />
          <Text weight="semiBold" size="lg">
            Resultado da Análise:
          </Text>
        </View>
        <View style={themed($infoContainer)}>
          <View style={themed($infoLineContainer)}>
            <Icon
              containerStyle={themed($iconContentContainer)}
              icon={"check"}
              size={25}
              color={colors.palette.primary400}
            />
            <Text weight="semiBold" size="sm">
              Pontuação: {dadosUserType.pontuacao}
            </Text>
          </View>
          <View style={themed($infoLineContainer)}>
            <Icon
              containerStyle={themed($iconContentContainer)}
              icon={"category"}
              size={25}
              color={colors.palette.primary400}
            />
            <Text weight="semiBold" size="sm">
              Seu perfil é: {dadosUserType.tipo}
            </Text>
          </View>
        </View>

        <Button
          onPress={goToHome}
          style={themed($recomendationButton)}
          text="Veja nossas Recomendações"
          textStyle={themed($buttonText)}
        ></Button>
      </View>
    </Screen>
  )
}
