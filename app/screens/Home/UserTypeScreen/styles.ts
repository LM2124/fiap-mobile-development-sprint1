import type { ImageStyle, TextStyle, ViewStyle } from "react-native"

import type { ThemedStyle } from "@/theme/types"

export const $root: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.tint,
  marginBottom: -1,
})

export const $rootContentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  minHeight: "100%",
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.xl,
})

export const $recomendationContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  width: "100%",
  maxWidth: 600,
  alignSelf: "center",
  gap: spacing.md,
})

export const $infoContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  width: "100%",
  padding: spacing.lg,
  backgroundColor: colors.palette.neutral100,
  borderRadius: 16,
  borderWidth: 1,
  borderColor: colors.palette.neutral200,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 8,
  elevation: 3,
  gap: spacing.md,
})

export const $infoLineContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.sm,
})

export const $iconContentContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  height: 40,
  width: 40,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: colors.palette.primary100,
  borderRadius: 12,
  shadowColor: colors.palette.primary400,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.15,
  shadowRadius: 4,
  elevation: 2,
})

export const $recomendationButton: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  width: "100%",
  padding: spacing.lg,
  backgroundColor: colors.palette.primary500,
  borderRadius: 16,
  shadowColor: colors.palette.primary500,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 5,
  marginTop: spacing.md,
})

export const $buttonText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral100,
  fontSize: 18,
  fontWeight: "600",
  textAlign: "center",
})

export const $img: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  width: 120,
  height: 120,
  alignSelf: "center",
  marginBottom: spacing.md,
})

// Estilos modernizados para a tela de análise
export const $headerContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "center",
  marginBottom: spacing.xl,
  gap: spacing.sm,
})

export const $headerText: ThemedStyle<TextStyle> = ({ colors }) => ({
  textAlign: "center",
  color: colors.text,
  fontSize: 28,
  letterSpacing: -0.5,
})

export const $cardContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  width: "100%",
  padding: spacing.lg,
  backgroundColor: colors.palette.neutral100,
  borderRadius: 16,
  borderWidth: 1,
  borderColor: colors.palette.neutral200,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 8,
  elevation: 3,
  marginBottom: spacing.md,
})

export const $sectionContainer: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  width: "100%",
  padding: spacing.lg,
  backgroundColor: colors.palette.neutral100,
  borderRadius: 16,
  borderLeftWidth: 4,
  borderLeftColor: colors.palette.primary500,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.06,
  shadowRadius: 6,
  elevation: 2,
})

export const $sectionTitle: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  marginBottom: spacing.sm,
  color: colors.palette.primary600,
  fontSize: 16,
  fontWeight: "700",
})

export const $sectionText: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  lineHeight: 22,
  color: colors.palette.neutral700,
  fontSize: 14,
})

export const $alocacaoContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  width: "100%",
  padding: spacing.lg,
  backgroundColor: colors.palette.neutral100,
  borderRadius: 16,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 8,
  elevation: 3,
})

export const $alocacaoRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  justifyContent: "space-evenly",
  gap: spacing.md,
  marginTop: spacing.md,
  marginBottom: spacing.sm,
})

export const $alocacaoItem: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  alignItems: "center",
  flex: 1,
  padding: spacing.md,
  backgroundColor: colors.palette.neutral100,
  borderRadius: 12,
  borderWidth: 2,
  borderColor: colors.palette.neutral200,
  gap: spacing.xs,
})

export const $alocacaoObservacao: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  marginTop: spacing.sm,
  fontStyle: "italic",
  textAlign: "center",
  color: colors.palette.neutral600,
  fontSize: 13,
  lineHeight: 18,
})

export const $recomendacoesContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  width: "100%",
  padding: spacing.lg,
  backgroundColor: colors.palette.neutral100,
  borderRadius: 16,
  borderWidth: 1,
  borderColor: colors.palette.secondary200,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 8,
  elevation: 3,
  gap: spacing.sm,
})

export const $recomendacaoItem: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "row",
  alignItems: "center",
  padding: spacing.sm,
  backgroundColor: colors.palette.secondary100,
  borderRadius: 8,
  gap: spacing.sm,
})

export const $observacoesContainer: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  width: "100%",
  padding: spacing.lg,
  backgroundColor: colors.palette.accent100,
  borderRadius: 16,
  borderWidth: 1,
  borderColor: colors.palette.accent200,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 4,
  elevation: 2,
})

export const $observacoesTitle: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  marginBottom: spacing.sm,
  color: colors.palette.neutral800,
  fontSize: 15,
  fontWeight: "600",
})

export const $observacoesText: ThemedStyle<TextStyle> = ({ colors }) => ({
  lineHeight: 20,
  color: colors.palette.neutral700,
  fontSize: 13,
})

export const $fonteText: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  marginTop: spacing.lg,
  textAlign: "center",
  color: colors.palette.neutral500,
  fontSize: 11,
  fontStyle: "italic",
})

export const $badgeContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.xs,
  backgroundColor: colors.palette.primary100,
  borderRadius: 20,
  alignSelf: "flex-start",
})

export const $badgeText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.primary600,
  fontSize: 12,
  fontWeight: "600",
})
