import { observer } from "mobx-react-lite"
import { FC } from "react"
import { ViewStyle } from "react-native"

import { Screen, Text } from "@/components"
import { AppStackScreenProps } from "@/navigators"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "@/models"

interface ResetPasswordScreenProps extends AppStackScreenProps<"ResetPassword"> {}

export const ResetPasswordScreen: FC<ResetPasswordScreenProps> = observer(
  function ResetPasswordScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <Screen style={$root} preset="scroll">
        <Text text="resetPassword" />
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}
