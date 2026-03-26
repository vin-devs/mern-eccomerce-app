import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";
import {
  FaTruck,
  FaMapMarkerAlt,
  FaGlobe,
  FaCity,
  FaMailBulk,
  FaCreditCard,
} from "react-icons/fa";

const Shipping = () => {
  const { shippingAddress } = useSelector((state) => state.cart);

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || "",
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div className="bg-[#0a0a0c] min-h-screen text-white pb-20">
      <div className="container mx-auto px-4 pt-10">
        {/* Modern Progress Bar */}
        <div className="max-w-3xl mx-auto mb-16">
          <ProgressSteps step1 step2 />
        </div>

        <div className="flex justify-center items-start">
          <form
            onSubmit={submitHandler}
            className="w-full max-w-2xl bg-slate-900/40 border border-slate-800 p-8 md:p-12 rounded-3xl backdrop-blur-xl shadow-2xl"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-indigo-600/20 rounded-2xl text-indigo-400">
                <FaTruck size={24} />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white">
                Shipping Details
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Address - Full Width */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">
                  Street Address
                </label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                  <input
                    type="text"
                    className="w-full bg-slate-800/50 border border-slate-700 p-3 pl-12 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600"
                    placeholder="123 Luxury Lane"
                    value={address}
                    required
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">
                  City
                </label>
                <div className="relative">
                  <FaCity className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                  <input
                    type="text"
                    className="w-full bg-slate-800/50 border border-slate-700 p-3 pl-12 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    placeholder="New York"
                    value={city}
                    required
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>

              {/* Postal Code */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">
                  Postal Code
                </label>
                <div className="relative">
                  <FaMailBulk className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                  <input
                    type="text"
                    className="w-full bg-slate-800/50 border border-slate-700 p-3 pl-12 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    placeholder="10001"
                    value={postalCode}
                    required
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>
              </div>

              {/* Country */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">
                  Country
                </label>
                <div className="relative">
                  <FaGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                  <input
                    type="text"
                    className="w-full bg-slate-800/50 border border-slate-700 p-3 pl-12 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    placeholder="United States"
                    value={country}
                    required
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Payment Selection */}
            <div className="mt-10 pt-8 border-t border-slate-800">
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 ml-1">
                Payment Method
              </label>
              <div
                className={`relative flex items-center p-4 rounded-2xl border transition-all cursor-pointer ${
                  paymentMethod === "PayPal"
                    ? "bg-indigo-600/10 border-indigo-500"
                    : "bg-slate-800/30 border-slate-800"
                }`}
                onClick={() => setPaymentMethod("PayPal")}
              >
                <input
                  type="radio"
                  className="h-5 w-5 text-indigo-600 border-slate-700 bg-slate-800 focus:ring-indigo-500"
                  name="paymentMethod"
                  value="PayPal"
                  checked={paymentMethod === "PayPal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <div className="ml-4 flex items-center gap-3">
                  <FaCreditCard
                    className={
                      paymentMethod === "PayPal"
                        ? "text-indigo-400"
                        : "text-slate-500"
                    }
                  />
                  <span
                    className={`font-semibold ${paymentMethod === "PayPal" ? "text-white" : "text-slate-400"}`}
                  >
                    PayPal or Credit Card
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="mt-10 w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-sm shadow-xl shadow-indigo-600/20 transition-all active:scale-[0.98]"
            >
              Review Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
