import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define your base API URL
const baseUrl =
  process.env.NEXT_PUBLIC_API_URL || "http://192.168.4.4:4000/api";

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
  tagTypes: [
    "Messages",
    "User",
    "Leaderboard",
    "Notifications",
    "Faq",
    "AboutUs",
    "Dashboard",
    "Contacts",
  ], // Added Notifications tag
  // Add response transformer
  extractRehydrationInfo: (action, { reducerPath }) => {
    if (action.type === "REHYDRATE" && action.payload) {
      return action.payload[reducerPath];
    }
  },
  // Transform response to handle time objects
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
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
});

// Export hooks for usage in components
export const {
  // Add your generated hooks here as they are created
} = baseApi;
