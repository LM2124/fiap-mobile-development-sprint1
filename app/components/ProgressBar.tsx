import { useEffect, useRef } from "react"
import { Animated, StyleProp, View, ViewStyle } from "react-native"

import { useAppTheme } from "@/utils/useAppTheme"

export interface ProgressBarProps {
  progress: number
  smoothingDuration?: number
  barColor?: string
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const ProgressBar = function ProgressBar(props: ProgressBarProps) {
  const { theme } = useAppTheme()
  const { progress, smoothingDuration = 500, barColor = theme.colors.tint, style } = props

  const animatedValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: smoothingDuration,
      useNativeDriver: false,
    }).start()
  }, [animatedValue, progress, smoothingDuration])

  const widthInterpolated = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  })

  const $innerBar: ViewStyle = {
    backgroundColor: barColor,
    height: "100%",
    width: widthInterpolated,
  }

  return (
    <View style={[$outerBar, style]}>
      <Animated.View style={$innerBar} />
    </View>
  )
}

const $outerBar: ViewStyle = {
  overflow: "hidden",
}
