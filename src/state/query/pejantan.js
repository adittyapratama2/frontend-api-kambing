import { apiSlice } from "../api";

export const pejantanApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPejantan: builder.query({
      query: () => ({
        url: `/induk-pejantan`,
      }),
      providesTags: [{ type: "IndukPejantan", id: "LIST" }],
    }),
    getPejantanById: builder.query({
      query: ({ id }) => ({
        url: `/induk-pejantan/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "IndukPejantan", id }],
    }),
    createPejantanBaru: builder.mutation({
      query: (data) => ({
        url: "/induk-pejantan",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "IndukPejantan", id: "LIST" }],
    }),
    updatePejantan: builder.mutation({
      query: ({ id, data }) => ({
        url: `/induk-pejantan/${id}`,
        method: "PUT", // Use PUT for update
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "IndukPejantan", id },
      ],
    }),
    deletePejantan: builder.mutation({
      query: ({ id }) => ({
        url: `/induk-pejantan/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "IndukPejantan", id },
      ],
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
