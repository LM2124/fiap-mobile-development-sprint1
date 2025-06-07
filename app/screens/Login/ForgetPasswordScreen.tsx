import { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Button, Link, PasswordInput, Screen, Text, TextField } from "@/components"
import { useAppTheme } from "@/utils/useAppTheme"
import { $styles, ThemedStyle } from "@/theme"
import { $loginStyles } from "./styles"


interface ForgetPasswordScreenProps extends AppStackScreenProps<"ForgetPassword"> {}


export const ForgetPasswordScreen: FC<ForgetPasswordScreenProps> = observer(({ navigation }) => {
  const { theme, themed } = useAppTheme()

  const [email, setEmail] = useState("")

  const submitEmail = () => {
    // validateEmptyFields()
    // validateValidEmail()
    navigation.navigate("ResetPassword")
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
        <TextField
          label="Informe Seu Endereço de Email"
          placeholder="exemplo@exemplo.com"
          autoComplete="email"
          value={email}
          onChangeText={setEmail}
          inputWrapperStyle={themed($loginStyles.$inputWrapper)}
        />

        <View style={{ alignSelf: "center", width: "66%" }}>
          <Button
            text="Enviar código de verificação"
            onPress={submitEmail}
            style={themed($styles.$buttonPrimary)}
            textStyle={themed($styles.$buttonText)}
          />
        </View>

      </ScrollView>
    </Screen>
  )

})

const $root: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.tint,
  justifyContent: "center",
  alignItems: "center",
})
