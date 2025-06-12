import { useMemo, useRef } from "react"
import {
  Animated,
  Platform,
  type StyleProp,
  /* eslint-disable-next-line no-restricted-imports */
  TextInput,
  type TextInputProps,
  TextStyle,
  TouchableOpacity,
  type ViewStyle,
} from "react-native"

import { Text } from "./Text"

export interface SecurityCodeInputProps extends TextInputProps {
  maxLength: number
  value: string
  onChangeText: (text: string) => void
  onFilled?: (text: string) => void
  style?: StyleProp<ViewStyle>
  digitStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
}

/**
 * Um wrapper em volta de um TextInput que:
 * - Renderiza cada dígito em um container ("círculo") customizado.
 * - Roda uma pequena animação em cada dígito digitado
 */
export const SecurityCodeInput = (props: SecurityCodeInputProps) => {
  const {
    maxLength = 6,
    value,
    onChangeText,
    onFilled,
    style: containerStyleOverride,
    digitStyle: digitStyleOverride,
    textStyle: textStyleOverride,

    editable,
    ...rest
  } = props

  const inputRef = useRef<TextInput>(null)

  const animations = useMemo(
    () => Array.from({ length: maxLength }, () => new Animated.Value(1)),
    [maxLength],
  )
  const animateEntry = (index: number) => {
    Animated.sequence([
      Animated.timing(animations[index], {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: Platform.OS !== "web", // A web não tem o nativeDriver
      }),
      Animated.timing(animations[index], {
        toValue: 1,
        duration: 100,
        useNativeDriver: Platform.OS !== "web",
      }),
    ]).start()
  }

  const handleChangeText = (text: string) => {
    // Limpar qualquer caractere que não for um dígito, e limitar tamanho
    const filtered = text.replace(/\D/g, "").slice(0, maxLength)

    try {
      // Animar o slot que acabou de mudar
      if (filtered.length > value.length) {
        animateEntry(filtered.length - 1)
      } else if (filtered.length < value.length && value.length < maxLength) {
        animateEntry(filtered.length)
      }
    } catch (e) {
      if (__DEV__) console.error(e)
    }

    onChangeText(filtered)

    // Emitir um callback extra quando o input estiver cheio, para dar auto-submit se desejado
    // ps. Isso NÃO executa depois do texto mudar; o react faz uns paranauê async
    if (filtered.length === maxLength) {
      onFilled?.(filtered)
    }
  }

  function focusInput() {
    inputRef.current?.focus()
  }

  return (
    <TouchableOpacity
      activeOpacity={0.66}
      accessibilityState={{ disabled: editable === false }}
      style={[$containerStyle, containerStyleOverride]}
      // Passar foco para o TextInput invisível, como se essa região fosse o próprio input
      onPress={focusInput}
    >
      {/* TextInput completamente invisível, mas funcional :) */}
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChangeText}
        autoComplete="off"
        autoCorrect={false}
        editable={editable}
        inputMode="numeric"
        maxLength={maxLength}
        style={$hiddenTextInput}
        {...rest}
      />
      {/* Renderizando um "círculo" para cada slot de dígito do input (maxLength) */}
      {Array.from({ length: maxLength }).map((_, index) => {
        const isFocused = index === value.length
        return (
          <Animated.View
            key={index}
            style={[
              $digitContainerStyle,
              digitStyleOverride,
              { transform: [{ scale: animations[index] }] },
            ]}
          >
            <Text
              text={value[index] || (isFocused ? "_" : "")}
              preset="subheading"
              allowFontScaling={false}
              style={[$textStyle, textStyleOverride]}
            />
          </Animated.View>
        )
      })}
    </TouchableOpacity>
  )
}

const $hiddenTextInput: TextStyle = {
  position: "absolute",
  opacity: 0,
  zIndex: -1,
  // Vou deixar esses dois comentados como um lembrete de que
  // o Android NÃO deixa focar em um input com dimensões zero
  // width: 0,
  // height: 0,
}

const $containerStyle: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-evenly",
}

const $digitContainerStyle: TextStyle = {
  alignItems: "center",
  justifyContent: "center",

  width: 40,
  height: 40,
  borderRadius: 20,
  borderWidth: 2,
}
const $textStyle: TextStyle = {
  fontSize: 20,
  includeFontPadding: false,
}
