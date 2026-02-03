"use client";

import { useState, useEffect } from "react";

/* ─────────────────────────── Footer Background ─────────────────────────── */
const FooterBackground = () => {
  return (
    <div className="absolute bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.8)_0px,rgba(0,0,0,0.8)_1px,rgba(0,0,0,0)_2px,rgba(0,0,0,0)_4px)] box-border mix-blend-multiply opacity-[0.04] pointer-events-none inset-0" />
  );
};

/* ─────────────────────────── Footer Status ─────────────────────────── */
const FooterStatus = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const moroccoTime = new Intl.DateTimeFormat('ar-MA', {
        timeZone: 'Africa/Casablanca',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(new Date());
      
      setCurrentTime(moroccoTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-zinc-500 text-[11px] items-center box-border flex flex-col sm:flex-row justify-between leading-[17.6px] mb-4 font-mono gap-2 sm:gap-0">
      <div className="items-center box-border gap-x-2 flex gap-y-2">
        <span className="bg-green-500 box-border block h-2.5 w-2.5 border-zinc-800 rounded-full border-2 border-solid animate-pulse" />
        <span>متاح الآن</span>
      </div>
      <div className="items-center box-border gap-x-2 flex gap-y-2">
        <span className="box-border block">الوقت المحلي:</span>
        <span className="box-border block font-semibold tabular-nums">{currentTime || '00:00:00'}</span>
      </div>
    </div>
  );
};

/* ─────────────────────────── Footer CTA ─────────────────────────── */
const FooterCTA = () => {
  return (
    <div className="relative box-border">
      <div className="absolute bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(255,255,255,0.45)_50%,rgba(0,0,0,0)_100%)] bg-[length:200%_100%] box-border mix-blend-overlay opacity-[0.18] pointer-events-none bg-[position:-71.3143%_top] inset-0 md:bg-[position:167.771%_top]" />
      
      <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-orange-500 to-cyan-600 box-border tracking-tight sm:tracking-[-1.92px] md:tracking-[-5.12px] leading-tight sm:leading-[43.2px] md:leading-[115.2px] text-center uppercase mb-8">
        استشارات قانونية احترافية
      </h2>
      
      <div className="box-border text-center mt-6 flex gap-4 justify-center flex-wrap">
        <a
          href="mailto:khalidtourhzaoui@gmail.com"
          className="text-xs font-black items-center bg-white shadow-[0px_4px_0px_0px_rgb(42,42,42)] box-border gap-x-2 inline-flex leading-4 gap-y-2 uppercase border-zinc-800 px-4 py-2.5 rounded-lg border-2 border-solid hover:bg-gray-100 hover:shadow-[0px_3px_0px_0px_rgb(42,42,42)] hover:translate-y-[1px] transition-all group"
        >
          <svg className="w-4 h-4 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          راسلنا عبر البريد
        </a>
        
        <a
          href="https://github.com/khalid-tourhzaoui"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-black items-center bg-purple-500 text-white shadow-[0px_4px_0px_0px_rgb(42,42,42)] box-border gap-x-2 inline-flex leading-4 gap-y-2 uppercase border-zinc-800 px-4 py-2.5 rounded-lg border-2 border-solid hover:bg-purple-600 hover:shadow-[0px_3px_0px_0px_rgb(42,42,42)] hover:translate-y-[1px] transition-all group"
        >
          <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
          GitHub
        </a>

        <a
          href="https://www.linkedin.com/in/khalid-tourhzaoui/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-black items-center bg-orange-500 text-white shadow-[0px_4px_0px_0px_rgb(42,42,42)] box-border gap-x-2 inline-flex leading-4 gap-y-2 uppercase border-zinc-800 px-4 py-2.5 rounded-lg border-2 border-solid hover:bg-orange-600 hover:shadow-[0px_3px_0px_0px_rgb(42,42,42)] hover:translate-y-[1px] transition-all group"
        >
          <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          LinkedIn
        </a>
      </div>
    </div>
  );
};

/* ─────────────────────────── Footer Bottom ─────────────────────────── */
const FooterBottom = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="text-[11px] items-center box-border flex flex-col sm:flex-row justify-between gap-4 leading-[17.6px] mt-8 font-mono">
      <div className="box-border order-2 sm:order-1 text-zinc-600">
        © {currentYear} القانون المغربي. جميع الحقوق محفوظة.
      </div>
      <button
        onClick={scrollToTop}
        className="font-black bg-white shadow-[0px_3px_0px_0px_rgb(42,42,42)] text-center uppercase border-zinc-800 px-4 py-2 rounded-lg border-2 border-solid hover:bg-gray-100 hover:shadow-[0px_2px_0px_0px_rgb(42,42,42)] hover:translate-y-[1px] transition-all order-1 sm:order-2 group"
      >
        <span className="inline-flex items-center gap-2">
          العودة للأعلى
          <svg className="w-4 h-4 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </span>
      </button>
    </div>
  );
};

/* ─────────────────────────── Footer Content ─────────────────────────── */
const FooterContent = () => {
  return (
    <div className="box-border max-w-screen-xl mx-auto px-6 py-6 md:px-5 md:py-8">
      <FooterStatus />
      <FooterCTA />
      <FooterBottom />
    </div>
  );
};

/* ─────────────────────────── Main Footer Component ─────────────────────────── */
export default function Footer() {
  return (
    <footer className="relative box-border overflow-hidden bg-gradient-to-br from-yellow-50 to-yellow-100 border-t-4 border-zinc-800">
      <FooterBackground />
      <FooterContent />
    </footer>
  );
}