import { type CompositeScreenProps } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"

import type { User } from "types/User"

import { ForgetPasswordScreen } from "@/screens/Login/ForgetPasswordScreen"
import { ResetPasswordScreen } from "@/screens/Login/ResetPasswordScreen"
import { SecurityCodeScreen } from "@/screens/Login/SecurityCodeScreen"
import { SignInScreen } from "@/screens/Login/SignInScreen"
import { SignUpScreen } from "@/screens/Login/SignUpScreen"
import { WelcomeScreen } from "@/screens/WelcomeScreen"

import type { AppStackParamList } from "./AppNavigator"

export type LoginStackParamList = {
  Welcome: undefined
  SignUp: undefined
  SignIn: undefined
  ForgetPassword: undefined
  SecurityCode: { userEmail: User["email"] }
  ResetPassword: { userEmail: User["email"] }
}

export type LoginStackScreenProps<T extends keyof LoginStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<LoginStackParamList, T>,
  NativeStackScreenProps<AppStackParamList>
>

const Stack = createNativeStackNavigator<LoginStackParamList>()

export interface LoginNavigationProps
  extends NativeStackScreenProps<AppStackParamList, "LoginNav"> {}

export const LoginNavigator = (props: LoginNavigationProps) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Welcome"
      {...props}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
      <Stack.Screen name="SecurityCode" component={SecurityCodeScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  )
}
