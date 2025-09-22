import { View } from "react-native"
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"

/**
 * Como a Tab Bar tem `position: absolute`, usamos esse spacer
 * para compensar pela altura dela manualmente, em cada tela.
 * Colocar no final do componente que renderiza o fundo branco;
 * que não necessariamente vai ser a screen.
 *
 * O nível de hack que temos que fazer só pra ter a desgraça
 * dessas bordas arrendondadas na Tab Bar é incrível.
 * FIXME: Tentar achar um jeito melhor. Talvez desistir das bordas redondas.
 */
export const HomeBottomBarSpacer = () => {
  const style = {
    height: useBottomTabBarHeight(),
    // Descomentar para testar.
    // backgroundColor: __DEV__ ? "red" : undefined,
  }
  return <View style={style} />
}
