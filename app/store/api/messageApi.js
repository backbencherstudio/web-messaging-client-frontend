import { baseApi } from "./baseApi";

export const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => ({
        url: "messages",
        headers: {
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      }),
      providesTags: ["Messages"],
    }),

    getMessage: builder.query({
      query: (id) => ({
        url: `messages/${id}`,
        headers: {
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      }),
      providesTags: (result, error, id) => [{ type: "Messages", id }],
    }),

    createMessage: builder.mutation({
      query: (message) => ({
        url: "post-status/free",
        method: "POST",
        body: message,
      }),
      invalidatesTags: ["Messages"],
    }),

    deleteMessage: builder.mutation({
      query: (id) => ({
        url: `admin/message-management/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Messages"],
    }),

    deleteMultipleMessages: builder.mutation({
      query: (ids) => ({
        url: `admin/message-management`,
        method: "DELETE",
        body: { ids },
      }),
      invalidatesTags: ["Messages"],
    }),

    getUserMessages: builder.query({
      query: (id) => ({
        url: `message-list/user/${id}`,
        headers: {
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      }),
      providesTags: ["Messages"],
    }),

    // Updated getAdminMessages with enhanced parameters
    getAdminMessages: builder.query({
      query: (params = {}) => {
        const {
          q = "",
          page = 1,
          limit = 10,
          sortBy = "created_at",
          sortOrder = "desc",
          startDate = "",
          endDate = "",
        } = params;

        const queryParams = new URLSearchParams();
        if (q) queryParams.append("q", q);
        if (page) queryParams.append("page", page.toString());
        if (limit) queryParams.append("limit", limit.toString());
        if (sortBy) queryParams.append("sortBy", sortBy);
        if (sortOrder) queryParams.append("sortOrder", sortOrder);
        if (startDate) queryParams.append("startDate", startDate);
        if (endDate) queryParams.append("endDate", endDate);

        return {
          url: `admin/message-management${
            queryParams.toString() ? `?${queryParams}` : ""
          }`,
          headers: {
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
        };
      },
      providesTags: ["Messages"],
    }),

    getMessageById: builder.query({
      query: (id) => ({
        url: `admin/message-management/${id}`,
        headers: {
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      }),
      providesTags: (result, error, id) => [{ type: "Messages", id }],
    }),

    updateMessage: builder.mutation({
      query: ({ id, ...update }) => ({
        url: `admin/message-management/${id}`,
        method: "PATCH",
        body: update,
      }),
      invalidatesTags: ["Messages"],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useGetMessageQuery,
  useCreateMessageMutation,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
  useGetAdminMessagesQuery,
  useDeleteMultipleMessagesMutation,
  useGetMessageByIdQuery,
  useGetUserMessagesQuery,
} = messageApi;
