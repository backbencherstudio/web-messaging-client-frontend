import { baseApi } from "./baseApi";

export const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => "messages",
      providesTags: ["Messages"],
    }),

    getMessage: builder.query({
      query: (id) => `messages/${id}`,
      providesTags: (result, error, id) => [{ type: "Messages", id }],
    }),

    createMessage: builder.mutation({
      query: (message) => ({
        url: "post-status/status",
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
    getAdminMessages: builder.query({
      query: (page = 1) => `admin/message-management?page=${page}`,
      providesTags: ["Messages"],
    }),
    getMessageById: builder.query({
      query: (id) => `admin/message-management/${id}`,
      providesTags: (result, error, id) => [{ type: "Messages", id }],
    }),
    updateMessage: builder.mutation({
      query: ({ id, ...update }) => ({
        url: `admin/message-management/${id}`,
        method: "PATCH",
        body: update,
      }),
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
} = messageApi;
