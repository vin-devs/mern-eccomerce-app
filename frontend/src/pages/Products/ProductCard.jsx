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
    <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-indigo-500/50 group flex flex-col h-full">
      {/* Product Image Section */}
      <div className="relative aspect-video overflow-hidden shrink-0">
        <Link to={`/product/${p._id}`}>
          <img
            src={p.image}
            alt={p.name}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
          />
        </Link>

        {/* Heart Icon - Top Right */}
        <div className="absolute top-3 right-3 z-10">
          <HeartIcon product={p} />
        </div>

        {/* Brand Tag - Bottom Left Overlay */}
        <span className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md text-indigo-400 text-[9px] font-black uppercase tracking-[2px] px-2.5 py-1 rounded-md border border-white/5">
          {p?.brand}
        </span>

        {/* Out of Stock Overlay */}
        {p?.countInStock === 0 && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] flex items-center justify-center z-20">
            <span className="text-white font-black uppercase tracking-widest text-[10px] border-2 border-white/30 px-4 py-2 rounded-lg bg-black/40">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Product Info Section */}
      <div className="p-4 md:p-6 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="text-base md:text-lg font-bold text-white truncate group-hover:text-indigo-400 transition-colors">
              {p?.name}
            </h3>
            <p className="text-indigo-400 font-black text-base md:text-lg shrink-0">
              ${p?.price?.toLocaleString()}
            </p>
          </div>

          <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-6 h-8 md:h-10">
            {p?.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 md:gap-3 mt-auto">
          <Link
            to={`/product/${p._id}`}
            className="flex-1 bg-slate-800/80 border border-slate-700 text-white text-center py-2.5 md:py-3 rounded-xl text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-indigo-600 hover:border-indigo-500 transition-all active:scale-95"
          >
            Details
          </Link>

          <button
            disabled={p?.countInStock === 0}
            onClick={() => addToCartHandler(p, 1)}
            className={`p-2.5 md:p-3 rounded-xl transition-all active:scale-95 ${
              p?.countInStock > 0
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500"
                : "bg-slate-800/50 text-slate-600 cursor-not-allowed border border-slate-800"
            }`}
          >
            <AiOutlineShoppingCart size={18} className="md:w-5 md:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
