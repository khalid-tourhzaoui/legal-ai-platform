"use client";
import { useState, useEffect } from "react";

export default function SearchResults({ question, answer, isError }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const formatAnswer = (text) => {
    const paragraphs = text.split("\n").filter((p) => p.trim());
    return paragraphs.map((paragraph, index) => {
      if (
        paragraph.trim().startsWith("•") ||
        paragraph.trim().startsWith("-") ||
        paragraph.trim().match(/^\d+[\.\-]/)
      ) {
        return (
          <li
            key={index}
            className="mb-4 text-cyan-50 leading-relaxed font-medium text-lg"
          >
            {paragraph.replace(/^[•\-\d+\.\-]\s*/, "")}
          </li>
        );
      }

      if (paragraph.match(/المادة\s+\d+/)) {
        return (
          <div
            key={index}
            className="relative group mb-6"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-xl border-2 border-blue-400/30 border-r-4 border-r-blue-400 p-6 rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
              <p className="text-blue-100 font-black text-lg leading-relaxed">
                {paragraph}
              </p>
            </div>
          </div>
        );
      }

      return (
        <p
          key={index}
          className="mb-6 text-cyan-50 leading-relaxed font-medium text-lg"
        >
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div
      className={`transform transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-12 opacity-0 scale-95"
      }`}
    >
      <div className="relative group">
        <div className={`absolute inset-0 rounded-[2.5rem] blur-2xl opacity-50 ${
          isError
            ? "bg-gradient-to-r from-red-500 to-pink-500"
            : "bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"
        }`}></div>
        
        <div
          className={`relative backdrop-blur-2xl rounded-[2.5rem] border-2 p-10 shadow-2xl transition-all duration-500 ${
            isError
              ? "bg-red-500/10 border-red-400/30"
              : "bg-white/10 border-white/20 hover:bg-white/15"
          }`}
        >
          <div className="mb-10 pb-8 border-b-2 border-white/10">
            <div className="flex items-center gap-4 mb-6" dir="rtl">
              <div className="relative">
                <div
                  className={`w-5 h-5 rounded-full ${
                    isError
                      ? "bg-gradient-to-r from-red-400 to-pink-400"
                      : "bg-gradient-to-r from-cyan-400 to-blue-400"
                  } animate-pulse shadow-lg`}
                ></div>
                <div
                  className={`absolute inset-0 w-5 h-5 rounded-full ${
                    isError
                      ? "bg-gradient-to-r from-red-400 to-pink-400"
                      : "bg-gradient-to-r from-cyan-400 to-blue-400"
                  } animate-ping opacity-75`}
                ></div>
              </div>
              <h2 className="text-3xl font-black text-white">
                السؤال
              </h2>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <p
                className="relative text-xl text-white font-bold bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 backdrop-blur-xl p-6 rounded-2xl border-2 border-emerald-400/30 shadow-xl transform hover:scale-[1.01] transition-all duration-300"
                dir="rtl"
              >
                {question}
              </p>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6" dir="rtl">
              <div className="relative">
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse shadow-lg"></div>
                <div className="absolute inset-0 w-5 h-5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-ping opacity-75"></div>
              </div>
              <h3 className="text-3xl font-black text-white">
                الإجابة
              </h3>
              {!isError && (
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-black px-4 py-2 rounded-full shadow-xl transform group-hover:scale-110 transition-all duration-300">
                    AI مدعوم
                  </span>
                </div>
              )}
            </div>

            <div
              className={`prose prose-lg max-w-none text-right ${
                isError ? "text-red-200" : "text-cyan-50"
              }`}
              dir="rtl"
            >
              <div className="space-y-2">{formatAnswer(answer)}</div>
            </div>
          </div>

          {!isError && (
            <div className="mt-10 pt-8 border-t-2 border-white/10">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-xl border-2 border-yellow-400/30 rounded-2xl p-6 shadow-xl transform hover:scale-[1.01] transition-all duration-300">
                  <div className="flex items-start gap-4" dir="rtl">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-lg opacity-75"></div>
                      <div className="relative w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-xl">
                        <span className="text-white text-xl font-black">!</span>
                      </div>
                    </div>
                    <div className="text-sm text-yellow-100">
                      <p className="font-black mb-3 text-lg">تنبيه قانوني مهم:</p>
                      <p className="font-medium leading-relaxed">
                        هذه المعلومات للإرشاد العام فقط ولا تشكل استشارة قانونية
                        رسمية. ينصح بالتشاور مع محام مختص للحصول على مشورة قانونية
                        دقيقة تناسب حالتك الخاصة.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-10 flex justify-center gap-6">
            <button
              onClick={() => window.print()}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-slate-500 to-gray-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-slate-600 to-gray-600 hover:from-slate-700 hover:to-gray-700 text-white px-8 py-4 rounded-2xl transition-all duration-300 flex items-center gap-3 font-bold shadow-xl transform group-hover:scale-110 group-hover:-rotate-2">
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
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                  />
                </svg>
                <span>طباعة</span>
              </div>
            </button>

            <button
              onClick={() =>
                navigator.share &&
                navigator.share({
                  title: "استشارة قانونية",
                  text: `${question}\n\n${answer}`,
                })
              }
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-2xl transition-all duration-300 flex items-center gap-3 font-bold shadow-xl transform group-hover:scale-110 group-hover:rotate-2">
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
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                  />
                </svg>
                <span>مشاركة</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}