import { ComponentType, useMemo, useState } from "react"

import { useAppTheme } from "@/utils/useAppTheme"

import { PressableIcon } from "./Icon"
import { TextField, TextFieldAccessoryProps, TextFieldProps } from "./TextField"

// Remover os props `RightAccessory` e `secureTextEntry` pois já estamos usando eles nesse componente
export interface PasswordInputProps
  extends Omit<TextFieldProps, "RightAccessory" | "secureTextEntry"> {}

/**
 * Wrapper em volta do `TextField`, adicionando um botão para mostrar/ocultar o texto dentro do componente.
 */
export const PasswordInput = (props: PasswordInputProps) => {
  const { style, ...rest } = props
  const { theme } = useAppTheme()

  const [isHidden, setHidden] = useState(true)

  // https://ignitecookbook.com/docs/recipes/Authentication/#show-password
  const PasswordAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <PressableIcon
            icon={isHidden ? "hidden" : "view"}
            color={props.editable ? theme.colors.text : theme.colors.textDim}
            containerStyle={props.style}
            size={20}
            onPress={() => setHidden(!isHidden)}
            disabled={!props.editable}
          />
        )
      },
    [isHidden, theme.colors.text, theme.colors.textDim],
  )

  return (
    <TextField
      secureTextEntry={isHidden}
      RightAccessory={PasswordAccessory}
      // 2 props de conveniência
      autoCapitalize="none"
      autoCorrect={false}
      style={style}
      // propagar o resto dos props pro TextField
      {...rest}
    />
  )
}
