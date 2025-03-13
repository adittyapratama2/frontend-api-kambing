import { apiSlice } from "../api";

export const pakanKandangApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPakanKandang: builder.query({
      query: ({ startDate, endDate }) => ({
        url: `/pakan-kandang?start=${startDate}&end=${endDate}`,
      }),
      providesTags: [{ type: "PakanKandang", id: "LIST" }],
    }),
    getPakanKandangById: builder.query({
      query: ({ id }) => ({
        url: `/pakan-kandang/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "PakanKandang", id }],
    }),
    createPakanKandangBaru: builder.mutation({
      query: (data) => ({
        url: "/pakan-kandang",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "PakanKandang", id: "LIST" }],
    }),
    updatePakanKandang: builder.mutation({
      query: ({ id, data }) => ({
        url: `/pakan-kandang/${id}`,
        method: "PUT", // Use PUT for update
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "PakanKandang", id },
      ],
    }),
    deletePakanKandang: builder.mutation({
      query: ({ id }) => ({
        url: `/pakan-kandang/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "PakanKandang", id: "LIST" }],
    }),
  }),
});

export const {
  useGetPakanKandangQuery,
  useCreatePakanKandangBaruMutation,
  useGetPakanKandangByIdQuery,
  useUpdatePakanKandangMutation,
  useDeletePakanKandangMutation,
} = pakanKandangApiSlice;
