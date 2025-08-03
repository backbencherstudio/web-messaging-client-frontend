import { baseApi } from "./baseApi";

export const leaderboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Dashboard Overview
    getDashboardOverview: builder.query({
      query: () => ({
        url: "admin/dashboard/overview",
        headers: {
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      }),
      providesTags: ["DashboardOverview"],
    }),

    // Dashboard Posts with pagination, sorting, and search
    getDashboardPosts: builder.query({
      query: (params = {}) => {
        const {
          q = "",
          page = 1,
          limit = 10,
          sortBy = "created_at",
          sortOrder = "desc",
        } = params;

        const queryParams = new URLSearchParams();
        if (q) queryParams.append("q", q);
        if (page) queryParams.append("page", page.toString());
        if (limit) queryParams.append("limit", limit.toString());
        if (sortBy) queryParams.append("sortBy", sortBy);
        if (sortOrder) queryParams.append("sortOrder", sortOrder);

        return {
          url: `admin/dashboard/posts${
            queryParams.toString() ? `?${queryParams}` : ""
          }`,
          headers: {
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
        };
      },
      providesTags: ["DashboardPosts"],
    }),

    // Dashboard Users with pagination, sorting, and search
    getDashboardUsers: builder.query({
      query: (params = {}) => {
        const {
          q = "",
          page = 1,
          limit = 10,
          sortBy = "created_at",
          sortOrder = "desc",
        } = params;

        const queryParams = new URLSearchParams();
        if (q) queryParams.append("q", q);
        if (page) queryParams.append("page", page.toString());
        if (limit) queryParams.append("limit", limit.toString());
        if (sortBy) queryParams.append("sortBy", sortBy);
        if (sortOrder) queryParams.append("sortOrder", sortOrder);

        return {
          url: `admin/dashboard/users${
            queryParams.toString() ? `?${queryParams}` : ""
          }`,
          headers: {
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
        };
      },
      providesTags: ["DashboardUsers"],
    }),

    // Keep existing endpoints
    getLeaderboard: builder.query({
      query: () => ({
        url: "leader-board",
        headers: {
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      }),
      providesTags: ["Leaderboard", "Messages"],
    }),

    getLastMessage: builder.query({
      query: () => ({
        url: "post-status/recent-status",
        headers: {
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      }),
      providesTags: ["Leaderboard", "Messages", "Payment"],
    }),
  }),
});

export const {
  useGetDashboardOverviewQuery,
  useGetDashboardPostsQuery,
  useGetDashboardUsersQuery,
  useGetLeaderboardQuery,
  useGetLastMessageQuery,
} = leaderboardApi;
