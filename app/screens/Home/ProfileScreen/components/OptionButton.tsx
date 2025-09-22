import type { ComponentProps } from "react"
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  type GestureResponderEvent,
} from "react-native"

import { Icon, type IconTypes } from "@/components/Icon"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"
import { alert } from "@/utils/alert"

export interface OptionButtonProps {
  icon: IconTypes
  title: string
  action?: (event: GestureResponderEvent) => void
  style?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
  iconStyle?: StyleProp<ViewStyle>
  iconProps?: Omit<ComponentProps<typeof Icon>, "icon">
}

/**
 * Receives an icon name and a title, and renders an Icon and a Title.
 */
export const OptionButton = (props: OptionButtonProps) => {
  const {
    icon,
    title,
    action = () => alert("WIP", "Not yet implemented"),
    style,
    titleStyle,
    iconStyle,
    iconProps,
  } = props
  const { theme, themed } = useAppTheme()
  const $containerStyles = [themed($container), style]
  const $iconStyles = [themed($iconContainer), iconStyle]

  return (
    <TouchableOpacity style={$containerStyles} onPress={action}>
      <Icon
        icon={icon}
        size={theme.spacing.xl}
        containerStyle={$iconStyles}
        color={theme.colors.background}
        {...iconProps}
      />
      <Text preset="subheading" style={[themed($text), titleStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.sm,
})

const $iconContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  padding: spacing.sm,
  backgroundColor: colors.tint,
  aspectRatio: 1,
  borderRadius: spacing.lg,
  justifyContent: "center",
  alignItems: "center",
})

const $text: ThemedStyle<TextStyle> = () => ({
  height: "100%",
  textAlignVertical: "center",
})
