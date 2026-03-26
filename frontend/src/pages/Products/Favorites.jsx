import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";
import { FaHeart, FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="bg-[#0a0a0c] min-h-screen text-white pb-20">
      <div className="container mx-auto px-4 lg:px-12 pt-10">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-10 border-b border-slate-800 pb-6">
          <div className="p-3 bg-pink-500/20 rounded-2xl text-pink-500">
            <FaHeart size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Wishlist</h1>
            <p className="text-slate-500 text-sm uppercase tracking-widest font-bold mt-1">
              {favorites.length} Saved Items
            </p>
          </div>
        </div>

        {/* Product Grid */}
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
            <div className="bg-slate-900/50 p-10 rounded-full mb-6 border border-slate-800">
              <FaHeart size={50} className="text-slate-700" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-slate-500 mb-8 max-w-sm">
              Tap the heart icon on any product to save it here for later.
            </p>
            <Link
              to="/shop"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-bold transition-all active:scale-95"
            >
              <FaShoppingBag /> Explore Shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-fade-in">
            {favorites.map((product) => (
              <div
                key={product._id}
                className="transition-transform duration-300 hover:-translate-y-2"
              >
                <Product product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
