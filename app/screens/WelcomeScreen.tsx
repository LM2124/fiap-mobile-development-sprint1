import { observer } from "mobx-react-lite"
import { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Text, Screen, Button } from "@/components"
import { AppStackScreenProps } from "../navigators"
import { $styles, type ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"

const welcomeLogo = require("../../assets/images/xpLogo.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> { }

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen({ navigation }) {
  const { themed, theme } = useAppTheme()

  const signIn = () => {
    navigation.navigate("SignIn")
  }

  const signUp = () => {
    navigation.navigate("SignUp")
  }

  // FIXME: tela não cabe no modo horizontal.
  // Considerando forçar o modo vertical para essa tela e durante o onboarding.
  return (
    <Screen preset="fixed" contentContainerStyle={themed($container)}>
      <Image style={themed($welcomeLogo)} source={welcomeLogo} resizeMode="contain" />
      <Text style={themed($welcomeHeading)} tx="common:productName" />

      <View style={themed($containerNarrow)}>
        <Text style={themed($welcomeText)}>
          Bem Vindo.<br />
          Acesse sua conta com segurança e praticidade.<br />
          Insira seus dados para continuar gerenciando suas finanças de forma simples e protegida.
        </Text>
        <Button
          text="Entrar"
          onPress={signIn}
          style={[themed($styles.$buttonPrimary), { marginVertical: theme.spacing.md }]}
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
})

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: spacing.lg,
})

const $welcomeLogo: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  height: 150,
  width: "100%",
  aspectRatio: 1,
  marginBottom: 8,
})

const $welcomeHeading: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  color: colors.palette.primary500,
  fontWeight: "bold",
  fontSize: spacing.xxxl,
  lineHeight: spacing.xxxl,
  textAlign: "center",
  marginBottom: spacing.sm,
})

const $containerNarrow: ThemedStyle<ViewStyle> = () => ({
  width: "70%",
})

const $welcomeText: ThemedStyle<TextStyle> = ({ spacing }) => ({
  textAlign: "center",
  marginBottom: spacing.sm,
})
