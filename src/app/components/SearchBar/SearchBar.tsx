"use client";
import { useState, KeyboardEvent, ChangeEvent } from "react";

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSearchComplete: () => void;
}

export default function SearchBar({
  query,
  onQueryChange,
  onSearchComplete,
}: SearchBarProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    try {
      if (onSearchComplete) await onSearchComplete();
    } catch (error) {
      console.error("Error in search:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="w-full ">
      <div
        className={`relative bg-white rounded-2xl sm:rounded-3xl border-[6px] border-zinc-800 overflow-hidden transition-all duration-300 ${
          isFocused
            ? "shadow-[10px_10px_0px_0px_rgba(0,0,0,0.5)]"
            : "shadow-[8px_8px_0px_0px_rgba(0,0,0,0.4)]"
        }`}
      >
        <div
          className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.04] z-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 4px)",
          }}
        />

        <div className="absolute -left-1.5 -top-1.5 w-4 h-4 bg-white/70 rounded-sm z-10" />
        <div className="absolute -right-1.5 -top-1.5 w-4 h-4 bg-white/70 rounded-sm z-10" />
        <div className="absolute -left-1.5 -bottom-1.5 w-4 h-4 bg-white/70 rounded-sm z-10" />
        <div className="absolute -right-1.5 -bottom-1.5 w-4 h-4 bg-white/70 rounded-sm z-10" />

        <div className="relative z-10 flex items-center gap-3 px-5 py-3.5 border-b-4 border-zinc-800 bg-yellow-100">
          <span className="w-3.5 h-3.5 rounded-full bg-red-400 border-2 border-zinc-800 inline-block" />
          <span className="w-3.5 h-3.5 rounded-full bg-yellow-400 border-2 border-zinc-800 inline-block" />
          <span className="w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-zinc-800 inline-block" />

          <div className="ml-3 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-orange-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
            <span className="text-zinc-800 text-xs font-black uppercase tracking-wide">
              استفسار قانوني
            </span>
          </div>

          <div className="ml-auto flex items-center gap-1.5 bg-green-100 border-2 border-zinc-800 rounded-lg px-2.5 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-black text-green-700 uppercase">
              متاح
            </span>
          </div>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row gap-3 p-4 sm:p-5">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onQueryChange(e.target.value)
              }
              onKeyPress={handleKeyPress}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full bg-zinc-50 border-[3px] border-zinc-800 text-zinc-800 text-right rounded-xl py-4 px-4 text-base font-medium shadow-[inset_3px_3px_0px_0px_rgba(0,0,0,0.1)] focus:outline-none focus:border-orange-500 focus:shadow-[inset_3px_3px_0px_0px_rgba(251,146,60,0.15)] transition-all duration-300 placeholder-zinc-400 disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="اسألني أي سؤال عن القانون المغربي..."
              disabled={isLoading}
              dir="rtl"
            />
          </div>

          <button
            onClick={handleSearch}
            disabled={isLoading || !query.trim()}
            className={`
              relative group
              flex items-center justify-center gap-2
              px-6 py-4
              text-sm font-black uppercase tracking-wide
              rounded-xl
              border-4 border-zinc-800
              transition-all duration-150
              ${
                isLoading || !query.trim()
                  ? "bg-zinc-300 text-zinc-500 cursor-not-allowed shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]"
                  : "bg-gradient-to-br from-orange-400 to-orange-500 text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] hover:translate-x-[3px] hover:translate-y-[3px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.5)] active:translate-x-[5px] active:translate-y-[5px]"
              }
            `}
          >
            {!(isLoading || !query.trim()) && (
              <>
                <div className="absolute -left-1 -top-1 w-2.5 h-2.5 bg-white/60 rounded-sm" />
                <div className="absolute -right-1 -top-1 w-2.5 h-2.5 bg-white/60 rounded-sm" />
                <div className="absolute -left-1 -bottom-1 w-2.5 h-2.5 bg-white/60 rounded-sm" />
                <div className="absolute -right-1 -bottom-1 w-2.5 h-2.5 bg-white/60 rounded-sm" />
              </>
            )}

            {isLoading ? (
              <>
                <div className="w-4 h-4 border-[3px] border-zinc-400 border-t-zinc-600 rounded-full animate-spin" />
                <span>بحث...</span>
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
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
              </>
            )}
          </button>
        </div>

        {isLoading && (
          <div className="relative z-10 px-4 sm:px-5 pb-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-black text-zinc-600 uppercase tracking-wide">
                معالجة
              </span>
              <span className="text-xs font-bold text-zinc-500">•</span>
              <span className="text-xs font-bold text-orange-600 animate-pulse">
                الذكاء الاصطناعي يعمل...
              </span>
            </div>

            <div className="w-full h-3 bg-zinc-200 rounded-full border-2 border-zinc-800 overflow-hidden shadow-[inset_2px_2px_0px_0px_rgba(0,0,0,0.15)]">
              <div className="h-full bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 rounded-full animate-pulse" />
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {["قانون الأسرة", "قانون العمل", "قانون العقوبات"].map((chip) => (
          <span
            key={chip}
            className="text-xs font-black text-zinc-800 bg-orange-500 border-2 border-white/30 px-3 py-1 rounded-lg backdrop-blur-sm"
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}
