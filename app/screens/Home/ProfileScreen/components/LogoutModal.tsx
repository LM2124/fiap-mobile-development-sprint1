import {
  Modal,
  StyleProp,
  View,
  ViewStyle,
  type GestureResponderEvent,
  type ModalProps,
} from "react-native"

import { Button } from "@/components/Button"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import type { ThemedStyle } from "@/theme/types"

export interface LogoutModalProps extends ModalProps {
  signOutAction: (event: GestureResponderEvent) => void
  cancelAction: (event: GestureResponderEvent) => void
  style?: StyleProp<ViewStyle>
  wrapperStyle?: StyleProp<ViewStyle>
}

/**
 * Modal de Logout
 */
export const LogoutModal = (props: LogoutModalProps) => {
  const { signOutAction, cancelAction, style, wrapperStyle } = props

  const { themed } = useAppTheme()

  // `Modal` doesn't seem to do anything with `style` so we'll have to use our own `View`
  const $wrapperStyle = [$container, wrapperStyle]
  const $modalStyle = [themed($modal), style]
  const $buttonText = themed([$styles.$buttonText, { fontWeight: "normal" }])

  return (
    <Modal animationType="fade" transparent={true} onRequestClose={cancelAction} {...props}>
      <View style={$wrapperStyle}>
        <View style={$modalStyle}>
          <Text preset="heading" size="lg" text="Deslogar Da Conta" />
          <Text text="Tem Certeza De Que Deseja Sair?" />
          <View style={themed($buttonsContainer)}>
            <Button
              style={themed($styles.$buttonPrimary)}
              textStyle={$buttonText}
              text="Deslogar"
              onPress={signOutAction}
            />
            <Button
              style={themed([$styles.$buttonPrimary, $styles.$buttonDisabled])}
              textStyle={$buttonText}
              text="Cancelar"
              onPress={cancelAction}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const $container: ViewStyle = {
  ...$styles.toggleInner,
  backgroundColor: "#000A",
}

const $modal: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  margin: "auto",
  backgroundColor: colors.background,
  borderRadius: spacing.md,
  justifyContent: "center",
  alignItems: "center",
  padding: spacing.xl,
  borderWidth: 1,
  borderColor: colors.separator,
  gap: spacing.lg,
})

const $buttonsContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "80%",
  gap: spacing.sm,
})
