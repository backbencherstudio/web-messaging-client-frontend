import { baseApi } from "./baseApi";
import { encryptData } from "@/app/utils/encryption";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Signup endpoint
    signup: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),

    // Login endpoint
    signin: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response) => {
        // Store the token in localStorage
        if (response.authorization.token) {
          const encryptedType = encryptData(response.type);

          localStorage.setItem("token", response.authorization.token);
          localStorage.setItem("type", encryptedType);
        }
        return response;
      },
    }),

    resendOtp: builder.mutation({
      query: (email) => ({
        url: "/auth/resend-2fa-otp",
        method: "POST",
        body: { email },
      }),
    }),

    // Forgot password endpoint
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: { email },
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: data,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: data,
      }),
    }),
    // Reset password endpoint
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: "/admin/user",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getProfile: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/user-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    requestEmailChange: builder.mutation({
      query: (email) => ({
        url: "/auth/request-email-change",
        method: "POST",
        body: { email },
      }),
    }),

    changeEmail: builder.mutation({
      query: ({ email, token }) => ({
        url: "/auth/change-email",
        method: "POST",
        body: { email, token },
      }),
      invalidatesTags: ["User"],
    }),

    // Add these endpoints to the existing authApi
    enable2FA: builder.mutation({
      query: () => ({
        url: "auth/enable-2fa",
        method: "POST",
      }),
    }),
    disable2FA: builder.mutation({
      query: () => ({
        url: "auth/disable-2fa",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetUserQuery,
  useVerifyOtpMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useVerifyEmailMutation,
  useResendOtpMutation,
  useRequestEmailChangeMutation,
  useChangeEmailMutation,
  useEnable2FAMutation,
  useDisable2FAMutation,
} = authApi;
