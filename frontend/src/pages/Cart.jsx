import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash, FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="bg-[#0a0a0c] min-h-screen text-white pb-20">
      <div className="container mx-auto px-4 lg:px-12 pt-10">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="bg-slate-900/50 p-8 rounded-full mb-6">
              <FaShoppingCart size={50} className="text-slate-700" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Your cart is feeling light.</h1>
            <p className="text-slate-500 mb-8 max-w-xs">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              to="/shop"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-bold transition-all active:scale-95"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col lg:flex-row gap-12">
              {/* LEFT: Cart Items List */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-6">
                  <h1 className="text-3xl font-extrabold tracking-tight">Shopping Cart</h1>
                  <span className="text-slate-500 font-medium">
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)} Items
                  </span>
                </div>

                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="group flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-slate-900/30 border border-slate-800 transition-all hover:border-indigo-500/30"
                    >
                      {/* Product Image */}
                      <div className="w-32 h-32 shrink-0 overflow-hidden rounded-xl bg-slate-800">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 text-center sm:text-left">
                        <Link to={`/product/${item._id}`} className="text-lg font-bold hover:text-indigo-400 transition-colors">
                          {item.name}
                        </Link>
                        <p className="text-slate-500 text-sm mt-1 uppercase tracking-widest">{item.brand}</p>
                        <p className="text-indigo-400 font-bold mt-2 text-lg">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Quantity Select */}
                      <div className="w-24">
                        <label className="block text-[10px] uppercase text-slate-500 font-bold mb-1 text-center">Qty</label>
                        <select
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none cursor-pointer"
                          value={item.qty}
                          onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Remove Button */}
                      <button
                        className="p-3 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  ))}
                </div>

                <Link to="/shop" className="inline-flex items-center mt-10 text-slate-400 hover:text-indigo-400 font-medium group">
                  <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                  Continue Shopping
                </Link>
              </div>

              {/* RIGHT: Order Summary Card */}
              <div className="w-full lg:w-96 shrink-0">
                <div className="sticky top-28 bg-slate-900/50 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
                  <h2 className="text-xl font-bold mb-6 border-b border-slate-800 pb-4">Order Summary</h2>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-slate-400">
                      <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                      <span>$ {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Shipping</span>
                      <span className="text-green-500">Free</span>
                    </div>
                    <div className="flex justify-between text-white font-bold text-xl pt-4 border-t border-slate-800">
                      <span>Total</span>
                      <span className="text-indigo-400">
                        $ {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-sm shadow-xl shadow-indigo-600/20 transition-all active:scale-[0.98] disabled:bg-slate-800 disabled:text-slate-600"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </button>

                  <div className="mt-6 flex items-center justify-center gap-4 opacity-30 grayscale">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="Visa" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" alt="Mastercard" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4" alt="Paypal" />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;