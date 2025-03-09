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
      providesTags: [{ type: "PertumbuhanKambing", id: "LIST" }],
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
        url: `/pertumbuhan-kambing/update/${id}`,
        method: "PATCH", // Use PUT for update
        body: data,
      }),
      invalidatesTags: [{ type: "PertumbuhanKambing", id: "LIST" }],
    }),
    deletePertumbuhanKambing: builder.mutation({
      query: ({ id }) => ({
        url: `/pertumbuhan-kambing/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "PertumbuhanKambing", id: "LIST" }],
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
