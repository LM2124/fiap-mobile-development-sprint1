import type { ImageStyle, TextStyle, ViewStyle } from "react-native"
import type { ThemedStyle } from "@/theme/types"

export const $root: ViewStyle = {
  marginBottom: -1,
}
export const $rootContentContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexGrow: 1,
  backgroundColor: colors.tint,
  paddingTop: spacing.sm,
  alignItems: "center",
})

export const $headerBar: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "100%",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: spacing.sm,
  paddingHorizontal: spacing.md,
})
export const $headerGreeting: ThemedStyle<ViewStyle> = () => ({})
export const $iconContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.primary600,
  padding: spacing.xs,
  borderRadius: spacing.sm * 2,
})
export const $summaryContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "center",
  paddingBottom: spacing.md,
})
export const $dashContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  paddingHorizontal: spacing.md,
  gap: spacing.lg,
})
export const $graph: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  aspectRatio: 750 / 456,
  width: "100%",
  height: "auto",
  marginBottom: spacing.xs,
  borderRadius: spacing.lg,
})
export const $dashItem: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
})
export const $dashSeparator: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 2,
  height: "100%",
  backgroundColor: colors.separator,
})
export const $dashText: ThemedStyle<TextStyle> = () => ({
  width: "33%",
  textAlign: "center",
  textAlignVertical: "center",
})