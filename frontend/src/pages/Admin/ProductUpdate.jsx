import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu.jsx";
import {
  FaEdit,
  FaTrash,
  FaCloudUploadAlt,
  FaChevronLeft,
} from "react-icons/fa";

const ProductUpdate = () => {
  const { _id } = useParams();
  const navigate = useNavigate();

  const { data: productData } = useGetProductByIdQuery(_id);
  const { data: categories = [] } = useFetchCategoriesQuery();

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [uploadProductImage] = useUploadProductImageMutation();

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setQuantity(productData.quantity);
      setCategory(productData.category?._id || productData.category);
      setBrand(productData.brand);
      setStock(productData.countInStock);
      setImage(productData.image);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Image updated");
      setImage(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      await updateProduct({ productId: _id, formData }).unwrap();
      toast.success("Product updated successfully");
      navigate("/admin/allproductslist");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Permanent delete? This cannot be undone.")) return;
    try {
      await deleteProduct(_id).unwrap();
      toast.success("Product deleted");
      navigate("/admin/allproductslist");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="bg-[#0a0a0c] min-h-screen text-white pb-20">
      <AdminMenu />

      <div className="container mx-auto px-4 pt-[6rem]">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-600/20 rounded-2xl text-indigo-400">
              <FaEdit size={24} />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Update Product
            </h1>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors font-bold uppercase text-xs tracking-widest"
          >
            <FaChevronLeft size={10} /> Go Back
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Image Management */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900/40 border border-slate-800 p-2 rounded-[2.5rem] backdrop-blur-md shadow-2xl sticky top-[8rem]">
              <div className="relative group overflow-hidden rounded-[2rem]">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
                  <FaCloudUploadAlt
                    size={30}
                    className="mb-2 text-indigo-400"
                  />
                  <span className="text-[10px] font-black uppercase tracking-[2px]">
                    Replace Image
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={uploadFileHandler}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Right: Detailed Edit Form */}
          <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] backdrop-blur-md shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black uppercase tracking-[2px] text-slate-500 ml-1">
                  Name
                </label>
                <input
                  type="text"
                  className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl focus:border-indigo-500 transition-all outline-none"
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
                  className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl focus:border-indigo-500 transition-all outline-none"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-xs font-black uppercase tracking-[2px] text-slate-500 ml-1">
                  Description
                </label>
                <textarea
                  rows="4"
                  className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl focus:border-indigo-500 transition-all outline-none resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-black uppercase tracking-[2px] text-slate-500 ml-1">
                  Stock
                </label>
                <input
                  type="number"
                  className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl focus:border-indigo-500 transition-all outline-none"
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-black uppercase tracking-[2px] text-slate-500 ml-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl focus:border-indigo-500 transition-all outline-none appearance-none"
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-black uppercase tracking-[2px] text-slate-500 ml-1">
                  Quantity
                </label>
                <input
                  type="number"
                  className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl focus:border-indigo-500 transition-all outline-none"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-black uppercase tracking-[2px] text-slate-500 ml-1">
                  Brand
                </label>
                <input
                  type="text"
                  className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl focus:border-indigo-500 transition-all outline-none"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <button
                onClick={handleSubmit}
                className="flex-1 py-4 bg-emerald-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all active:scale-95"
              >
                Save Changes
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-4 bg-rose-600/10 text-rose-500 border border-rose-500/20 font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-rose-600 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <FaTrash size={12} /> Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
