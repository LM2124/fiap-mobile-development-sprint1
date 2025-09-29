import { FC } from "react"
import { View } from "react-native"

import { Icon } from "@/components/Icon"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { dadosNotification, mesesAno } from "@/data/DadosNotification"
import type { HomeTabParamList, HomeTabScreenProps } from "@/navigators/HomeTabsNavigator"
import { useAppTheme } from "@/theme/context"

import {
  $root,
  $rootContentContainer,
  $notificationContainer,
  $iconContentContainer,
  $addTopSpacing,
  $dashItem,
  $blueFont,
  $iconDescriptionContainer,
  $textSpacingContainer,
  $dateContainer,
} from "./styles"
import { $loginStyles } from "../../Login/styles"
import { HomeBottomBarSpacer } from "../_components/HomeBottomBarSpacer"
// import { useNavigation } from "@react-navigation/native"

interface NotificationScreenProps extends HomeTabScreenProps<keyof HomeTabParamList> {}

export const NotificationScreen: FC<NotificationScreenProps> = () => {
  // Pull in navigation via hook
  // const navigation = useNavigation()

  const { themed } = useAppTheme()

  const timeElapsedInDays = (time: Date) => {
    const now = new Date()
    const timeElapsed = Math.floor((Number(now) - Number(time)) / 86400000)

    if (timeElapsed <= 0) {
      return "Hoje"
    }
    if (timeElapsed === 1) {
      return "Ontem"
    }
    if (timeElapsed >= 0 && timeElapsed <= 6) {
      return "Essa semana"
    }
    if (timeElapsed >= 7) {
      return "Semana passada"
    }
    if (timeElapsed >= 14) {
      return "Ha 2 semanas"
    }
    if (timeElapsed >= 21) {
      return "Ha 3 semanas"
    }
    if (timeElapsed >= 28) {
      return "Mês passado"
    }
    if (timeElapsed > 58) {
      return "Esse ano"
    }
    if (timeElapsed > 360) {
      return "Ano passado"
    }
    if (timeElapsed > 720) {
      return "Antigamente"
    }

    return "Não especificado"
  }

  const uniquePeriods = Array.from(
    new Set(dadosNotification.map((notification) => timeElapsedInDays(notification.date))),
  )

  const formatDate = (date: Date) => {
    return (
      String(date.getHours()).padStart(2, "0") +
      ":" +
      String(date.getMinutes()).padStart(2, "0") +
      " - " +
      date.getDate() +
      " - " +
      mesesAno[date.getMonth()]
    )
  }

  return (
    <Screen
      style={themed($root)}
      contentContainerStyle={themed([$loginStyles.$formContainer, $rootContentContainer])}
      preset="scroll"
    >
      <View style={themed($notificationContainer)}>
        {uniquePeriods.map((period, index) => (
          <View key={index} style={themed($addTopSpacing)}>
            <Text size="xxs" weight="normal" text={period} />
            {dadosNotification
              .filter((notification) => period === timeElapsedInDays(notification.date))
              .map((notification, index) => (
                <View key={index} style={themed($dashItem)}>
                  <View style={themed($iconDescriptionContainer)}>
                    <Icon
                      containerStyle={themed($iconContentContainer)}
                      icon={notification.icon}
                      size={30}
                      color="#ffff"
                    />
                    <View style={themed($textSpacingContainer)}>
                      <Text weight="medium" size="sm" text={`${notification.title}`} />
                      <Text weight="medium" size="xxs" text={`${notification.about}`} />
                      <Text
                        weight="semiBold"
                        size="xxs"
                        style={themed($blueFont)}
                        text={`${notification.details}`}
                      />
                    </View>
                  </View>
                  <View style={themed($dateContainer)}>
                    <Text
                      adjustsFontSizeToFit={true}
                      numberOfLines={1}
                      style={themed($blueFont)}
                      size="xs"
                      weight="light"
                      text={formatDate(notification.date)}
                    />
                  </View>
                </View>
              ))}
          </View>
        ))}
      </View>
      <HomeBottomBarSpacer />
    </Screen>
  )
}
