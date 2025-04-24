'use client';
import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

export default function FrequentQuestions({ onQuestionClick }) {
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation();

  // Questions en 3 langues (arabe, français, anglais)
  const questions = {
    ar: [
      "ما هي العقوبات القانونية لانتحال شخصية شخص آخر؟",
      "متى وكيف يجب على الموظف إبلاغ الشركة عن استقالته؟",
      "ما هي العواقب القانونية لعدم تجديد البطاقة الوطنية للهوية؟",
      "ما هي الشروط والأحكام القانونية لزواج القاصرين في المغرب؟",
      "ما هي التداعيات القانونية والعقوبات على ارتكاب جريمة القتل العمد؟",
      "ما هي الشروط والمقتضيات للكراء اليومي للممتلكات في المغرب؟"
    ],
    fr: [
      "Quelles sont les sanctions légales pour l'usurpation d'identité ?",
      "Quand et comment un employé doit-il notifier l'entreprise de sa démission ?",
      "Quelles sont les conséquences juridiques du non-renouvellement de la carte d'identité nationale ?",
      "Quelles sont les conditions légales pour le mariage des mineurs au Maroc ?",
      "Quelles sont les implications juridiques et les sanctions pour homicide volontaire ?",
      "Quelles sont les conditions et exigences pour la location journalière de propriétés au Maroc ?"
    ],
    en: [
      "What are the legal penalties for identity theft?",
      "When and how should an employee notify the company of their resignation?",
      "What are the legal consequences of not renewing the national identity card?",
      "What are the legal terms and conditions for minors' marriage in Morocco?",
      "What are the legal implications and penalties for committing first-degree murder?",
      "What are the conditions and requirements for daily rental of properties in Morocco?"
    ]
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // Fonction pour obtenir les questions dans la langue actuelle
  const getCurrentLanguageQuestions = () => {
    // Essayer d'obtenir la langue actuelle du localStorage ou utiliser 'ar' par défaut
    const currentLang = typeof window !== 'undefined' ? localStorage.getItem('NEXT_LOCALE') || 'ar' : 'ar';
    return questions[currentLang] || questions.ar; // Retour par défaut aux questions en arabe si langue non disponible
  };

  const createQuestionPairs = () => {
    const currentQuestions = getCurrentLanguageQuestions();
    const pairs = [];
    for (let i = 0; i < currentQuestions.length; i += 2) {
      pairs.push(currentQuestions.slice(i, i + 2));
    }
    return pairs;
  };

  const questionPairs = createQuestionPairs();

  // Traductions pour le titre
  const titles = {
    ar: "أسئلة يتكرر طرحها",
    fr: "Questions fréquemment posées",
    en: "Frequently Asked Questions"
  };

  // Obtenir le titre dans la langue actuelle
  const getTitle = () => {
    const currentLang = typeof window !== 'undefined' ? localStorage.getItem('NEXT_LOCALE') || 'ar' : 'ar';
    return titles[currentLang] || titles.ar;
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-2 shadow-sm mx-2">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-light text-gray-500 text-center w-full">
          {getTitle()}
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
                onClick={() => onQuestionClick(question)}
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