import { TextStyle, ViewStyle } from "react-native"

import { ThemedStyle } from "./index"

/* Use this file to define styles that are used in multiple places in your app. */

const $title: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  fontSize: spacing.xl,
  lineHeight: spacing.xl,
  fontWeight: "bold",
  color: colors.palette.neutral100,
})

const $negativeText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral100,
})

const $button: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  width: "100%",
  backgroundColor: colors.tint,
  borderRadius: spacing.xl,
  paddingVertical: spacing.sm,
})

const $buttonAlt: ThemedStyle<ViewStyle> = (theme) => ({
  ...$button(theme),
  // O Figma que se dane, essa cor é melhor e não conflita com a tintInactive
  backgroundColor: theme.colors.palette.primary600,
})

const $buttonThin: ThemedStyle<ViewStyle> = (theme) => ({
  minHeight: 0, // deixar o texto ditar - deve ser 20px por linha
  paddingVertical: theme.spacing.xs,
})

const $buttonDisabled: ThemedStyle<ViewStyle> = (theme) => ({
  backgroundColor: theme.colors.tintInactive,
})

const $buttonText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral100,
  textAlign: "center",
  fontWeight: "bold",
})

const $link: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.primary500,
  textDecorationLine: "underline",
})

/*
 * Eu ainda não sei exatamente o que o prefixo "$" é pra significar.
 * Vou usar ele pra indicar estilos que devem receber um Theme.
 */
export const $styles = {
  $title: $title,
  $negativeText: $negativeText,
  $buttonPrimary: $button,
  $buttonSecondary: $buttonAlt,
  $buttonThin: $buttonThin,
  $buttonDisabled: $buttonDisabled,
  $buttonText: $buttonText,
  $link: $link,

  row: { flexDirection: "row" } as ViewStyle,
  flex1: { flex: 1 } as ViewStyle,
  flexWrap: { flexWrap: "wrap" } as ViewStyle,

  toggleInner: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  } as ViewStyle,

  header: {
    // height: 150,
    height: "15%",
    justifyContent: "center",
  } as ViewStyle,
}
