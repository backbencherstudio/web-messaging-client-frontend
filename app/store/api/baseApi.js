import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define your base API URL
const baseUrl =
  process.env.NEXT_PUBLIC_API_URL || "http://192.168.50.128:4000/api";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // Get token from cookies or state if needed
      headers.set(
        "authorization",
        `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRhbnZpckBhZG1pbi5jb20iLCJzdWIiOiJjbTd0d290Z2EwMDAwdHZodzNhYnBqaWo4IiwiaWF0IjoxNzQxMzE5NDM5LCJleHAiOjE3NDE0MDU4Mzl9.ZP6DJpz0jSMFBcy-6cOwsfmDcydk_jKs43WVpWpeZ9k`
      );
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
