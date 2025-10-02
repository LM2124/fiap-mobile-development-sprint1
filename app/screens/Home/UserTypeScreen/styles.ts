import type { ImageStyle, TextStyle, ViewStyle } from "react-native"

import type { ThemedStyle } from "@/theme/types"

export const $root: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
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
export const $recomendationContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  justifyContent: "space-evenly",
  alignItems: "center",
})
export const $infoContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  width: "80%",
  height: "20%",
  padding: spacing.sm,
  backgroundColor: colors.palette.secondary100,
  borderRadius: spacing.sm,
})
export const $infoLineContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
})
export const $iconContentContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  height: 34,
  width: 34,
  justifyContent: "center",
  alignItems: "center",
  color: colors.palette.primary300,
  backgroundColor: colors.palette.neutral300,
  marginRight: spacing.md,
  paddingHorizontal: spacing.xxs,
  borderRadius: spacing.xxl,
})
export const $recomendationButton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: "80%",
  padding: 20,
  backgroundColor: colors.palette.primary500,
  borderRadius: 10,
})
export const $buttonText: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  alignItems: "center",
  gap: spacing.sm,
  color: colors.palette.neutral100,
})
export const $img: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  aspectRatio: 750 / 456,
  width: "100%",
  height: "auto",
  marginBottom: spacing.xs,
  borderRadius: spacing.lg,
})
