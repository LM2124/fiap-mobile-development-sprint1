import { Button, Link, PasswordInput, Screen, Text, TextField } from "@/components"
import { $styles, ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { FC, useState } from "react"
import { ScrollView, TextStyle, View, ViewStyle } from "react-native"
import { $loginStyles } from "./Login/styles"

export const SignUpScreen: FC = () => {
  const { theme, themed } = useAppTheme()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [birthdate, setBirthdate] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

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
          Continuando, Você Concorda com os{" "}
          <Link href="" style={themed($styles.$link)}>Termos de Uso</Link> e{" "}
          <Link href="" style={themed($styles.$link)}>Política de Privacidade</Link>.
        </Text>

        <Button style={themed($styles.$buttonPrimary)} textStyle={themed($styles.$buttonText)}>
          Cadastrar
        </Button>

        <Text style={themed($footerText)}>
          Você já tem uma conta? <Link href="" style={themed($styles.$link)}>Entrar</Link>
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
  fontSize: spacing.sm,
  textAlign: "center",
  color: colors.palette.neutral600,
  marginTop: spacing.sm,
})

const $footerText: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  marginTop: spacing.md,
  fontSize: spacing.sm,
  textAlign: "center",
  color: colors.palette.neutral600,
})
