import type { ImageStyle, TextStyle, ViewStyle } from "react-native"

import type { ThemedStyle } from "@/theme/types"

export const $root: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.lg,
})

export const $welcomeLogo: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  height: 150,
  width: "100%",
  aspectRatio: 1,
  marginBottom: spacing.xs,
})

export const $welcomeHeading: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  color: colors.palette.primary500,
  fontWeight: "bold",
  fontSize: spacing.xxxl,
  lineHeight: spacing.xxxl,
  textAlign: "center",
  marginBottom: spacing.sm,
})

export const $containerNarrow: ThemedStyle<ViewStyle> = () => ({
  width: "70%",
})

export const $welcomeText: ThemedStyle<TextStyle> = ({ spacing }) => ({
  textAlign: "center",
  marginBottom: spacing.sm,
})
