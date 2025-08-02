'use client';
import { useState } from 'react';

export default function FrequentQuestions({ onQuestionClick }) {
  const [expanded, setExpanded] = useState(false);
  const [hoveredQuestion, setHoveredQuestion] = useState(null);

  const questions = [
    {
      text: "ما هي العقوبات القانونية لانتحال شخصية شخص آخر؟",
      category: "جنائي",
      icon: "⚖️"
    },
    {
      text: "متى وكيف يجب على الموظف إبلاغ الشركة عن استقالته؟",
      category: "عمل",
      icon: "💼"
    },
    {
      text: "ما هي العواقب القانونية لعدم تجديد البطاقة الوطنية للهوية؟",
      category: "إداري",
      icon: "🆔"
    },
    {
      text: "ما هي الشروط والأحكام القانونية لزواج القاصرين في المغرب؟",
      category: "أسرة",
      icon: "👨‍👩‍👧‍👦"
    },
    {
      text: "ما هي التداعيات القانونية والعقوبات على ارتكاب جريمة القتل العمد؟",
      category: "جنائي",
      icon: "⚖️"
    },
    {
      text: "ما هي الشروط والمقتضيات للكراء اليومي للممتلكات في المغرب؟",
      category: "عقاري",
      icon: "🏠"
    },
    {
      text: "كيفية تقديم شكوى ضد موظف عمومي؟",
      category: "إداري",
      icon: "📋"
    },
    {
      text: "ما هي حقوق المستهلك في المغرب؟",
      category: "تجاري",
      icon: "🛒"
    }
  ];

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const getCategoryColor = (category) => {
    const colors = {
      "جنائي": "bg-red-100 text-red-800 border-red-200",
      "عمل": "bg-blue-100 text-blue-800 border-blue-200",
      "إداري": "bg-green-100 text-green-800 border-green-200",
      "أسرة": "bg-purple-100 text-purple-800 border-purple-200",
      "عقاري": "bg-orange-100 text-orange-800 border-orange-200",
      "تجاري": "bg-yellow-100 text-yellow-800 border-yellow-200"
    };
    return colors[category] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const displayedQuestions = expanded ? questions : questions.slice(0, 6);

  return (
    <div className="bg-white rounded-3xl border-2 border-gray-100 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      {/* En-tête */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
          <h2 className="text-3xl font-bold text-gray-800">
            أسئلة يتكرر طرحها
          </h2>
          <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
            {questions.length} سؤال
          </span>
        </div>
      </div>

      {/* Grille des questions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {displayedQuestions.map((question, index) => (
          <div
            key={index}
            className={`group relative bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl p-4 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:border-green-300 ${
              hoveredQuestion === index ? 'ring-2 ring-green-200' : ''
            }`}
            onClick={() => onQuestionClick(question.text)}
            onMouseEnter={() => setHoveredQuestion(index)}
            onMouseLeave={() => setHoveredQuestion(null)}
            dir="rtl"
          >
            {/* Badge de catégorie */}
            <div className="flex justify-between items-start mb-3">
              <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${getCategoryColor(question.category)}`}>
                {question.category}
              </span>
              <span className="text-xl opacity-70 group-hover:opacity-100 transition-opacity duration-200">
                {question.icon}
              </span>
            </div>

            {/* Texte de la question */}
            <p className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-900 transition-colors duration-200">
              {question.text}
            </p>

            {/* Indicateur de clic */}
            <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Effet de brillance au survol */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700 rounded-2xl"></div>
          </div>
        ))}
      </div>

      {/* Bouton d'expansion */}
      <div className="flex justify-center">
        <button
          onClick={toggleExpand}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <span>{expanded ? 'عرض أقل' : 'عرض المزيد'}</span>
          <svg 
            className={`w-4 h-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
}