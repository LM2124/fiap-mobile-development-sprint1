import type { TextStyle, ViewStyle } from "react-native"

import type { ThemedStyle } from "@/theme/types"

export const $root: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.tint,
  // Com a screen em preset "scroll", alguma coisa fora do meu controle
  // adiciona uma div aleatória no final dela com paddingBottom de 1px.
  // Não tenho a menor ideia por quê, mas aqui estou compensando.
  marginBottom: -1,
})
export const $rootContentContainer: ThemedStyle<ViewStyle> = () => ({
  minHeight: "100%",
  alignSelf: "center",
})
export const $notificationContainer: ThemedStyle<ViewStyle> = () => ({
  paddingVertical: 20,
  paddingHorizontal: 30,
})
export const $iconContentContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  height: 38,
  backgroundColor: colors.palette.primary300,
  marginRight: spacing.sm,
  paddingTop: spacing.xxs,
  paddingHorizontal: spacing.xxs,
  borderRadius: spacing.sm,
})
export const $addTopSpacing: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.lg,
})
export const $dashItem: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  justifyContent: "space-between",
  marginBottom: spacing.xs,
  paddingVertical: spacing.xs,
  borderBottomWidth: 2,
  borderColor: colors.palette.primary300,
})
export const $dashTitleContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "50%",
  flex: 1,
  flexDirection: "row",
  alignItems: "flex-start",
  gap: spacing.sm,
})
export const $iconDescriptionContainer: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  alignItems: "center",
})
export const $textSpacingContainer: ThemedStyle<ViewStyle> = () => ({
  height: 55,
  justifyContent: "space-between",
})
export const $dateContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xs,
  flexDirection: "row",
  justifyContent: "flex-end",
})
export const $dashText: ThemedStyle<TextStyle> = ({ spacing }) => ({
  overflow: "visible",
  width: "25%",
  textAlign: "center",
  textAlignVertical: "center",
  paddingHorizontal: spacing.xxs,
})
export const $blueFont: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.primary500,
})
