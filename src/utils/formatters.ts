/**
 * Formata valores monetários
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

/**
 * Formata datas
 */
export const formatDate = (dateString: string, options?: Intl.DateTimeFormatOptions): string => {
  const date = new Date(dateString)
  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    ...options,
  }
  return new Intl.DateTimeFormat('pt-BR', defaultOptions).format(date)
}

/**
 * Formata data relativa (hoje, ontem, etc)
 */
export const formatRelativeDate = (dateString: string): string => {
  const date = new Date(dateString)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (date.toDateString() === today.toDateString()) {
    return 'Hoje'
  }
  if (date.toDateString() === yesterday.toDateString()) {
    return 'Ontem'
  }

  return formatDate(dateString)
}

/**
 * Mascara número de cartão
 */
export const maskCardNumber = (number: string): string => {
  const last4 = number.slice(-4)
  return `**** **** **** ${last4}`
}

/**
 * Formata telefone brasileiro
 */
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }
  return phone
}
