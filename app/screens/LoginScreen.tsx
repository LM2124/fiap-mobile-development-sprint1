import { FC, useState } from "react"
import { View, TextInput, TouchableOpacity, ViewStyle, TextStyle, ImageStyle } from "react-native"
import { Screen, Text, Button } from "@/components"
import { useAppTheme } from "@/utils/useAppTheme"
import { ThemedStyle } from "@/theme"
import Icon from "react-native-vector-icons/Feather" 

export const LoginScreen: FC = () => {
    const { themed } = useAppTheme()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    return (
        <Screen preset="fixed" contentContainerStyle={themed($container)}>
            <View style={themed($topContainer)}>
                <Text style={themed($title)}>Bem Vindo</Text>
            </View>

            <View style={themed($form)}>
                <Text style={themed($label)}>Usuário/Email</Text>
                <TextInput
                    style={themed($input)}
                    placeholder="exemplo@exemplo.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={themed($label)}>Senha</Text>
                <View style={themed($passwordContainer)}>
                    <TextInput
                        style={themed($passwordInput)}
                        placeholder="Senha"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Icon name={showPassword ? "eye-off" : "eye"} size={20} />
                    </TouchableOpacity>
                </View>

                <Button style={themed($loginButton)} textStyle={themed($loginButtonText)}>Entrar</Button>

                <TouchableOpacity>
                    <Text style={themed($linkText)}>Esqueceu a Senha?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={themed($registerButton)}>
                    <Text style={themed($registerButtonText)}>Cadastre-Se</Text>
                </TouchableOpacity>

                <Text style={themed($fingerText)}>Usar <Text style={themed($highlight)}>Impressão Digital</Text> Para Acessar</Text>

                <View style={themed($socialContainer)}>
                    <Icon name="facebook" size={24} />
                    <Icon name="google" size={24} />
                </View>

                <Text style={themed($bottomText)}>
                    Não tem uma Conta? <Text style={themed($highlight)}>Cadastre-se</Text>
                </Text>
            </View>
        </Screen>
    )
}

const $container: ThemedStyle<ViewStyle> = () => ({
    flex: 1,
    backgroundColor: "#fff",
})

const $topContainer: ThemedStyle<ViewStyle> = () => ({
    backgroundColor: "#007AFF",
    paddingVertical: 60,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: "center",
})

const $title: ThemedStyle<TextStyle> = () => ({
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
})

const $form: ThemedStyle<ViewStyle> = ({ spacing }) => ({
    padding: spacing.lg,
    gap: spacing.md,
})

const $label: ThemedStyle<TextStyle> = () => ({
    fontWeight: "bold",
})

const $input: ThemedStyle<ViewStyle> = ({ spacing }) => ({
    backgroundColor: "#f0f0f0",
    borderRadius: spacing.md,
    padding: spacing.md,
})

const $passwordContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: spacing.md,
    paddingHorizontal: spacing.sm,
})

const $passwordInput: ThemedStyle<ViewStyle> = () => ({
    flex: 1,
    paddingVertical: 10,
})

const $loginButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
    backgroundColor: "#007AFF",
    borderRadius: spacing.lg,
    paddingVertical: spacing.sm,
})

const $loginButtonText: ThemedStyle<TextStyle> = () => ({
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
})

const $linkText: ThemedStyle<TextStyle> = () => ({
    textAlign: "center",
    color: "#000",
    fontWeight: "500",
})

const $registerButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
    backgroundColor: "#B3D7FF",
    borderRadius: spacing.lg,
    paddingVertical: spacing.sm,
})

const $registerButtonText: ThemedStyle<TextStyle> = () => ({
    textAlign: "center",
    color: "#007AFF",
    fontWeight: "bold",
})

const $fingerText: ThemedStyle<TextStyle> = () => ({
    textAlign: "center",
    marginTop: 10,
    color: "#333",
})

const $highlight: ThemedStyle<TextStyle> = () => ({
    color: "#007AFF",
    fontWeight: "bold",
})

const $socialContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.md,
    marginTop: spacing.md,
})

const $bottomText: ThemedStyle<TextStyle> = () => ({
    marginTop: 10,
    textAlign: "center",
    color: "#333",
})





