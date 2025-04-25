import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Simplified API URL handling
const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
console.log("API URL:", baseUrl); // For debugging

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
          headers.set("authorization", `Bearer ${token}`);
        }
      }
      return headers;
    },
    responseHandler: async (response) => {
      const data = await response.json();
      // Transform any time objects in the response
      const transformData = (obj) => {
        if (!obj) return obj;
        if (Array.isArray(obj)) {
          return obj.map(transformData);
        }
        if (typeof obj === "object") {
          const transformed = {};
          for (const key in obj) {
            if (
              obj[key] &&
              typeof obj[key] === "object" &&
              "time" in obj[key]
            ) {
              transformed[key] = obj[key].fullFormat || obj[key].time;
            } else {
              transformed[key] = transformData(obj[key]);
            }
          }
          return transformed;
        }
        return obj;
      };
      return transformData(data);
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    "Messages",
    "User",
    "Leaderboard",
    "Notifications",
    "Faq",
    "AboutUs",
    "Dashboard",
    "Contacts",
    "Payment",
  ],
  extractRehydrationInfo: (action, { reducerPath }) => {
    if (action.type === "REHYDRATE" && action.payload) {
      return action.payload[reducerPath];
    }
  },
});

// Export hooks for usage in components
export const {
  // Add your generated hooks here as they are created
} = baseApi;
