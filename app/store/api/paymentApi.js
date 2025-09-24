import { baseApi } from "./baseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch the current board state (value-based model)
    getRecentStatus: builder.query({
      query: () => ({
        url: "post-status/recent-status",
        headers: {
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      }),
      providesTags: ["PostStatus"],
    }),
    getPayment: builder.query({
      query: () => ({
        url: "payment",
        headers: {
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      }),
      providesTags: ["Payment"],
    }),
    // Submit a PAID message (always available; enforce minimum on client)
    createPayment: builder.mutation({
      query: (data) => ({
        url: "post-status/paid",
        method: "POST",
        body: data,
        headers: {
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      }),
      invalidatesTags: [
        "PostStatus",
        "Payment",
        "Messages",
        "Leaderboard",
        "User",
      ],
    }),

    // Submit a FREE message (only when free period is active)
    createFreePost: builder.mutation({
      query: (data) => ({
        url: "post-status/free",
        method: "POST",
        body: data,
        headers: {
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      }),
      invalidatesTags: [
        "PostStatus",
        "Payment",
        "Messages",
        "Leaderboard",
        "User",
      ],
    }),
  }),
});

export const {
  useGetRecentStatusQuery,
  useGetPaymentQuery,
  useCreatePaymentMutation,
  useCreateFreePostMutation,
} = paymentApi;
