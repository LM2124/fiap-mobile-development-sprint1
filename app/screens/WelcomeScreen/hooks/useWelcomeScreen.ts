import { NativeStackNavigationProp } from "@react-navigation/native-stack"

import { AppStackParamList } from "@/navigators/AppNavigator"

export function useWelcomeScreen(
  navigation: NativeStackNavigationProp<AppStackParamList, "Welcome">,
) {
  const signIn = () => {
    navigation.navigate("SignIn")
  }

  const signUp = () => {
    navigation.navigate("SignUp")
  }

  return { signIn, signUp }
}
