import HeroCard from "./HeroCard";

const HeroSection = () => {
  const cards = [
    { icon: "⚖️", title: "القانون العام", sub: "قانون الأسرة • العمل" },
    { icon: "🔍", title: "بحث فوري", sub: "إجابات خلال ثوانٍ" },
    { icon: "🌍", title: "المغرب", sub: "القانون المغربي حصرًا" },
    { icon: "🛡️", title: "مجاني", sub: "بلا قيود - دائمًا" },
  ];

  return (
    <section className="relative w-full max-w-screen-xl mx-auto mb-10 sm:mb-14">
      <div className="px-6 md:px-16 py-8 sm:py-10 md:py-14">
        <div className="flex items-center gap-3 mb-5">
          <span className="inline-flex items-center px-3 py-1.5 text-xs font-black bg-white border-2 border-zinc-800 rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,0.4)] uppercase">
            المستوى ★ متقدم
          </span>
          <span className="text-xs text-zinc-100 font-black uppercase tracking-wider">
            استشارات قانونية • AI
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-4" dir="rtl">
          <span className="text-zinc-100">القانون </span>
          <span className="text-orange-500">المغربي</span>
        </h1>

        <p className="text-sm sm:text-base lg:text-lg text-zinc-600 leading-relaxed max-w-2xl mb-6 font-medium" dir="rtl">
          استشارات قانونية ذكية بتقنية الذكاء الاصطناعي المتطورة — اسأل أي سؤال قانوني وتلقّ إجابة دقيقة في ثوانٍ.
        </p>

        <div className="flex flex-wrap gap-2 mb-7">
          {["مجاني 100%", "فائق السرعة", "دقة عالية", "قانون المغرب", "AI مدعوم"].map((chip) => (
            <span key={chip} className="inline-flex items-center px-3 py-1.5 text-xs font-black bg-white border-2 border-zinc-800 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
              {chip}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
          {cards.map((card, i) => (
            <HeroCard key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;