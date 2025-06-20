/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import { ComponentProps } from "react"
import type { User } from "types/User"

import { useAuth } from "@/contexts/AuthContext"
import * as Screens from "@/screens"
import { useAppTheme, useThemeProvider } from "@/utils/useAppTheme"

import Config from "../config"
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

const AppStack = observer(function AppStack() {
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
    >
      {!isAuthenticated ? (
        <>
          {/* Flow não autenticado */}
          <Stack.Screen name="Welcome" component={Screens.WelcomeScreen} />
          <Stack.Screen name="SignUp" component={Screens.SignUpScreen} />
          <Stack.Screen name="SignIn" component={Screens.SignInScreen} />
          <Stack.Screen name="ForgetPassword" component={Screens.ForgetPasswordScreen} />
          <Stack.Screen name="SecurityCode" component={Screens.SecurityCodeScreen} />
        </>
      ) : (
        <>
          {/* Flow autenticado */}
          <Stack.Screen name="Home" component={Screens.HomeScreen} />
          <Stack.Screen name="Questionnaire" component={Screens.QuestionnaireScreen} />
        </>
      )}

      {/* Flow independente de autenticação */}
      {/* ResetPassword poderá ser acessado a partir do flow de recuperação de conta,
      ou pela redefinição de senha nas configurações de usuário */}
      <Stack.Screen name="ResetPassword" component={Screens.ResetPasswordScreen} />
      {/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
    </Stack.Navigator>
  )
})

export interface NavigationProps
  extends Partial<ComponentProps<typeof NavigationContainer<AppStackParamList>>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const { themeScheme, navigationTheme, setThemeContextOverride, ThemeProvider } =
    useThemeProvider("light") // FIXME: Fazer um tema escuro

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <ThemeProvider value={{ themeScheme, setThemeContextOverride }}>
      <NavigationContainer ref={navigationRef} theme={navigationTheme} {...props}>
        <Screens.ErrorBoundary catchErrors={Config.catchErrors}>
          <AppStack />
        </Screens.ErrorBoundary>
      </NavigationContainer>
    </ThemeProvider>
  )
})
