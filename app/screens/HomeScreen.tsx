import { observer } from "mobx-react-lite"
import { FC } from "react"
import { ViewStyle } from "react-native"

import { Screen, Text } from "@/components"
import { AppStackScreenProps } from "@/navigators"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "@/models"

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">
      <Text text="home 👍" />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
