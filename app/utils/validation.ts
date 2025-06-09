import { type ICountry, isValidPhoneNumber } from "react-native-international-phone-number"

export function validateEmail(email?: string) {
  if (!email) return "Email não pode estar vazio"
  if (email.split("@").length !== 2) return "Email inválido"
  return
}

export function validatePassword(password?: string) {
  if (!password) return "Senha não pode estar vazia"
  // TODO: Impor política de senha decente
  if (password.length < 8) return "Senha deve ter 8 caracteres ou mais"
  return
}

export function validatePhone(phone?: string, country?: ICountry) {
  if (!phone) return "Número não pode estar vazio"
  console.log(country)
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
