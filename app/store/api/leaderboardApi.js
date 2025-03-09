import { baseApi } from "./baseApi";

export const leaderboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLeaderboard: builder.query({
      query: () => "leader-board",
      providesTags: ["Leaderboard", "Messages"],
    }),
    getDashboardData: builder.query({
      query: () => "admin/dashboard",
      providesTags: ["Dashboard"],
    }),
    getLastMessage: builder.query({
      query: () => "post-status/recent-status",
      providesTags: ["Messages"],
    }),
  }),
});

export const {
  useGetLeaderboardQuery,
  useGetDashboardDataQuery,
  useGetLastMessageQuery,
} = leaderboardApi;
