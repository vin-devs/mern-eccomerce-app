import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";
import { FaMapMarkerAlt, FaCreditCard, FaBox } from "react-icons/fa";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="bg-[#0a0a0c] min-h-screen text-white pb-20">
      <div className="container mx-auto px-4 lg:px-12 pt-10">
        <ProgressSteps step1 step2 step3 />

        {cart.cartItems.length === 0 ? (
          <div className="mt-10">
            <Message>Your cart is empty</Message>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12 mt-12">
            {/* LEFT SIDE: Items & Logistics */}
            <div className="flex-1 space-y-8">
              {/* Items Table Replacement */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden backdrop-blur-md">
                <div className="p-6 border-b border-slate-800 flex items-center gap-3">
                  <FaBox className="text-indigo-500" />
                  <h2 className="text-xl font-bold">Review Items</h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-widest">
                      <tr>
                        <th className="px-6 py-4 text-left">Product</th>
                        <th className="px-6 py-4 text-center">Quantity</th>
                        <th className="px-6 py-4 text-right">Price</th>
                        <th className="px-6 py-4 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {cart.cartItems.map((item, index) => (
                        <tr
                          key={index}
                          className="group hover:bg-slate-800/30 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-14 h-14 rounded-xl object-cover border border-slate-700"
                              />
                              <Link
                                to={`/product/${item.product}`}
                                className="font-medium hover:text-indigo-400 transition-colors"
                              >
                                {item.name}
                              </Link>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center font-medium">
                            {item.qty}
                          </td>
                          <td className="px-6 py-4 text-right text-slate-400">
                            ${item.price.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 text-right font-bold text-indigo-400">
                            ${(item.qty * item.price).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Delivery & Payment Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl">
                  <h3 className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
                    <FaMapMarkerAlt className="text-indigo-500" /> Shipping
                    Address
                  </h3>
                  <p className="text-slate-200 leading-relaxed">
                    {cart.shippingAddress.address}
                    <br />
                    {cart.shippingAddress.city},{" "}
                    {cart.shippingAddress.postalCode}
                    <br />
                    {cart.shippingAddress.country}
                  </p>
                </div>

                <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl">
                  <h3 className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
                    <FaCreditCard className="text-indigo-500" /> Payment Method
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-lg border border-indigo-500/20 font-semibold">
                      {cart.paymentMethod}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Summary Card */}
            <div className="w-full lg:w-96">
              <div className="sticky top-28 bg-indigo-600/5 border border-indigo-500/20 p-8 rounded-3xl backdrop-blur-xl shadow-2xl">
                <h2 className="text-2xl font-bold mb-8 tracking-tight">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-slate-400">
                    <span>Items Subtotal</span>
                    <span className="text-white font-medium">
                      ${cart.itemsPrice}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Shipping</span>
                    <span className="text-white font-medium">
                      ${cart.shippingPrice}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Estimated Tax</span>
                    <span className="text-white font-medium">
                      ${cart.taxPrice}
                    </span>
                  </div>
                  <div className="flex justify-between text-2xl font-black pt-6 border-t border-slate-800 mt-6">
                    <span>Total</span>
                    <span className="text-indigo-500">${cart.totalPrice}</span>
                  </div>
                </div>

                {error && (
                  <Message variant="danger">{error.data.message}</Message>
                )}

                <button
                  type="button"
                  className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-2 ${
                    isLoading
                      ? "bg-slate-800"
                      : "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/20"
                  }`}
                  disabled={cart.cartItems.length === 0 || isLoading}
                  onClick={placeOrderHandler}
                >
                  {isLoading ? <Loader size="sm" /> : "Confirm & Place Order"}
                </button>

                <p className="text-center text-[10px] text-slate-500 mt-6 px-4">
                  By placing your order, you agree to our Terms of Service and
                  Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceOrder;
