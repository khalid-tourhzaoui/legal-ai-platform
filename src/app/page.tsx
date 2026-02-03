"use client";

import SearchBar from "./components/SearchBar";
import FrequentQuestions from "./components/FrequentQuestions";
import Footer from "./components/Footer";
import SearchResults from "./components/SearchResults";
import { useState } from "react";

/* ─────────────────────────── HEADER (Portfolio style) ─────────────────────── */

const Header = ({ onReset }: { onReset: () => void }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed w-[calc(100%-24px)] max-w-[1200px] left-1/2 -translate-x-1/2 top-3 sm:top-4 md:top-6 z-50 px-3 sm:px-0">
        <div className="relative flex items-center justify-between bg-white shadow-[rgba(0,0,0,0.9)_0px_6px_0px_0px,rgba(0,0,0,0.35)_0px_12px_20px_-8px] sm:shadow-[rgba(0,0,0,0.9)_0px_8px_0px_0px,rgba(0,0,0,0.35)_0px_16px_26px_-12px] h-16 sm:h-[72px] px-3 sm:px-4 md:px-6 rounded-full border-2 border-zinc-800">
          {/* Logo */}
          <button onClick={onReset} className="group flex items-center gap-3 shrink-0">
            <div className="relative">
              <span className="flex items-center justify-center bg-white h-10 w-10 sm:h-12 sm:w-12 border-zinc-800 rounded-full border-4 group-hover:border-purple-500 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                <span className="bg-purple-500 block h-[55%] w-[55%] rounded-full group-hover:bg-cyan-400 transition-colors duration-300 group-hover:scale-110"></span>
              </span>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 animate-pulse"></span>
            </div>
            <span className="hidden sm:block text-sm font-bold text-zinc-800 group-hover:text-purple-600 transition-colors duration-300 whitespace-nowrap">
              القانون المغربي
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center">
            <ul className="flex items-center gap-6 lg:gap-8">
              {[
                { label: "GitHub", href: "https://github.com/khalid-tourhzaoui", icon: (<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>) },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/khalid-tourhzaoui/", icon: (<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>) },
                { label: "Portfolio", href: "https://khalid-tourhzaoui.vercel.app/", icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>) },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-purple-600 transition-all duration-300 relative">
                    <span className="group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                    <span className="group-hover:translate-x-0.5 transition-transform duration-300">{item.label}</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile hamburger */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="group flex flex-col justify-center items-center w-10 h-10 md:hidden z-10 bg-white border-2 border-zinc-800 rounded-lg hover:bg-purple-50 hover:border-purple-500 transition-all duration-300 hover:scale-110" aria-label="Toggle menu">
            <span className={`bg-zinc-800 group-hover:bg-purple-600 block h-0.5 w-5 rounded-sm transition-all duration-300 ease-out ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : "-translate-y-1"}`} />
            <span className={`bg-zinc-800 group-hover:bg-purple-600 block h-0.5 w-5 rounded-sm my-1 transition-all duration-300 ease-out ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`bg-zinc-800 group-hover:bg-purple-600 block h-0.5 w-5 rounded-sm transition-all duration-300 ease-out ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : "translate-y-1"}`} />
          </button>

          {/* Desktop right badge */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-xs font-bold px-4 py-2 rounded-full border-2 border-zinc-800 shadow-[rgba(0,0,0,0.95)_2px_3px_0px_0px]">
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
              <span>مدعوم بالذكاء الاصطناعي</span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile dropdown */}
      {isMobileMenuOpen && <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />}
      <nav className={`fixed top-[72px] sm:top-[84px] left-3 right-3 max-w-[1200px] mx-auto bg-white rounded-2xl border-4 border-zinc-800 shadow-[rgba(0,0,0,0.9)_0px_6px_0px_0px,rgba(0,0,0,0.35)_0px_12px_20px_-8px] transition-all duration-300 ease-in-out z-40 md:hidden ${isMobileMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
        <ul className="flex flex-col py-3">
          {[
            { label: "GitHub", href: "https://github.com/khalid-tourhzaoui" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/khalid-tourhzaoui/" },
            { label: "Portfolio", href: "https://khalid-tourhzaoui.vercel.app/" },
          ].map((item) => (
            <li key={item.label}>
              <a href={item.href} target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)} className="group flex items-center gap-4 px-6 py-3.5 text-base font-medium text-zinc-600 hover:text-zinc-900 hover:bg-purple-50 transition-all duration-300 rounded-lg mx-2">
                <span className="flex items-center justify-center w-10 h-10 rounded-lg border-2 border-zinc-800 bg-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 text-purple-600">
                  {item.label === "GitHub" && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>}
                  {item.label === "LinkedIn" && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>}
                  {item.label === "Portfolio" && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>}
                </span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">{item.label}</span>
                <svg className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

/* ─────────────────────────── PAGE ─────────────────────────────────────────── */

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
        setSearchResults({ question: query, answer: "عذرًا، لم نتمكن من معالجة طلبك في الوقت الحالي. يرجى المحاولة مرة أخرى لاحقًا.", isError: true });
        setShowFrequentQuestions(false);
      }
    } catch (error) {
      console.error("Error searching:", error);
      setSearchResults({ question: query, answer: "حدث خطأ أثناء الاتصال بالخدمة. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.", isError: true });
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
      {/* Portfolio-style background with organic blobs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Base gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-yellow-100" />
        
        {/* Organic blob shapes - inspired by portfolio */}
        <div className="absolute top-0 left-0 w-48 h-48 md:w-64 md:h-64 opacity-70"
          style={{ transform: "rotate(-12deg)" }}>
          <div className="w-full h-full rounded-[40%] bg-gradient-to-br from-orange-300 to-yellow-200 opacity-80" />
        </div>
        
        <div className="absolute top-4 right-0 w-36 h-36 md:w-56 md:h-56 opacity-60"
          style={{ transform: "rotate(25deg)" }}>
          <div className="w-full h-full rounded-[45%] bg-gradient-to-br from-purple-300 to-yellow-200 opacity-70" />
        </div>

        {/* Geometric decorators */}
        <div className="absolute bottom-6 left-4 md:bottom-8 md:left-8 w-16 h-16 md:w-24 md:h-24 rounded-full border-[3px] border-zinc-800 bg-yellow-50 opacity-90" />
        <div className="absolute bottom-10 right-6 md:bottom-14 md:right-10 w-20 h-20 md:w-28 md:h-28 rounded-xl border-[3px] border-zinc-500 bg-yellow-50 opacity-90" />
      </div>

      <Header onReset={handleReset} />

      <div className="relative w-full flex flex-col items-center pt-24 md:pt-28 pb-32 px-4 md:px-6 z-10">

        {/* ════════════════════════════════════════════════════════════════
            HERO Section - Portfolio inspired
            ════════════════════════════════════════════════════════════════ */}
        <section className="relative w-full max-w-screen-xl mx-auto mb-10 sm:mb-14">
          <div className="px-6 md:px-16 py-8 sm:py-10 md:py-14">

            {/* LEVEL badge */}
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-flex items-center px-3 py-1.5 text-xs font-black bg-white border-2 border-zinc-800 rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,0.4)] uppercase">
                المستوى ★ متقدم
              </span>
              <span className="text-xs text-zinc-500 font-black uppercase tracking-wider">
                استشارات قانونية • AI
              </span>
            </div>

            {/* title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-4" dir="rtl">
              <span className="text-zinc-800">القانون </span>
              <span className="text-orange-500">المغربي</span>
            </h1>

            {/* subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-zinc-600 leading-relaxed max-w-2xl mb-6 font-medium" dir="rtl">
              استشارات قانونية ذكية بتقنية الذكاء الاصطناعي المتطورة — اسأل أي سؤال قانوني وتلقّ إجابة دقيقة في ثوانٍ.
            </p>

            {/* skill chips row */}
            <div className="flex flex-wrap gap-2 mb-7">
              {["مجاني 100%", "فائق السرعة", "دقة عالية", "قانون المغرب", "AI مدعوم"].map((chip) => (
                <span key={chip} className="inline-flex items-center px-3 py-1.5 text-xs font-black bg-white border-2 border-zinc-800 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
                  {chip}
                </span>
              ))}
            </div>

            {/* tilted info cards grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
              {[
                { icon: "⚖️", title: "القانون العام", sub: "قانون الأسرة • العمل" },
                { icon: "🔍", title: "بحث فوري", sub: "إجابات خلال ثوانٍ" },
                { icon: "🌍", title: "المغرب", sub: "القانون المغربي حصرًا" },
                { icon: "🛡️", title: "مجاني", sub: "بلا قيود - دائمًا" },
              ].map((card, i) => (
                <div
                  key={card.title}
                  className="bg-white border-2 border-zinc-800 rounded-xl p-3 sm:p-4 hover:rotate-0 transition-transform duration-300 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.35)] cursor-default"
                  style={{ transform: `rotate(${[-1.8, 1, -1, 1.5][i]}deg)` }}
                >
                  <div className="text-lg mb-1">{card.icon}</div>
                  <div className="text-xs font-black text-zinc-800 mb-0.5">{card.title}</div>
                  <div className="text-[10px] text-zinc-500 font-medium">{card.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* ════ end hero ════ */}

        {/* Search bar */}
        <div className="w-full max-w-5xl mb-12">
          <SearchBar
            query={searchQuery}
            onQueryChange={setSearchQuery}
            onSearchComplete={() => handleSearch(searchQuery)}
          />
        </div>

        {/* Loading spinner */}
        {isLoading && (
          <div className="w-full max-w-5xl mb-12">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-50 animate-pulse" />
              <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-12 shadow-2xl">
                <div className="flex flex-col items-center justify-center space-y-6">
                  <div className="relative w-24 h-24">
                    <div className="absolute inset-0 border-8 border-cyan-200/20 rounded-full" />
                    <div className="absolute inset-0 border-8 border-transparent border-t-cyan-400 border-r-blue-400 rounded-full animate-spin" />
                    <div className="absolute inset-3 border-8 border-transparent border-t-purple-400 border-r-pink-400 rounded-full animate-spin" style={{ animationDirection: "reverse", animationDuration: "1s" }} />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-black text-zinc-800">جاري تحليل السؤال</h3>
                    <p className="text-zinc-600 max-w-md">يقوم الذكاء الاصطناعي بمعالجة استفسارك للحصول على أدق إجابة</p>
                  </div>
                  <div className="flex gap-2">
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-bounce shadow-lg shadow-cyan-400/50" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search results */}
        {searchResults && (
          <div className="w-full max-w-5xl mb-12">
            <SearchResults question={searchResults.question} answer={searchResults.answer} isError={searchResults.isError} />
            {searchResults.model && (
              <div className="mt-6 flex justify-center">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />
                  <div className="relative bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-3 shadow-xl">
                    <div className="flex items-center gap-3 text-white">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                      <span className="font-medium">مدعوم بـ</span>
                      <span className="font-black">{searchResults.model}</span>
                      <span className="opacity-50">على</span>
                      <span className="font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Groq</span>
                      {(searchResults.tokens_used ?? 0) > 0 && (<><span className="opacity-50">•</span><span className="text-sm">{searchResults.tokens_used} رمز</span></>)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Frequent questions */}
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