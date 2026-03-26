import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";
import { AiOutlineSearch } from "react-icons/ai"; // Import search icon

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop,
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // New Search State

  const filteredProductsQuery = useGetFilteredProductsQuery({ checked, radio });

  useEffect(() => {
    if (categoriesQuery.data) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (filteredProductsQuery.data) {
      const filteredProducts = filteredProductsQuery.data.filter((product) => {
        // Match Search Term AND Price Filter
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesPrice =
          priceFilter === "" ||
          product.price.toString().includes(priceFilter) ||
          product.price <= parseInt(priceFilter, 10);

        return matchesSearch && matchesPrice;
      });
      dispatch(setProducts(filteredProducts));
    }
  }, [
    checked,
    radio,
    filteredProductsQuery.data,
    dispatch,
    priceFilter,
    searchTerm,
  ]);

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(filteredProductsQuery.data?.map((p) => p.brand).filter(Boolean)),
    ),
  ];

  return (
    <div className="bg-[#0a0a0c] min-h-screen text-white">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Search Bar Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="relative w-full max-w-2xl group">
            <AiOutlineSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="Search premium products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900/40 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all backdrop-blur-sm shadow-xl"
            />
          </div>
          <div className="shrink-0 text-right">
            <p className="text-slate-500 text-sm font-medium uppercase tracking-widest">
              Available Items
            </p>
            <p className="text-2xl font-bold text-indigo-500">
              {products?.length}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Sidebar Filter Panel */}
          <aside className="w-full md:w-72 shrink-0">
            <div className="sticky top-24 bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
              <h2 className="text-sm font-bold uppercase tracking-widest mb-8 text-slate-400">
                Refine By
              </h2>

              {/* Categories */}
              <div className="mb-8">
                <h3 className="text-xs font-semibold text-indigo-500 mb-4 uppercase">
                  Categories
                </h3>
                <div className="space-y-3">
                  {categories?.map((c) => (
                    <label
                      key={c._id}
                      className="flex items-center group cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        onChange={(e) => handleCheck(e.target.checked, c._id)}
                        className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-600 transition-all cursor-pointer"
                      />
                      <span className="ml-3 text-sm text-slate-400 group-hover:text-white transition-colors">
                        {c.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div className="mb-8 border-t border-slate-800 pt-8">
                <h3 className="text-xs font-semibold text-indigo-500 mb-4 uppercase">
                  Brands
                </h3>
                <div className="space-y-3">
                  {uniqueBrands?.map((brand) => (
                    <label
                      key={brand}
                      className="flex items-center group cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="brand"
                        onChange={() =>
                          dispatch(
                            setProducts(
                              filteredProductsQuery.data?.filter(
                                (p) => p.brand === brand,
                              ),
                            ),
                          )
                        }
                        className="h-4 w-4 border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-600"
                      />
                      <span className="ml-3 text-sm text-slate-400 group-hover:text-white transition-colors">
                        {brand}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-8 border-t border-slate-800 pt-8">
                <h3 className="text-xs font-semibold text-indigo-500 mb-4 uppercase">
                  Max Price ($)
                </h3>
                <input
                  type="number"
                  placeholder="Filter by budget"
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:border-indigo-500 transition-all outline-none"
                />
              </div>

              <button
                onClick={() => {
                  setSearchTerm("");
                  setPriceFilter("");
                }}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-widest transition-all"
              >
                Clear Search
              </button>
            </div>
          </aside>

          {/* Main Grid Area */}
          <main className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.length === 0 ? (
                <div className="col-span-full py-20 text-center">
                  {filteredProductsQuery.isLoading ? (
                    <Loader />
                  ) : (
                    <p className="text-slate-500">
                      No products match your search.
                    </p>
                  )}
                </div>
              ) : (
                products?.map((p) => (
                  <div
                    key={p._id}
                    className="transition-transform duration-300 hover:-translate-y-2"
                  >
                    <ProductCard p={p} />
                  </div>
                ))
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Shop;
