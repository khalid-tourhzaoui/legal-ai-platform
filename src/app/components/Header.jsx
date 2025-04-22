'use client';

import Image from 'next/image';

export default function Header() {
  return (
    <div className="relative w-full flex justify-center items-center py-4">
      {/* Horizontal line */}
      <div className="absolute w-full h-px bg-gray-200"></div>
      
      {/* Moroccan star with white background */}
      <div className="relative bg-white px-4 z-10">
        <div className="w-12 h-12 flex items-center justify-center">
          <Image 
            src="/moroccan-star.svg" 
            alt="Moroccan Star" 
            width={28} 
            height={28}
            className="text-green-700"
          />
        </div>
      </div>
    </div>
  );
}