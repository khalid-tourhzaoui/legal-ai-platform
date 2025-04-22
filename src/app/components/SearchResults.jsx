'use client';
export default function SearchResults({ question, answer }) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-green-700  mb-2 text-center" dir="rtl">
          السؤال: {question}
        </h2>
        <div className="prose prose-lg max-w-none text-right" dir="rtl">
          {answer.split('\n').map((paragraph, i) => (
            <p key={i} className="mb-4 text-gray-700">{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}