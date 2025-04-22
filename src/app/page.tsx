"use client";
import Image from "next/image";
import SearchBar from "./components/SearchBar";
import FrequentQuestions from "./components/FrequentQuestions";
import Footer from "./components/Footer";
import { useState } from 'react';
import { useRouter } from "next/router";
import { useTranslation } from "../hooks/useTranslation";
import LanguageSwitcher from "./components/LanguageSwitcher";
export default function Home() {
  // const { locale } = useRouter();
  // const t = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleQuestionClick = (question) => {
    setSearchQuery(question);
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
      {/* <div dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <LanguageSwitcher />
      <h1>{t.header?.title || "Chargement..."}</h1>
      <p>{t.home?.welcome || "Bienvenue"}</p>
    </div> */}
      {/* Search Bar */}
      <div className="w-full max-w-2xl mb-16">
        {/* <SearchBar /> */}
        <SearchBar query={searchQuery} onQueryChange={setSearchQuery} />
      </div>

      {/* Frequent Questions */}
      <div className="w-full max-w-4xl mb-16">
        {/* <FrequentQuestions /> */}
        <FrequentQuestions onQuestionClick={handleQuestionClick} />

      </div>

      {/* Footer */}
      {/* <Footer /> */}
    </main>
  );
}
