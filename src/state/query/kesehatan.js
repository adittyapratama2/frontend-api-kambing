import { apiSlice } from "../api";

export const kesehatanKambingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getKesehatanKambing: builder.query({
      query: ({ startDate, endDate }) => ({
        url: `/kesehatan-kambing?start=${startDate}&end=${endDate}`,
      }),
      providesTags: [{ type: "KesehatanKambing", id: "LIST" }],
    }),
    getKesehatanKambingById: builder.query({
      query: ({ id }) => ({
        url: `/kesehatan-kambing/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "KesehatanKambing", id }],
    }),
    createKesehatanKambingBaru: builder.mutation({
      query: (data) => ({
        url: "/kesehatan-kambing",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "KesehatanKambing", id: "LIST" }],
    }),
    updateKesehatanKambing: builder.mutation({
      query: ({ id, data }) => ({
        url: `/kesehatan-kambing/${id}`,
        method: "PUT", // Use PUT for update
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "KesehatanKambing", id },
      ],
    }),
    deleteKesehatanKambing: builder.mutation({
      query: ({ id }) => ({
        url: `/kesehatan-kambing/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "KesehatanKambing", id },
      ],
    }),
  }),
});

export const {
  useGetKesehatanKambingQuery,
  useCreateKesehatanKambingBaruMutation,
  useGetKesehatanKambingByIdQuery,
  useUpdateKesehatanKambingMutation,
  useDeleteKesehatanKambingMutation,
} = kesehatanKambingApiSlice;
