import { createBottomTabNavigator, type BottomTabScreenProps } from "@react-navigation/bottom-tabs"

import { Icon } from "@/components/Icon"
import { AnalysisScreen } from "@/screens/Home/AnalysisScreen"
import { CategoriesScreen } from "@/screens/Home/CategoriesScreen"
import { HomeScreen } from "@/screens/Home/DashboardScreen"
import { SettingsScreen } from "@/screens/Home/SettingsScreen"
import { TransactionScreen } from "@/screens/Home/TransactionScreen"
import { useAppTheme } from "@/theme/context"

export type HomeTabParamList = {
  Dashboard: undefined
  Analysis: undefined
  Transaction: undefined
  Categories: undefined
  Settings: undefined
}

export type HomeTabScreenProps<T extends keyof HomeTabParamList> = BottomTabScreenProps<
  HomeTabParamList,
  T
>

const Tab = createBottomTabNavigator<HomeTabParamList>()

export const HomeTabs = function HomeTabs() {
  const {
    theme: { colors, spacing },
  } = useAppTheme()

  return (
    <Tab.Navigator
      screenOptions={{
        animation: "shift",
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.error, height: spacing.xxxl },
        tabBarInactiveBackgroundColor: colors.tintInactive,
        tabBarActiveBackgroundColor: colors.tint,
        tabBarActiveTintColor: colors.palette.neutral900,
        tabBarInactiveTintColor: colors.palette.neutral900,
        tabBarItemStyle: { borderRadius: 999 },
        tabBarShowLabel: false,
      }}
      initialRouteName="Dashboard"
    >
      <Tab.Screen
        name="Dashboard"
        component={HomeScreen}
        options={{ tabBarIcon: () => <Icon icon="home" /> }}
      />
      <Tab.Screen
        name="Analysis"
        component={AnalysisScreen}
        options={{ tabBarIcon: () => <Icon icon="analysis" /> }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{ tabBarIcon: () => <Icon icon="category" /> }}
      />
      <Tab.Screen
        name="Transaction"
        component={TransactionScreen}
        options={{ tabBarIcon: () => <Icon icon="transactions" /> }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ tabBarIcon: () => <Icon icon="settings" /> }}
      />
    </Tab.Navigator>
  )
}
