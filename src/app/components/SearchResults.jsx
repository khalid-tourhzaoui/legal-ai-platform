'use client';
import { useState, useEffect } from 'react';

export default function SearchResults({ question, answer, isError }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // رسوم متحركة للظهور
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const formatAnswer = (text) => {
    // تقسيم النص إلى فقرات ومعالجة القوائم
    const paragraphs = text.split('\n').filter(p => p.trim());
    return paragraphs.map((paragraph, index) => {
      // اكتشاف القوائم النقطية
      if (paragraph.trim().startsWith('•') || paragraph.trim().startsWith('-') || paragraph.trim().match(/^\d+[\.\-]/)) {
        return (
          <li key={index} className="mb-2 text-gray-700 leading-relaxed">
            {paragraph.replace(/^[•\-\d+\.\-]\s*/, '')}
          </li>
        );
      }
      
      // اكتشاف أرقام المواد القانونية
      if (paragraph.match(/المادة\s+\d+/)) {
        return (
          <div key={index} className="bg-blue-50 border-r-4 border-blue-400 p-3 mb-4 rounded-l-lg">
            <p className="text-blue-800 font-semibold leading-relaxed">{paragraph}</p>
          </div>
        );
      }
      
      // فقرة عادية
      return (
        <p key={index} className="mb-4 text-gray-700 leading-relaxed">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className={`transform transition-all duration-500 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
    }`}>
      <div className={`bg-white rounded-3xl border-2 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 ${
        isError ? 'border-red-200 bg-red-50' : 'border-gray-100'
      }`}>
        
        {/* رأس السؤال */}
        <div className="mb-6 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3 mb-3" dir="rtl">
            <div className={`w-3 h-3 rounded-full ${
              isError ? 'bg-red-500' : 'bg-green-500'
            } animate-pulse`}></div>
            <h2 className="text-xl font-bold text-gray-800">
              السؤال
            </h2>
          </div>
          <p className="text-lg text-green-700 font-semibold bg-green-50 p-3 rounded-xl border border-green-200" dir="rtl">
            {question}
          </p>
        </div>

        {/* محتوى الإجابة */}
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-4" dir="rtl">
            <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
            <h3 className="text-xl font-bold text-gray-800">
              الإجابة
            </h3>
            {!isError && (
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                مدعوم بالذكاء الاصطناعي
              </span>
            )}
          </div>
          
          <div className={`prose prose-lg max-w-none text-right ${
            isError ? 'text-red-700' : 'text-gray-700'
          }`} dir="rtl">
            <div className="space-y-2">
              {formatAnswer(answer)}
            </div>
          </div>
        </div>

        {/* تذييل مع تحذير */}
        {!isError && (
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex items-start gap-3" dir="rtl">
                <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-yellow-800 text-sm font-bold">!</span>
                </div>
                <div className="text-sm text-yellow-800">
                  <p className="font-semibold mb-1">تنبيه قانوني مهم:</p>
                  <p>هذه المعلومات للإرشاد العام فقط ولا تشكل استشارة قانونية رسمية. ينصح بالتشاور مع محام مختص للحصول على مشورة قانونية دقيقة تناسب حالتك الخاصة.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* أزرار العمل */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => window.print()}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full transition-colors duration-200 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            طباعة
          </button>
          
          <button
            onClick={() => navigator.share && navigator.share({
              title: 'استشارة قانونية',
              text: `${question}\n\n${answer}`,
            })}
            className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-full transition-colors duration-200 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            مشاركة
          </button>
        </div>
      </div>
    </div>
  );
}