'use client'

import { useState, useEffect } from 'react'

export function useTranslation() {
  const [translations, setTranslations] = useState({})
  const [locale, setLocale] = useState('fr')
  
  useEffect(() => {
    // Récupérer la langue du localStorage
    const currentLocale = localStorage.getItem('NEXT_LOCALE') || 'fr'
    setLocale(currentLocale)
    
    // Charger les traductions
    loadTranslations(currentLocale)
  }, [])
  
  const loadTranslations = async (locale) => {
    try {
      const response = await fetch(`/locales/${locale}/common.json`)
      const data = await response.json()
      setTranslations(data)
    } catch (err) {
      console.error('Error loading translations:', err)
    }
  }
  
  const changeLanguage = async (newLocale) => {
    localStorage.setItem('NEXT_LOCALE', newLocale)
    setLocale(newLocale)
    
    // Charger les nouvelles traductions sans recharger la page
    await loadTranslations(newLocale)
  }
  
  const t = (key) => {
    return translations[key] || key
  }
  
  return { t, locale, changeLanguage }
}