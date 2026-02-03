"use client";

import { useState } from "react";
import Header from "./components/Header/Header";
import HeroSection from "./components/HeroSection/HeroSection";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import FrequentQuestions from "./components/FrequentQuestions/FrequentQuestions";
import Footer from "./components/Footer/Footer";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import ModelBadge from "./components/ModelBadge/ModelBadge";
import { SearchResultsType } from "./types";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResultsType>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showFrequentQuestions, setShowFrequentQuestions] = useState(true);

  const handleQuestionClick = (question: string) => {
    setSearchQuery(question);
    handleSearch(question);
  };

  const handleSearch = async (question: string) => {
    const query = question || searchQuery;
    if (!query.trim()) return;
    
    setIsLoading(true);
    setSearchResults(null);
    
    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: query, language: "ar" }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSearchResults({
          question: query,
          answer: data.answer || "لم يتم العثور على إجابة مناسبة لهذا السؤال. يرجى إعادة صياغة السؤال أو التواصل مع مختص قانوني.",
          isError: data.isError || false,
          model: data.model || "grok-beta",
          tokens_used: data.tokens_used || 0,
        });
        setShowFrequentQuestions(false);
      } else {
        setSearchResults({ 
          question: query, 
          answer: "عذرًا، لم نتمكن من معالجة طلبك في الوقت الحالي. يرجى المحاولة مرة أخرى لاحقًا.", 
          isError: true 
        });
        setShowFrequentQuestions(false);
      }
    } catch (error) {
      console.error("Error searching:", error);
      setSearchResults({ 
        question: query, 
        answer: "حدث خطأ أثناء الاتصال بالخدمة. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.", 
        isError: true 
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
    <main className="relative min-h-screen bg-yellow-100 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br bg-emerald-800 -mt-0.5 rounded-b-[48px] sm:rounded-b-[64px] lg:rounded-b-[72px]" />
        
        <div className="absolute top-0 left-0 w-48 h-48 md:w-64 md:h-64 opacity-70"
          style={{ transform: "rotate(-12deg)" }}>
          <div className="w-full h-full rounded-[40%] bg-gradient-to-br from-orange-300 to-yellow-200 opacity-80" />
        </div>
        
        <div className="absolute top-4 right-0 w-36 h-36 md:w-56 md:h-56 opacity-60"
          style={{ transform: "rotate(25deg)" }}>
          <div className="w-full h-full rounded-[45%] bg-gradient-to-br from-purple-300 to-yellow-200 opacity-70" />
        </div>

        <div className="absolute bottom-6 left-4 md:bottom-8 md:left-8 w-16 h-16 md:w-24 md:h-24 rounded-full border-[3px] border-zinc-800 bg-yellow-50 opacity-90" />
        <div className="absolute bottom-10 right-6 md:bottom-14 md:right-10 w-20 h-20 md:w-28 md:h-28 rounded-xl border-[3px] border-zinc-500 bg-yellow-50 opacity-90" />
      </div>

      <Header onReset={handleReset} />

      <div className="relative w-full flex flex-col items-center pt-24 md:pt-28 pb-32 px-4 md:px-6 z-10">
        <HeroSection />

        <div className="w-full max-w-5xl mb-12">
          <SearchBar
            query={searchQuery}
            onQueryChange={setSearchQuery}
            onSearchComplete={() => handleSearch(searchQuery)}
          />
        </div>

        {isLoading && <LoadingSpinner />}

        {searchResults && (
          <div className="w-full max-w-5xl mb-1">
            <SearchResults 
              question={searchResults.question} 
              answer={searchResults.answer} 
              isError={searchResults.isError} 
            />
            {searchResults.model && (
              <ModelBadge model={searchResults.model} tokens_used={searchResults.tokens_used} />
            )}
          </div>
        )}

        {showFrequentQuestions && (
          <div className="w-full max-w-6xl">
            <FrequentQuestions onQuestionClick={handleQuestionClick} />
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}