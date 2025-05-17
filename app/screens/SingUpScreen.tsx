import { FC, useState } from "react"
import { View, TextInput, ScrollView, TouchableOpacity, ViewStyle, TextStyle, TextInputProps } from "react-native"
import { Screen, Text, Button } from "@/components"
import { useAppTheme } from "@/utils/useAppTheme"
import { type ThemedStyle } from "@/theme"
import Icon from "react-native-vector-icons/Feather"

export const SignUpScreen: FC = () => {
  const { themed } = useAppTheme()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [birthdate, setBirthdate] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <Screen preset="fixed" contentContainerStyle={themed($container)}>
      <View style={themed($header)} />
      <View style={themed($formContainer)}>
        <ScrollView contentContainerStyle={themed($form)} showsVerticalScrollIndicator={false}>
          <Text style={themed($title)}>Criar Conta</Text>

          <TextInput
            style={themed($input)}
            placeholder="Nome Completo"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={themed($input)}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={themed($input)}
            placeholder="Número de Celular"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
          <TextInput
            style={themed($input)}
            placeholder="Data de Nascimento"
            value={birthdate}
            onChangeText={setBirthdate}
          />

          {/* Campo de Senha */}
          <View style={themed($inputWrapper)}>
            <TextInput
              style={themed($inputWithIcon)}
              placeholder="Senha"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon name={showPassword ? "eye-off" : "eye"} size={20} />
            </TouchableOpacity>
          </View>

          {/* Confirmar Senha */}
          <View style={themed($inputWrapper)}>
            <TextInput
              style={themed($inputWithIcon)}
              placeholder="Confirmar Senha"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Icon name={showPassword ? "eye-off" : "eye"} size={20} />
            </TouchableOpacity>
          </View>

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

const $container: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $header: ThemedStyle<ViewStyle> = ({ colors }) => ({
  height: 120,
  backgroundColor: colors.palette.primary500,
})

const $formContainer: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flex: 1,
  backgroundColor: colors.background,
  borderTopLeftRadius: spacing.xxl,
  borderTopRightRadius: spacing.xxl,
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.lg,
  marginTop: -spacing.lg, // para sobrepor o header
})

const $form: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "center",
  gap: spacing.sm,
  paddingBottom: spacing.xl,
})

const $title: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  fontSize: spacing.xxl,
  fontWeight: "bold",
  color: colors.palette.primary500,
  marginBottom: spacing.md,
})

const $input: ThemedStyle<ViewStyle & TextInputProps> = ({ spacing, colors }) => ({
  width: "100%",
  borderRadius: spacing.md,
  padding: spacing.md,
  backgroundColor: colors.palette.neutral200,
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
