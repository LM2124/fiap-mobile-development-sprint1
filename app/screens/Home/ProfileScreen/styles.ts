import type { ImageStyle, TextStyle, ViewStyle } from "react-native"

import type { ThemedStyle } from "@/theme/types"

export const profileImageSize = 120

export const $root: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.tint,
})

export const $rootContentContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  alignSelf: "center",
})

export const $profileDisplay: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingTop: spacing.sm,
  alignItems: "center",
  gap: spacing.lg,
})

export const $profilePictureContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  padding: spacing.md,
  overflow: "hidden",
  borderRadius: 999,
  borderWidth: 1,
  borderColor: colors.tintInactive,
})

export const $profilePicture: ThemedStyle<ImageStyle> = () => ({
  height: profileImageSize,
  width: profileImageSize,
})

export const $userInfo: ThemedStyle<ViewStyle> = () => ({
  alignItems: "center",
})

export const $nameText: TextStyle = {
  fontSize: 20,
  lineHeight: 20,
}
