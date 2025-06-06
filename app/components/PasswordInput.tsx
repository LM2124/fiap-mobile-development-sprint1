import { useAppTheme } from "@/utils/useAppTheme"
import { TextField, TextFieldAccessoryProps, TextFieldProps } from "./TextField"
import { ComponentType, useMemo, useState } from "react"
import { PressableIcon } from "./Icon"
import { ViewStyle } from "react-native"

// Remover os props `RightAccessory` e `secureTextEntry` pois já estamos usando eles nesse componente
export interface PasswordInputProps extends Omit<TextFieldProps, 'RightAccessory' | 'secureTextEntry'> {}

/**
 * Wrapper em volta do `TextField`, adicionando um botão para mostrar/ocultar o texto dentro do componente.
 */
export const PasswordInput = (props: PasswordInputProps) => {
  const { style, ...rest } = props
  const { theme } = useAppTheme();

  const [isHidden, setHidden] = useState(true)

  // https://ignitecookbook.com/docs/recipes/Authentication/#show-password
  const PasswordAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <PressableIcon
            icon={isHidden ? "hidden" : "view"}
            color={theme.colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setHidden(!isHidden)}
          />
        )
      },
    [isHidden],
  )

  return (
    <TextField
      secureTextEntry={isHidden}
      RightAccessory={PasswordAccessory}
      // 2 props de conveniência
      autoCapitalize="none"
      autoCorrect={false}
      // Em telas muito apertadas, a minWidth do input jogava o accessory pra fora do container
      style={[{ minWidth: 100 }, style]}
      // propagar o resto dos props pro TextField
      {...rest}
    />
  )
}
