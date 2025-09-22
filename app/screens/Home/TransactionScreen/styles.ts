import { StyleProp, TextStyle, ViewStyle } from "react-native"

import type { ThemedStyle } from "@/theme/types"

export const $root: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.tint,
  // Com a screen em preset "scroll", alguma coisa fora do meu controle
  // adiciona uma div aleatória no final dela com paddingBottom de 1px.
  // Não tenho a menor ideia por quê, mas aqui estou compensando.
  marginBottom: -1,
})
export const $rootContentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexGrow: 1,
  paddingTop: spacing.sm,
  alignItems: "center",
})
export const $iconContentContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  alignItems: "center",
  backgroundColor: colors.palette.primary300,
  paddingVertical: spacing.xs,
  paddingHorizontal: spacing.md,
  borderRadius: spacing.md,
})
export const $summaryContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  maxWidth: 400,
  alignItems: "center",
  paddingBottom: spacing.md,
})
export const $dashContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  paddingHorizontal: spacing.md,
  gap: spacing.lg,
})
export const $incomeContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "center",
  paddingHorizontal: spacing.sm,
})
export const $infoContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})
export const $saldoContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "80%",
  alignItems: "center",
  padding: spacing.xs,
  backgroundColor: "white",
  borderRadius: spacing.sm,
})
export const $sliderContainer: ThemedStyle<ViewStyle> = () => ({
  width: "85%",
  maxWidth: 400,
  justifyContent: "center",
  paddingTop: 20,
  paddingBottom: 40,
})
export const $dashItem: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginVertical: spacing.xs,
})
export const $dashTitleContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "50%",
  flex: 1,
  flexDirection: "row",
  alignItems: "flex-start",
  gap: spacing.sm,
})
export const $dashSeparator: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  width: 2,
  minHeight: spacing.lg,
  height: "100%",
  backgroundColor: colors.palette.primary200,
})
export const $dashText: ThemedStyle<TextStyle> = ({ spacing }) => ({
  overflow: "visible",
  width: "25%",
  textAlign: "center",
  textAlignVertical: "center",
  paddingHorizontal: spacing.xxs,
})
export const $dashTextNoCenter: ThemedStyle<TextStyle> = () => ({
  width: "100%",
  fontSize: 15,
})
export const $blueFont: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.primary500,
})

// Tá vendo, cria grambiarra mesmo pro negoço funfar, agora lide com isso aqui
export const $progressContainer: StyleProp<Omit<ViewStyle, "overflow">> = {
  height: 30,
  backgroundColor: "#c02b2b",
  borderRadius: 16,
}
export const $progressBar: StyleProp<Omit<ViewStyle, "width" | "marginLeft">> = {
  backgroundColor: "#f0f0f0",
  padding: 16,
  borderRadius: 16,
}
