// src/components/DonateButton.jsx
import Image from 'next/image';

export default function DonateButton() {
  return (
    <div className="w-full bg-white rounded-lg border border-gray-100 p-4 flex justify-center items-center shadow-sm">
      <a 
        href="https://www.gofundme.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center"
      >
        <button className="bg-[#F5B72F] text-gray-800 font-bold py-2 px-6 rounded-lg mr-4">
          Donate now
        </button>
        <Image 
          src="/gofundme-logo.svg" 
          alt="GoFundMe" 
          width={120} 
          height={30} 
          className="h-8 w-auto"
        />
      </a>
    </div>
  );
}