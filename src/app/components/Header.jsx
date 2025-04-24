'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header({ onReset }) {
  const [currentLang, setCurrentLang] = useState('fr');
  const router = useRouter();
  
  // Pour accéder à la fonction changeLanguage de votre hook
  const { locale, changeLanguage } = useTranslation();
  
  useEffect(() => {
    // Initialiser la langue actuelle
    const savedLang = localStorage.getItem('NEXT_LOCALE') || 'fr';
    setCurrentLang(savedLang);
  }, []);
  
  const switchLanguage = (lang) => {
    localStorage.setItem('NEXT_LOCALE', lang);
    setCurrentLang(lang);
    
    // Si vous avez une fonction changeLanguage dans votre hook
    if (changeLanguage) {
      changeLanguage(lang);
    } else {
      // Sinon, recharger la page
      router.refresh();
    }
  };
  
  // Mappez les langues aux images de drapeaux
  const languageFlags = {
    fr: "/flags/fr.png",
    ar: "/flags/ar.png",
    en: "/flags/en.png"
  };
  
  // Mappez les langues à leurs noms
  const languageNames = {
    fr: "Français",
    ar: "العربية",
    en: "English"
  };

  return (
    <div className="fixed top-0 left-0 right-0 w-full flex justify-between items-center py-4 bg-white z-50 px-6">
      {/* Horizontal line */}
      <div className="absolute w-full h-px bg-gray-200"></div>
      
      {/* Moroccan star with white background */}
      <div className="relative bg-white px-4 z-10">
        <div 
          className="w-12 h-12 flex items-center justify-center cursor-pointer" 
          onClick={onReset}
        >
          <Image
            src="/moroccan-star.svg"
            alt="Moroccan Star"
            width={28}
            height={28}
            className="text-green-700"
          />
        </div>
      </div>ccccccccccccccccccc
      
      {/* Language selector dropdown using Shadcn UI */}
      <div className="relative">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center space-x-2 bg-white rounded-md border border-gray-200 px-3 py-2 focus:outline-none">
            <Image 
              src={languageFlags[currentLang]} 
              alt={currentLang} 
              width={20} 
              height={15} 
            />
            <span className="ml-2">{languageNames[currentLang]}</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 ml-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent align="end" className="w-48">
            {Object.keys(languageFlags).map((lang) => (
              <DropdownMenuItem 
                key={lang}
                onClick={() => switchLanguage(lang)}
                className={`flex items-center space-x-3 ${currentLang === lang ? 'bg-gray-50' : ''}`}
              >
                <Image 
                  src={languageFlags[lang]} 
                  alt={lang} 
                  width={20} 
                  height={15} 
                />
                <span className="ml-2">{languageNames[lang]}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}