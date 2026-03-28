import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import Message from "./Message";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductsCarousel from "../pages/Products/ProductsCarousel";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading)
    return (
      <div className="h-[400px] flex flex-col justify-center items-center gap-4">
        <Loader />
        <span className="text-[10px] font-black uppercase tracking-[3px] text-slate-600">
          Syncing Top Nodes...
        </span>
      </div>
    );

  if (error)
    return (
      <div className="max-w-[1400px] mx-auto px-6 pt-10">
        <Message variant="danger">Failed to sync top-tier products</Message>
      </div>
    );

  return (
    <header className="max-w-[1600px] mx-auto px-5 md:px-8 lg:px-16 pt-20 md:pt-32 pb-10">
      <div className="flex flex-col xl:flex-row gap-8 md:gap-12 items-stretch">
        {/* --- Feature Carousel (Spotlight) --- */}
        {/* On mobile, we show the Carousel FIRST so it's the hero */}
        <div className="w-full xl:w-[55%] group relative order-1 xl:order-2">
          <div className="relative h-full rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-slate-800 bg-[#111114]/60 p-1.5 md:p-2 shadow-2xl transition-all duration-700 group-hover:border-indigo-500/30">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/10 via-purple-500/5 to-pink-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="relative h-full bg-[#0a0a0c] rounded-[1.8rem] md:rounded-[2.2rem] overflow-hidden border border-slate-800/50">
              <ProductsCarousel />
            </div>

            {/* Floating Badge - Hidden on very small phones to avoid clutter */}
            <div className="hidden sm:block absolute top-6 right-6 z-30 bg-indigo-600 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[2px] shadow-xl animate-pulse">
              Hot Spot
            </div>
          </div>
        </div>

        {/* --- Discovery Section (Trending) --- */}
        {/* On mobile, this appears below the carousel. Visible on ALL screens now. */}
        <div className="flex flex-col w-full xl:w-[45%] order-2 xl:order-1 mt-6 xl:mt-0">
          <div className="mb-6 md:mb-10 flex items-center justify-between border-b border-slate-800 pb-4 md:pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1 md:mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                <h3 className="text-indigo-500 font-black uppercase tracking-[0.3em] text-[9px] md:text-[10px]">
                  Live Trending
                </h3>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter">
                TOP{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-500 italic">
                  PICKS.
                </span>
              </h2>
            </div>

            <div className="text-right hidden sm:block">
              <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">
                Status
              </p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                Optimized
              </p>
            </div>
          </div>

          {/* Grid: 1 col on mobile, 2 cols on tablet/desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {data?.slice(0, 4).map((product) => (
              <div
                key={product._id}
                className="transition-all duration-500 hover:translate-y-[-5px] animate-in fade-in slide-in-from-bottom-4 md:slide-in-from-left-4"
              >
                <SmallProduct product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
