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
import { useAuth } from "@/contexts/AuthContext"
import { AppStackScreenProps } from "@/navigators"
import { $styles, ThemedStyle } from "@/theme"
import { alert } from "@/utils/alert"
import { useAppTheme } from "@/utils/useAppTheme"

import { $loginStyles } from "./styles"

interface SignInScreenProps extends AppStackScreenProps<"SignIn"> {}

type FormKeys = "Email" | "Password"

export const SignInScreen: FC<SignInScreenProps> = ({ navigation }) => {
  const { theme, themed } = useAppTheme()
  const { signIn } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [isSigningIn, setIsSigningIn] = useState(false)
  const [validationErrors, setValidationErrors] = useState<Map<FormKeys, string>>(new Map())

  const getStatus = (formKey?: FormKeys): TextFieldProps["status"] => {
    return (
      (isSigningIn && "disabled") ||
      (formKey && validationErrors.get(formKey) && "error") ||
      undefined
    )
  }

  const validateForm = () => {
    const errors = new Map<FormKeys, string>()
    if (!email) errors.set("Email", "Email não pode estar vazio")
    if (!password) errors.set("Password", "Senha não pode estar vazia")
    if (__DEV__ && errors.size > 0) console.log(errors)
    return errors
  }

  const pressSignIn = async () => {
    try {
      setIsSigningIn(true)

      const errors = validateForm()
      setValidationErrors(errors)
      if (errors.size > 0) return

      const res = await signIn(email, password)
      if (res.success) {
        // Navegação deve acontecer automaticamente
        // navigation.navigate("Home")
      } else {
        alert("Erro", res.error || "Erro desconhecido. Tente novamente mais tarde.")
      }
    } finally {
      setIsSigningIn(false)
    }
  }

  const pressSignUp = () => {
    navigation.replace("SignUp")
  }

  const passwdForget = () => {
    navigation.navigate("ForgetPassword")
  }

  return (
    <Screen contentContainerStyle={themed([$root, $styles.toggleInner])} preset="fixed">
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
          label="Email"
          placeholder="exemplo@exemplo.com"
          autoComplete="email"
          value={email}
          onChangeText={setEmail}
          style={themed($loginStyles.$input)}
          inputWrapperStyle={themed($loginStyles.$inputWrapper)}
          helper={validationErrors.get("Email")}
          status={getStatus("Email")}
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
            onPress={pressSignIn}
            style={themed($styles.$buttonPrimary)}
            textStyle={themed($styles.$buttonText)}
            disabled={isSigningIn}
          />
          <Text preset="formLabel" style={themed($footerText)}>
            Não tem uma conta?
          </Text>
          <Button
            text="Cadastre-se"
            onPress={pressSignUp}
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
  backgroundColor: colors.tint,
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
