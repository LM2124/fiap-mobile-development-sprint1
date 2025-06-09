import {
  Platform,
  type StyleProp,
  type TextStyle,
  TouchableOpacity,
  type ViewStyle,
} from "react-native"
import _PhoneInput from "react-native-international-phone-number"
import { PhoneInputProps as _PhoneInputProps } from "react-native-international-phone-number/lib/interfaces/phoneInputProps"

import { type ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"

import { Text, type TextProps } from "./Text"

export type PhoneInputProps = _PhoneInputProps & {
  // Maioria desses props copiados de TextField.
  // Há muitos props faltando em relação ao TextField,
  // mas vamos adicioná-los somente conforme necessário.
  status?: "error" | "disabled"
  label?: TextProps["text"]
  helper?: TextProps["text"]
  containerStyle?: StyleProp<ViewStyle>
  inputTextStyle?: StyleProp<TextStyle>
  inputWrapperStyle?: StyleProp<ViewStyle>
}

/*
 * "Magia" de Typescript para contornar uma inconveniência do PhoneInput:
 * O tipo `PhoneInputProps` é uma interseção de dois types que representam
 * "modos de operação" do componente diferentes; e eles não são exportados pelo pacote.
 * Um modo *deve* ter `ref`, e outro *não pode* ter `ref`,
 * e isso tinha complicado a tipagem desse wrapper.
 */
type WithRef = Extract<PhoneInputProps, { ref: React.Ref<any> }>
type WithoutRef = Exclude<PhoneInputProps, { ref: React.Ref<any> }>

/**
 * Uma cópia descarada do TextField, em volta deste componente:
 * https://github.com/AstrOOnauta/react-native-international-phone-number
 * Dando defaults para nosso caso, e ajustando a estilização para alinhar
 * com a aparência padrão dos nossos TextFields.
 */
export const PhoneInput = (props: PhoneInputProps) => {
  const {
    status,
    label,
    helper,
    containerStyle: containerStyleOverride,
    inputTextStyle: inputTextStyleOverride,
    inputWrapperStyle: inputWrapperStyleOverride,
    ...rest
  } = props
  const {
    theme: { colors, typography },
    themed,
  } = useAppTheme()

  const disabled = status === "disabled"

  const defaultPhoneProps: Partial<PhoneInputProps> = {
    defaultCountry: "BR",
    popularCountries: ["BR"],
    language: "pt",
    placeholder: "## #### ####",
    placeholderTextColor: colors.textDim,
    phoneInputStyles: {
      container: [
        themed($inputContainer),
        status === "error" && { borderColor: colors.error },
        inputWrapperStyleOverride,
      ],
      input: [themed($input), disabled && { color: colors.textDim }, inputTextStyleOverride],

      // O PhoneInput só usa essa fontFamily se ele acha que está na Web *E* no Windows;
      // E o modo de teste mobile do browser emula o userAgent para parecer ser Android.
      flag: __DEV__ && Platform.OS === "web" ? { fontFamily: "TwemojiMozilla" } : {},
      flagContainer: themed($flagContainer),

      callingCode: { color: colors.text, fontFamily: typography.primary.medium },
      // O caret tem um `paddingTop: 4` forçado,
      // que descentralizava o caret verticalmente.
      // A lógica de input desse componente é ótima, mas meu deus,
      // dá vontade de re-escrever o componente inteiro desse cara.
      caret: { color: colors.text, marginTop: -4 },
      divider: { backgroundColor: colors.border },
    },
  }

  function focusInput() {
    if (disabled) return
    // todo: fazer isso funcionar
    // para isso, acho que vamos ter que nos travar no modo "ref" de qualquer forma
    // https://github.com/AstrOOnauta/react-native-international-phone-number/
    // input.current?.focus()
  }
  // todo: descobrir o que isso é pra fazer
  // useImperativeHandle(ref, () => input.current as TextInput)

  const isRefMode = "ref" in props

  const $helperStyles = [status === "error" && { color: colors.error }, themed($helperStyle)]

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={containerStyleOverride}
      onPress={focusInput}
      accessibilityState={{ disabled }}
    >
      {label && <Text preset="formLabel" text={label} style={themed($labelStyle)} />}

      {isRefMode ? (
        <_PhoneInput {...(defaultPhoneProps as WithRef)} {...(rest as WithRef)} />
      ) : (
        <_PhoneInput {...(defaultPhoneProps as WithoutRef)} {...(rest as WithoutRef)} />
      )}

      {helper && <Text preset="formHelper" text={helper} style={$helperStyles} />}
    </TouchableOpacity>
  )
}

// Maior parte desses estilos copiados diretamente do TextField
const $labelStyle: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.xs,
})

const $inputContainer: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  paddingLeft: 0,
  borderColor: colors.border,
  overflow: "hidden",
  height: "auto",
})

const $input: ThemedStyle<TextStyle> = ({ colors, spacing, typography }) => ({
  fontFamily: typography.primary.normal,
  color: colors.text,
  fontSize: 16,

  height: 24,
  padding: 0,
  marginVertical: spacing.xs,
  marginRight: spacing.sm,
  marginLeft: spacing.xs,
})

const $flagContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  // Não sei se prefiro um estilo mais uniforme com fundo
  // neutral100 e sem borda, ou fundo neutral200 com borda

  // backgroundColor: colors.palette.neutral100,
  backgroundColor: colors.palette.neutral200,
  borderRightWidth: 1,
  borderRightColor: colors.border,

  paddingRight: spacing.xs,
})

const $helperStyle: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginTop: spacing.xs,
})
