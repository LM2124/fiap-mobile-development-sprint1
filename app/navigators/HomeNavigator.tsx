import { useEffect } from "react"
import { View, type ViewStyle } from "react-native"
import {
  createBottomTabNavigator,
  type BottomTabNavigationOptions,
  type BottomTabScreenProps,
} from "@react-navigation/bottom-tabs"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Icon, type IconTypes } from "@/components/Icon"
import { useAuth } from "@/contexts/AuthContext"
import { AnalysisScreen } from "@/screens/Home/AnalysisScreen/"
import { HomeHeader } from "@/screens/Home/components/HomeHeader"
import { DashboardScreen } from "@/screens/Home/DashboardScreen"
import { NotificationScreen } from "@/screens/Home/NotificationScreen/"
import { ProfileScreen } from "@/screens/Home/ProfileScreen"
import { TransactionScreen } from "@/screens/Home/TransactionScreen/"
import { useAppTheme } from "@/theme/context"

import type { AppStackScreenProps } from "./AppNavigator"

export type HomeTabParamList = {
  Dashboard: undefined
  Analysis: undefined
  Transaction: undefined
  Categories: undefined
  Profile: undefined
  Notifications: undefined
  Questionnaire: undefined
}

export type HomeTabScreenProps<T extends keyof HomeTabParamList> = BottomTabScreenProps<
  HomeTabParamList,
  T
>

const Tab = createBottomTabNavigator<HomeTabParamList>()

export const HomeTabs = function HomeTabs({ navigation }: AppStackScreenProps<"Home">) {
  const {
    theme: { colors, spacing },
  } = useAppTheme()
  const { user } = useAuth()

  // Redirecionar para o questionário se o usuário não preencheu ainda
  useEffect(() => {
    if (user && !user.questionnaireAnswers) {
      if (__DEV__) console.log("Redirecting to Questionnaire screen")
      navigation.replace("Questionnaire")
    }
  }, [user, navigation])

  /**
   * Receives an Icon name, and returns a component with the `Icon` wrapped in a
   * background `View` that will change color based on if the item focused or not.
   * The Tab Bar component didn't quite leave enough room for customization with
   * their props to do this, so I had to make this hacky solution. It works though.
   */
  const makeTabBarIcon = (icon: IconTypes): BottomTabNavigationOptions["tabBarIcon"] =>
    function tabBarIcon(props) {
      const style = {
        flex: 1,
        aspectRatio: 1,
        borderRadius: spacing.lg,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: props.focused ? colors.tint : colors.transparent,
      } as ViewStyle
      return (
        <View style={style}>
          <Icon icon={icon} {...props} />
        </View>
      )
    }

  return (
    <Tab.Navigator
      safeAreaInsets={useSafeAreaInsets()}
      initialRouteName="Dashboard"
      screenOptions={{
        animation: "shift",
        header: ({ options, route, navigation }) => (
          <HomeHeader title={options.title || route.name} navigation={navigation} />
        ),
        // Tab Bar Container
        tabBarStyle: {
          // Need `position: absolute` to have the page's background
          // render below the tab bar's rounded borders.
          position: "absolute",
          height: "auto",
          borderTopWidth: 0,
          borderTopEndRadius: spacing.xxl,
          borderTopLeftRadius: spacing.xxl,
          paddingTop: spacing.sm,
          paddingBottom: spacing.sm,
          paddingHorizontal: spacing.lg,
          backgroundColor: colors.palette.primary300,
          maxHeight: spacing.xxxl * 1.5,
        },
        // Tab Item Container
        tabBarShowLabel: false,
        tabBarItemStyle: {
          aspectRatio: 1,
        },
        // Tab Icon
        tabBarActiveTintColor: colors.palette.neutral100,
        tabBarInactiveTintColor: colors.palette.neutral100,
        tabBarIconStyle: {
          height: "100%",
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ tabBarIcon: makeTabBarIcon("home"), headerShown: false }}
      />
      <Tab.Screen
        name="Analysis"
        component={AnalysisScreen}
        options={{ tabBarIcon: makeTabBarIcon("analysis"), title: "Análise" }}
      />
      {/* <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{ tabBarIcon: makeTabBarIcon("category"), title: "Categorias" }}
      /> */}
      <Tab.Screen
        name="Transaction"
        component={TransactionScreen}
        options={{ tabBarIcon: makeTabBarIcon("transactions"), title: "Transações" }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{ tabBarIcon: makeTabBarIcon("bell"), title: "Perfil" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarIcon: makeTabBarIcon("profile"), title: "Perfil" }}
      />
    </Tab.Navigator>
  )
}
