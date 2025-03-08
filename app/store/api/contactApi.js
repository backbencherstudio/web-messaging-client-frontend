import { baseApi } from "./baseApi";

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: (page = 1) => `admin/contact?page=${page}`,
      providesTags: ["Contacts"],
    }),

    getContact: builder.query({
      query: (id) => `admin/contact/${id}`,
      providesTags: (result, error, id) => [{ type: "Contacts", id }],
    }),

    createContact: builder.mutation({
      query: (contact) => ({
        url: "contact-us",
        method: "POST",
        body: contact,
      }),
      invalidatesTags: ["Contacts"],
    }),

    updateContact: builder.mutation({
      query: ({ id, ...update }) => ({
        url: `contact-us/${id}`,
        method: "PUT",
        body: update,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Contacts", id }],
    }),

    deleteContact: builder.mutation({
      query: (id) => ({
        url: `admin/contact/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contacts"],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetContactQuery,
  useCreateContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactApi;
