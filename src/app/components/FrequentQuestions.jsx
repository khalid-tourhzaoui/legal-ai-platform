"use client";
import { useState } from "react";

export default function FrequentQuestions({ onQuestionClick }) {
  const [expanded, setExpanded] = useState(false);
  const [hoveredQuestion, setHoveredQuestion] = useState(null);

  const questions = [
    {
      text: "ما هي العقوبات القانونية لانتحال شخصية شخص آخر؟",
      category: "جنائي",
      icon: "⚖️",
      gradient: "from-red-500 via-pink-500 to-rose-500",
    },
    {
      text: "متى وكيف يجب على الموظف إبلاغ الشركة عن استقالته؟",
      category: "عمل",
      icon: "💼",
      gradient: "from-blue-500 via-cyan-500 to-sky-500",
    },
    {
      text: "ما هي العواقب القانونية لعدم تجديد البطاقة الوطنية للهوية؟",
      category: "إداري",
      icon: "🆔",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
    },
    {
      text: "ما هي الشروط والأحكام القانونية لزواج القاصرين في المغرب؟",
      category: "أسرة",
      icon: "👨‍👩‍👧‍👦",
      gradient: "from-purple-500 via-violet-500 to-fuchsia-500",
    },
    {
      text: "ما هي التداعيات القانونية والعقوبات على ارتكاب جريمة القتل العمد؟",
      category: "جنائي",
      icon: "⚖️",
      gradient: "from-red-600 via-orange-500 to-amber-500",
    },
    {
      text: "ما هي الشروط والمقتضيات للكراء اليومي للممتلكات في المغرب؟",
      category: "عقاري",
      icon: "🏠",
      gradient: "from-orange-500 via-amber-500 to-yellow-500",
    },
    {
      text: "كيفية تقديم شكوى ضد موظف عمومي؟",
      category: "إداري",
      icon: "📋",
      gradient: "from-teal-500 via-cyan-500 to-blue-500",
    },
    {
      text: "ما هي حقوق المستهلك في المغرب؟",
      category: "تجاري",
      icon: "🛒",
      gradient: "from-yellow-500 via-lime-500 to-green-500",
    },
  ];

  const displayedQuestions = expanded ? questions : questions.slice(0, 6);

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-[2.5rem] blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
      
      <div className="relative bg-white/10 backdrop-blur-2xl rounded-[2.5rem] border-2 border-white/20 p-10 shadow-2xl hover:bg-white/15 transition-all duration-500">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 animate-pulse shadow-lg"></div>
              <div className="absolute inset-0 w-5 h-5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 animate-ping opacity-75"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              أسئلة متكررة
            </h2>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg font-black px-6 py-3 rounded-full shadow-xl transform group-hover:scale-110 transition-all duration-300 inline-block">
              {questions.length} سؤال
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {displayedQuestions.map((question, index) => (
            <div
              key={index}
              className="group/card relative"
              onClick={() => onQuestionClick(question.text)}
              onMouseEnter={() => setHoveredQuestion(index)}
              onMouseLeave={() => setHoveredQuestion(null)}
              dir="rtl"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${question.gradient} rounded-3xl blur-xl opacity-0 group-hover/card:opacity-50 transition-all duration-500`}></div>
              
              <div
                className={`relative bg-white/10 backdrop-blur-xl border-2 rounded-3xl p-6 cursor-pointer transition-all duration-500 transform ${
                  hoveredQuestion === index
                    ? "scale-105 rotate-2 shadow-2xl border-white/40 bg-white/20"
                    : "shadow-lg border-white/20 hover:shadow-xl"
                }`}
              >
                <div className="flex justify-between items-start mb-5">
                  <div className="relative group/badge">
                    <div className={`absolute inset-0 bg-gradient-to-r ${question.gradient} rounded-full blur-md opacity-75 group-hover/badge:opacity-100 transition-opacity`}></div>
                    <span
                      className={`relative text-xs font-black px-4 py-2 rounded-full bg-gradient-to-r ${question.gradient} text-white shadow-lg`}
                    >
                      {question.category}
                    </span>
                  </div>
                  <span className="text-3xl transform group-hover/card:scale-125 group-hover/card:rotate-12 transition-all duration-500">
                    {question.icon}
                  </span>
                </div>

                <p className="text-white text-base leading-relaxed font-medium group-hover/card:text-cyan-100 transition-colors duration-300">
                  {question.text}
                </p>

                <div className="absolute bottom-4 left-4 opacity-0 group-hover/card:opacity-100 transition-all duration-500 transform group-hover/card:scale-110">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full blur-lg opacity-75"></div>
                    <div className="relative w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-xl">
                      <svg
                        className="w-6 h-6 text-white transform group-hover/card:translate-x-1 transition-transform duration-300"
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
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/card:opacity-100 transform -skew-x-12 group-hover/card:translate-x-full transition-all duration-1000 rounded-3xl pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className="group/btn relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-75 group-hover/btn:opacity-100 transition-opacity"></div>
            <div className="relative flex items-center gap-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all duration-500 transform group-hover/btn:scale-110 group-hover/btn:rotate-2 shadow-xl">
              <span>{expanded ? "عرض أقل" : "عرض المزيد"}</span>
              <svg
                className={`w-6 h-6 transition-transform duration-500 ${
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
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}