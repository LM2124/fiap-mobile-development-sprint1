import { TextStyle, ViewStyle } from "react-native"

import type { ThemedStyle } from "@/theme/types"

export const $root: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.tint,
  // Com a screen em preset "scroll", alguma coisa fora do meu controle
  // adiciona uma div aleatória no final dela com paddingBottom de 1px.
  // Não tenho a menor ideia por quê, mas aqui estou compensando.
  marginBottom: -1,
})
export const $notificationContainer: ThemedStyle<ViewStyle> = () => ({
  padding: 20,
})
export const $dashItem: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginVertical: spacing.xs,
  paddingVertical: spacing.xs,
  paddingHorizontal: spacing.md,
  borderWidth: 5,
  borderRadius: 10,
  borderColor: colors.palette.primary300,
})
export const $dashTitleContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "50%",
  flex: 1,
  flexDirection: "row",
  alignItems: "flex-start",
  gap: spacing.sm,
})
export const $dashText: ThemedStyle<TextStyle> = ({ spacing }) => ({
  overflow: "visible",
  width: "25%",
  textAlign: "center",
  textAlignVertical: "center",
  paddingHorizontal: spacing.xxs,
})
export const $dashTextNoCenter: ThemedStyle<TextStyle> = () => ({
  fontSize: 15,
})
export const $blueFont: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.primary500,
})
