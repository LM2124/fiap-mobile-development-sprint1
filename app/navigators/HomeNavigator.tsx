import { View, type ViewStyle } from "react-native"
import {
  createBottomTabNavigator,
  type BottomTabNavigationOptions,
  type BottomTabScreenProps,
} from "@react-navigation/bottom-tabs"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Icon, type IconTypes } from "@/components/Icon"
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
        headerShown: false,
        // Tab Bar Container
        tabBarStyle: {
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
        component={HomeScreen}
        options={{ tabBarIcon: makeTabBarIcon("home") }}
      />
      <Tab.Screen
        name="Analysis"
        component={AnalysisScreen}
        options={{ tabBarIcon: makeTabBarIcon("analysis") }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{ tabBarIcon: makeTabBarIcon("category") }}
      />
      <Tab.Screen
        name="Transaction"
        component={TransactionScreen}
        options={{ tabBarIcon: makeTabBarIcon("transactions") }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ tabBarIcon: makeTabBarIcon("settings") }}
      />
    </Tab.Navigator>
  )
}
