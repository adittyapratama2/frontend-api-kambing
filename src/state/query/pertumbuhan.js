import { apiSlice } from "../api";

export const pertumbuhanKambingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPertumbuhanKambing: builder.query({
      query: ({ startDate, endDate }) => ({
        url: `/pertumbuhan-kambing?start=${startDate}&end=${endDate}`,
      }),
      providesTags: [{ type: "PertumbuhanKambing", id: "LIST" }],
    }),
    getPertumbuhanKambingById: builder.query({
      query: ({ id }) => ({
        url: `/pertumbuhan-kambing/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "PertumbuhanKambing", id }],
    }),
    createPertumbuhanKambingBaru: builder.mutation({
      query: (data) => ({
        url: "/pertumbuhan-kambing",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "PertumbuhanKambing", id: "LIST" }],
    }),
    updatePertumbuhanKambing: builder.mutation({
      query: ({ id, data }) => ({
        url: `/pertumbuhan-kambing/${id}`,
        method: "PUT", // Use PUT for update
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "PertumbuhanKambing", id },
      ],
    }),
    deletePertumbuhanKambing: builder.mutation({
      query: ({ id }) => ({
        url: `/pertumbuhan-kambing/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "PertumbuhanKambing", id },
      ],
    }),
  }),
});

export const {
  useGetPertumbuhanKambingQuery,
  useCreatePertumbuhanKambingBaruMutation,
  useGetPertumbuhanKambingByIdQuery,
  useUpdatePertumbuhanKambingMutation,
  useDeletePertumbuhanKambingMutation,
} = pertumbuhanKambingApiSlice;
