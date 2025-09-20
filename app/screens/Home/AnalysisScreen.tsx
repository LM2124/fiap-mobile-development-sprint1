import { FC } from "react"
import { ViewStyle } from "react-native"

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import type { HomeTabScreenProps } from "@/navigators/HomeNavigator"
// import { useNavigation } from "@react-navigation/native"

interface AnalysisScreenProps extends HomeTabScreenProps<"Analysis"> {}

export const AnalysisScreen: FC<AnalysisScreenProps> = () => {
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">
      <Text text="analysis" />
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}
