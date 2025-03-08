import { baseApi } from "./baseApi";

export const faqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFaq: builder.query({
      query: () => "admin/faq",
      providesTags: ["Faq"],
    }),
    getAllFaq: builder.query({
      query: () => "faq",
      providesTags: ["Faq"],
    }),
    createFaq: builder.mutation({
      query: (data) => ({
        url: "admin/faq",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Faq"],
    }),
    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `admin/faq/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Faq"],
    }),

    getAboutUs: builder.query({
      query: () => "admin/website-info",
      providesTags: ["AboutUs"],
    }),
    updateAboutUs: builder.mutation({
      query: (data) => ({
        url: "admin/website-info",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AboutUs"],
    }),
  }),
});

export const {
  useGetFaqQuery,
  useGetAllFaqQuery,
  useCreateFaqMutation,
  useDeleteFaqMutation,
  useGetAboutUsQuery,
  useUpdateAboutUsMutation,
} = faqApi;
