import { FC } from "react"
// eslint-disable-next-line import/order
import { View, ViewStyle } from "react-native"

// import { useNavigation } from "@react-navigation/native"

import { useNavigation } from "@react-navigation/native"

import { Button } from "@/components/Button"
import { Icon } from "@/components/Icon"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { useAuth } from "@/contexts/AuthContext"
import type { HomeTabScreenProps } from "@/navigators/HomeNavigator"
import { useAppTheme } from "@/theme/context"

import { $restartFormContainer, $restartFormButton, $formText, $restartFormView } from "./styles"
import { HomeBottomBarSpacer } from "../components/HomeBottomBarSpacer"

interface AnalysisScreenProps extends HomeTabScreenProps<"Analysis"> {}

export const AnalysisScreen: FC<AnalysisScreenProps> = ({ navigation }) => {
  const { theme, themed } = useAppTheme()
  const { deleteQuestionnaire } = useAuth()

  return (
    <Screen contentContainerStyle={$root} style={$root} preset="scroll">
      <View style={themed([$restartFormContainer])}>
        <Button onPress={() => deleteQuestionnaire()} style={themed($restartFormButton)}>
          <View style={themed($restartFormView)}>
            <Icon
              icon="analysis"
              color={theme.colors.palette.neutral100}
              containerStyle={themed($formText)}
            />
            <Text style={themed($formText)}>Refazer Questionário</Text>
          </View>
        </Button>
      </View>
      <HomeBottomBarSpacer></HomeBottomBarSpacer>
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}
