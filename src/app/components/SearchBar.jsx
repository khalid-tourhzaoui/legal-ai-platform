'use client';
import { useState } from 'react';

export default function SearchBar({ query, onQueryChange, onSearchComplete }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    setIsLoading(true);
    
    try {
      // Appeler directement la fonction de recherche du parent
      if (onSearchComplete) {
        await onSearchComplete();
      }
    } catch (error) {
      console.error('Error in search:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="flex items-center">
        <div className="relative w-full flex items-center group">
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="bg-white border-2 border-gray-200 text-gray-900 text-right rounded-full w-full py-4 px-6 pr-6 pl-32 shadow-lg focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="اسألني أي سؤال عن القانون المغربي..."
            disabled={isLoading}
            dir="rtl"
          />
          
          <button
            type="submit"
            className={`absolute left-2 rounded-full border-2 px-6 py-2 font-bold cursor-pointer transition-all duration-300 transform ${
              isLoading
                ? 'bg-gray-400 border-gray-400 text-white cursor-not-allowed'
                : 'bg-green-800 border-green-800 text-white hover:bg-white hover:border-green-800 hover:text-green-800 hover:scale-105 shadow-md hover:shadow-lg'
            }`}
            disabled={isLoading || !query.trim()}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>جاري البحث...</span>
              </div>
            ) : (
              'بحث'
            )}
          </button>
        </div>
      </form>
      
      {/* Indicateur de progression */}
      {isLoading && (
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-500 to-green-700 rounded-full animate-pulse"></div>
          </div>
          <p className="text-sm text-gray-500 text-center mt-2 animate-pulse">
            معالجة السؤال بواسطة الذكاء الاصطناعي...
          </p>
        </div>
      )}
    </div>
  );
}