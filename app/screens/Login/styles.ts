import { type TextStyle, useWindowDimensions, ViewStyle } from "react-native"

import { ThemedStyle } from "@/theme"

const $inputWrapper: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  borderRadius: spacing.md,
  paddingHorizontal: spacing.xs,
  backgroundColor: colors.palette.neutral100,
  alignItems: "center", // Centraliza os Accessories verticalmente
})

const $input: ThemedStyle<TextStyle> = () => ({
  textAlignVertical: "bottom",
  // Estilo alternativo; Ainda considerando.
  // fontFamily: "System",
  // textAlignVertical: "center",
})

const $aspectRatioSmartSizing: () => ViewStyle = () => {
  const { width, height } = useWindowDimensions()
  return {
    /**
     * Na falta de CSS breakpoints no react-native, decidi fazer isso.
     * Com o dispositivo na vertical, ele toma todo o espaço horizontal.
     * Com o dispositivo na horizontal, ele toma 75% do espaço horizontal.
     * O Expo *tem* uma feature de detectar a orientação da tela, mas
     * versões mais modernas do Android permitem redimensionar uma tela
     * arbitrariamente, e isso cobre esse caso. É overkill? Sim! Importa? Não!
     */
    width: Math.max(width * 0.75, Math.min(width, height)),
  }
}

const $formContainer: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  ...$aspectRatioSmartSizing(),
  backgroundColor: colors.background,
  borderTopLeftRadius: spacing.xxl,
  borderTopRightRadius: spacing.xxl,
})

const $formContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.lg,
  paddingHorizontal: spacing.xl,
  gap: spacing.md,
  alignItems: "stretch",
})

export const $loginStyles = {
  $inputWrapper: $inputWrapper,
  $input: $input,
  $aspectRatioSmartSizing: $aspectRatioSmartSizing,
  $formContainer: $formContainer,
  $formContent: $formContent,
}
