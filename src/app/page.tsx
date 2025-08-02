'use client';

import Image from "next/image";
import SearchBar from "./components/SearchBar";
import FrequentQuestions from "./components/FrequentQuestions";
import Footer from "./components/Footer";
import SearchResults from "./components/SearchResults";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  type SearchResultsType = {
    question: string;
    answer: string;
    isError?: boolean;
    model?: string;
    tokens_used?: number;
  } | null;

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          question: query,
          language: 'ar' // Spécifier la langue arabe
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSearchResults({
          question: query,
          answer: data.answer || "لم يتم العثور على إجابة مناسبة لهذا السؤال. يرجى إعادة صياغة السؤال أو التواصل مع مختص قانوني.",
          isError: data.isError || false,
          model: data.model || 'grok-beta',
          tokens_used: data.tokens_used || 0
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
    <main
      className="flex min-h-screen flex-col items-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200"
    >
      {/* Fixed Header - Amélioré */}
      <div className="fixed top-0 left-0 right-0 w-full flex justify-center py-3 bg-gradient-to-r from-red-600 via-red-700 to-red-800 shadow-lg z-50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Image
            src="/moroccan-star.svg"
            alt="Moroccan Star"
            width={46}
            height={46}
            onClick={handleReset}
            className="cursor-pointer hover:scale-110 transition-transform duration-300 drop-shadow-lg"
          />
          <div className="text-white font-bold text-lg hidden md:block">
            مساعد القانون المغربي
          </div>
        </div>
      </div>

      {/* Content container with padding for fixed header and footer */}
      <div className="w-full flex flex-col items-center pt-20 pb-24 px-4">
        {/* Main title - Amélioré */}
        <div className="text-center mb-8">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-4 drop-shadow-sm">
            القانون المغربي
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mt-10">
            مساعدك الذكي للاستشارات القانونية المغربية - مدعوم بنموذج Qwen 3-32B على منصة Groq
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
              مجاني 100%
            </span>
            <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
              ⚡ فائق السرعة
            </span>
            <span className="bg-purple-100 text-purple-800 text-sm font-semibold px-3 py-1 rounded-full">
              دقة عالية
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-4xl mb-8">
          <SearchBar
            query={searchQuery}
            onQueryChange={setSearchQuery}
            onSearchComplete={() => handleSearch(searchQuery)}
          />
        </div>

        {/* Loading Animation */}
        {isLoading && (
          <div className="w-full max-w-5xl mb-8">
            <div className="bg-white rounded-3xl border-2 border-gray-100 p-8 shadow-lg">
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-16 h-16 mb-4">
                  <div className="absolute inset-0 border-4 border-green-200 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-green-600 rounded-full border-t-transparent animate-spin"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">جاري تحليل السؤال...</h3>
                <p className="text-gray-600 text-center max-w-md">
                  نحن نستخدم الذكاء الاصطناعي المتطور لتحليل سؤالك وتقديم أفضل إجابة قانونية ممكنة
                </p>
                <div className="mt-4 flex gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchResults && (
          <div className="w-full max-w-5xl mb-8">
            <SearchResults
              question={searchResults.question}
              answer={searchResults.answer}
              isError={searchResults.isError}
            />
            
            {/* Informations sur le modèle AI */}
            {searchResults.model && (
              <div className="mt-4 text-center">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-4 py-2 text-sm text-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>مدعوم بـ <strong>{searchResults.model}</strong> على منصة <strong>Groq</strong></span>
                  {(searchResults.tokens_used ?? 0) > 0 && (
                    <span className="text-gray-500">• {searchResults.tokens_used} رمز</span>
                  )}
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">⚡ سريع</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Frequent Questions */}
        {showFrequentQuestions && (
          <div className="w-full max-w-6xl mb-16">
            <FrequentQuestions onQuestionClick={handleQuestionClick} />
          </div>
        )}

      </div>
      
      {/* Footer component */}
      <Footer />
    </main>
  );
}