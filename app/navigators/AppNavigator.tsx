/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { ComponentProps } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"

import type { User } from "types/User"

import Config from "@/config"
import { useAuth } from "@/contexts/AuthContext"
import { ErrorBoundary } from "@/screens/ErrorScreen/ErrorBoundary"
import { ForgetPasswordScreen } from "@/screens/Login/ForgetPasswordScreen"
import { ResetPasswordScreen } from "@/screens/Login/ResetPasswordScreen"
import { SecurityCodeScreen } from "@/screens/Login/SecurityCodeScreen"
import { SignInScreen } from "@/screens/Login/SignInScreen"
import { SignUpScreen } from "@/screens/Login/SignUpScreen"
import { QuestionnaireScreen } from "@/screens/QuestionnaireScreen"
import { WelcomeScreen } from "@/screens/WelcomeScreen"
import { useAppTheme } from "@/theme/context"

import { HomeTabs } from "./HomeNavigator"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Welcome: undefined
  SignUp: undefined
  SignIn: undefined
  ForgetPassword: undefined
  SecurityCode: { userEmail: User["email"] }
  ResetPassword: { userEmail: User["email"] }
  Questionnaire: undefined
  Home: undefined
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = function AppStack() {
  const {
    theme: { colors },
  } = useAppTheme()

  const { isAuthenticated } = useAuth()

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: colors.background,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
      initialRouteName={isAuthenticated ? "Home" : "Welcome"}
    >
      {!isAuthenticated ? (
        <>
          {/* Flow não autenticado */}
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
          <Stack.Screen name="SecurityCode" component={SecurityCodeScreen} />
        </>
      ) : (
        <>
          {/* Flow autenticado */}
          <Stack.Screen name="Home" component={HomeTabs} />
          <Stack.Screen name="Questionnaire" component={QuestionnaireScreen} />
        </>
      )}

      {/* Flow independente de autenticação */}
      {/* ResetPassword poderá ser acessado a partir do flow de recuperação de conta,
      ou pela redefinição de senha nas configurações de usuário */}
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      {/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
    </Stack.Navigator>
  )
}

export interface NavigationProps
  extends Partial<ComponentProps<typeof NavigationContainer<AppStackParamList>>> {}

export const AppNavigator = (props: NavigationProps) => {
  const { navigationTheme } = useAppTheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer ref={navigationRef} theme={navigationTheme} {...props}>
      <ErrorBoundary catchErrors={Config.catchErrors}>
        <AppStack />
      </ErrorBoundary>
    </NavigationContainer>
  )
}
