"use client";
import Image from "next/image";
import SearchBar from "./components/SearchBar";
import FrequentQuestions from "./components/FrequentQuestions";
import SearchResults from "./components/SearchResults";
import { useState } from 'react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{question: string, answer: string} | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: query }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSearchResults({
          question: query,
          answer: data.answer
        });
      }
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between"
      style={{ backgroundColor: "rgb(247, 247, 247)" }}
    >
      {/* Header with Moroccan star */}
      <div className="w-full flex justify-center py-2 bg-red-600 border-1">
        <Image
          src="/moroccan-star.svg"
          alt="Moroccan Star"
          width={42}
          height={42}
        />
      </div>

      {/* Main title */}
      <h1 className="text-5xl font-bold text-center text-gray-800 my-8">
        القانون المغربي
      </h1>

      {/* Search Bar */}
      <div className="w-full max-w-2xl mb-8">
        <SearchBar 
          query={searchQuery} 
          onQueryChange={setSearchQuery} 
          onSearchComplete={() => handleSearch()} 
          isLoading={isLoading}
        />
      </div>

      {/* Search Results */}
      {searchResults && (
        <div className="w-full max-w-4xl mb-8">
          <SearchResults 
            question={searchResults.question} 
            answer={searchResults.answer} 
          />
        </div>
      )}

      {/* Frequent Questions */}
      <div className="w-full max-w-4xl mb-16">
        <FrequentQuestions onQuestionClick={handleQuestionClick} />
      </div>
    </main>
  );
}