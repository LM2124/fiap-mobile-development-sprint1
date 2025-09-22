import { FC } from "react"
import { View, ViewStyle } from "react-native"

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { dadosNotification } from "@/data/DadosNotification"
import type { HomeTabParamList, HomeTabScreenProps } from "@/navigators/HomeNavigator"
import { useAppTheme } from "@/theme/context"

import {
  $notificationContainer,
  $dashItem,
  $dashText,
  $dashTextNoCenter,
  $blueFont,
} from "./styles"
// import { useNavigation } from "@react-navigation/native"

interface NotificationScreenProps extends HomeTabScreenProps<keyof HomeTabParamList> {}

export const NotificationScreen: FC<NotificationScreenProps> = () => {
  // Pull in navigation via hook
  // const navigation = useNavigation()

  const { themed } = useAppTheme()

  return (
    <Screen style={$root} preset="scroll">
      <View style={themed($notificationContainer)}>
        {dadosNotification.map(([title, about, date], index) => (
          <View key={index} style={themed($dashItem)}>
            <Text
              style={themed([$dashTextNoCenter, $blueFont])}
              weight="semiBold"
              text={`${title}`}
            />
            <Text style={themed($dashText)} size="xs" weight="light" text={about} />
            <Text
              adjustsFontSizeToFit={true}
              numberOfLines={1}
              style={themed($dashText)}
              size="xs"
              weight="medium"
              text={date}
            />
          </View>
        ))}
      </View>
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}
