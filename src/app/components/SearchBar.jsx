'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar({ query, onQueryChange, onSearchComplete}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: query }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Appeler le callback avec les résultats
        if (onSearchComplete) {
          onSearchComplete({
            question: query,
            answer: data.answer
          });
        }
      } else {
        console.error('API Error:');
      }
      
    } catch (error) {
      console.error('Error searching:');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="flex items-center">
        <div className="relative w-full flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="bg-white border border-gray-300 text-gray-900 text-right rounded-full w-full py-4 px-6 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="اسألني أي سؤال عن القانون المغربي..."
          />
          <button
            type="submit"
            className="absolute left-2 rounded-full border bg-green-800 hover:bg-white hover:border-green-800 text-white hover:text-green-800 px-6 py-2 font-bold cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? 'جاري البحث...' : 'بحث'}
          </button>
        </div>
      </form>
    </div>
  );
}