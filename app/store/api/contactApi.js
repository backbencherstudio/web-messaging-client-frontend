import { baseApi } from "./baseApi";

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: (params = {}) => {
        const {
          q = "",
          page = 1,
          limit = 10,
          sortBy = "created_at",
          sortOrder = "desc",
          startDate = "",
          endDate = "",
          month = "",
        } = params;

        const queryParams = new URLSearchParams();
        if (q) queryParams.append("q", q);
        if (page) queryParams.append("page", page);
        if (limit) queryParams.append("limit", limit);
        if (sortBy) queryParams.append("sortBy", sortBy);
        if (sortOrder) queryParams.append("sortOrder", sortOrder);
        if (startDate) queryParams.append("startDate", startDate);
        if (endDate) queryParams.append("endDate", endDate);
        if (month) queryParams.append("month", month);

        return {
          url: `admin/contact?${queryParams.toString()}`,
          headers: {
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
        };
      },
      providesTags: ["Contacts"],
    }),

    getContact: builder.query({
      query: (id) => ({
        url: `admin/contact/${id}`,
        headers: {
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      }),
      providesTags: (result, error, id) => [{ type: "Contacts", id }],
    }),

    createContact: builder.mutation({
      query: (contact) => ({
        url: "contact",
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
