import { TextField, type TextFieldProps } from "./TextField"

export interface DateInputProps
  extends Omit<TextFieldProps, "onChange" | "onChangeText" | "value"> {
  value: string
  onChange: (formattedDate: string) => void
}

/**
 * Input controlado para entrada de data
 */
export const DateInput = function DateInput(props: DateInputProps) {
  const { value, onChange, ...rest } = props

  const handleDateChange = (text: string) => {
    // Remove todos os caracteres não numéricos
    const numbers = text.replace(/\D/g, "")

    // Formata a data enquanto digita
    let formattedDate = ""
    if (numbers.length > 0) {
      if (numbers.length <= 2) {
        formattedDate = numbers
      } else if (numbers.length <= 4) {
        formattedDate = `${numbers.slice(0, 2)}/${numbers.slice(2)}`
      } else {
        formattedDate = `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`
      }
    }
    onChange(formattedDate)
  }

  return (
    <TextField
      inputMode="numeric"
      autoCorrect={false}
      value={value}
      onChangeText={handleDateChange}
      {...rest}
    />
  )
}
