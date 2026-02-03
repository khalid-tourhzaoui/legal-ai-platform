interface ModelBadgeProps {
  model: string;
  tokens_used?: number;
}

const ModelBadge = ({ model, tokens_used }: ModelBadgeProps) => {
  return (
    <div className="mt-6 flex justify-center">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />
        <div className="relative bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-3 shadow-xl">
          <div className="flex items-center gap-3 text-white">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
            <span className="font-medium">مدعوم بـ</span>
            <span className="font-black">{model}</span>
            <span className="opacity-50">على</span>
            <span className="font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Groq</span>
            {tokens_used && tokens_used > 0 && (
              <>
                <span className="opacity-50">•</span>
                <span className="text-sm">{tokens_used} رمز</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelBadge;