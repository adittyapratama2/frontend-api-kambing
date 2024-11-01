import { apiSlice } from "../api";

export const kegiatanApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getKegiatan: builder.query({
      query: ({ limit, offset }) => ({
        url: `/cares?limit=${limit}&offset=${offset}`, // Add limit and offset to the URL
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
