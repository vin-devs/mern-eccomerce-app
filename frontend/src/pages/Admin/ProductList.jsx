import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu.jsx";
import { FaCloudUploadAlt, FaBoxOpen } from "react-icons/fa";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  const navigate = useNavigate();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Image uploaded successfully");
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const res = await createProduct(productData).unwrap();
      toast.success(`${res.name} created!`);
      navigate("/");
    } catch (error) {
      toast.error("Product creation failed. Try again.");
    }
  };

  return (
    <div className="bg-[#0a0a0c] min-h-screen text-white pb-20">
      <AdminMenu />

      <div className="container mx-auto px-4 pt-[6rem]">
        <div className="flex items-center gap-4 mb-10">
          <div className="p-3 bg-indigo-600/20 rounded-2xl text-indigo-400">
            <FaBoxOpen size={24} />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Create New Product
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Side: Image Upload */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-900/40 border border-slate-800 p-2 rounded-[2.5rem] backdrop-blur-md overflow-hidden shadow-2xl">
              {imageUrl ? (
                <div className="relative group">
                  <img
                    src={imageUrl}
                    alt="Product"
                    className="w-full h-[400px] object-cover rounded-[2rem]"
                  />
                  <label className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-[2rem]">
                    <span className="text-sm font-bold uppercase tracking-widest">
                      Change Image
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={uploadFileHandler}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-[400px] border-2 border-dashed border-slate-700 rounded-[2rem] cursor-pointer hover:bg-slate-800/30 hover:border-indigo-500/50 transition-all group">
                  <FaCloudUploadAlt
                    size={40}
                    className="text-slate-600 group-hover:text-indigo-500 mb-4 transition-colors"
                  />
                  <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                    Upload Product Image
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={uploadFileHandler}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Right Side: Form Details */}
          <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] backdrop-blur-md shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black uppercase tracking-[2px] text-slate-500 ml-1">
                  Product Name
                </label>
                <input
                  type="text"
                  className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-black uppercase tracking-[2px] text-slate-500 ml-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-black uppercase tracking-[2px] text-slate-500 ml-1">
                  Quantity
                </label>
                <input
                  type="number"
                  className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-black uppercase tracking-[2px] text-slate-500 ml-1">
                  Brand
                </label>
                <input
                  type="text"
                  className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-xs font-black uppercase tracking-[2px] text-slate-500 ml-1">
                  Description
                </label>
                <textarea
                  rows="4"
                  className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-black uppercase tracking-[2px] text-slate-500 ml-1">
                  Stock Count
                </label>
                <input
                  type="number"
                  className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-black uppercase tracking-[2px] text-slate-500 ml-1">
                  Category
                </label>
                <select
                  className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl focus:border-indigo-500/50 transition-all outline-none"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Choose Category</option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full md:w-auto mt-10 px-12 py-4 bg-pink-600 text-white font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-pink-500 hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] transition-all active:scale-95"
            >
              Publish Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
