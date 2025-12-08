"use client";

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
          language: "ar",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSearchResults({
          question: query,
          answer:
            data.answer ||
            "لم يتم العثور على إجابة مناسبة لهذا السؤال. يرجى إعادة صياغة السؤال أو التواصل مع مختص قانوني.",
          isError: data.isError || false,
          model: data.model || "grok-beta",
          tokens_used: data.tokens_used || 0,
        });
        setShowFrequentQuestions(false);
      } else {
        setSearchResults({
          question: query,
          answer:
            "عذرًا، لم نتمكن من معالجة طلبك في الوقت الحالي. يرجى المحاولة مرة أخرى لاحقًا.",
          isError: true,
        });
        setShowFrequentQuestions(false);
      }
    } catch (error) {
      console.error("Error searching:", error);
      setSearchResults({
        question: query,
        answer:
          "حدث خطأ أثناء الاتصال بالخدمة. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.",
        isError: true,
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
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-gradient-to-r from-purple-600/90 via-blue-600/90 to-cyan-600/90 shadow-2xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="relative group cursor-pointer"
              onClick={handleReset}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>
              <Image
                src="/moroccan-star.svg"
                alt="Moroccan Star"
                width={50}
                height={50}
                className="relative transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500"
              />
            </div>
            <div className="hidden md:block">
              <h1 className="text-2xl font-black text-white tracking-tight">
                مساعد القانون المغربي
              </h1>
              <p className="text-xs text-cyan-200">
                مدعوم بالذكاء الاصطناعي المتقدم
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <a
              href="https://github.com/khalid-tourhzaoui"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/khalid-tourhzaoui/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="https://khalid-tourhzaoui.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="relative w-full flex flex-col items-center pt-32 pb-32 px-4 z-10">
        <div className="text-center mb-12 space-y-6">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 blur-3xl opacity-50 animate-pulse"></div>
            <h1 className="relative text-7xl md:text-8xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl transform hover:scale-105 transition-transform duration-500">
              القانون المغربي{" "}
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-cyan-100 max-w-3xl mx-auto leading-relaxed font-medium">
            استشارات قانونية ذكية بتقنية الذكاء الاصطناعي المتطورة
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-6 py-3 rounded-2xl font-bold shadow-xl transform group-hover:scale-110 transition-all duration-300">
                <span className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                  مجاني 100%
                </span>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-2xl font-bold shadow-xl transform group-hover:scale-110 transition-all duration-300">
                <span className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  فائق السرعة
                </span>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl font-bold shadow-xl transform group-hover:scale-110 transition-all duration-300">
                <span className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  دقة عالية
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-5xl mb-12">
          <SearchBar
            query={searchQuery}
            onQueryChange={setSearchQuery}
            onSearchComplete={() => handleSearch(searchQuery)}
          />
        </div>

        {isLoading && (
          <div className="w-full max-w-5xl mb-12">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-50 animate-pulse"></div>
              <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-12 shadow-2xl">
                <div className="flex flex-col items-center justify-center space-y-6">
                  <div className="relative w-24 h-24">
                    <div className="absolute inset-0 border-8 border-cyan-200/20 rounded-full"></div>
                    <div className="absolute inset-0 border-8 border-transparent border-t-cyan-400 border-r-blue-400 rounded-full animate-spin"></div>
                    <div
                      className="absolute inset-3 border-8 border-transparent border-t-purple-400 border-r-pink-400 rounded-full animate-spin"
                      style={{
                        animationDirection: "reverse",
                        animationDuration: "1s",
                      }}
                    ></div>
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-black text-white">
                      جاري تحليل السؤال
                    </h3>
                    <p className="text-cyan-200 max-w-md">
                      يقوم الذكاء الاصطناعي بمعالجة استفسارك للحصول على أدق
                      إجابة
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-bounce shadow-lg shadow-cyan-400/50"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {searchResults && (
          <div className="w-full max-w-5xl mb-12">
            <SearchResults
              question={searchResults.question}
              answer={searchResults.answer}
              isError={searchResults.isError}
            />

            {searchResults.model && (
              <div className="mt-6 flex justify-center">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-3 shadow-xl">
                    <div className="flex items-center gap-3 text-white">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                      <span className="font-medium">مدعوم بـ</span>
                      <span className="font-black">{searchResults.model}</span>
                      <span className="opacity-50">على</span>
                      <span className="font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        Groq
                      </span>
                      {(searchResults.tokens_used ?? 0) > 0 && (
                        <>
                          <span className="opacity-50">•</span>
                          <span className="text-sm">
                            {searchResults.tokens_used} رمز
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
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
