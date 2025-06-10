import { FC, useState } from "react"
import { ScrollView, TextStyle, View, ViewStyle } from "react-native"
import { type ICountry } from "react-native-international-phone-number"

import {
  Button,
  Link,
  PasswordInput,
  PhoneInput,
  Screen,
  Text,
  TextField,
  type TextFieldProps,
} from "@/components"
import { AppStackScreenProps } from "@/navigators"
import { $styles, ThemedStyle } from "@/theme"
import { delay } from "@/utils/delay"
import { useAppTheme } from "@/utils/useAppTheme"
import {
  validateBirthdate,
  validateEmail,
  validatePassword,
  validatePhone,
} from "@/utils/validation"

import { $loginStyles } from "./styles"

interface SignUpScreenProps extends AppStackScreenProps<"SignUp"> {}

export const SignUpScreen: FC<SignUpScreenProps> = ({ navigation }) => {
  const { themed } = useAppTheme()

  type FormKeys = "Name" | "Email" | "Phone" | "Birthdate" | "Password" | "PasswordConfirm"
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [selectedCountry, setSelectedCountry] = useState<ICountry | undefined>(undefined)
  const [birthdate, setBirthdate] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [isSigningUp, setIsSigningUp] = useState(false)
  const [validationErrors, setValidationErrors] = useState<Map<FormKeys, string>>(new Map())

  const getStatus = (key?: FormKeys): TextFieldProps["status"] => {
    return (isSigningUp && "disabled") || (key && validationErrors.get(key) && "error") || undefined
  }

  const validateForm = () => {
    const errors = new Map<FormKeys, string>()
    if (!name) errors.set("Name", "Nome não pode estar vazio")

    const emailError = validateEmail(email)
    if (emailError) errors.set("Email", emailError)

    const passwordError = validatePassword(password)
    if (passwordError) {
      // Questão de comportamento: Com as duas senhas vazias,
      // Achei estranho a segunda senha não bandeirar um erro,
      // então decidi duplicar o erro da primeira senha.
      // Note que o erro das senhas diferentes terá prioridade.
      errors.set("Password", passwordError)
      errors.set("PasswordConfirm", passwordError)
    }

    if (password !== confirmPassword) errors.set("PasswordConfirm", "Senhas não são iguais")

    const phoneNumberError = validatePhone(phone, selectedCountry)
    if (phoneNumberError) errors.set("Phone", phoneNumberError)

    const birthdateError = validateBirthdate(birthdate)
    if (birthdateError) errors.set("Birthdate", birthdateError)

    if (__DEV__ && errors.size > 0) {
      console.log(errors)
    }
    return errors
  }

  const pressSignUp = async () => {
    try {
      setIsSigningUp(true)

      const errors = validateForm()
      setValidationErrors(errors)
      if (errors.size > 0) return

      await delay(500 + Math.random() * 1000)
      // await signUp(email, phone, birthdate, password)
    } finally {
      setIsSigningUp(false)
    }
  }

  const pressSignIn = () => {
    navigation.replace("SignIn")
  }

  const pressTos = () => {
    console.log("Show TOS")
  }

  const pressPrivacy = () => {
    console.log("Show Privacy Policy")
  }

  return (
    <Screen contentContainerStyle={themed($root)} preset="fixed">
      <View style={$styles.header}>
        <Text style={themed($styles.$title)}>Criar Conta</Text>
      </View>

      <ScrollView
        style={themed($loginStyles.$formContainer)}
        contentContainerStyle={themed($loginStyles.$formContent)}
        showsVerticalScrollIndicator={false}
      >
        <TextField
          label="Nome Completo"
          placeholder="Exemplo da Silva"
          autoComplete="name"
          autoCorrect={true} // acho que podemos ligar o corretor para o nome
          value={name}
          onChangeText={setName}
          inputWrapperStyle={themed($loginStyles.$inputWrapper)}
          helper={validationErrors.get("Name")}
          status={getStatus("Name")}
        />
        <TextField
          label="Email"
          placeholder="exemplo@exemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
          inputWrapperStyle={[themed($loginStyles.$inputWrapper)]}
          helper={validationErrors.get("Email")}
          status={getStatus("Email")}
        />
        <PhoneInput
          label="Número de Celular"
          placeholder="## #### ####"
          keyboardType="phone-pad"
          autoComplete="tel-device"
          value={phone}
          onChangePhoneNumber={setPhone}
          selectedCountry={selectedCountry}
          onChangeSelectedCountry={setSelectedCountry}
          inputWrapperStyle={themed($loginStyles.$inputWrapper)}
          helper={validationErrors.get("Phone")}
          status={getStatus("Phone")}
          disabled={isSigningUp}
        />
        <TextField
          label="Data de Nascimento"
          // TODO: usar o seletor de data do expo
          placeholder="DD/MM/YY (placeholder)"
          autoComplete="birthdate-full"
          value={birthdate}
          onChangeText={setBirthdate}
          inputWrapperStyle={themed($loginStyles.$inputWrapper)}
          helper={validationErrors.get("Birthdate")}
          status={getStatus("Birthdate")}
        />
        <PasswordInput
          label="Senha"
          // p.s. o placeholder do TextInput ignora
          // a opção de censurar ou não o texto
          placeholder="Digite a senha"
          autoComplete="new-password"
          value={password}
          onChangeText={setPassword}
          inputWrapperStyle={themed($loginStyles.$inputWrapper)}
          helper={validationErrors.get("Password")}
          status={getStatus("Password")}
        />
        <PasswordInput
          label="Confirmar Senha"
          placeholder="Confirme a senha"
          autoComplete="new-password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          inputWrapperStyle={themed($loginStyles.$inputWrapper)}
          helper={validationErrors.get("PasswordConfirm")}
          status={getStatus("PasswordConfirm")}
        />

        <Text style={themed($termsText)}>
          {"Continuando, você concorda com os "}
          <Link disabled={isSigningUp} style={themed($termsText)} onPress={pressTos}>
            Termos de Uso
          </Link>
          {" e "}
          <Link disabled={isSigningUp} style={themed($termsText)} onPress={pressPrivacy}>
            Política de Privacidade
          </Link>
          .
        </Text>

        <Button
          text={isSigningUp ? "Cadastrando..." : "Cadastrar"}
          disabled={isSigningUp}
          onPress={pressSignUp}
          style={themed($styles.$buttonPrimary)}
          textStyle={themed($styles.$buttonText)}
        />

        <Text style={themed($footerText)}>
          Já tem uma conta?{" "}
          <Link disabled={isSigningUp} onPress={pressSignIn} style={themed($footerText)}>
            Entrar
          </Link>
        </Text>
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

const $termsText: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  fontSize: spacing.md,
  lineHeight: spacing.md,
  textAlign: "center",
  color: colors.palette.neutral600,
  marginTop: spacing.sm,
})

const $footerText: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  fontSize: spacing.md,
  lineHeight: spacing.md,
  textAlign: "center",
  color: colors.palette.neutral600,
})
