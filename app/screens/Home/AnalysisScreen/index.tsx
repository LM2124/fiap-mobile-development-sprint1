import { FC } from "react"
import { View } from "react-native"

import { Button } from "@/components/Button"
import { Icon } from "@/components/Icon"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { useAuth } from "@/contexts/AuthContext"
import type { HomeTabScreenProps } from "@/navigators/HomeTabsNavigator"
import { useAppTheme } from "@/theme/context"

import {
  $root,
  $rootContentContainer,
  $restartFormContainer,
  $restartFormButton,
  $formText,
  $restartFormView,
} from "./styles"
import { $loginStyles } from "../../Login/styles"
import { HomeBottomBarSpacer } from "../_components/HomeBottomBarSpacer"

interface AnalysisScreenProps extends HomeTabScreenProps<"Analysis"> {}

export const AnalysisScreen: FC<AnalysisScreenProps> = ({ navigation }) => {
  const { theme, themed } = useAppTheme()
  const { deleteQuestionnaire } = useAuth()

  const redoQuestionnaire = () => {
    deleteQuestionnaire()
    navigation.navigate("Questionnaire")
  }

  return (
    <Screen
      style={themed($root)}
      contentContainerStyle={themed([$loginStyles.$formContainer, $rootContentContainer])}
      preset="scroll"
    >
      <View style={themed([$restartFormContainer])}>
        <Button onPress={redoQuestionnaire} style={themed($restartFormButton)}>
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
