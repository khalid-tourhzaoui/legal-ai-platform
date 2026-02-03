const LoadingSpinner = () => {
  return (
    <div className="w-full max-w-5xl mb-12">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-50 animate-pulse" />
        <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-12 shadow-2xl">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-8 border-cyan-200/20 rounded-full" />
              <div className="absolute inset-0 border-8 border-transparent border-t-yellow-100 border-r-yellow-100 rounded-full animate-spin" />
              <div className="absolute inset-3 border-8 border-transparent border-t-yellow-100 border-r-yellow-100 rounded-full animate-spin" style={{ animationDirection: "reverse", animationDuration: "1s" }} />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-black text-zinc-800">جاري تحليل السؤال</h3>
              <p className="text-zinc-600 max-w-md">يقوم الذكاء الاصطناعي بمعالجة استفسارك للحصول على أدق إجابة</p>
            </div>
            <div className="flex gap-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="w-3 h-3 bg-yellow-100 rounded-full animate-bounce shadow-lg shadow-yellow-100/50" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;