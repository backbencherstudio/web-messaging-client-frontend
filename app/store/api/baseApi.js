import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define your base API URL
const baseUrl =
  process.env.NEXT_PUBLIC_API_URL || "http://192.168.50.128:4000/api";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["Messages", "User", "Leaderboard"], // Add your tag types here
});

// Export hooks for usage in components
export const {
  // Add your generated hooks here as they are created
} = baseApi;
