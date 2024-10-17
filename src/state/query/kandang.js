import { apiSlice } from "../api";

export const kandangApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getKandang: builder.query({
      query: () => ({
        url: `/kandang`,
      }),
      providesTags: [{ type: "Kandang", id: "LIST" }],
    }),
    getKandangById: builder.query({
      query: ({ id }) => ({
        url: `/kandang/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Kandang", id }],
    }),
    createKandangBaru: builder.mutation({
      query: (data) => ({
        url: "/kandang",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Kandang", id: "LIST" }],
    }),
    updateKandang: builder.mutation({
      query: ({ id, data }) => ({
        url: `/kandang/${id}`,
        method: "PUT", // Use PUT for update
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Kandang", id }],
    }),
    deleteKandang: builder.mutation({
      query: ({ id }) => ({
        url: `/kandang/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Kandang", id }],
    }),
  }),
});

export const {
  useGetKandangQuery,
  useCreateKandangBaruMutation,
  useGetKandangByIdQuery,
  useUpdateKandangMutation,
  useDeleteKandangMutation,
} = kandangApiSlice;
