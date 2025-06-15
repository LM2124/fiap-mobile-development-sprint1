import { type ICountry, isValidPhoneNumber } from "react-native-international-phone-number"

export function validateEmail(email?: string) {
  if (!email) return "Email não pode estar vazio"
  if (email.split("@").length !== 2) return "Email inválido"
  if (!/^[\w-\.]+@[\w-]+\.+[\w-]{2,4}$/g.test(email)) return "Email inválido"

  return undefined
}

// Facilitar a vida do dev; digitar senha complexa pra testar flow gasta tempo
// Trocar isso pra true mas não esquecer de trocar de volta antes de commitar
const easyPasswords = __DEV__ && false

export function validatePassword(password?: string) {
  if (!password) return "Senha não pode estar vazia"
  if (password.length < 8) return "Senha deve conter 8 caracteres ou mais"
  if (easyPasswords) return undefined

  if (!/[A-Z]/.test(password)) return "Senha deve conter pelo menos uma letra maiúscula"
  if (!/[a-z]/.test(password)) return "Senha deve conter pelo menos uma letra minúscula"
  if (!/\d/.test(password)) return "Senha deve conter pelo menos um número"
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
    return "Senha deve conter pelo menos um caractere especial (ex: @, #, !, etc.)"

  return undefined
}

export function validatePhone(phone?: string, country?: ICountry) {
  if (!phone) return "Número não pode estar vazio"

  if (country) {
    if (!isValidPhoneNumber(phone, country)) {
      return `Número inválido para país: ${country.name.pt}`
    }
  } else {
    // https://stackoverflow.com/a/29767609
    const re = /^[\+]?[0-9]{0,3}\W?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    if (!re.test(phone)) return "Número inválido"
  }
  return
}

export function validateBirthdate(date?: string) {
  if (!date) return "Data inválida"
  // TODO
  return
}
