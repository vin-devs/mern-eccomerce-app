import { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../../redux/features/favorites/favoriteSlice";

import {
  addFavoriteToLocalStorage,
  getFavoritesFromLocalStorage,
  removeFavoriteFromLocalStorage,
} from "../../utils/localStorage";

const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];

  const isFavorite = favorites.some((p) => p?._id === product?._id);

  // Sync favorites on initial load only
  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    if (favorites.length === 0 && favoritesFromLocalStorage.length > 0) {
      dispatch(setFavorites(favoritesFromLocalStorage));
    }
  }, [dispatch]);

  const toggleFavorites = (e) => {
    e.preventDefault(); // Prevents navigation if the icon is inside a Link/Card
    if (isFavorite) {
      dispatch(removeFromFavorites(product));
      removeFavoriteFromLocalStorage(product._id);
    } else {
      dispatch(addToFavorites(product));
      addFavoriteToLocalStorage(product);
    }
  };

  return (
    <button
      onClick={toggleFavorites}
      className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 backdrop-blur-md border border-white/10 hover:bg-black/40 transition-all active:scale-125 group"
    >
      {isFavorite ? (
        <FaHeart
          className="text-pink-500 drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]"
          size={20}
        />
      ) : (
        <FaRegHeart
          className="text-white group-hover:text-pink-400 transition-colors"
          size={20}
        />
      )}
    </button>
  );
};

export default HeartIcon;
