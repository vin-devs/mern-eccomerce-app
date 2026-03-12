import { useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice";

const Category = () => {
  const { data: categories } = useFetchCategoriesQuery();
  console.log(categories);
};
const CategoryList = () => {
  return <div>CategoryList</div>;
};

export default CategoryList;
