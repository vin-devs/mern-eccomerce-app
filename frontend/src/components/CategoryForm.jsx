const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  return (
    <div className="p-3">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Input Field */}
        <div className="relative group">
          <input
            type="text"
            className="w-full py-4 px-5 bg-slate-900/50 border border-slate-800 rounded-2xl text-white placeholder-slate-500 
                       focus:outline-none focus:border-pink-500/50 focus:ring-4 focus:ring-pink-500/10 
                       transition-all duration-300 shadow-inner"
            placeholder="Enter category name..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          {/* Subtle bottom line accent */}
          <div className="absolute bottom-0 left-5 right-5 h-[1px] bg-gradient-to-r from-transparent via-pink-500/20 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity" />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 bg-pink-600 text-white font-bold uppercase tracking-widest text-[11px] 
                       rounded-xl hover:bg-pink-500 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] 
                       active:scale-95 transition-all duration-200"
          >
            {buttonText}
          </button>

          {/* Delete Button (Only shows in Modal) */}
          {handleDelete && (
            <button
              type="button" // Important: prevents form submission
              onClick={handleDelete}
              className="w-full sm:w-auto px-8 py-3 bg-rose-500/10 text-rose-500 border border-rose-500/20 
                         font-bold uppercase tracking-widest text-[11px] rounded-xl
                         hover:bg-rose-600 hover:text-white hover:border-rose-600 
                         active:scale-95 transition-all duration-200"
            >
              Remove Category
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
