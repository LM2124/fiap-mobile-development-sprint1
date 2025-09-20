import { FC } from "react"
import { ViewStyle } from "react-native"

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import type { HomeTabScreenProps } from "@/navigators/HomeNavigator"
// import { useNavigation } from "@react-navigation/native"

interface CategoriesScreenProps extends HomeTabScreenProps<"Categories"> {}

export const CategoriesScreen: FC<CategoriesScreenProps> = () => {
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">
      <Text text="categories" />
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}
