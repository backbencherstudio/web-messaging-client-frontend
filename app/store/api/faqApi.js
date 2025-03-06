import { baseApi } from "./baseApi";

export const faqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFaq: builder.query({
      query: () => "admin/faq",
      providesTags: ["Faq"],
    }),
  }),
});

export const { useGetFaqQuery } = faqApi;
