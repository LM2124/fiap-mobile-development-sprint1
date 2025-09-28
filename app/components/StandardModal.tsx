import { Modal, StyleProp, View, ViewStyle, type ModalProps } from "react-native"

import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import type { ThemedStyle } from "@/theme/types"

export interface StandardModalProps extends ModalProps {
  style?: StyleProp<ViewStyle>
  wrapperStyle?: StyleProp<ViewStyle>
}

/**
 * Modal padrão com estilização da aplicação.
 */
export const StandardModal = (props: StandardModalProps) => {
  const { children, style, wrapperStyle, ...rest } = props
  const { themed } = useAppTheme()

  // RN's Modal doesn't seem to do anything with the `style` prop,
  // so we'll have to use our own View to render a background
  // and center our actual Modal View
  const $wrapperStyle = [$wrapper, wrapperStyle]
  const $modalStyle = [themed($modal), style]

  return (
    <Modal animationType="fade" transparent={true} {...rest}>
      <View style={$wrapperStyle}>
        <View style={$modalStyle}>{children}</View>
      </View>
    </Modal>
  )
}

const $wrapper: ViewStyle = {
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
