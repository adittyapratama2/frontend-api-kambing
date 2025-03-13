import { apiSlice } from "../api";

export const produksiSusuApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProduksiSusu: builder.query({
      query: ({ startDate, endDate }) => ({
        url: `/produksi-susu-kambing?start=${startDate}&end=${endDate}`,
      }),
      providesTags: [{ type: "ProduksiSusu", id: "LIST" }],
    }),
    getProduksiSusuById: builder.query({
      query: ({ id }) => ({
        url: `/produksi-susu-kambing/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "ProduksiSusu", id }],
    }),
    createProduksiSusuBaru: builder.mutation({
      query: (data) => ({
        url: "/produksi-susu-kambing",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "ProduksiSusu", id: "LIST" }],
    }),
    updateProduksiSusu: builder.mutation({
      query: ({ id, data }) => ({
        url: `/produksi-susu-kambing/${id}`,
        method: "PUT", // Use PUT for update
        body: data,
      }),
      invalidatesTags: [{ type: "ProduksiSusu", id: "LIST" }],
    }),
    deleteProduksiSusu: builder.mutation({
      query: ({ id }) => ({
        url: `/produksi-susu-kambing/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "ProduksiSusu", id: "LIST" }],
    }),
  }),
});

export const {
  useGetProduksiSusuQuery,
  useCreateProduksiSusuBaruMutation,
  useGetProduksiSusuByIdQuery,
  useUpdateProduksiSusuMutation,
  useDeleteProduksiSusuMutation,
} = produksiSusuApiSlice;
