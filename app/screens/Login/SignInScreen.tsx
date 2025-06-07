import { FC, useState } from "react"
import { ScrollView, TextStyle, View, ViewStyle } from "react-native"

import { Button, Link, PasswordInput, Screen, Text, TextField } from "@/components"
import { AppStackScreenProps } from "@/navigators"
import { $styles, ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"

import { $loginStyles } from "./styles"

interface SignInScreenProps extends AppStackScreenProps<"SignIn"> {}

export const SignInScreen: FC<SignInScreenProps> = ({ navigation }) => {
  const { theme, themed } = useAppTheme()
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  const signIn = () => {
    // validateEmptyFields()
    console.log("Sign in flow")
  }

  const toSignUp = () => {
    navigation.replace("SignUp")
  }

  const passwdForget = () => {
    navigation.navigate("ForgetPassword")
  }

  return (
    <Screen contentContainerStyle={themed($root)} preset="fixed">
      <View style={themed($styles.header)}>
        <Text style={themed($styles.$title)}>Bem Vindo</Text>
      </View>

      <ScrollView
        // FIXME: Não é imediatamente óbvio que o usuário pode scrollar,
        // mas a barra de scroll padrão fica estranha com as bordas redondas.
        style={themed($loginStyles.$formContainer)}
        contentContainerStyle={themed($loginStyles.$formContent)}
        showsVerticalScrollIndicator={false}
      >
        <TextField
          label="Usuario/Email"
          placeholder="exemplo@exemplo.com"
          autoComplete="email"
          value={name}
          onChangeText={setName}
          inputWrapperStyle={themed($loginStyles.$inputWrapper)}
        />
        <PasswordInput
          label="Senha"
          placeholder="Digite a senha"
          autoComplete="password"
          value={password}
          onChangeText={setPassword}
          inputWrapperStyle={themed($loginStyles.$inputWrapper)}
        />
        <Link
          text="Esqueceu a Senha?"
          onPress={passwdForget}
          preset="bold"
          style={{ marginTop: -theme.spacing.sm }}
        />

        <View style={$narrowContainer}>
          <Button
            text="Entrar"
            onPress={signIn}
            style={themed($styles.$buttonPrimary)}
            textStyle={themed($styles.$buttonText)}
          />
          <Text preset="formLabel" style={themed($footerText)}>
            Não tem uma conta?
          </Text>
          <Button
            text="Cadastre-se"
            onPress={toSignUp}
            // Style temporário; ajustar CSS dos botões depois
            style={themed($styles.$buttonSecondary)}
            textStyle={themed($styles.$buttonText)}
          />
        </View>

        {/* TODO: Ícones de login Facebook e Google */}
      </ScrollView>
    </Screen>
  )
}

const $root: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.tint,
  justifyContent: "center",
  alignItems: "center",
})

const $narrowContainer: ViewStyle = {
  alignSelf: "center",
  width: "66%",
}

const $footerText: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  marginTop: spacing.sm,
  textAlign: "center",
  color: colors.palette.neutral600,
})
