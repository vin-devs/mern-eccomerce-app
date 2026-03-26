import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Added to cart!", {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-indigo-500/50 group">
      {/* Product Image */}
      <div className="relative aspect-video overflow-hidden">
        <Link to={`/product/${p._id}`}>
          <img
            src={p.image}
            alt={p.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Heart Icon */}
        <div className="absolute top-4 right-4">
          <HeartIcon product={p} />
        </div>

        {/* Brand Tag */}
        <span className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-indigo-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-lg">
          {p?.brand}
        </span>

        {/* Out of Stock Overlay */}
        {p?.countInStock === 0 && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-bold uppercase tracking-widest text-xs border border-white/20 px-4 py-2 rounded-lg">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-white truncate group-hover:text-indigo-400 transition-colors">
            {p?.name}
          </h3>
          <p className="text-indigo-400 font-bold text-lg">
            ${p?.price?.toLocaleString()}
          </p>
        </div>

        <p className="text-slate-400 text-sm line-clamp-2 mb-6 h-10">
          {p?.description}
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <Link
            to={`/product/${p._id}`}
            className="flex-1 bg-slate-800 text-white text-center py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-700 transition-all"
          >
            View Details
          </Link>

          <button
            disabled={p?.countInStock === 0}
            onClick={() => addToCartHandler(p, 1)}
            className={`p-3 rounded-xl transition-all ${
              p?.countInStock > 0
                ? "bg-indigo-600 text-white hover:bg-indigo-500"
                : "bg-slate-800 text-slate-600 cursor-not-allowed"
            }`}
          >
            <AiOutlineShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
