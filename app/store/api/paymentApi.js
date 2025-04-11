import { baseApi } from "./baseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPayment: builder.query({
      query: () => ({
        url: "payment",
        headers: {
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      }),
      providesTags: ["Payment"],
    }),
    createPayment: builder.mutation({
      query: (data) => ({
        url: "post-status/paid",
        method: "POST",
        body: data,
        headers: {
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      }),
      invalidatesTags: ["Payment", "Messages"],
    }),
  }),
});

export const { useGetPaymentQuery, useCreatePaymentMutation } = paymentApi;
