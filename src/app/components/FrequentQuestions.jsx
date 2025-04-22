'use client';
import { useState } from 'react';

export default function FrequentQuestions() {
  const [expanded, setExpanded] = useState(false);
  
  const questions = [
    "ما هي العقوبات القانونية لانتحال شخصية شخص آخر؟",
    "متى وكيف يجب على الموظف إبلاغ الشركة عن استقالته؟",
    "ما هي العواقب القانونية لعدم تجديد البطاقة الوطنية للهوية؟",
    "ما هي الشروط والأحكام القانونية لزواج القاصرين في المغرب؟",
    "ما هي التداعيات القانونية والعقوبات على ارتكاب جريمة القتل العمد؟",
    "ما هي الشروط والمقتضيات للكراء اليومي للممتلكات في المغرب؟"
  ];

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // Crée des paires de questions pour l'affichage en deux colonnes
  const createQuestionPairs = () => {
    const pairs = [];
    for (let i = 0; i < questions.length; i += 2) {
      pairs.push(questions.slice(i, i + 2));
    }
    return pairs;
  };

  const questionPairs = createQuestionPairs();

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-light text-gray-500 text-center w-full" style={{ fontFamily: 'Arabic, sans-serif' }}>
          أسئلة يتكرر طرحها
        </h2>
      </div>

      <div className="space-y-3">
        {questionPairs.map((pair, pairIndex) => (
          <div key={pairIndex} className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {pair.map((question, index) => (
              <div 
                key={index}
                className="bg-gray-100 text-gray-700 rounded-full py-3 px-6 text-right cursor-pointer hover:bg-gray-200 transition-colors"
                dir="rtl"
              >
                {question}
              </div>
            ))}
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-6">
        <button 
          onClick={toggleExpand}
          className="text-gray-400"
        >
          {expanded ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}