"use client";

import { useEffect, useRef } from "react";

export default function Footer() {
  const textRef = useRef(null);
  const currentYear = new Date().getFullYear();
  
  useEffect(() => {
    if (!textRef.current) return;

    const textElement = textRef.current;
    const textWidth = textElement.offsetWidth;
    const containerWidth = textElement.parentElement.offsetWidth;

    let position = containerWidth;

    const animate = () => {
      position -= 0.8;

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
    <footer className="fixed bottom-0 left-0 w-full z-50">
      <div className="relative backdrop-blur-xl bg-gradient-to-r from-purple-600/90 via-blue-600/90 to-cyan-600/90 shadow-2xl border-t border-white/10">
        <div className="relative w-full overflow-hidden h-14 flex items-center">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-cyan-500/20"></div>
          <div
            ref={textRef}
            className="absolute whitespace-nowrap text-white font-black text-xl tracking-wider drop-shadow-2xl"
          >
            {scrollingText}
          </div>
        </div>

        
      </div>
    </footer>
  );
}