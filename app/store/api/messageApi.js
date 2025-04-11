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
    getAdminMessages: builder.query({
      query: (page = 1) => ({
        url: `admin/message-management?page=${page}`,
        headers: {
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      }),
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
