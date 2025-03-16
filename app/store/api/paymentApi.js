import { baseApi } from "./baseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPayment: builder.query({
      query: () => "payment",
      providesTags: ["Payment"],
    }),
    createPayment: builder.mutation({
      query: (data) => ({
        url: "post-status/paid",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payment", "Messages"],
    }),
  }),
});

export const { useGetPaymentQuery, useCreatePaymentMutation } = paymentApi;
