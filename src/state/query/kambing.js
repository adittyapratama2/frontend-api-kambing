import { apiSlice } from "../api";

export const kambingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getKambing: builder.query({
      query: () => ({
        url: `/goats`,
      }),
      providesTags: [
        { type: "Kambing", id: "LIST" },
        { type: "IndukBetina", id: "LIST" },
        { type: "IndukPejantan", id: "LIST" },
      ],
    }),
    getKambingById: builder.query({
      query: ({ id }) => ({
        url: `/goats/${id}`,
      }),
      providesTags: [{ type: "Kambing", id: "LIST" }],
    }),
    createKambingBaru: builder.mutation({
      query: (data) => ({
        url: "/goats",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Kambing", id: "LIST" }],
    }),
    updateKambing: builder.mutation({
      query: ({ id, data }) => ({
        url: `/goats/${id}`,
        method: "PATCH", // Use PUT for update
        body: data,
      }),
      invalidatesTags: [{ type: "Kambing", id: "LIST" }],
    }),
    deleteKambing: builder.mutation({
      query: ({ id }) => ({
        url: `/goats/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Kambing", id: "LIST" }],
    }),
  }),
});

export const {
  useGetKambingQuery,
  useCreateKambingBaruMutation,
  useGetKambingByIdQuery,
  useUpdateKambingMutation,
  useDeleteKambingMutation,
} = kambingApiSlice;
