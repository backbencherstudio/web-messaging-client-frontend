import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Enhanced getUsers with search, sorting, and filtering
    getUsers: builder.query({
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
          type = "",
          approved = "",
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
        if (type) queryParams.append("type", type);
        if (approved) queryParams.append("approved", approved);

        return {
          url: `admin/user?${queryParams.toString()}`,
          headers: {
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
        };
      },
      providesTags: ["User"],
    }),

    // Enhanced getUserById with post filtering and pagination
    getUserById: builder.query({
      query: ({ id, ...params }) => {
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
          url: `admin/user/${id}?${queryParams.toString()}`,
          headers: {
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
        };
      },
      providesTags: (result, error, { id }) => [{ type: "User", id }],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `admin/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    createUser: builder.mutation({
      query: (user) => ({
        url: "admin/user",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),

    deleteUserMessage: builder.mutation({
      query: (id) => ({
        url: `admin/user/post/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useDeleteUserMessageMutation,
} = userApi;
