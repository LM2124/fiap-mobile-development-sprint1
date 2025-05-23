import { TextStyle, ViewStyle } from "react-native"
import { ThemedStyle } from "./index"

/* Use this file to define styles that are used in multiple places in your app. */

const $title: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  fontSize: spacing.xl,
  lineHeight: spacing.xl,
  fontWeight: "bold",
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
  // FIXME: não gostei dessa cor
  backgroundColor: theme.colors.palette.primary300
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
  $buttonPrimary: $button,
  $buttonSecondary: $buttonAlt,
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
