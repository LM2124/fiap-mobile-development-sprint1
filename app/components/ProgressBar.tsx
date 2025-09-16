import { useEffect, useRef } from "react"
import { Animated, StyleProp, View, ViewStyle } from "react-native"

import { useAppTheme } from "@/theme/context"

// "Estou usando isso pra fazer o componente funcionar, por favor não encoste"
export type ProgressBarStyle = StyleProp<Omit<ViewStyle, "width" | "marginLeft">>
export type ProgressBarContainerStyle = StyleProp<Omit<ViewStyle, "overflow">>

export interface ProgressBarProps {
  progress: number
  reversed?: boolean
  smoothingDuration?: number
  barColor?: string
  style?: ProgressBarStyle
  containerStyle?: ProgressBarContainerStyle
}

/**
 * Barra de progresso simples.
 * Aceita um valor de progresso entre 0 e 1.
 * Pode ser colocada na direção reversa.
 */
export const ProgressBar = function ProgressBar(props: ProgressBarProps) {
  const { theme } = useAppTheme()
  const {
    progress,
    reversed = false,
    smoothingDuration = 500,
    barColor = theme.colors.tint,
    style,
    containerStyle,
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
    <View style={[$outerBar, containerStyle]}>
      <Animated.View style={[$innerBar, style]} />
    </View>
  )
}

const $outerBar: ViewStyle = {
  overflow: "hidden",
}
