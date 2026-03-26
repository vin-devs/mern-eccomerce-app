import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu.jsx";
import Loader from "../../components/Loader";
import { FaEdit, FaBox } from "react-icons/fa";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) return <Loader />;
  if (isError)
    return <div className="text-white p-10">Error loading products.</div>;

  return (
    <div className="bg-[#0a0a0c] min-h-screen text-white pb-20">
      <AdminMenu />

      <div className="container mx-auto px-4 pt-[6rem]">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-10 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-pink-500/20 rounded-2xl text-pink-500">
              <FaBox size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">
                Product Inventory
              </h1>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
                Managing {products?.length} total items
              </p>
            </div>
          </div>

          <Link
            to="/admin/productlist"
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/20"
          >
            + Add New Product
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {products.map((product) => (
            <Link
              key={product._id}
              to={`/admin/product/update/${product._id}`}
              className="group bg-slate-900/40 border border-slate-800 rounded-[2rem] overflow-hidden hover:border-slate-700 transition-all duration-300 backdrop-blur-md shadow-xl"
            >
              <div className="flex flex-col md:flex-row">
                {/* Product Image */}
                <div className="md:w-64 h-48 md:h-auto overflow-hidden shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Product Content */}
                <div className="p-8 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="text-xl font-bold text-slate-100 group-hover:text-pink-500 transition-colors">
                        {product.name}
                      </h5>
                      <span className="text-xs font-mono text-slate-500 bg-slate-800 px-3 py-1 rounded-full">
                        {moment(product.createdAt).format("MMM Do, YYYY")}
                      </span>
                    </div>

                    <p className="text-slate-400 text-sm line-clamp-2 mb-6 max-w-2xl leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                          Price
                        </span>
                        <span className="text-lg font-black text-white">
                          ${product.price}
                        </span>
                      </div>

                      <div className="h-8 w-[1px] bg-slate-800" />

                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                          In Stock
                        </span>
                        <span
                          className={`text-lg font-black ${product.countInStock > 0 ? "text-emerald-500" : "text-rose-500"}`}
                        >
                          {product.countInStock}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-pink-500 font-bold text-xs uppercase tracking-[2px] opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all">
                      Edit Product <FaEdit size={14} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
