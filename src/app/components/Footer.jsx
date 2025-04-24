'use client';

import { useEffect, useRef } from 'react';

export default function Footer() {
  // Références
  const textRef = useRef(null);
  
  // Logique d'animation
  useEffect(() => {
    // Vérification que la référence existe
    if (!textRef.current) return;
    
    const textElement = textRef.current;
    const textWidth = textElement.offsetWidth;
    const containerWidth = textElement.parentElement.offsetWidth;
    
    // Position initiale du texte (commence hors de l'écran à droite)
    let position = containerWidth;
    
    // Fonction d'animation
    const animate = () => {
      // Déplacement du texte vers la gauche
      position -= 1;
      
      // Réinitialiser la position quand le texte disparaît complètement
      if (position < -textWidth) {
        position = containerWidth;
      }
      
      // Application de la transformation
      textElement.style.transform = `translateX(${position}px)`;
      
      // Continuer l'animation
      const animationFrame = requestAnimationFrame(animate);
      return animationFrame;
    };
    
    // Démarrer l'animation
    const animationFrame = requestAnimationFrame(animate);
    
    // Nettoyer l'animation lors du démontage du composant
    return () => cancelAnimationFrame(animationFrame);
  }, []);
  
  // Contenu du texte défilant
  const scrollingText = `مَنْبِتَ ٱلْأَحْرَار
مَشْرِقَ ٱلْأَنْوَار
مُنْتَدَى ٱلسُّؤْدَدِ وَحِمَاه
دُمْتَ مُنْتَدَاه وَحِمَاه
عِشْتَ فِي ٱلْأَوْطَان
لِلْعُلَى عُنْوَان
مِلْءَ كُلِّ جَنَان
ذِكْرَى كُلِّ لِسَان
بِٱلرُّوحِ
بٱلْجَسَدِ
هَبَّ فَتَاك
لَبَّى نَدَاك
فِي فَمِي وَفِي دَمِي
هَوَاكَ ثَارَ نُور وَنَار
إِخْوَتِي هَيَّا
لِلْعُلَى سَعْيَا
نُشْهِدِ ٱلدُّنْيَا
أَنَّ هُنَا نَحْيَا
بِشِعَار
الله ٱلْوَطَن ٱلْمَلِك`;
  
  // Rendu du composant
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-red-700 dark:bg-gray-800 z-50">
      {/* Conteneur pour l'animation avec overflow caché */}
      <div className="relative w-full overflow-hidden h-8 my-2">
        <div 
          ref={textRef} 
          className="absolute whitespace-nowrap text-white font-bold text-xl"
        >
          {scrollingText}
        </div>
      </div>
    </footer>
  );
}