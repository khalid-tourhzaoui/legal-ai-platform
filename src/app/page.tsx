'use client';

import Image from "next/image";
import SearchBar from "./components/SearchBar";
import FrequentQuestions from "./components/FrequentQuestions";
import Footer from "./components/Footer";
import SearchResults from "./components/SearchResults";
import { useState, useEffect } from "react";
import { useTranslation } from '@/hooks/useTranslation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Home() {
  const { t, changeLanguage } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<{
    question: string;
    answer: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showFrequentQuestions, setShowFrequentQuestions] = useState(true);
  const [currentLang, setCurrentLang] = useState<keyof typeof languageFlags>('ar');

  useEffect(() => {
    // Initialiser la langue actuelle
    const savedLang = localStorage.getItem('NEXT_LOCALE') || 'ar';
    setCurrentLang(savedLang as keyof typeof languageFlags);
  }, []);

  const switchLanguage = (lang: keyof typeof languageFlags) => {
    if (lang === currentLang) return; // Ne rien faire si c'est déjà la langue actuelle
    
    localStorage.setItem('NEXT_LOCALE', lang);
    setCurrentLang(lang);
    
    if (changeLanguage) {
      changeLanguage(lang);
      // Pas de rechargement de page
    }
  };

  // Utilisation d'URLs d'icônes de drapeaux accessibles sur Internet
  const languageFlags = {
    fr: "https://cdn.jsdelivr.net/npm/flag-icon-css@3.5.0/flags/4x3/fr.svg",
    ar: "https://cdn.jsdelivr.net/npm/flag-icon-css@3.5.0/flags/4x3/ma.svg",
    en: "https://cdn.jsdelivr.net/npm/flag-icon-css@3.5.0/flags/4x3/gb.svg"
  };
  
  // Mappez les langues à leurs noms
  const languageNames = {
    fr: "Français",
    ar: "العربية",
    en: "English"
  };

  // Le reste du code reste identique...
  
  const handleQuestionClick = (question: string) => {
    setSearchQuery(question);
    handleSearch(question);
  };

  const handleSearch = async (question?: string) => {
    const query = question || searchQuery;
    if (!query.trim()) return;
  
    setIsLoading(true);
    setSearchResults(null);
  
    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: query }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setSearchResults({
          question: query,
          answer: data.answer || "Aucune réponse disponible pour cette question. Veuillez reformuler votre demande ou consulter nos FAQ.",
        });
        setShowFrequentQuestions(false);
      } else {
        setSearchResults({
          question: query,
          answer: "Désolé, nous n'avons pas pu traiter votre demande. Veuillez réessayer ultérieurement.",
        });
        setShowFrequentQuestions(false);
      }
    } catch (error) {
      console.error("Error searching:", error);
      setSearchResults({
        question: query,
        answer: "Une erreur s'est produite lors de la recherche. Veuillez vérifier votre connexion et réessayer.",
      });
      setShowFrequentQuestions(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSearchQuery("");
    setSearchResults(null);
    setShowFrequentQuestions(true);
  };

  return (
    <main
      className="flex min-h-screen flex-col items-center"
      style={{ backgroundColor: "rgb(247, 247, 247)" }}
    >
      {/* Fixed Header avec dropdown de langue */}
      <div className="fixed top-0 left-0 right-0 w-full flex justify-between items-center py-2 bg-red-600 z-50 px-6">
        <div className="flex-1"></div>
        
        <div className="flex justify-center">
          <Image
            src="/moroccan-star.svg"
            alt="Moroccan Star"
            width={42}
            height={42}
            onClick={handleReset}
            className="cursor-pointer"
          />
        </div>
        
        <div className="flex-1 flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-2 bg-white rounded-md border border-gray-200 px-3 py-1 focus:outline-none">
              <img 
                src={languageFlags[currentLang]} 
                alt={currentLang} 
                className="w-5 h-4 object-cover"
              />
              <span className="ml-2 text-sm">{languageNames[currentLang]}</span>
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
                  onClick={() => switchLanguage(lang as keyof typeof languageFlags)}
                  className={`flex items-center space-x-3 ${currentLang === lang ? 'bg-gray-50' : ''}`}
                >
                  <img 
                    src={languageFlags[lang as keyof typeof languageFlags]} 
                    alt={lang} 
                    className="w-5 h-4 object-cover"
                  />
                  <span className="ml-2">{languageNames[lang as keyof typeof languageNames]}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="w-full flex flex-col items-center pt-16 pb-24">
        <h1 className="text-5xl font-bold text-center text-gray-800 my-8">
          القانون المغربي
        </h1>

        <div className="w-full max-w-2xl mb-8">
          <SearchBar
            query={searchQuery}
            onQueryChange={setSearchQuery}
            onSearchComplete={() => handleSearch()}
          />
        </div>

        {searchResults && (
          <div className="w-full max-w-5xl mb-8 rtl">
            <SearchResults
              question={searchResults.question}
              answer={searchResults.answer}
            />
          </div>
        )}
        <h1>{t('welcome_message')}</h1>
        
        {showFrequentQuestions && (
          <div className="w-full max-w-5xl mb-16">
            <FrequentQuestions onQuestionClick={handleQuestionClick} />
          </div>
        )}
      </div>
      
      <Footer />
    </main>
  );
}