"use client";
import { useState, useEffect } from "react";

export default function SearchResults({ question, answer, isError }) {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  /* ── parse answer into structured blocks ── */
  const formatAnswer = (text) => {
    const paragraphs = text.split("\n").filter((p) => p.trim());
    return paragraphs.map((paragraph, index) => {
      // list item
      if (
        paragraph.trim().startsWith("•") ||
        paragraph.trim().startsWith("-") ||
        paragraph.trim().match(/^\d+[\.\-]/)
      ) {
        return (
          <li
            key={index}
            className="flex items-start gap-3 bg-white border-[3px] border-zinc-800 rounded-lg px-4 py-3 shadow-[rgba(0,0,0,0.7)_0px_3px_0px_0px]"
          >
            <span className="mt-1.5 flex-shrink-0 w-2.5 h-2.5 rounded-full bg-orange-500 border-2 border-zinc-800" />
            <span className="text-zinc-700 text-base sm:text-lg leading-relaxed font-medium">
              {paragraph.replace(/^[•\-\d+\.\-]\s*/, "")}
            </span>
          </li>
        );
      }

      // المادة block — highlighted article reference
      if (paragraph.match(/المادة\s+\d+/)) {
        return (
          <div
            key={index}
            className="relative bg-blue-100 border-[3px] border-zinc-800 border-r-[6px] border-r-blue-500 rounded-lg px-5 py-4 shadow-[rgba(0,0,0,0.7)_0px_3px_0px_0px]"
          >
            {/* scanline */}
            <div
              className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.04] rounded-lg"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 4px)",
              }}
            />
            <p className="relative z-10 text-blue-800 font-black text-base sm:text-lg leading-relaxed">
              {paragraph}
            </p>
          </div>
        );
      }

      // normal paragraph
      return (
        <p
          key={index}
          className="text-zinc-700 text-base sm:text-lg leading-relaxed font-medium"
        >
          {paragraph}
        </p>
      );
    });
  };

  /* ── copy to clipboard ── */
  const handleCopy = () => {
    navigator.clipboard.writeText(`${question}\n\n${answer}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  /* ── shared header-bar component ── */
  const HeaderBar = ({ title, icon, rightContent }) => (
    <div className="bg-white border-b-[4px] border-zinc-800 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 flex items-center justify-between flex-shrink-0">
      <div className="flex items-center gap-2 sm:gap-3">
        {/* traffic-light dots */}
        <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-red-400 border-2 border-zinc-800 inline-block" />
        <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-yellow-400 border-2 border-zinc-800 inline-block" />
        <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-green-500 border-2 border-zinc-800 inline-block" />
        <h3 className="text-xs sm:text-sm font-black uppercase ml-1 sm:ml-2 flex items-center gap-1.5">
          {icon}
          {title}
        </h3>
      </div>
      {rightContent}
    </div>
  );

  /* ─────────────────────────── RENDER ─────────────────────── */
  return (
    <div
      className={`transform transition-all duration-700 ${
        isVisible
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-12 opacity-0 scale-95"
      }`}
    >
      {/* ── outer two-column grid (stacks on mobile) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 sm:gap-6">
        {/* ════════════ LEFT PANEL — Question switchboard ════════════ */}
        <div
          className={`lg:col-span-2 border-[6px] border-zinc-800 rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col ${
            isError ? "bg-red-50" : "bg-yellow-50"
          } shadow-[rgba(0,0,0,0.9)_0px_8px_0px_0px] sm:shadow-[rgba(0,0,0,0.9)_0px_10px_0px_0px]`}
        >
          <HeaderBar
            title="السؤال"
            icon={
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            }
            rightContent={
              <span className="text-[10px] sm:text-xs text-zinc-500 font-mono hidden sm:flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" /></svg>
                Input received
              </span>
            }
          />

          {/* question card */}
          <div className="p-4 sm:p-5 md:p-6 flex-grow flex flex-col justify-between">
            <div
              className="bg-white border-[3px] border-zinc-800 rounded-xl p-4 sm:p-5 shadow-[rgba(0,0,0,0.7)_0px_4px_0px_0px]"
              dir="rtl"
            >
              {/* scanline */}
              <div
                className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.03] rounded-xl"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 4px)",
                }}
              />
              <p className="relative z-10 text-zinc-800 text-base sm:text-lg md:text-xl font-bold leading-relaxed">
                {question}
              </p>
            </div>

            {/* status indicator */}
            <div className="mt-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse border border-zinc-800" />
              <span className="text-xs font-black text-zinc-600 uppercase tracking-wide">
                تم استلام السؤال
              </span>
            </div>
          </div>

          {/* dark footer */}
          <div className="bg-zinc-800 px-4 sm:px-5 py-2 sm:py-2.5 flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>
            <span className="text-white text-[10px] sm:text-xs font-mono">
              signal routed → processing
            </span>
          </div>
        </div>

        {/* ════════════ RIGHT PANEL — CRT answer monitor ════════════ */}
        <div
          className={`lg:col-span-3 border-[6px] border-zinc-800 rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col shadow-[rgba(0,0,0,0.9)_0px_8px_0px_0px] sm:shadow-[rgba(0,0,0,0.9)_0px_10px_0px_0px] ${
            isError ? "bg-red-100" : "bg-zinc-100"
          }`}
        >
          <HeaderBar
            title="الإجابة"
            icon={
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-1.231 2.605-1.231 2.906 0l.254 1.043c.172.698.69 1.254 1.355 1.511.665.257 1.415.145 1.916-.355l.741-.741c.89-.89 2.349-.737 3.042.152.694.89.567 2.402-.323 3.292l-.741.741c-.501.501-.614 1.251-.357 1.916.258.665.815 1.183 1.512 1.355l1.043.254c1.231.3 1.231 2.606 0 2.905l-1.043.254a2.485 2.485 0 00-1.512 1.356c-.258.665-.145 1.415.356 1.916l.741.741c.89.889.737 2.348-.152 3.041-.89.694-2.402.568-3.292-.322l-.741-.741a2.484 2.484 0 00-1.916-.357c-.665.257-1.183.814-1.355 1.511l-.254 1.043c-.3 1.231-2.605 1.231-2.906 0l-.254-1.043a2.485 2.485 0 00-1.355-1.511c-.666-.258-1.416-.145-1.916.357l-.741.741c-.889.89-2.349.737-3.042-.152-.693-.89-.567-2.402.323-3.292l.741-.741a2.483 2.483 0 00.357-1.916 2.484 2.484 0 00-1.512-1.355l-1.043-.254c-1.231-.3-1.231-2.606 0-2.905l1.043-.254a2.485 2.485 0 001.511-1.356c.258-.666.145-1.416-.357-1.916l-.741-.741c-.889-.889-.736-2.349.153-3.042.889-.693 2.401-.567 3.291.323l.741.741a2.484 2.484 0 001.916.357 2.484 2.484 0 001.355-1.511l.254-1.043zM10 13a3 3 0 100-6 3 3 0 000 6z" />
              </svg>
            }
            rightContent={
              !isError && (
                <div className="flex items-center gap-2 bg-orange-100 border-2 border-zinc-800 rounded-lg px-2.5 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] sm:text-xs font-black text-orange-700 uppercase">
                    AI مدعوم
                  </span>
                </div>
              )
            }
          />

          {/* ── CRT screen body with scanline ── */}
          <div className="relative bg-gradient-to-b from-zinc-50 to-zinc-100 p-4 sm:p-5 md:p-6 lg:p-8 flex-grow">
            {/* scanline overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 2px, transparent 2px, transparent 4px)",
              }}
            />

            <div className="relative z-10 space-y-4 sm:space-y-5" dir="rtl">
              {/* ── answer body ── */}
              <div
                className={`space-y-3 sm:space-y-4 ${
                  isError ? "text-red-700" : "text-zinc-700"
                }`}
              >
                {formatAnswer(answer)}
              </div>

              {/* ── legal disclaimer (non-error only) ── */}
              {!isError && (
                <div className="relative bg-yellow-100 border-[3px] border-zinc-800 rounded-xl p-4 sm:p-5 shadow-[rgba(0,0,0,0.7)_0px_4px_0px_0px] mt-5">
                  {/* scanline */}
                  <div
                    className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.04] rounded-xl"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 4px)",
                    }}
                  />
                  <div className="relative z-10 flex items-start gap-3">
                    {/* warning icon box */}
                    <div className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0 bg-orange-100 rounded-lg border-[3px] border-zinc-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
                      <span className="text-orange-600 text-xl font-black">!</span>
                    </div>
                    <div>
                      <p className="text-zinc-800 font-black text-base sm:text-lg mb-1.5 uppercase tracking-wide">
                        تنبيه قانوني مهم
                      </p>
                      <p className="text-zinc-700 text-sm sm:text-base font-medium leading-relaxed">
                        هذه المعلومات للإرشاد العام فقط ولا تشكل استشارة قانونية
                        رسمية. ينصح بالتشاور مع محامٍ مختص للحصول على مشورة قانونية
                        دقيقة تناسب حالتك الخاصة.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── dark footer action bar ── */}
          <div className="bg-zinc-800 border-t-[4px] border-zinc-800 px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 flex items-center justify-between flex-shrink-0">
            <p className="text-white text-[10px] sm:text-xs font-mono hidden sm:flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>
              Response rendered • AI output
            </p>

            {/* action buttons — press-down style */}
            <div className="flex gap-2 sm:gap-3 ml-auto">
              {/* Print */}
              <button
                onClick={() => window.print()}
                className="
                  relative group
                  flex items-center gap-1.5
                  bg-blue-500 text-white
                  px-3 sm:px-4 py-1.5 sm:py-2
                  rounded-lg
                  border-[3px] border-zinc-800
                  font-black text-xs sm:text-sm uppercase
                  shadow-[rgba(0,0,0,0.9)_0px_3px_0px_0px]
                  hover:shadow-[rgba(0,0,0,0.9)_0px_1px_0px_0px]
                  hover:translate-y-[2px]
                  active:shadow-none
                  active:translate-y-[3px]
                  transition-all duration-100
                "
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                <span>طباعة</span>
              </button>

              {/* Copy */}
              <button
                onClick={handleCopy}
                className="
                  relative group
                  flex items-center gap-1.5
                  bg-emerald-500 text-white
                  px-3 sm:px-4 py-1.5 sm:py-2
                  rounded-lg
                  border-[3px] border-zinc-800
                  font-black text-xs sm:text-sm uppercase
                  shadow-[rgba(0,0,0,0.9)_0px_3px_0px_0px]
                  hover:shadow-[rgba(0,0,0,0.9)_0px_1px_0px_0px]
                  hover:translate-y-[2px]
                  active:shadow-none
                  active:translate-y-[3px]
                  transition-all duration-100
                "
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {copied ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-3 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  )}
                </svg>
                <span>{copied ? "تم نسخ" : "نسخ"}</span>
              </button>

              {/* Share */}
              {navigator?.share && (
                <button
                  onClick={() =>
                    navigator.share({
                      title: "استشارة قانونية",
                      text: `${question}\n\n${answer}`,
                    })
                  }
                  className="
                    relative group
                    flex items-center gap-1.5
                    bg-orange-500 text-white
                    px-3 sm:px-4 py-1.5 sm:py-2
                    rounded-lg
                    border-[3px] border-zinc-800
                    font-black text-xs sm:text-sm uppercase
                    shadow-[rgba(0,0,0,0.9)_0px_3px_0px_0px]
                    hover:shadow-[rgba(0,0,0,0.9)_0px_1px_0px_0px]
                    hover:translate-y-[2px]
                    active:shadow-none
                    active:translate-y-[3px]
                    transition-all duration-100
                  "
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  <span>مشاركة</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}