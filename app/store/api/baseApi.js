import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define your base API URL
const baseUrl =
  process.env.NEXT_PUBLIC_API_URL || "http://192.168.40.25:4000/api";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // Get token from cookies or state if needed
      const token = ""; // Add your token logic here
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
