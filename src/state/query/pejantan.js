import { apiSlice } from "../api";

export const pejantanApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPejantan: builder.query({
      query: () => ({
        url: `/pejantan-kambing`,
      }),
      providesTags: [{ type: "Pejantan", id: "LIST" }],
    }),
    getPejantanById: builder.query({
      query: ({ id }) => ({
        url: `/pejantan-kambing/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Pejantan", id }],
    }),
    createPejantanBaru: builder.mutation({
      query: (data) => ({
        url: "/pejantan-kambing",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Pejantan", id: "LIST" }],
    }),
    updatePejantan: builder.mutation({
      query: ({ id, data }) => ({
        url: `/pejantan-kambing/${id}`,
        method: "PUT", // Use PUT for update
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Pejantan", id }],
    }),
    deletePejantan: builder.mutation({
      query: ({ id }) => ({
        url: `/pejantan-kambing/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Pejantan", id }],
    }),
  }),
});

export const {
  useGetPejantanQuery,
  useCreatePejantanBaruMutation,
  useGetPejantanByIdQuery,
  useUpdatePejantanMutation,
  useDeletePejantanMutation,
} = pejantanApiSlice;
