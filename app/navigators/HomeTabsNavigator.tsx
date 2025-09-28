import { View, type ViewStyle } from "react-native"
import {
  createBottomTabNavigator,
  type BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs"
import type { CompositeScreenProps } from "@react-navigation/native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Icon, type IconTypes } from "@/components/Icon"
import { HomeHeader } from "@/screens/Home/_components/HomeHeader"
import { AnalysisScreen } from "@/screens/Home/AnalysisScreen/"
import { DashboardScreen } from "@/screens/Home/DashboardScreen"
import { NotificationScreen } from "@/screens/Home/NotificationScreen/"
import { ProfileScreen } from "@/screens/Home/ProfileScreen"
import { TransactionScreen } from "@/screens/Home/TransactionScreen/"
import { useAppTheme } from "@/theme/context"

import type { HomeStackParamList } from "./HomeNavigator"

export type HomeTabParamList = {
  Dashboard: undefined
  Analysis: undefined
  Transaction: undefined
  Categories: undefined
  Profile: undefined
  Notifications: undefined
}

export type HomeTabScreenProps<T extends keyof HomeTabParamList> = CompositeScreenProps<
  NativeStackScreenProps<HomeTabParamList, T>,
  NativeStackScreenProps<HomeStackParamList>
>

const Tab = createBottomTabNavigator<HomeTabParamList>()

export interface HomeTabsNavigationProps
  extends NativeStackScreenProps<HomeStackParamList, "HomeTabs"> {}

export const HomeTabs = (props: HomeTabsNavigationProps) => {
  const { theme } = useAppTheme()
  const { colors, spacing } = theme

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
          // Screens should use a `HomeBottomBarSpacer` to compensate.
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
      {...props}
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
        options={{ tabBarIcon: makeTabBarIcon("bell"), title: "Notificações" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarIcon: makeTabBarIcon("profile"), title: "Perfil" }}
      />
    </Tab.Navigator>
  )
}
