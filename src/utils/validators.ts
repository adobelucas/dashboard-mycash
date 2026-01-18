/**
 * Valida email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Valida telefone brasileiro
 */
export const isValidPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '')
  return cleaned.length === 10 || cleaned.length === 11
}

/**
 * Valida valor monetário positivo
 */
export const isValidAmount = (amount: number): boolean => {
  return amount > 0 && isFinite(amount)
}

/**
 * Valida número de cartão (básico)
 */
export const isValidCardNumber = (number: string): boolean => {
  const cleaned = number.replace(/\D/g, '')
  return cleaned.length >= 13 && cleaned.length <= 19
}

/**
 * Valida data
 */
export const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString)
  return !isNaN(date.getTime())
}

/**
 * Valida se data não é futura
 */
export const isNotFutureDate = (dateString: string): boolean => {
  const date = new Date(dateString)
  const today = new Date()
  today.setHours(23, 59, 59, 999)
  return date <= today
}
