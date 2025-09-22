import { useEffect, useRef } from "react"
// eslint-disable-next-line no-restricted-imports
import { Animated, StyleProp, Text, TextStyle, View, ViewStyle, StyleSheet } from "react-native"

import { useAppTheme } from "@/theme/context"

// "Estou usando isso pra fazer o componente funcionar, por favor não encoste"
export type ProgressBarStyle = StyleProp<Omit<ViewStyle, "width" | "marginLeft">>
export type ProgressBarContainerStyle = StyleProp<Omit<ViewStyle, "overflow">>
export type ProgressBarTextStyle = StyleProp<ViewStyle>

export interface ProgressBarProps {
  progress: number
  reversed?: boolean
  smoothingDuration?: number
  barColor?: string
  startText?: string
  endText?: string
  style?: ProgressBarStyle
  containerStyle?: ProgressBarContainerStyle
  textStyle?: ProgressBarTextStyle
}

/**
 * Barra de progresso simples com textos nas extremidades.
 * Aceita um valor de progresso entre 0 e 1.
 * Pode ser colocada na direção reversa.
 */
export const ProgressBarWithText = function ProgressBarWithText(props: ProgressBarProps) {
  const { theme } = useAppTheme()
  const {
    progress,
    reversed = false,
    smoothingDuration = 500,
    barColor = theme.colors.tint,
    startText,
    endText,
    style,
    containerStyle,
    textStyle,
  } = props

  const animatedValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: smoothingDuration,
      useNativeDriver: false,
    }).start()
  }, [animatedValue, progress, smoothingDuration])

  const progressInterpolated = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  })

  const $innerBar: ViewStyle = {
    backgroundColor: barColor,
    height: "100%",
    width: reversed ? "100%" : progressInterpolated,
    marginLeft: reversed ? progressInterpolated : 0,
  }

  return (
    <View>
      <View style={[$outerBar, containerStyle]}>
        <Animated.View style={[$innerBar, style]} />
      </View>
      {/* Textos em cima da ProgressBar */}
      {(startText || endText) && (
        <View style={$textOverlay}>
          {startText && <Text style={[$textLeft, textStyle]}>{startText}</Text>}
          {endText && <Text style={[$textRight, textStyle]}>{endText}</Text>}
        </View>
      )}
    </View>
  )
}

const $outerBar: ViewStyle = {
  overflow: "hidden",
}

// Texto da esquerda
const $textLeft: TextStyle = {
  fontSize: 14,
  fontWeight: "600",
  color: "#f0f0f0",
  textAlign: "left",
  paddingLeft: 4,
  paddingBottom: 3,
}

// Texto da direita
const $textRight: TextStyle = {
  fontSize: 14,
  fontWeight: "600",
  color: "#060710",
  textAlign: "right",
  paddingRight: 4,
  paddingBottom: 3,
}

// Sobrepõe o texto na ProgressBar
const $textOverlay: ViewStyle = {
  ...StyleSheet.absoluteFillObject,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: 8,
}
