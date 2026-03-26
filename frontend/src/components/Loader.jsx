const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-800 border-t-indigo-500"></div>
      <p className="text-[10px] font-bold uppercase tracking-[3px] text-slate-500 animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default Loader;
