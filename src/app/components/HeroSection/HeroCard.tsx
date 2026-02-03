interface HeroCardProps {
  card: {
    icon: string;
    title: string;
    sub: string;
  };
  index: number;
}

const HeroCard = ({ card, index }: HeroCardProps) => {
  const rotations = [-1.8, 1, -1, 1.5];

  return (
    <div
      className="bg-white border-2 border-zinc-800 rounded-xl p-3 sm:p-4 hover:rotate-0 transition-transform duration-300 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.35)] cursor-default"
      style={{ transform: `rotate(${rotations[index]}deg)` }}
    >
      <div className="text-lg mb-1">{card.icon}</div>
      <div className="text-xs font-black text-zinc-800 mb-0.5">{card.title}</div>
      <div className="text-[10px] text-zinc-500 font-medium">{card.sub}</div>
    </div>
  );
};

export default HeroCard;