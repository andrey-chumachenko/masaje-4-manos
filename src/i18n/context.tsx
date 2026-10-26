import { createContext, useContext, useState, type ReactNode } from 'react'
import { es } from './es'
import { ua } from './ua'
import { ru } from './ru'
import { en } from './en'

export type Lang = 'es' | 'ua' | 'ru' | 'en'
export type Translations = typeof es

const translations: Record<Lang, Translations> = { es, ua, ru, en }

interface I18nContextValue {
  lang: Lang
  t: Translations
  setLang: (l: Lang) => void
}

const I18nContext = createContext<I18nContextValue>({
  lang: 'es',
  t: es,
  setLang: () => {},
})

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem('masaje4manos.lang')
      return saved === 'es' || saved === 'ua' || saved === 'ru' || saved === 'en' ? saved : 'es'
    } catch {
      return 'es'
    }
  })
  function setLang(next: Lang) {
    setLangState(next)
    try {
      localStorage.setItem('masaje4manos.lang', next)
    } catch {
      // Language switching still works when browser storage is unavailable.
    }
  }
  return (
    <I18nContext.Provider value={{ lang, t: translations[lang], setLang }}>
      {children}
    </I18nContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useI18n() {
  return useContext(I18nContext)
}
