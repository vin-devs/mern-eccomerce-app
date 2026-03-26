import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";
import { FaClipboardList, FaExternalLinkAlt } from "react-icons/fa";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="bg-[#0a0a0c] min-h-screen text-white pb-20">
      <AdminMenu />

      <div className="container mx-auto px-4 pt-[6rem]">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="p-3 bg-emerald-500/20 rounded-2xl text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <FaClipboardList size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Order Management
            </h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
              Track and fulfill customer purchases
            </p>
          </div>
        </div>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <div className="overflow-x-auto bg-slate-900/40 border border-slate-800 rounded-[2.5rem] backdrop-blur-md shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-800/30">
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[2px] text-slate-500">
                    Preview
                  </th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[2px] text-slate-500">
                    Order ID
                  </th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[2px] text-slate-500">
                    Customer
                  </th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[2px] text-slate-500">
                    Date
                  </th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[2px] text-slate-500">
                    Total
                  </th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[2px] text-slate-500">
                    Payment
                  </th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[2px] text-slate-500">
                    Delivery
                  </th>
                  <th className="px-6 py-5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-slate-800/20 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="relative h-12 w-12 rounded-xl overflow-hidden border border-slate-700">
                        <img
                          src={order.orderItems[0].image}
                          alt={order._id}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </td>

                    <td className="px-6 py-4 text-xs font-mono text-slate-400">
                      #{order._id.substring(0, 10)}...
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-slate-200">
                        {order.user ? order.user.username : "Guest User"}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-400">
                      {order.createdAt
                        ? order.createdAt.substring(0, 10)
                        : "N/A"}
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-sm font-black text-white">
                        ${order.totalPrice}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {order.isPaid ? (
                        <span className="px-3 py-1 text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full">
                          Paid
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-[10px] font-black uppercase tracking-wider bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded-full">
                          Pending
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      {order.isDelivered ? (
                        <span className="px-3 py-1 text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full">
                          Shipped
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-[10px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full">
                          Processing
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/order/${order._id}`}
                        className="inline-flex items-center gap-2 bg-slate-800 hover:bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg transition-all"
                      >
                        Details <FaExternalLinkAlt size={10} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;
