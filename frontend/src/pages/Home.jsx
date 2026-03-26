import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import ProductCard from "./Products/ProductCard";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery(keyword);

  return (
    <div className="bg-[#0a0a0c] min-h-screen text-slate-200">
      {/* 1. Hero Section (Carousel/Header) */}
      {!keyword ? <Header /> : null}

      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-[60vh] gap-4">
          <Loader />
          <p className="text-[10px] font-bold uppercase tracking-[4px] text-slate-500 animate-pulse">
            Loading Latest Arrivals...
          </p>
        </div>
      ) : isError ? (
        <div className="max-w-7xl mx-auto pt-24 px-8">
          <Message variant="danger">
            {isError?.data?.message || isError.error}
          </Message>
        </div>
      ) : (
        <main className="max-w-[1600px] mx-auto px-8 lg:px-16 pb-32">
          {/* 2. Section Heading */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 mt-20">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-[2px] w-8 bg-indigo-500" />
                <span className="text-[10px] font-bold uppercase tracking-[4px] text-indigo-400">
                  Featured Collection
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
                PREMIUM <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-500 italic">
                  SELECTIONS.
                </span>
              </h1>
              <p className="mt-6 text-slate-500 text-lg font-medium max-w-md border-l-2 border-slate-800 pl-6">
                Browse top-quality tech and products that have been carefully
                chosen for today’s lifestyle.
              </p>
            </div>

            <div className="mt-10 md:mt-0 flex flex-col items-end gap-4">
              <Link
                to="/shop"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 px-10 py-4 text-xs font-bold uppercase tracking-[2px] text-white transition-all hover:border-indigo-500 hover:shadow-[0_0_20px_rgba(79,70,229,0.1)] active:scale-95"
              >
                <span className="relative z-10">Explore All Products</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <span className="text-[9px] font-bold text-slate-700 uppercase tracking-widest mr-2">
                Available Items: {data?.products?.length || 0}
              </span>
            </div>
          </div>

          {/* 3. Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {data?.products?.map((product) => (
              <div
                key={product._id}
                className="transition-all duration-700 ease-out"
              >
                <ProductCard p={product} />
              </div>
            ))}
          </div>

          {/* 4. Empty State */}
          {(!data?.products || data.products.length === 0) && (
            <div className="text-center py-32 border border-dashed border-slate-800 rounded-[3rem] mt-10">
              <p className="text-slate-600 font-bold uppercase tracking-widest text-xs">
                No products found matching your search.
              </p>
              <Link
                to="/"
                className="text-indigo-400 text-xs font-bold uppercase tracking-widest mt-4 block hover:text-white transition-colors"
              >
                Back to Home
              </Link>
            </div>
          )}
        </main>
      )}
    </div>
  );
};

export default Home;
