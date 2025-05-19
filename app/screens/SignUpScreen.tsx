import { FC, useState } from "react"
import { View, ScrollView, ViewStyle, TextStyle, TextInputProps } from "react-native"
import { Screen, Text, Button, TextField, PasswordInput } from "@/components"
import { useAppTheme } from "@/utils/useAppTheme"
import { type ThemedStyle } from "@/theme"

export const SignUpScreen: FC = () => {
  const { theme, themed } = useAppTheme()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [birthdate, setBirthdate] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  return (
    <Screen preset="fixed" contentContainerStyle={themed($root)}>
      <View style={themed($header)}>
        <Text style={themed($title)}>Criar Conta</Text>
      </View>

      <View style={themed($formContainer)}>
        <ScrollView contentContainerStyle={themed($form)} showsVerticalScrollIndicator={false}>

          <TextField
            label="Nome Completo"
            placeholder="Exemplo da Silva"
            autoComplete="name"
            autoCorrect={true} // acho que podemos ligar o corretor para o nome
            value={name}
            onChangeText={setName}
            containerStyle={themed($input)}
            inputWrapperStyle={themed($inputWrapper)}
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
            containerStyle={themed($input)}
            inputWrapperStyle={themed($inputWrapper)}
          />
          <TextField
            label="Número de Celular"
            placeholder="+123 456 789"
            keyboardType="phone-pad"
            autoComplete="tel-device"
            value={phone}
            onChangeText={setPhone}
            containerStyle={themed($input)}
            inputWrapperStyle={themed($inputWrapper)}
          />
          <TextField
            label="Data de Nascimento"
            // TODO: usar o seletor de data do expo
            placeholder="DD/MM/YY (placeholder)"
            autoComplete="birthdate-full"
            value={birthdate}
            onChangeText={setBirthdate}
            containerStyle={themed($input)}
            inputWrapperStyle={themed($inputWrapper)}
          />
          <PasswordInput
            label="Senha"
            // p.s. o placeholder do TextInput ignora
            // a opção de censurar ou não o texto
            placeholder="Digite a senha"
            autoComplete="new-password"
            value={password}
            onChangeText={setPassword}
            containerStyle={themed($input)}
            inputWrapperStyle={themed($inputWrapper)}
          />
          <PasswordInput
            label="Confirmar Senha"
            placeholder="Confirme a senha"
            autoComplete="new-password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            containerStyle={themed($input)}
            inputWrapperStyle={themed($inputWrapper)}
          />

          <Text style={themed($termsText)}>
            Continuando, Você Concorda com os{" "}
            <Text style={themed($link)}>Termos de Uso</Text> e{" "}
            <Text style={themed($link)}>Política de Privacidade</Text>.
          </Text>

          <Button style={themed($button)} textStyle={themed($buttonText)}>
            Cadastrar
          </Button>

          <Text style={themed($footerText)}>
            Você já tem uma conta? <Text style={themed($link)}>Entrar</Text>
          </Text>
        </ScrollView>
      </View>
    </Screen>
  )
}

const $root: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flex: 1,
  backgroundColor: colors.tint,
  justifyContent: "center",
  alignItems: "center",
})

const $header: ThemedStyle<ViewStyle> = ({ colors }) => ({
  height: 150,
  justifyContent: "center",
})

const $title: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  fontSize: spacing.xl,
  lineHeight: spacing.xl,
  fontWeight: "bold",
  color: colors.palette.neutral100,
})

const $formContainer: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flex: 1,
  backgroundColor: colors.background,
  borderTopLeftRadius: spacing.xxl,
  borderTopRightRadius: spacing.xxl,
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.lg,
  // marginTop: -spacing.lg, // para sobrepor o header
})

const $form: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "center",
  gap: spacing.sm,
  paddingBottom: spacing.xl,
})

const $input: ThemedStyle<ViewStyle & TextInputProps> = ({ spacing, colors }) => ({
  width: "100%",
  padding: spacing.md,
  color: colors.text,
})

const $inputWrapper: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  borderRadius: spacing.md,
  paddingHorizontal: spacing.md,
  backgroundColor: colors.palette.neutral200,
})

const $inputWithIcon: ThemedStyle<TextStyle> = () => ({
  flex: 1,
})

const $termsText: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  fontSize: spacing.sm,
  textAlign: "center",
  color: colors.palette.neutral600,
  marginTop: spacing.sm,
})

const $link: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.primary500,
  textDecorationLine: "underline",
})

const $button: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  width: "100%",
  backgroundColor: colors.tint,
  borderRadius: spacing.xl,
  paddingVertical: spacing.sm,
  marginTop: spacing.md,
})

const $buttonText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral100,
  textAlign: "center",
  fontWeight: "bold",
})

const $footerText: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  marginTop: spacing.md,
  fontSize: spacing.sm,
  textAlign: "center",
  color: colors.palette.neutral600,
})
