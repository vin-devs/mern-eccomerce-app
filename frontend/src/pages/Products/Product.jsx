import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="group relative w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-3 transition-all duration-300 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-800">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Heart Icon Overlay */}
        <div className="absolute right-3 top-3 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <HeartIcon product={product} />
        </div>

        {/* Subtle Gradient Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c]/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Product Details */}
      <div className="mt-4 px-2 pb-2">
        <Link to={`/product/${product._id}`} className="block">
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-lg font-semibold tracking-tight text-white transition-colors group-hover:text-indigo-400">
              {product.name}
            </h2>

            {/* Professional Price Tag */}
            <span className="shrink-0 rounded-lg bg-indigo-500/10 px-3 py-1 text-sm font-bold text-indigo-400 border border-indigo-500/20 shadow-sm">
              ${product.price}
            </span>
          </div>

          {/* Subtle Category/Brand line if you have it */}
          {product.brand && (
            <p className="mt-1 text-xs font-medium uppercase tracking-widest text-slate-500">
              {product.brand}
            </p>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Product;
