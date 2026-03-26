import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="group relative w-full bg-[#111114]/40 border border-slate-800/50 rounded-[1.5rem] p-2 transition-all duration-500 hover:bg-[#16161a] hover:border-indigo-500/40 hover:shadow-[0_10px_40px_-10px_rgba(79,70,229,0.2)]">
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-[1rem] aspect-[16/10] bg-slate-900">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 group-hover:grayscale-0 grayscale-[10%]"
          />
          {/* Neon Gradient Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>

        {/* Heart Icon */}
        <div className="absolute top-2 right-2 z-10 p-1 bg-[#0a0a0c]/40 backdrop-blur-md rounded-lg border border-white/5 transition-transform duration-300 hover:scale-110">
          <HeartIcon product={product} />
        </div>
      </div>

      {/* Content Section */}
      <div className="px-3 py-4">
        <Link to={`/product/${product._id}`}>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-start gap-2">
              <div className="flex-1 min-w-0">
                <h2 className="text-sm font-black text-white tracking-tight line-clamp-1 group-hover:text-indigo-400 transition-colors">
                  {product.name}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="h-[2px] w-3 bg-indigo-500" />
                  <p className="text-[9px] text-slate-500 font-black uppercase tracking-[2px]">
                    {product.brand || "Digital Store"}
                  </p>
                </div>
              </div>

              {/* High-Contrast Price Tag */}
              <div className="shrink-0 flex flex-col items-end">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-500 text-sm font-black tracking-tighter">
                  ${product.price?.toLocaleString()}
                </span>
                <span className="text-[8px] text-slate-600 font-bold uppercase tracking-widest mt-0.5">
                  Price
                </span>
              </div>
            </div>

            {/* Visual Progress Bar (The signature MarketBaseX look) */}
            <div className="h-[2px] w-full bg-slate-800/50 rounded-full overflow-hidden">
              <div className="h-full w-0 group-hover:w-full bg-gradient-to-r from-indigo-600 via-pink-500 to-indigo-600 bg-[length:200%_auto] animate-gradient-x transition-all duration-1000 ease-out" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SmallProduct;
