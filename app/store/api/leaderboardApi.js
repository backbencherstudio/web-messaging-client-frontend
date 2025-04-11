import { baseApi } from "./baseApi";

export const leaderboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLeaderboard: builder.query({
      query: () => ({
        url: "leader-board",
        headers: {
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      }),
      providesTags: ["Leaderboard", "Messages"],
    }),
    getDashboardData: builder.query({
      query: () => ({
        url: "admin/dashboard",
        headers: {
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      }),
      providesTags: ["Dashboard"],
    }),
    getLastMessage: builder.query({
      query: () => ({
        url: "post-status/recent-status",
        headers: {
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      }),
      providesTags: ["Messages"],
    }),
  }),
});

export const {
  useGetLeaderboardQuery,
  useGetDashboardDataQuery,
  useGetLastMessageQuery,
} = leaderboardApi;
