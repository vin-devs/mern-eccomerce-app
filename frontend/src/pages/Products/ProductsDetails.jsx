import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  FaStar,
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStore,
  FaArrowLeft,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductsDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({ productId, rating, comment }).unwrap();
      refetch();
      toast.success("Review submitted successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty: Number(qty) }));
    navigate("/cart");
  };

  if (isLoading)
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  if (error)
    return (
      <Message variant="danger">
        {error?.data?.message || error.message}
      </Message>
    );

  return (
    <div className="bg-[#0a0a0c] min-h-screen text-white pb-20">
      <div className="container mx-auto px-4 lg:px-12 pt-8">
        {/* Navigation / Back Button */}
        <Link
          to="/"
          className="inline-flex items-center text-slate-400 hover:text-indigo-400 transition-colors mb-8 group"
        >
          <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Shopping</span>
        </Link>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* LEFT: Image Gallery Section */}
          <div className="w-full lg:w-1/2 relative">
            <div className="sticky top-28 bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden p-4 backdrop-blur-sm">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto rounded-2xl object-cover shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
              />
              <div className="absolute top-8 right-8 scale-125">
                <HeartIcon product={product} />
              </div>
            </div>
          </div>

          {/* RIGHT: Product Info Section */}
          <div className="w-full lg:w-1/2">
            <div className="mb-6">
              <span className="bg-indigo-600/10 text-indigo-400 text-xs font-bold px-3 py-1 rounded-full border border-indigo-500/20 uppercase tracking-widest">
                {product.brand}
              </span>
              <h1 className="text-4xl xl:text-5xl font-extrabold mt-4 mb-2 tracking-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
                <span className="text-slate-500">|</span>
                <span
                  className={`text-sm font-bold ${product.countInStock > 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            <p className="text-5xl font-black text-white my-8 tracking-tighter">
              ${product.price}
            </p>

            <p className="text-slate-400 text-lg leading-relaxed mb-10 border-l-2 border-indigo-500/30 pl-6 italic">
              {product.description}
            </p>

            {/* Product Stats Grid */}
            <div className="grid grid-cols-2 gap-6 p-6 bg-slate-900/40 border border-slate-800 rounded-2xl mb-10 text-sm">
              <div className="space-y-4">
                <div className="flex items-center text-slate-300">
                  <FaStore className="mr-3 text-indigo-500" />{" "}
                  <span className="text-slate-500 mr-2">Brand:</span>{" "}
                  {product.brand}
                </div>
                <div className="flex items-center text-slate-300">
                  <FaClock className="mr-3 text-indigo-500" />{" "}
                  <span className="text-slate-500 mr-2">Listed:</span>{" "}
                  {moment(product.createdAt).fromNow()}
                </div>
                <div className="flex items-center text-slate-300">
                  <FaStar className="mr-3 text-indigo-500" />{" "}
                  <span className="text-slate-500 mr-2">Reviews:</span>{" "}
                  {product.numReviews}
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center text-slate-300">
                  <FaStar className="mr-3 text-yellow-500" />{" "}
                  <span className="text-slate-500 mr-2">Rating:</span>{" "}
                  {product.rating}
                </div>
                <div className="flex items-center text-slate-300">
                  <FaShoppingCart className="mr-3 text-indigo-500" />{" "}
                  <span className="text-slate-500 mr-2">Sold:</span>{" "}
                  {product.quantity}
                </div>
                <div className="flex items-center text-slate-300">
                  <FaBox className="mr-3 text-indigo-500" />{" "}
                  <span className="text-slate-500 mr-2">Stock:</span>{" "}
                  {product.countInStock}
                </div>
              </div>
            </div>

            {/* Purchase Options */}
            <div className="flex items-center gap-4 mb-12">
              {product.countInStock > 0 && (
                <div className="relative group">
                  <label className="absolute -top-6 left-0 text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                    Qty
                  </label>
                  <select
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    className="appearance-none bg-slate-800 border border-slate-700 text-white py-3 px-10 rounded-xl focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all cursor-pointer"
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                onClick={addToCartHandler}
                disabled={product.countInStock === 0}
                className={`flex-1 py-4 px-8 rounded-xl font-bold uppercase tracking-widest text-sm transition-all shadow-xl active:scale-95 ${
                  product.countInStock > 0
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20"
                    : "bg-slate-800 text-slate-500 cursor-not-allowed"
                }`}
              >
                {product.countInStock > 0 ? "Add To Cart" : "Out of Stock"}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section: Tabs/Reviews */}
        <div className="mt-20 pt-20 border-t border-slate-800">
          <ProductTabs
            loadingProductReview={loadingProductReview}
            userInfo={userInfo}
            submitHandler={submitHandler}
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment={setComment}
            product={product}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;
