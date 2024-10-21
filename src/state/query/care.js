import { apiSlice } from "../api";

export const kegiatanApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getKegiatan: builder.query({
      query: () => ({
        url: `/cares`,
      }),
      providesTags: [
        { type: "PemerahanKambing", id: "LIST" },
        { type: "PertumbuhanKambing", id: "LIST" },
        { type: "KesehatanKambing", id: "LIST" },
      ],
    }),
  }),
});

export const { useGetKegiatanQuery } = kegiatanApiSlice;
