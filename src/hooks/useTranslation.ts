import { useState } from 'react'
import { t, type Locale } from '@/i18n'

export function useTranslation(locale: Locale = 'pt-BR') {
  const [currentLocale, setCurrentLocale] = useState<Locale>(locale)

  const translate = (key: string): string => {
    return t(key, currentLocale)
  }

  return {
    t: translate,
    locale: currentLocale,
    setLocale: setCurrentLocale,
  }
}
