import { type CompositeScreenProps, type NavigatorScreenParams } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"

import { useAuth } from "@/contexts/AuthContext"
import { QuestionnaireScreen } from "@/screens/Home/QuestionnaireScreen"

import type { AppStackParamList } from "./AppNavigator"
import { HomeTabs, type HomeTabParamList } from "./HomeTabsNavigator"

export type HomeStackParamList = {
  HomeTabs: NavigatorScreenParams<HomeTabParamList>
  Questionnaire: undefined
}

export type HomeStackScreenProps<T extends keyof HomeStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, T>,
  NativeStackScreenProps<AppStackParamList>
>

const Stack = createNativeStackNavigator<HomeStackParamList>()

export interface HomeNavigationProps extends NativeStackScreenProps<AppStackParamList, "HomeNav"> {}

export const HomeNavigator = (props: HomeNavigationProps) => {
  const { user } = useAuth()
  const shouldQuestionnaireRedirect = user && !user.questionnaireAnswers

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={shouldQuestionnaireRedirect ? "Questionnaire" : "HomeTabs"}
      {...props}
    >
      <Stack.Screen name="HomeTabs" component={HomeTabs} />
      <Stack.Screen name="Questionnaire" component={QuestionnaireScreen} />
    </Stack.Navigator>
  )
}
