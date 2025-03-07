import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (page = 1) => `admin/user?page=${page}`,
      providesTags: ["User"],
    }),

    getUserById: builder.query({
      query: (id) => `admin/user/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    createUser: builder.mutation({
      query: (user) => ({
        url: "admin/user",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),

    updateMessage: builder.mutation({
      query: ({ id, ...update }) => ({
        url: `messages/${id}`,
        method: "PUT",
        body: update,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Messages", id }],
    }),

    deleteMessage: builder.mutation({
      query: (id) => ({
        url: `admin/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    getAdminMessages: builder.query({
      query: (page = 1) => `admin/message-management?page=${page}`,
      providesTags: ["Messages"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useGetAdminMessagesQuery,
} = userApi;
