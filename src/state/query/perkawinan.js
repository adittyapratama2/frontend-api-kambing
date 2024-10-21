import { apiSlice } from "../api";

export const perkawinanApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPerkawinan: builder.query({
      query: () => ({
        url: `/perkawinan`,
      }),
      providesTags: [{ type: "Perkawinan", id: "LIST" }],
    }),
    getPerkawinanById: builder.query({
      query: ({ id }) => ({
        url: `/perkawinan/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Perkawinan", id }],
    }),
    createPerkawinanBaru: builder.mutation({
      query: (data) => ({
        url: "/perkawinan",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Perkawinan", id: "LIST" }],
    }),
    updatePerkawinan: builder.mutation({
      query: ({ id, data }) => ({
        url: `/perkawinan/${id}`,
        method: "PUT", // Use PUT for update
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Perkawinan", id }],
    }),
    deletePerkawinan: builder.mutation({
      query: ({ id }) => ({
        url: `/perkawinan/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Perkawinan", id }],
    }),
  }),
});

export const {
  useGetPerkawinanQuery,
  useCreatePerkawinanBaruMutation,
  useGetPerkawinanByIdQuery,
  useUpdatePerkawinanMutation,
  useDeletePerkawinanMutation,
} = perkawinanApiSlice;
