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
    fetch(`/locales/${currentLocale}/common.json`)
      .then(res => res.json())
      .then(data => {
        setTranslations(data)
      })
      .catch(err => {
        console.error('Error loading translations:', err)
      })
  }, [])
  
  const changeLanguage = (newLocale) => {
    localStorage.setItem('NEXT_LOCALE', newLocale)
    setLocale(newLocale)
    
    // Charger les nouvelles traductions
    fetch(`/locales/${newLocale}/common.json`)
      .then(res => res.json())
      .then(data => {
        setTranslations(data)
        window.location.reload() // Recharger pour appliquer les changements
      })
      .catch(err => {
        console.error('Error loading translations:', err)
      })
  }
  
  const t = (key) => {
    return translations[key] || key
  }
  
  return { t, locale, changeLanguage }
}