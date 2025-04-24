'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

export default function LanguageSwitcher() {
  const router = useRouter()
  const [currentLang, setCurrentLang] = useState('fr')
  
  useEffect(() => {
    // Récupérer la langue des cookies au chargement
    const savedLang = Cookies.get('NEXT_LOCALE') || 'fr'
    setCurrentLang(savedLang)
  }, [])
  
  const switchLanguage = (lang) => {
    Cookies.set('NEXT_LOCALE', lang)
    setCurrentLang(lang)
    
    // Recharger la page pour appliquer le changement
    router.refresh()
  }
  
  return (
    <div>
      <button 
        onClick={() => switchLanguage('fr')}
        className={currentLang === 'fr' ? 'active' : ''}
      >
        Français
      </button>
      <button 
        onClick={() => switchLanguage('en')}
        className={currentLang === 'en' ? 'active' : ''}
      >
        English
      </button>
    </div>
  )
}