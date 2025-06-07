import { Button, Link, PasswordInput, Screen, Text, TextField } from "@/components"
import { AppStackScreenProps } from "@/navigators"
import { $styles, ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { FC, useState } from "react"
import { ScrollView, TextStyle, View, ViewStyle } from "react-native"
import { $loginStyles } from "./styles"

interface SignUpScreenProps extends AppStackScreenProps<"SignUp"> {}

export const SignUpScreen: FC<SignUpScreenProps> = ({ navigation }) => {
  const { theme, themed } = useAppTheme()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [birthdate, setBirthdate] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const toSignIn = () => {
    navigation.replace("SignIn")
  }

  const signUp = () => {
    // validateEmptyFields()
    // validateValidEmail()
    // validatePhoneNumber()
    // validateBirthdate()
    // validateMatchingPasswords()
    console.log("Sign Up Flow")
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
          inputWrapperStyle={themed($loginStyles.$inputWrapper)}
        />
        <TextField
          label="Número de Celular"
          placeholder="+123 456 789"
          keyboardType="phone-pad"
          autoComplete="tel-device"
          value={phone}
          onChangeText={setPhone}
          inputWrapperStyle={themed($loginStyles.$inputWrapper)}
        />
        <TextField
          label="Data de Nascimento"
          // TODO: usar o seletor de data do expo
          placeholder="DD/MM/YY (placeholder)"
          autoComplete="birthdate-full"
          value={birthdate}
          onChangeText={setBirthdate}
          inputWrapperStyle={themed($loginStyles.$inputWrapper)}
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
        />
        <PasswordInput
          label="Confirmar Senha"
          placeholder="Confirme a senha"
          autoComplete="new-password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          inputWrapperStyle={themed($loginStyles.$inputWrapper)}
        />

        <Text style={themed($termsText)}>
          {"Continuando, Você Concorda com os "}
          <Link style={themed($termsText)} onPress={pressTos}>Termos de Uso</Link>
          {" e "}
          <Link style={themed($termsText)} onPress={pressPrivacy}>Política de Privacidade</Link>.
        </Text>

        <Button
          text="Cadastrar"
          onPress={signUp}
          style={themed($styles.$buttonPrimary)}
          textStyle={themed($styles.$buttonText)}
        />

        <Text style={themed($footerText)}>
          Já tem uma conta? <Link onPress={toSignIn} style={themed($footerText)}>Entrar</Link>
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
