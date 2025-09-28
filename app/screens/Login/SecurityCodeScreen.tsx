import { FC, useState } from "react"
import { ActivityIndicator, ScrollView, type TextStyle, View, ViewStyle } from "react-native"

import { Button } from "@/components/Button"
import { Screen } from "@/components/Screen"
import { SecurityCodeInput } from "@/components/SecurityCodeInput"
import { Text } from "@/components/Text"
import { useAuth } from "@/contexts/AuthContext"
import type { LoginStackScreenProps } from "@/navigators/LoginNavigator"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import type { ThemedStyle } from "@/theme/types"
import { delay } from "@/utils/delay"

import { $loginStyles } from "./styles"

interface SecurityCodeScreenProps extends LoginStackScreenProps<"SecurityCode"> {}

export const SecurityCodeScreen: FC<SecurityCodeScreenProps> = ({ navigation, route }) => {
  const { theme, themed } = useAppTheme()
  const { sendPasswordResetEmail, submitConfirmationCode } = useAuth()

  const [inputCode, setCode] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [resendStatus, setResendStatus] = useState<"Sending" | "Cooldown" | undefined>()
  const [validationError, setValidationError] = useState("")

  const [codeInputFocused, setCodeInputFocused] = useState(false)

  const codeLength = 6
  const canSend = (code: string) => {
    return code.length === codeLength
  }

  const submitCode = async (code: string) => {
    if (isSending) return
    try {
      setIsSending(true)
      setValidationError("")

      // Não é pra isso acontecer mas nunca se sabe
      if (!canSend(code)) {
        setValidationError("Código Inválido")
        return
      }

      const email = route.params.userEmail
      console.log(`SubmitCode - ${route.params.userEmail}`)
      const res = await submitConfirmationCode(email, code)
      if (res.success) {
        console.log(`Success - ${route.params.userEmail}`)
        navigation.replace("ResetPassword", { userEmail: email })
      } else {
        // Nunca vai acontecer porque o código
        // sempre vai ser aceito por enquanto :)
        setValidationError("Código Incorreto - Verifique seu Email")
      }
    } finally {
      setIsSending(false)
    }
  }

  const resendCode = async () => {
    setResendStatus("Sending")
    await sendPasswordResetEmail(route.params.userEmail)

    setResendStatus("Cooldown")
    await delay(5000)

    setResendStatus(undefined)
  }

  return (
    <Screen contentContainerStyle={themed([$root, $styles.toggleInner])} preset="fixed">
      <View style={themed($styles.header)}>
        <Text style={themed($styles.$title)}>Código De Segurança</Text>
      </View>

      <ScrollView
        style={themed($loginStyles.$formContainer)}
        contentContainerStyle={themed([$loginStyles.$formContent, $formContent])}
        showsVerticalScrollIndicator={false}
      >
        <Text preset="subheading" style={themed($codeLabel)} text="Insira Código de Segurança:" />
        <SecurityCodeInput
          maxLength={codeLength}
          value={inputCode}
          onChangeText={setCode}
          onFilled={submitCode}
          autoFocus={true}
          onFocus={() => setCodeInputFocused(true)}
          onBlur={() => setCodeInputFocused(false)}
          style={themed([$inputStyle, codeInputFocused && $inputFocusedStyle])}
          digitStyle={themed($digitStyle)}
        />

        <View style={{ height: theme.spacing.lg }}>
          <>
            {isSending && <ActivityIndicator />}
            {validationError && (
              <Text
                text={validationError}
                preset="formHelper"
                style={themed($validationErrorText)}
              />
            )}
          </>
        </View>

        <View style={themed($buttonsContainer)}>
          <Button
            text={isSending ? "Verificando..." : "Confirmar"}
            onPress={() => submitCode(inputCode)}
            style={themed([$styles.$buttonPrimary, $styles.$buttonThin])}
            textStyle={themed($styles.$buttonText)}
            disabled={isSending || !canSend(inputCode)}
            disabledStyle={themed($styles.$buttonDisabled)}
          />
          <Button
            text={"Reenviar"}
            onPress={resendCode}
            style={themed([$styles.$buttonSecondary, $styles.$buttonThin])}
            textStyle={themed($styles.$buttonText)}
            disabled={isSending || !!resendStatus}
            disabledStyle={themed($styles.$buttonDisabled)}
          />
          <>
            {resendStatus === "Sending" && <ActivityIndicator />}
            {resendStatus === "Cooldown" && (
              <Text text={"Código enviado!"} preset="formHelper" style={$resendStatusText} />
            )}
          </>
        </View>
      </ScrollView>
    </Screen>
  )
}

const $root: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.tint,
})

const $formContent: ViewStyle = {
  alignItems: "center",
}

const $codeLabel: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginTop: spacing.xl,
  marginBottom: -spacing.sm,
})

const $inputStyle: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  width: "100%",
  backgroundColor: colors.palette.neutral100,
  borderWidth: 2,
  borderColor: colors.border,
  borderRadius: spacing.md,
  paddingVertical: spacing.md,
})

const $inputFocusedStyle: ThemedStyle<ViewStyle> = ({ colors }) => ({
  borderColor: colors.tint,
})

const $digitStyle: ThemedStyle<TextStyle> = ({ colors }) => ({
  width: 40,
  height: 40,
  borderRadius: 40,
  borderWidth: 3,
  borderColor: colors.tint,
})

const $validationErrorText: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  color: colors.error,
  fontFamily: typography.primary.semiBold,
})

const $buttonsContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "50%",
  gap: spacing.md,
})

const $resendStatusText: TextStyle = {
  textAlign: "center",
}
