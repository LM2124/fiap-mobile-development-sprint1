import type { TextStyle, ViewStyle } from "react-native"

import type { ThemedStyle } from "@/theme/types"

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
