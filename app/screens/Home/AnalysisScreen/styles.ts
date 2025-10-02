import type { TextStyle, ViewStyle } from "react-native"

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
export const $restartFormContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
})
export const $restartFormButton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: "40%",
  padding: 20,
  backgroundColor: colors.palette.primary400,
  borderRadius: 20,
})
export const $restartFormView: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "center",
  gap: spacing.sm,
})
export const $formText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral100,
})
