'use client';

import Image from "next/image";
import SearchBar from "./components/SearchBar";
import FrequentQuestions from "./components/FrequentQuestions";
import Footer from "./components/Footer";
import SearchResults from "./components/SearchResults";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<{
    question: string;
    answer: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showFrequentQuestions, setShowFrequentQuestions] = useState(true);

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
          // Utilise la réponse de l'API ou une valeur par défaut si elle est vide
          answer: data.answer || "Aucune réponse disponible pour cette question. Veuillez reformuler votre demande ou consulter nos FAQ.",
        });
        // Cacher les questions fréquentes après une recherche réussie
        setShowFrequentQuestions(false);
      } else {
        // Ajouter une réponse par défaut en cas d'erreur
        setSearchResults({
          question: query,
          answer: "Désolé, nous n'avons pas pu traiter votre demande. Veuillez réessayer ultérieurement.",
        });
        // Cacher les questions fréquentes même en cas d'erreur
        setShowFrequentQuestions(false);
      }
    } catch (error) {
      console.error("Error searching:", error);
      // Ajouter une réponse par défaut en cas d'exception
      setSearchResults({
        question: query,
        answer: "Une erreur s'est produite lors de la recherche. Veuillez vérifier votre connexion et réessayer.",
      });
      // Cacher les questions fréquentes même en cas d'exception
      setShowFrequentQuestions(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour réinitialiser la page à l'état initial
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
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 w-full flex justify-center py-2 bg-red-600 z-50">
        <Image
          src="/moroccan-star.svg"
          alt="Moroccan Star"
          width={42}
          height={42}
          onClick={handleReset} // Permettre de réinitialiser en cliquant sur le logo
          className="cursor-pointer"
        />
      </div>

      {/* Content container with padding for fixed header and footer */}
      <div className="w-full flex flex-col items-center pt-16 pb-24">
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
          />
        </div>

        {/* Search Results */}
        {searchResults && (
          <div className="w-full max-w-5xl mb-8 rtl">
            <SearchResults
              question={searchResults.question}
              answer={searchResults.answer}
            />
          </div>
        )}

        {/* Frequent Questions - seulement visibles si showFrequentQuestions est true */}
        {showFrequentQuestions && (
          <div className="w-full max-w-5xl mb-16">
            <FrequentQuestions onQuestionClick={handleQuestionClick} />
          </div>
        )}
      </div>
      
      {/* Footer component is now fixed */}
      <Footer />
    </main>
  );
}