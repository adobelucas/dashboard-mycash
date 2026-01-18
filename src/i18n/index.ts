import { ptBR } from './pt-BR'

export type Locale = 'pt-BR'
export type TranslationKey = keyof typeof ptBR

const translations = {
  'pt-BR': ptBR,
}

export const getTranslation = (locale: Locale = 'pt-BR') => {
  return translations[locale]
}

export const t = (key: string, locale: Locale = 'pt-BR'): string => {
  const keys = key.split('.')
  let value: any = translations[locale]

  for (const k of keys) {
    value = value?.[k]
    if (value === undefined) return key
  }

  return typeof value === 'string' ? value : key
}

export { ptBR }
