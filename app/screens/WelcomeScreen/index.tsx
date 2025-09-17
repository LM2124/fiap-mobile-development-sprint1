import { FC } from "react"
import { Image, View } from "react-native"

import { Button } from "@/components/Button"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import type { AppStackScreenProps } from "@/navigators/AppNavigator"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"

import {
  $root,
  $welcomeLogo,
  $welcomeHeading,
  $containerNarrow,
  $welcomeText,
} from "./styles"

const welcomeLogo = require("@assets/images/xpLogo.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = function WelcomeScreen({ navigation }) {
  const { themed, theme } = useAppTheme()

  const signIn = () => {
    navigation.navigate("SignIn")
  }

  const signUp = () => {
    navigation.navigate("SignUp")
  }

  return (
    <Screen preset="fixed" contentContainerStyle={themed([$root, $styles.toggleInner])}>
      <Image style={themed($welcomeLogo)} source={welcomeLogo} resizeMode="contain" />
      <Text style={themed($welcomeHeading)} tx="common:productName" />

      <View style={themed($containerNarrow)}>
        <Text style={themed($welcomeText)}>
          Bem Vindo.{"\n"}
          Acesse sua conta com segurança e praticidade.{"\n"}
          Insira seus dados para continuar gerenciando suas finanças de forma simples e protegida.
        </Text>
        <Button
          text="Entrar"
          onPress={signIn}
          style={themed([$styles.$buttonPrimary, { marginVertical: theme.spacing.md }])}
          textStyle={themed($styles.$buttonText)}
        />
        <Button
          text="Cadastre-se"
          onPress={signUp}
          style={themed($styles.$buttonSecondary)}
          textStyle={themed($styles.$buttonText)}
        />
      </View>
    </Screen>
  )
}