import { useSelector } from "react-redux";

const FavoritesCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const favoriteCount = favorites.length;

  return (
    <div className="absolute -top-2 -right-2 pointer-events-none">
      {favoriteCount > 0 && (
        <div className="relative flex h-5 w-5">
          {/* Outer Pulse Effect (Optional: adds a luxury feel) */}
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>

          {/* Main Badge */}
          <span className="relative inline-flex items-center justify-center rounded-full h-5 w-5 bg-pink-600 text-[10px] font-black text-white shadow-lg shadow-pink-900/40 border border-white/20">
            {favoriteCount > 9 ? "9+" : favoriteCount}
          </span>
        </div>
      )}
    </div>
  );
};

export default FavoritesCount;
