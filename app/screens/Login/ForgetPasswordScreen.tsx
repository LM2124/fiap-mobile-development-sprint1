import { FC, useState } from "react"
import { ActivityIndicator, Alert, ScrollView, type TextStyle, View, ViewStyle } from "react-native"

import { Button, Screen, Text, TextField, type TextFieldProps } from "@/components"
import { AppStackScreenProps } from "@/navigators"
import { sendPasswordResetEmail } from "@/services/fakeApi"
import { $styles, ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { validateEmail } from "@/utils/validation"

import { $loginStyles } from "./styles"

interface ForgetPasswordScreenProps extends AppStackScreenProps<"ForgetPassword"> {}

export const ForgetPasswordScreen: FC<ForgetPasswordScreenProps> = ({ navigation }) => {
  const { themed } = useAppTheme()

  type FormKeys = "Email"

  const [email, setEmail] = useState("")

  const [isSending, setIsSending] = useState(false)
  const [validationErrors, setValidationErrors] = useState<Map<FormKeys, string>>(new Map())

  const getStatus = (key?: FormKeys): TextFieldProps["status"] => {
    return (isSending && "disabled") || (key && validationErrors.get(key) && "error") || undefined
  }

  const validateForm = () => {
    const errors = new Map<FormKeys, string>()

    const emailError = validateEmail(email)
    if (emailError) errors.set("Email", emailError)

    if (__DEV__ && errors.size > 0) {
      console.log(errors)
    }
    return errors
  }

  const submitEmail = async () => {
    try {
      setIsSending(true)

      const errors = validateForm()
      setValidationErrors(errors)
      if (errors.size > 0) return

      const res = await sendPasswordResetEmail(email)
      if (res.status === 200) {
        navigation.replace("SecurityCode", { userEmail: email })
      } else {
        Alert.alert("Erro", res.error || "Erro desconhecido. Tente novamente mais tarde.")
      }
    } finally {
      setIsSending(false)
    }
  }

  return (
    <Screen contentContainerStyle={themed($root)} preset="fixed">
      <View style={themed($styles.header)}>
        <Text style={themed($styles.$title)}>Esqueceu a Senha?</Text>
      </View>

      <ScrollView
        style={themed($loginStyles.$formContainer)}
        contentContainerStyle={themed($loginStyles.$formContent)}
        showsVerticalScrollIndicator={false}
      >
        <View style={themed($welcomeText)}>
          <Text preset="heading" size="lg">
            Resetar Senha?
          </Text>
          <Text>
            Informe o e-mail cadastrado para que possamos ajudar você a redefinir sua senha com
            segurança.
          </Text>
        </View>
        <TextField
          label="Informe Seu Endereço de Email"
          placeholder="exemplo@exemplo.com"
          autoComplete="email"
          value={email}
          onChangeText={setEmail}
          inputWrapperStyle={themed($loginStyles.$inputWrapper)}
          helper={validationErrors.get("Email")}
          status={getStatus("Email")}
        />

        {/* Não sei se gosto desse ActivityIndicator. */}
        {isSending && <ActivityIndicator />}

        <View style={$narrowContainer}>
          <Button
            text="Enviar código de verificação"
            onPress={submitEmail}
            style={themed([$styles.$buttonPrimary, $styles.$buttonThin])}
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
  flex: 1,
  backgroundColor: colors.tint,
  justifyContent: "center",
  alignItems: "center",
})

const $welcomeText: ThemedStyle<TextStyle> = ({ spacing }) => ({
  textAlign: "center",
  marginBottom: spacing.sm,
})

const $narrowContainer: ViewStyle = {
  alignSelf: "center",
  width: "66%",
}
