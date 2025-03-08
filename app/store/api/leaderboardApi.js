import { baseApi } from "./baseApi";

export const leaderboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLeaderboard: builder.query({
      query: () => "leader-board",
      providesTags: ["Leaderboard"],
    }),
    getDashboardData: builder.query({
      query: () => "admin/dashboard",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetLeaderboardQuery, useGetDashboardDataQuery } =
  leaderboardApi;
