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
          answer: data.answer,
        });
      }
    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setIsLoading(false);
    }
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
          <div className="w-full max-w-5xl mb-8">
            <SearchResults
              question={searchResults.question}
              answer={searchResults.answer}
            />
          </div>
        )}

        {/* Frequent Questions */}
        <div className="w-full max-w-5xl mb-16">
          <FrequentQuestions onQuestionClick={handleQuestionClick} />
        </div>
      </div>
      
      {/* Footer component is now fixed */}
      <Footer />
    </main>
  );
}