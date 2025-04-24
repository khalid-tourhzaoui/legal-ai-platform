'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar({ query, onQueryChange, onSearchComplete}) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentLang, setCurrentLang] = useState('ar');
  const router = useRouter();

  useEffect(() => {
    // Initialiser la langue actuelle
    const savedLang = typeof window !== 'undefined' ? localStorage.getItem('NEXT_LOCALE') || 'ar' : 'ar';
    setCurrentLang(savedLang);
  }, []);

  // Traductions pour le placeholder et le bouton de recherche
  const translations = {
    ar: {
      placeholder: "اسألني أي سؤال عن القانون المغربي...",
      searchButton: "بحث",
      searching: "جاري البحث..."
    },
    fr: {
      placeholder: "Posez-moi une question sur le droit marocain...",
      searchButton: "Rechercher",
      searching: "Recherche en cours..."
    },
    en: {
      placeholder: "Ask me any question about Moroccan law...",
      searchButton: "Search",
      searching: "Searching..."
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: query }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Appeler le callback avec les résultats
        if (onSearchComplete) {
          onSearchComplete({
            question: query,
            answer: data.answer
          });
        }
      } else {
        console.error('API Error:');
      }
      
    } catch (error) {
      console.error('Error searching:');
    } finally {
      setIsLoading(false);
    }
  };

  // Obtenir les traductions pour la langue actuelle
  const getText = () => {
    return translations[currentLang] || translations.ar;
  };

  // Pour déterminer la direction du texte selon la langue
  const getTextDirection = () => {
    return currentLang === 'ar' ? 'rtl' : 'ltr';
  };

  // Pour ajuster l'alignement du texte selon la langue
  const getTextAlign = () => {
    return currentLang === 'ar' ? 'text-right' : 'text-left';
  };

  // Pour ajuster la position du bouton selon la langue
  const getButtonPosition = () => {
    return currentLang === 'ar' ? 'left-2' : 'right-2';
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="flex items-center">
        <div className="relative w-full flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className={`bg-white border border-gray-300 text-gray-900 ${getTextAlign()} rounded-full w-full py-4 px-6 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-800`}
            placeholder={getText().placeholder}
            dir={getTextDirection()}
          />
          <button
            type="submit"
            className={`absolute ${getButtonPosition()} rounded-full border bg-green-800 hover:bg-white hover:border-green-800 text-white hover:text-green-800 px-6 py-2 font-bold cursor-pointer`}
            disabled={isLoading}
          >
            {isLoading ? getText().searching : getText().searchButton}
          </button>
        </div>
      </form>
    </div>
  );
}