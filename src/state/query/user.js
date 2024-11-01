import { apiSlice } from "../api";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserId: builder.query({
      query: ({ id }) => ({
        url: `/users/${id}`,
      }),
      providesTags: [{ type: "User" }],
    }),
    getUser: builder.query({
      query: () => ({
        url: `/users`,
      }),
      providesTags: [{ type: "User" }],
    }),
  }),
});

export const { useGetUserIdQuery, useGetUserQuery } = userApiSlice;
