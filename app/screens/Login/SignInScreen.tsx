import { FC, useState } from "react"
import { ScrollView, TextStyle, View, ViewStyle } from "react-native"

import {
  Button,
  Link,
  PasswordInput,
  Screen,
  Text,
  TextField,
  type TextFieldProps,
} from "@/components"
import { AppStackScreenProps } from "@/navigators"
import { $styles, ThemedStyle } from "@/theme"
import { delay } from "@/utils/delay"
import { useAppTheme } from "@/utils/useAppTheme"

import { $loginStyles } from "./styles"

interface SignInScreenProps extends AppStackScreenProps<"SignIn"> {}

type FormKeys = "User" | "Password"

export const SignInScreen: FC<SignInScreenProps> = ({ navigation }) => {
  const { theme, themed } = useAppTheme()
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  const [isSigningIn, setIsSigningIn] = useState(false)
  const [validationErrors, setValidationErrors] = useState<Map<FormKeys, string>>(new Map())

  const getStatus = (key?: FormKeys): TextFieldProps["status"] => {
    return (isSigningIn && "disabled") || (key && validationErrors.get(key) && "error") || undefined
  }

  const validateForm = () => {
    const errors = new Map<FormKeys, string>()
    // FIXME: O cadastro pede o nome completo,
    // e não um username ou qualquer outra coisa...
    // É meio estranho poder logar com o nome completo,
    // na verdade é um problema de segurança também :/
    // ...Considerar mudar para pedir só o email.
    if (!name) errors.set("User", "Nome não pode estar vazio")
    if (!password) errors.set("Password", "Nome não pode estar vazio")
    if (__DEV__ && errors.size > 0) console.log(errors)
    return errors
  }

  const signIn = async () => {
    try {
      setIsSigningIn(true)

      const errors = validateForm()
      setValidationErrors(errors)
      if (errors.size > 0) return

      await delay(500 + Math.random() * 1000)
      // await signIn(user, password)
    } finally {
      setIsSigningIn(false)
    }
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
          style={themed($loginStyles.$input)}
          inputWrapperStyle={themed($loginStyles.$inputWrapper)}
          helper={validationErrors.get("User")}
          status={getStatus("User")}
        />
        <PasswordInput
          label="Senha"
          placeholder="Digite a senha"
          autoComplete="password"
          value={password}
          onChangeText={setPassword}
          style={themed($loginStyles.$input)}
          inputWrapperStyle={themed($loginStyles.$inputWrapper)}
          helper={validationErrors.get("Password")}
          status={getStatus("Password")}
        />
        <Link
          text="Esqueceu a Senha?"
          onPress={passwdForget}
          preset="bold"
          style={{ marginTop: -theme.spacing.sm }}
        />

        <View style={$narrowContainer}>
          <Button
            text={isSigningIn ? "Entrando..." : "Entrar"}
            onPress={signIn}
            style={themed($styles.$buttonPrimary)}
            textStyle={themed($styles.$buttonText)}
            disabled={isSigningIn}
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
            disabled={isSigningIn}
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
