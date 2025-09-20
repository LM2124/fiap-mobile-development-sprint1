import { TextStyle, ViewStyle } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { Header, type HeaderProps } from "@/components/Header"
import { PressableIcon } from "@/components/Icon"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"
import { alert } from "@/utils/alert"

import { $iconContainer } from "../DashboardScreen/styles"

export interface HomeHeaderProps extends HeaderProps {}

/**
 * Header for the Home Navigation component. Wrapper on Ignite's Header component.
 */
export const HomeHeader = (props: HomeHeaderProps) => {
  const { containerStyle: containerStyleOverride, ...rest } = props
  const {
    theme: { colors },
    themed,
  } = useAppTheme()
  const navigation = useNavigation()

  return (
    <Header
      titleStyle={themed($titleText)}
      titleMode="center"
      containerStyle={[themed($containerStyle), containerStyleOverride]}
      RightActionComponent={
        <PressableIcon
          icon="bell"
          containerStyle={themed($iconContainer)}
          color={colors.palette.neutral100}
          onPress={() => alert("WIP", "Não implementado :(")}
        />
      }
      LeftActionComponent={
        <PressableIcon
          icon="back"
          containerStyle={themed($iconContainer)}
          color={colors.palette.neutral100}
          onPress={() => navigation.goBack()}
        />
      }
      {...rest}
    />
  )
}

const $containerStyle: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.tint,
  paddingBottom: spacing.sm,
  paddingTop: spacing.sm,
  paddingInline: spacing.md,
})

const $titleText: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  fontFamily: typography.primary.semiBold,
  fontSize: 24,
  lineHeight: 34,
  color: colors.background,
})
