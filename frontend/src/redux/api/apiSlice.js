import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

// Adding credentials: "include" is what allows the JWT to travel to the backend
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Product", "Order", "Category"],
  endpoints: (builder) => ({}),
});
