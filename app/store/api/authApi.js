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

    // Forgot password endpoint
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: { email },
      }),
    }),
    verifyOtp: builder.mutation({
      query: ({ email, token }) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: { email, token },
      }),
    }),
    // Reset password endpoint
    resetPassword: builder.mutation({
      query: ({ email, token, newPassword }) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: { email, token, newPassword },
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
} = authApi;
