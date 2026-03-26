import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";

import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";
import { FaDollarSign, FaUserFriends, FaShoppingCart } from "react-icons/fa";

const AdminDashboard = () => {
  const { data: sales, isLoading: loadingSales } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loadingUsers } = useGetUsersQuery();
  const { data: orders, isLoading: loadingOrders } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      chart: {
        type: "bar",
        background: "transparent",
        toolbar: { show: false },
      },
      theme: { mode: "dark" },
      colors: ["#6366f1"], // Indigo-500
      plotOptions: {
        bar: {
          borderRadius: 8,
          columnWidth: "40%",
        },
      },
      dataLabels: { enabled: false },
      stroke: { show: true, width: 2, colors: ["transparent"] },
      xaxis: {
        categories: [],
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { style: { colors: "#64748b", fontWeight: 600 } },
      },
      yaxis: {
        labels: { style: { colors: "#64748b", fontWeight: 600 } },
      },
      grid: {
        show: true,
        borderColor: "#1e293b", // Slate-800
        strokeDashArray: 4,
      },
      fill: {
        opacity: 1,
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          shadeIntensity: 0.5,
          gradientToColors: ["#818cf8"], // Lighter Indigo
          inverseColors: true,
          opacityFrom: 0.8,
          opacityTo: 0.2,
        },
      },
      tooltip: { theme: "dark" },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      const dates = salesDetail.map((item) => item._id);
      const dataPoints = salesDetail.map((item) => item.totalSales);

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: { ...prevState.options.xaxis, categories: dates },
        },
        series: [{ name: "Sales", data: dataPoints }],
      }));
    }
  }, [salesDetail]);

  const StatCard = ({ icon: Icon, label, value, color, isCurrency }) => (
    <div className="flex-1 min-w-[250px] bg-slate-900/40 border border-slate-800 p-6 rounded-[2rem] backdrop-blur-md shadow-xl transition-all hover:border-slate-700">
      <div
        className={`flex items-center justify-center w-12 h-12 rounded-2xl mb-4 ${color}`}
      >
        <Icon size={20} className="text-white" />
      </div>
      <p className="text-xs font-black uppercase tracking-[2px] text-slate-500">
        {label}
      </p>
      <h2 className="text-2xl font-black mt-2 text-white">
        {isCurrency ? `$ ${value?.toFixed(2)}` : value}
      </h2>
    </div>
  );

  return (
    <div className="bg-[#0a0a0c] min-h-screen text-white pb-20">
      <AdminMenu />

      <section className="container mx-auto px-4 pt-[6rem]">
        {/* KPI Stats Grid */}
        <div className="flex flex-wrap gap-6 mb-10">
          <StatCard
            icon={FaDollarSign}
            label="Total Sales"
            value={sales?.totalSales}
            color="bg-pink-600 shadow-[0_0_15px_rgba(219,39,119,0.3)]"
            isCurrency
          />
          <StatCard
            icon={FaUserFriends}
            label="Customers"
            value={customers?.length}
            color="bg-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.3)]"
          />
          <StatCard
            icon={FaShoppingCart}
            label="Total Orders"
            value={orders?.totalOrders}
            color="bg-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          />
        </div>

        {/* Chart Section */}
        <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] backdrop-blur-md mb-10 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black uppercase tracking-[3px] text-slate-400">
              Sales Analytics
            </h3>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase text-indigo-400">
                  Live Trend
                </span>
              </div>
            </div>
          </div>

          <div className="h-[350px]">
            {loadingSales || !salesDetail ? (
              <div className="flex items-center justify-center h-full">
                <Loader />
              </div>
            ) : (
              <Chart
                options={state.options}
                series={state.series}
                type="bar"
                height="100%"
                width="100%"
              />
            )}
          </div>
        </div>

        {/* Recent Orders List */}
        <div className="mt-12">
          <div className="flex items-center gap-3 mb-6 ml-4">
            <div className="w-2 h-6 bg-pink-500 rounded-full" />
            <h3 className="text-xl font-bold">Recent Transactions</h3>
          </div>
          <OrderList />
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
