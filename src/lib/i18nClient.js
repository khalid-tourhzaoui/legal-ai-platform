'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

const I18nContext = createContext({})

export function I18nProvider({ children }) {
  const [locale, setLocale] = useState('fr')
  const [translations, setTranslations] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const currentLocale = Cookies.get('NEXT_LOCALE') || 'fr'
    setLocale(currentLocale)
    
    // Charger les traductions
    fetch(`/locales/${currentLocale}/common.json`)
      .then(res => res.json())
      .then(data => {
        setTranslations(data)
        setIsLoading(false)
      })
  }, [])
  
  const changeLanguage = (newLocale) => {
    Cookies.set('NEXT_LOCALE', newLocale)
    setLocale(newLocale)
    setIsLoading(true)
    
    // Charger les nouvelles traductions
    fetch(`/locales/${newLocale}/common.json`)
      .then(res => res.json())
      .then(data => {
        setTranslations(data)
        setIsLoading(false)
        window.location.reload() // Forcer le rechargement pour appliquer les changements
      })
  }
  
  const t = (key) => {
    return translations[key] || key
  }
  
  return (
    <I18nContext.Provider value={{ locale, t, changeLanguage, isLoading }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}