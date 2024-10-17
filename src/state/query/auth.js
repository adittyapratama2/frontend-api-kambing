import { apiSlice } from "../api";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Auth", id: "LIST" }],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: [{ type: "Auth", id: "LIST" }],
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "CoreUser" }],
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  authApiSlice;
