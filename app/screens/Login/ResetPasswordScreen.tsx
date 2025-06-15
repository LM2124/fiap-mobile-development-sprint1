import { FC, useState } from "react"
import { ScrollView, View, ViewStyle } from "react-native"

import { Button, PasswordInput, Screen, Text, type TextFieldProps } from "@/components"
import { AppStackScreenProps } from "@/navigators"
import { submitPasswordChange } from "@/services/fakeApi"
import { $styles, type ThemedStyle } from "@/theme"
import { alert } from "@/utils/alert"
import { useAppTheme } from "@/utils/useAppTheme"
import { validatePassword } from "@/utils/validation"

import { $loginStyles } from "./styles"

interface ResetPasswordScreenProps extends AppStackScreenProps<"ResetPassword"> {}

export const ResetPasswordScreen: FC<ResetPasswordScreenProps> = function ResetPasswordScreen({
  navigation,
  route,
}) {
  const { themed } = useAppTheme()

  type FormKeys = "Password" | "PasswordConfirm"

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [isSending, setIsSending] = useState(false)
  const [validationErrors, setValidationErrors] = useState<Map<FormKeys, string>>(new Map())

  const getStatus = (key?: FormKeys): TextFieldProps["status"] => {
    return (isSending && "disabled") || (key && validationErrors.get(key) && "error") || undefined
  }

  const validateForm = () => {
    const errors = new Map<FormKeys, string>()

    const passwordError = validatePassword(password)
    if (passwordError) {
      // Questão de comportamento: Com as duas senhas vazias,
      // Achei estranho a segunda senha não bandeirar um erro,
      // então decidi duplicar o erro da primeira senha.
      // Note que o erro das senhas diferentes terá prioridade.
      errors.set("Password", passwordError)
      errors.set("PasswordConfirm", passwordError)
    }

    if (password !== confirmPassword) {
      errors.set("Password", "Senhas não são iguais")
      errors.set("PasswordConfirm", "Senhas não são iguais")
    }

    if (__DEV__ && errors.size > 0) {
      console.log(errors)
    }
    return errors
  }

  const submitNewPassword = async () => {
    try {
      setIsSending(true)

      const errors = validateForm()
      setValidationErrors(errors)
      if (errors.size > 0) return

      const res = await submitPasswordChange(route.params.userEmail, password, route.params.auth)
      if (res.status === 200) {
        alert("Sucesso", "Senha Alterada com Sucesso!")
        navigation.popTo("SignIn")
      } else {
        alert("Erro", res.error || "Erro desconhecido. Tente novamente mais tarde.")
      }
    } finally {
      setIsSending(false)
    }
  }

  return (
    <Screen contentContainerStyle={themed([$root, $styles.toggleInner])} preset="fixed">
      <View style={themed($styles.header)}>
        <Text style={themed($styles.$title)}>Nova Senha</Text>
      </View>

      <ScrollView
        style={themed($loginStyles.$formContainer)}
        contentContainerStyle={themed($loginStyles.$formContent)}
        showsVerticalScrollIndicator={false}
      >
        <PasswordInput
          label="Nova Senha"
          placeholder="Digite a nova senha"
          autoComplete="new-password"
          value={password}
          onChangeText={setPassword}
          style={themed($loginStyles.$input)}
          inputWrapperStyle={themed($loginStyles.$inputWrapper)}
          helper={validationErrors.get("Password")}
          status={getStatus("Password")}
        />
        <PasswordInput
          label="Confirmar Nova Senha"
          placeholder="Confirme a nova senha"
          autoComplete="new-password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={themed($loginStyles.$input)}
          inputWrapperStyle={themed($loginStyles.$inputWrapper)}
          helper={validationErrors.get("PasswordConfirm")}
          status={getStatus("PasswordConfirm")}
        />

        <View style={$styles.toggleInner}>
          {/* Centralizado verticalmente desse jeito é
          meio bizarro mas é assim que tá no Figma 👍 */}
          <Button
            text="Alterar Senha"
            onPress={submitNewPassword}
            style={themed($styles.$buttonPrimary)}
            textStyle={themed($styles.$buttonText)}
            disabled={isSending}
            disabledStyle={themed($styles.$buttonDisabled)}
          />
        </View>
      </ScrollView>
    </Screen>
  )
}

const $root: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.tint,
})
