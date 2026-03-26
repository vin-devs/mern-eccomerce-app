import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";
import { FaEye, FaBox, FaCheckCircle, FaClock } from "react-icons/fa";

const UserOrder = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <div className="bg-[#0a0a0c] min-h-screen text-white pb-20">
      <div className="container mx-auto px-4 lg:px-12 pt-10">
        <div className="flex items-center gap-4 mb-10">
          <div className="p-3 bg-indigo-600/20 rounded-2xl text-indigo-400">
            <FaBox size={24} />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight">My Orders</h2>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        ) : error ? (
          <Message variant="danger">
            {error?.data?.error || error.error}
          </Message>
        ) : orders?.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-slate-800">
            <p className="text-slate-500 mb-6">
              You haven't placed any orders yet.
            </p>
            <Link
              to="/shop"
              className="bg-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-indigo-500 transition-all"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden backdrop-blur-md shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-5 font-semibold">Product</th>
                    <th className="px-6 py-5 font-semibold">Order ID</th>
                    <th className="px-6 py-5 font-semibold">Date</th>
                    <th className="px-6 py-5 font-semibold text-center">
                      Total
                    </th>
                    <th className="px-6 py-5 font-semibold text-center">
                      Payment
                    </th>
                    <th className="px-6 py-5 font-semibold text-center">
                      Delivery
                    </th>
                    <th className="px-6 py-5 font-semibold text-right">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-800">
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="hover:bg-slate-800/30 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <img
                          src={order.orderItems[0]?.image}
                          alt="Order item"
                          className="w-16 h-16 object-cover rounded-xl border border-slate-700 shadow-lg group-hover:scale-105 transition-transform"
                        />
                      </td>

                      <td className="px-6 py-4">
                        <span className="font-mono text-xs text-slate-400">
                          #{order._id.substring(0, 10)}...
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-300">
                        {order.createdAt.substring(0, 10)}
                      </td>

                      <td className="px-6 py-4 text-center font-bold text-white">
                        ${order.totalPrice.toFixed(2)}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          {order.isPaid ? (
                            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-wider border border-green-500/20">
                              <FaCheckCircle size={10} /> Completed
                            </span>
                          ) : (
                            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-[10px] font-bold uppercase tracking-wider border border-red-500/20">
                              <FaClock size={10} /> Pending
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          {order.isDelivered ? (
                            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-wider border border-indigo-500/20">
                              <FaCheckCircle size={10} /> Delivered
                            </span>
                          ) : (
                            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-[10px] font-bold uppercase tracking-wider border border-yellow-500/20">
                              <FaClock size={10} /> Processing
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <Link to={`/order/${order._id}`}>
                          <button className="inline-flex items-center gap-2 bg-slate-800 hover:bg-indigo-600 text-white py-2 px-4 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-lg group-hover:shadow-indigo-500/20">
                            <FaEye /> Details
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrder;
