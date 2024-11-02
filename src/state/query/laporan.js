import { apiSlice } from "../api";

export const laporanApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLaporanAll: builder.query({
      query: () => ({
        url: `/laporan-kambing/all`,
      }),
      providesTags: [
        { type: "Kambing", id: "LIST" },
        { type: "IndukBetina", id: "LIST" },
        { type: "IndukPejantan", id: "LIST" },
        { type: "Kandang", id: "LIST" },
      ],
    }),
    getLaporanBySearchKambing: builder.query({
      query: ({ keyword }) => ({
        url: `/laporan-kambing/search?keyword=${keyword}`,
      }),
      providesTags: [
        { type: "Kambing", id: "LIST" },
        { type: "IndukBetina", id: "LIST" },
        { type: "IndukPejantan", id: "LIST" },
        { type: "Kandang", id: "LIST" },
      ],
    }),
    getLaporanKambingById: builder.query({
      query: ({ id, startDate, endDate }) => ({
        url: `/laporan-kambing/detail/${id}?start=${startDate}&end=${endDate}`,
      }),
      providesTags: [
        { type: "Kambing", id: "LIST" },
        { type: "PertumbuhanKambing", id: "LIST" },
        { type: "PemerahanKambing", id: "LIST" },
        { type: "KesehatanKambing", id: "LIST" },
        { type: "ProduksiSusu", id: "LIST" },
      ],
    }),
    getLaporanKandangById: builder.query({
      query: ({ id }) => ({
        url: `/laporan-kambing/detail-kandang/${id}`,
      }),
      providesTags: [
        { type: "Kandang", id: "LIST" },
        { type: "PakanKandang", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetLaporanAllQuery,
  useGetLaporanBySearchKambingQuery,
  useGetLaporanKambingByIdQuery,
  useGetLaporanKandangByIdQuery,
} = laporanApiSlice;
