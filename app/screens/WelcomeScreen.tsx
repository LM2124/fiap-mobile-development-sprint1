import { observer } from "mobx-react-lite"
import { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Text, Screen, Button } from "@/components"
import { AppStackScreenProps } from "../navigators"
import { type ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"

const welcomeLogo = require("../../assets/images/xpLogo.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> { }

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen() {
  const { themed, theme } = useAppTheme()

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
        <Button style={themed($button)} textStyle={themed($buttonText)}>Entrar</Button>
        <Button style={themed($buttonAlt)} textStyle={themed($buttonText)}>Cadastre-se</Button>
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

const $button: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  backgroundColor: colors.tint,
  borderColor: colors.transparent,
  borderRadius: spacing.xl,
  marginTop: spacing.sm,
})

const $buttonAlt: ThemedStyle<ViewStyle> = (theme) => ({
  ...$button(theme),
  // FIXME: não gostei dessa cor && E vc acha que eu gostei.
  backgroundColor: theme.colors.palette.primary300
})

const $buttonText: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  color: colors.palette.neutral100,
  fontSize: spacing.lg,
})
