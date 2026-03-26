import { useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";
import AdminMenu from "./AdminMenu.jsx";
import { FaShapes, FaEdit, FaPlusCircle } from "react-icons/fa";

const CategoryList = () => {
  const { data: categories, refetch } = useFetchCategoriesQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Category name is required");
      return;
    }
    try {
      const result = await createCategory({ name }).unwrap();
      setName("");
      toast.success(`${result.name} is created.`);
      refetch();
    } catch (error) {
      toast.error("Creating category failed, try again.");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!updatingName) {
      toast.error("Category name is required");
      return;
    }
    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        name: updatingName,
      }).unwrap();
      toast.success(`${result.name} is updated`);
      setSelectedCategory(null);
      setUpdatingName("");
      setModalVisible(false);
      refetch();
    } catch (error) {
      toast.error("Update failed. Please try again.");
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();
      toast.success(`Category deleted successfully`);
      setSelectedCategory(null);
      setUpdatingName("");
      setModalVisible(false);
      refetch();
    } catch (error) {
      toast.error("Deleting category failed, Try again.");
    }
  };

  return (
    <div className="bg-[#0a0a0c] min-h-screen text-white pb-20">
      <AdminMenu />

      <div className="container mx-auto px-4 pt-[6rem]">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-10">
          <div className="p-3 bg-pink-500/20 rounded-2xl text-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.1)]">
            <FaShapes size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Product Categories
            </h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
              Organize your inventory
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form Side */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-3xl backdrop-blur-md sticky top-[8rem]">
              <h2 className="flex items-center gap-2 text-lg font-bold mb-6 text-slate-200">
                <FaPlusCircle className="text-indigo-500" /> Create New
              </h2>
              <CategoryForm
                value={name}
                setValue={setName}
                handleSubmit={handleCreateCategory}
              />
            </div>
          </div>

          {/* List Side */}
          <div className="lg:col-span-2">
            <div className="flex flex-wrap gap-4">
              {categories?.map((category) => (
                <button
                  key={category._id}
                  onClick={() => {
                    setModalVisible(true);
                    setSelectedCategory(category);
                    setUpdatingName(category.name);
                  }}
                  className="group flex items-center gap-3 bg-slate-900/50 border border-slate-800 px-6 py-3 rounded-2xl transition-all duration-300 hover:border-pink-500/50 hover:bg-pink-500/5 hover:translate-y-[-2px] active:scale-95 shadow-sm"
                >
                  <span className="font-semibold text-slate-300 group-hover:text-pink-400 transition-colors">
                    {category.name}
                  </span>
                  <FaEdit
                    size={12}
                    className="text-slate-600 group-hover:text-pink-400 opacity-0 group-hover:opacity-100 transition-all"
                  />
                </button>
              ))}
            </div>

            {categories?.length === 0 && (
              <div className="text-center py-20 border-2 border-dashed border-slate-800 rounded-3xl">
                <p className="text-slate-500 italic">
                  No categories found. Start by creating one!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Edit Modal */}
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <div className="p-4">
            <h3 className="text-xl font-bold mb-6 text-slate-200">
              Update Category
            </h3>
            <CategoryForm
              value={updatingName}
              setValue={setUpdatingName}
              handleSubmit={handleUpdateCategory}
              buttonText="Update Changes"
              handleDelete={handleDeleteCategory}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CategoryList;
