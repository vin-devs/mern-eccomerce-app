import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";
import {
  FaEdit,
  FaComments,
  FaThLarge,
  FaStar,
  FaUserCircle,
} from "react-icons/fa";

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data: topProducts, isLoading } = useGetTopProductsQuery();
  const [activeTab, setActiveTab] = useState(1);

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 lg:px-0">
      {/* Tab Navigation */}
      <section className="flex flex-wrap border-b border-slate-800 mb-10 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {[
          { id: 1, label: "Write Review", icon: <FaEdit /> },
          {
            id: 2,
            label: `All Reviews (${product.reviews.length})`,
            icon: <FaComments />,
          },
          { id: 3, label: "Related Products", icon: <FaThLarge /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all relative ${
              activeTab === tab.id
                ? "text-indigo-400 border-b-2 border-indigo-500 bg-indigo-500/5"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </section>

      {/* Tab Content Container */}
      <div className="min-h-[400px]">
        {/* Tab 1: Write Review */}
        {activeTab === 1 && (
          <div className="max-w-2xl animate-fade-in">
            {userInfo ? (
              <form
                onSubmit={submitHandler}
                className="bg-slate-900/40 border border-slate-800 p-8 rounded-3xl backdrop-blur-sm"
              >
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <FaStar className="text-yellow-500" /> Share Your Experience
                </h3>

                <div className="mb-6">
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 ml-1">
                    Rating
                  </label>
                  <select
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-white"
                  >
                    <option value="">Select a score...</option>
                    <option value="1">1 - Inferior</option>
                    <option value="2">2 - Decent</option>
                    <option value="3">3 - Great</option>
                    <option value="4">4 - Excellent</option>
                    <option value="5">5 - Exceptional</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 ml-1">
                    Your Comment
                  </label>
                  <textarea
                    rows="4"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-white placeholder:text-slate-600"
                    placeholder="Tell us what you liked or disliked..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white py-3 px-10 rounded-xl font-bold uppercase tracking-widest text-sm transition-all shadow-xl shadow-indigo-600/20 active:scale-95 disabled:opacity-50"
                >
                  {loadingProductReview ? "Submitting..." : "Post Review"}
                </button>
              </form>
            ) : (
              <div className="bg-slate-900/40 border border-dashed border-slate-700 p-10 rounded-3xl text-center">
                <p className="text-slate-400 mb-4 font-medium italic">
                  Already purchased this product?
                </p>
                <Link
                  to="/login"
                  className="text-indigo-400 font-bold hover:underline underline-offset-4"
                >
                  Sign in to leave a review →
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: All Reviews */}
        {activeTab === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
            {product.reviews.length === 0 ? (
              <div className="col-span-full py-10 text-slate-500 italic text-center border border-dashed border-slate-800 rounded-3xl">
                No reviews yet. Be the first to share your thoughts!
              </div>
            ) : (
              product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition-all flex gap-4"
                >
                  <div className="hidden sm:block">
                    <FaUserCircle size={40} className="text-slate-700" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-slate-200">
                          {review.name}
                        </h4>
                        <div className="scale-75 -ml-4">
                          <Ratings value={review.rating} />
                        </div>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-800 px-2 py-1 rounded">
                        {review.createdAt.substring(0, 10)}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed italic">
                      "{review.comment}"
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 3: Related Products - UPDATED TO GRID */}
        {activeTab === 3 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
            {!topProducts ? (
              <Loader />
            ) : (
              topProducts.map((p) => <SmallProduct key={p._id} product={p} />)
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
