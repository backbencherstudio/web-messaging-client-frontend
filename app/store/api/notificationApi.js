import { baseApi } from "./baseApi";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: ({ page = 1, limit = 5 }) => ({
        url: `/notifications`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["Notifications"],
    }),

    markNotificationAsRead: builder.mutation({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notifications"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetNotificationsQuery, useMarkNotificationAsReadMutation } =
  notificationApi;
