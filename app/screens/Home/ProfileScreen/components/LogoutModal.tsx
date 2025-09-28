import { View, ViewStyle, type GestureResponderEvent, type TextStyle } from "react-native"

import { Button } from "@/components/Button"
import { StandardModal, type StandardModalProps } from "@/components/StandardModal"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import type { ThemedStyle } from "@/theme/types"

export interface LogoutModalProps extends Omit<StandardModalProps, "onRequestClose"> {
  signOutAction: (event: GestureResponderEvent) => void
  cancelAction: (event: GestureResponderEvent) => void
}

/**
 * Modal de Logout da ProfileScreen
 */
export const LogoutModal = (props: LogoutModalProps) => {
  const { signOutAction, cancelAction, ...rest } = props

  const { themed } = useAppTheme()

  const buttonText = themed([$styles.$buttonText, $buttonText])

  return (
    <StandardModal onRequestClose={cancelAction} {...rest}>
      <Text preset="heading" size="lg" text="Deslogar Da Conta" />
      <Text text="Tem Certeza De Que Deseja Sair?" />
      <View style={themed($buttonsContainer)}>
        <Button
          style={themed($styles.$buttonPrimary)}
          textStyle={buttonText}
          text="Deslogar"
          onPress={signOutAction}
        />
        <Button
          style={themed([$styles.$buttonPrimary, $styles.$buttonDisabled])}
          textStyle={buttonText}
          text="Cancelar"
          onPress={cancelAction}
        />
      </View>
    </StandardModal>
  )
}

const $buttonsContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "80%",
  gap: spacing.sm,
})

const $buttonText: TextStyle = { fontWeight: "normal", flexGrow: 1 }
