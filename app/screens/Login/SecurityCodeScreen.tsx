import { FC, useState } from "react"
import { ActivityIndicator, ScrollView, type TextStyle, View, ViewStyle } from "react-native"

import { Button, Screen, SecurityCodeInput, Text } from "@/components"
import { AppStackScreenProps } from "@/navigators"
import { $styles, type ThemedStyle } from "@/theme"
import { delay } from "@/utils/delay"
import { useAppTheme } from "@/utils/useAppTheme"

import { $loginStyles } from "./styles"

interface SecurityCodeScreenProps extends AppStackScreenProps<"SecurityCode"> {}

export const SecurityCodeScreen: FC<SecurityCodeScreenProps> = ({ navigation }) => {
  const { theme, themed } = useAppTheme()

  const [inputCode, setCode] = useState("")
  const [isSending, setIsSending] = useState(false)
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

      await delay(500 + Math.random() * 1000)

      // TODO - Request e Backend
      // if(await sendConfirmationCode(code)) {}
      // setValidationError("Código Incorreto - Verifique seu Email")
      navigation.navigate("ResetPassword")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <Screen contentContainerStyle={themed($root)} preset="fixed">
      <View style={themed($styles.header)}>
        <Text style={themed($styles.$title)}>Código De Segurança</Text>
      </View>

      <ScrollView
        style={themed($loginStyles.$formContainer)}
        contentContainerStyle={[themed($loginStyles.$formContent), $formContent]}
        showsVerticalScrollIndicator={false}
      >
        <Text preset="subheading" style={themed($labelText)} text="Insira Código de Segurança:" />
        <SecurityCodeInput
          maxLength={codeLength}
          value={inputCode}
          onChangeText={setCode}
          onFilled={submitCode}
          autoFocus={true}
          onFocus={() => setCodeInputFocused(true)}
          onBlur={() => setCodeInputFocused(false)}
          style={[themed($inputStyle), codeInputFocused && themed($inputFocusedStyle)]}
          digitStyle={themed($digitStyle)}
        />

        <View style={{ height: theme.spacing.lg }}>
          <>
            {isSending && <ActivityIndicator />}
            {validationError && (
              <Text
                text={validationError}
                preset="formHelper"
                style={{ color: theme.colors.error, fontFamily: theme.typography.primary.semiBold }}
              />
            )}
          </>
        </View>

        <View style={$narrowContainer}>
          <Button
            text="Confirmar"
            onPress={() => submitCode(inputCode)}
            style={themed($styles.$buttonPrimary)}
            textStyle={themed($styles.$buttonText)}
            disabled={isSending || !canSend(inputCode)}
            disabledStyle={themed($styles.$buttonDisabled)}
          />
        </View>
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

const $formContent: ViewStyle = {
  alignItems: "center",
}

const $labelText: ThemedStyle<TextStyle> = ({ spacing }) => ({
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

const $narrowContainer: ViewStyle = {
  alignSelf: "center",
  width: "66%",
}
