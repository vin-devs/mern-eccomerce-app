import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  FaBox,
  FaCreditCard,
  FaUser,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import moment from "moment";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApiSlice";

const Order = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal?.clientId) {
      const loadingPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: { "client-id": paypal.clientId, currency: "USD" },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadingPayPalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Payment Successful");
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    });
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: order.totalPrice } }],
      })
      .then((id) => id);
  }

  // --- THE FIX: Re-adding the missing onError function ---
  function onError(err) {
    toast.error(err.message || "An error occurred with PayPal");
  }

  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order Marked as Delivered");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  if (error)
    return (
      <div className="container mx-auto p-10">
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      </div>
    );

  return (
    <div className="bg-[#0a0a0c] min-h-screen text-white pb-20">
      <div className="container mx-auto px-4 lg:px-12 pt-10">
        <h1 className="text-3xl font-extrabold tracking-tight mb-8">
          Order{" "}
          <span className="text-indigo-500 text-lg ml-2 font-mono">
            #{order._id}
          </span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT: Order Content */}
          <div className="flex-1 space-y-8">
            {/* Status Badges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className={`p-4 rounded-2xl border flex items-center gap-4 ${order.isPaid ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"}`}
              >
                {order.isPaid ? (
                  <FaCheckCircle className="text-green-500 text-2xl" />
                ) : (
                  <FaTimesCircle className="text-red-500 text-2xl" />
                )}
                <div>
                  <p className="text-xs uppercase font-bold tracking-widest text-slate-500">
                    Payment Status
                  </p>
                  <p
                    className={`font-bold ${order.isPaid ? "text-green-400" : "text-red-400"}`}
                  >
                    {order.isPaid
                      ? `Paid on ${moment(order.paidAt).format("LLL")}`
                      : "Awaiting Payment"}
                  </p>
                </div>
              </div>

              <div
                className={`p-4 rounded-2xl border flex items-center gap-4 ${order.isDelivered ? "bg-green-500/10 border-green-500/20" : "bg-yellow-500/10 border-yellow-500/20"}`}
              >
                {order.isDelivered ? (
                  <FaTruck className="text-green-500 text-2xl" />
                ) : (
                  <FaBox className="text-yellow-500 text-2xl" />
                )}
                <div>
                  <p className="text-xs uppercase font-bold tracking-widest text-slate-500">
                    Delivery Status
                  </p>
                  <p
                    className={`font-bold ${order.isDelivered ? "text-green-400" : "text-yellow-400"}`}
                  >
                    {order.isDelivered
                      ? `Delivered on ${moment(order.deliveredAt).format("LLL")}`
                      : "In Transit"}
                  </p>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden backdrop-blur-md">
              <table className="w-full">
                <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-4 text-left">Item</th>
                    <th className="px-6 py-4 text-center">Qty</th>
                    <th className="px-6 py-4 text-right">Unit</th>
                    <th className="px-6 py-4 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {order.orderItems.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="px-6 py-4 flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <Link
                          to={`/product/${item.product}`}
                          className="font-medium hover:text-indigo-400 transition-colors"
                        >
                          {item.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-center font-semibold">
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

          {/* RIGHT: Summary & Actions */}
          <div className="w-full lg:w-96 space-y-6">
            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2 border-b border-slate-800 pb-4">
                <FaUser className="text-indigo-500" /> Customer Info
              </h2>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Name:</span>
                  <span className="font-medium">{order.user.username}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Email:</span>
                  <span className="font-medium text-indigo-400">
                    {order.user.email}
                  </span>
                </div>
                <div className="pt-4 border-t border-slate-800">
                  <p className="text-slate-500 mb-2 font-bold text-[10px] uppercase tracking-widest">
                    Shipping Address
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city}
                    <br />
                    {order.shippingAddress.postalCode},{" "}
                    {order.shippingAddress.country}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-indigo-600/5 border border-indigo-500/20 rounded-3xl p-6 shadow-2xl">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2 border-b border-slate-800 pb-4">
                <FaCreditCard className="text-indigo-500" /> Order Summary
              </h2>
              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between text-slate-400">
                  <span>Items</span>
                  <span>${order.itemsPrice}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Shipping</span>
                  <span>${order.shippingPrice}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Tax</span>
                  <span>${order.taxPrice}</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-4 border-t border-slate-800 text-white">
                  <span>Total</span>
                  <span className="text-indigo-400">${order.totalPrice}</span>
                </div>
              </div>

              {!order.isPaid && (
                <div className="mt-4">
                  {loadingPay || isPending ? (
                    <Loader />
                  ) : (
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    />
                  )}
                </div>
              )}

              {userInfo?.isAdmin && order.isPaid && !order.isDelivered && (
                <button
                  onClick={deliverHandler}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 mt-4"
                >
                  {loadingDeliver ? (
                    <Loader size="sm" />
                  ) : (
                    <>
                      <FaTruck /> Mark As Delivered
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
