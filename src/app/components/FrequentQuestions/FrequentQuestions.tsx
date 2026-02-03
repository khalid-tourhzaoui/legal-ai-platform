"use client";
import { useState, MouseEvent } from "react";

interface FrequentQuestionsProps {
  onQuestionClick: (question: string) => void;
}

interface QuestionItem {
  text: string;
  category: string;
  icon: string;
  accentBg: string;
  accentBorder: string;
  accentText: string;
  chipBg: string;
}

export default function FrequentQuestions({ onQuestionClick }: FrequentQuestionsProps) {
  const [expanded, setExpanded] = useState(false);
  const [hoveredQuestion, setHoveredQuestion] = useState<number | null>(null);

  const questions: QuestionItem[] = [
    {
      text: "ما هي العقوبات القانونية لانتحال شخصية شخص آخر؟",
      category: "جنائي",
      icon: "⚖️",
      accentBg: "bg-red-100",
      accentBorder: "border-red-400",
      accentText: "text-red-700",
      chipBg: "bg-gradient-to-br from-red-400 to-red-500",
    },
    {
      text: "متى وكيف يجب على الموظف إبلاغ الشركة عن استقالته؟",
      category: "عمل",
      icon: "💼",
      accentBg: "bg-blue-100",
      accentBorder: "border-blue-400",
      accentText: "text-blue-700",
      chipBg: "bg-gradient-to-br from-blue-400 to-blue-500",
    },
    {
      text: "ما هي العواقب القانونية لعدم تجديد البطاقة الوطنية للهوية؟",
      category: "إداري",
      icon: "🆔",
      accentBg: "bg-emerald-100",
      accentBorder: "border-emerald-400",
      accentText: "text-emerald-700",
      chipBg: "bg-gradient-to-br from-emerald-400 to-emerald-500",
    },
    {
      text: "ما هي الشروط والأحكام القانونية لزواج القاصرين في المغرب؟",
      category: "أسرة",
      icon: "👨‍👩‍👧‍👦",
      accentBg: "bg-purple-100",
      accentBorder: "border-purple-400",
      accentText: "text-purple-700",
      chipBg: "bg-gradient-to-br from-purple-400 to-purple-500",
    },
    {
      text: "ما هي التداعيات القانونية والعقوبات على ارتكاب جريمة القتل العمد؟",
      category: "جنائي",
      icon: "⚖️",
      accentBg: "bg-orange-100",
      accentBorder: "border-orange-400",
      accentText: "text-orange-700",
      chipBg: "bg-gradient-to-br from-orange-400 to-orange-500",
    },
    {
      text: "ما هي الشروط والمقتضيات للكراء اليومي للممتلكات في المغرب؟",
      category: "عقاري",
      icon: "🏠",
      accentBg: "bg-amber-100",
      accentBorder: "border-amber-400",
      accentText: "text-amber-700",
      chipBg: "bg-gradient-to-br from-amber-400 to-amber-500",
    },
    {
      text: "كيفية تقديم شكوى ضد موظف عمومي؟",
      category: "إداري",
      icon: "📋",
      accentBg: "bg-teal-100",
      accentBorder: "border-teal-400",
      accentText: "text-teal-700",
      chipBg: "bg-gradient-to-br from-teal-400 to-teal-500",
    },
    {
      text: "ما هي حقوق المستهلك في المغرب؟",
      category: "تجاري",
      icon: "🛒",
      accentBg: "bg-lime-100",
      accentBorder: "border-lime-400",
      accentText: "text-lime-700",
      chipBg: "bg-gradient-to-br from-lime-400 to-lime-500",
    },
  ];

  const displayedQuestions = expanded ? questions : questions.slice(0, 6);

  const handleExpandClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  return (
    <div className="w-full">
      <div className="relative bg-white rounded-2xl sm:rounded-3xl border-[6px] border-zinc-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.4)] overflow-hidden">
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
            <span className="text-lg">📚</span>
            <span className="text-zinc-800 text-xs font-black uppercase tracking-wide">
              أسئلة متكررة
            </span>
          </div>

          <div className="ml-auto flex items-center gap-1.5 bg-orange-100 border-2 border-zinc-800 rounded-lg px-2.5 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
            <span className="text-xs font-black text-orange-700 uppercase">
              {questions.length} سؤال
            </span>
          </div>
        </div>

        <div className="relative z-10 p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {displayedQuestions.map((question, index) => {
              const isHovered = hoveredQuestion === index;
              return (
                <button
                  key={index}
                  onClick={() => onQuestionClick(question.text)}
                  onMouseEnter={() => setHoveredQuestion(index)}
                  onMouseLeave={() => setHoveredQuestion(null)}
                  dir="rtl"
                  className={`
                    relative w-full text-right group
                    bg-white rounded-xl
                    border-[4px] border-zinc-800
                    transition-all duration-200
                    ${
                      isHovered
                        ? "shadow-[3px_3px_0px_0px_rgba(0,0,0,0.4)] translate-x-[3px] translate-y-[3px] bg-yellow-50"
                        : "shadow-[6px_6px_0px_0px_rgba(0,0,0,0.35)]"
                    }
                  `}
                >
                  {isHovered && (
                    <>
                      <div className="absolute -left-1 -top-1 w-2.5 h-2.5 bg-yellow-300 rounded-sm z-10" />
                      <div className="absolute -right-1 -top-1 w-2.5 h-2.5 bg-yellow-300 rounded-sm z-10" />
                      <div className="absolute -left-1 -bottom-1 w-2.5 h-2.5 bg-yellow-300 rounded-sm z-10" />
                      <div className="absolute -right-1 -bottom-1 w-2.5 h-2.5 bg-yellow-300 rounded-sm z-10" />
                    </>
                  )}

                  <div
                    className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.03] rounded-lg"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 4px)",
                    }}
                  />

                  <div className="relative z-10 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`
                          inline-flex items-center
                          text-xs font-black uppercase tracking-wide text-white
                          ${question.chipBg}
                          px-3 py-1
                          rounded-lg
                          border-[2px] border-zinc-800
                          shadow-[2px_2px_0px_0px_rgba(0,0,0,0.35)]
                          group-hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.35)]
                          group-hover:translate-x-[1px] group-hover:translate-y-[1px]
                          transition-all duration-150
                        `}
                      >
                        {question.category}
                      </span>

                      <div
                        className={`
                          flex items-center justify-center
                          w-9 h-9
                          ${question.accentBg}
                          rounded-lg border-[3px] border-zinc-800
                          shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]
                          text-lg
                          group-hover:scale-110 group-hover:rotate-6
                          transition-all duration-300
                        `}
                      >
                        {question.icon}
                      </div>
                    </div>

                    <p className="text-zinc-700 text-sm font-medium leading-relaxed">
                      {question.text}
                    </p>

                    <div
                      className={`mt-3 flex items-center justify-end gap-1.5 transition-all duration-300 ${
                        isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                      }`}
                    >
                      <span className="text-xs font-black text-orange-600 uppercase tracking-wide">
                        اسأل الآن
                      </span>
                      <svg
                        className="w-4 h-4 text-orange-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleExpandClick}
              className="
                relative group
                flex items-center gap-3
                px-8 py-4
                text-sm font-black uppercase tracking-wide text-white
                bg-gradient-to-br from-orange-400 to-orange-500
                rounded-xl
                border-4 border-zinc-800
                shadow-[6px_6px_0px_0px_rgba(0,0,0,0.5)]
                hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)]
                hover:translate-x-[3px] hover:translate-y-[3px]
                active:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.5)]
                active:translate-x-[5px] active:translate-y-[5px]
                transition-all duration-150
              "
            >
              <div className="absolute -left-1 -top-1 w-2.5 h-2.5 bg-white/60 rounded-sm" />
              <div className="absolute -right-1 -top-1 w-2.5 h-2.5 bg-white/60 rounded-sm" />
              <div className="absolute -left-1 -bottom-1 w-2.5 h-2.5 bg-white/60 rounded-sm" />
              <div className="absolute -right-1 -bottom-1 w-2.5 h-2.5 bg-white/60 rounded-sm" />

              <span className="relative z-10">
                {expanded ? "عرض أقل" : "عرض المزيد"}
              </span>
              <svg
                className={`w-5 h-5 relative z-10 transition-transform duration-300 ${
                  expanded ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}