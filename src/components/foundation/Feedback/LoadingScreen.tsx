export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-white dark:bg-slate-900 flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl gold-gradient flex items-center justify-center animate-pulse-ai">
            <span className="text-3xl font-bold text-white">ز</span>
          </div>
          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 animate-bounce" />
        </div>
        
        {/* Spinner */}
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-primary-500 animate-bounce [animation-delay:-0.3s]" />
          <div className="w-2 h-2 rounded-full bg-primary-500 animate-bounce [animation-delay:-0.15s]" />
          <div className="w-2 h-2 rounded-full bg-primary-500 animate-bounce" />
        </div>
        
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
          جاري التحميل...
        </p>
      </div>
    </div>
  );
};
