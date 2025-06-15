import { Alert, Platform } from "react-native"

/*
 * Um pequeno polyfill para fazer o alert do react-native
 * funcionar pelo menos um pouco na web (ambiente de teste) também.
 */
export function alert(...params: Parameters<typeof Alert.alert>) {
  const [, message] = params
  if (Platform.OS === "web") {
    return window.alert(message)
  } else {
    Alert.alert(...params)
  }
}
