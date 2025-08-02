'use client';

import { useEffect, useRef } from 'react';

export default function Footer() {
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    const textElement = textRef.current;
    const textWidth = textElement.offsetWidth;
    const containerWidth = textElement.parentElement.offsetWidth;

    let position = containerWidth;

    const animate = () => {
      position -= 0.8; // Vitesse plus lente pour une meilleure lisibilité

      if (position < -textWidth) {
        position = containerWidth;
      }

      textElement.style.transform = `translateX(${position}px)`;
      return requestAnimationFrame(animate);
    };

    const animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const scrollingText = `مَنْبِتَ ٱلْأَحْرَار مَشْرِقَ ٱلْأَنْوَار مُنْتَدَى ٱلسُّؤْدَدِ وَحِمَاه دُمْتَ مُنْتَدَاه وَحِمَاه عِشْتَ فِي ٱلْأَوْطَان لِللْعُلَى عُنْوَان مِلْءَ كُلِّ جَنَان ذِكْرَى كُلِّ لِسَان بِٱلرُّوحِ بٱلْجَسَدِ هَبَّ فَتَاك لَبَّى نَدَاك فِي فَمِي وَفِي دَمِي هَوَاكَ ثَارَ نُور وَنَار إِخْوَتِي هَيَّا لِلْعُلَى سَعْيَا نُشْهِدِ ٱلدُّنْيَا أَنَّ هُنَا نَحْيَا بِشِعَار الله ٱلْوَطَن ٱلْمَلِك`;

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-red-700 via-red-800 to-red-900 shadow-2xl z-50">
      {/* Barre de défilement avec l'hymne */}
      <div className="relative w-full overflow-hidden h-10 flex items-center">
        <div
          ref={textRef}
          className="absolute whitespace-nowrap text-white font-bold text-lg tracking-wide drop-shadow-lg"
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          {scrollingText}
        </div>
      </div>

      {/* Informations supplémentaires */}
      <div className="bg-red-900 px-4 py-2">
        <div className="flex justify-between items-center text-white text-xs">
          <div className="flex items-center gap-4">
            <span>© 2024 مساعد القانون المغربي</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">مدعوم بالذكاء الاصطناعي</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs">متصل</span>
          </div>
        </div>
      </div>
    </footer>
  );
}