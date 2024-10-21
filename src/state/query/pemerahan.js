import { apiSlice } from "../api";

export const pemerahanKambingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPemerahanKambing: builder.query({
      query: ({ startDate, endDate }) => ({
        url: `/pemerahan-kambing?start=${startDate}&end=${endDate}`,
      }),
      providesTags: [{ type: "PemerahanKambing", id: "LIST" }],
    }),
    getPemerahanKambingById: builder.query({
      query: ({ id }) => ({
        url: `/pemerahan-kambing/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "PemerahanKambing", id }],
    }),
    createPemerahanKambingBaru: builder.mutation({
      query: (data) => ({
        url: "/pemerahan-kambing",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "PemerahanKambing", id: "LIST" }],
    }),
    updatePemerahanKambing: builder.mutation({
      query: ({ id, data }) => ({
        url: `/pemerahan-kambing/${id}`,
        method: "PUT", // Use PUT for update
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "PemerahanKambing", id },
      ],
    }),
    deletePemerahanKambing: builder.mutation({
      query: ({ id }) => ({
        url: `/pemerahan-kambing/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "PemerahanKambing", id },
      ],
    }),
  }),
});

export const {
  useGetPemerahanKambingQuery,
  useCreatePemerahanKambingBaruMutation,
  useGetPemerahanKambingByIdQuery,
  useUpdatePemerahanKambingMutation,
  useDeletePemerahanKambingMutation,
} = pemerahanKambingApiSlice;
