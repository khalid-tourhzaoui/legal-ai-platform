"use client";
import { useState } from "react";

export default function SearchBar({ query, onQueryChange, onSearchComplete }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    try {
      if (onSearchComplete) {
        await onSearchComplete();
      }
    } catch (error) {
      console.error("Error in search:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="w-full">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
        
        <div className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full bg-white/10 backdrop-blur-2xl border-2 border-white/20 text-white text-right rounded-3xl py-6 px-10 pr-10 pl-48 text-lg shadow-2xl focus:outline-none focus:ring-4 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-500 placeholder-cyan-200/50 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/15 hover:border-white/30"
            placeholder="اسألني أي سؤال عن القانون المغربي..."
            disabled={isLoading}
            dir="rtl"
          />

          <button
            onClick={handleSearch}
            className={`absolute left-3 rounded-2xl px-10 py-4 font-black text-lg transition-all duration-500 ${
              isLoading
                ? "bg-gray-500/50 text-white/50 cursor-not-allowed"
                : "bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 hover:scale-110 hover:rotate-2 shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:shadow-[0_0_50px_rgba(6,182,212,0.8)]"
            }`}
            disabled={isLoading || !query.trim()}
          >
            {isLoading ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>جاري البحث</span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span>بحث</span>
              </div>
            )}
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="mt-6 space-y-3">
          <div className="relative w-full bg-white/10 backdrop-blur-xl rounded-full h-3 overflow-hidden border border-white/20">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
          </div>
          <p className="text-center text-cyan-200 font-medium animate-pulse">
            معالجة الاستفسار بواسطة الذكاء الاصطناعي المتقدم
          </p>
        </div>
      )}
    </div>
  );
}