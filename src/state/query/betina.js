import { apiSlice } from "../api";

export const indukBetinaApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getIndukBetina: builder.query({
      query: () => ({
        url: `/induk-betina`,
      }),
      providesTags: [{ type: "IndukBetina", id: "LIST" }],
    }),
    getIndukBetinaById: builder.query({
      query: ({ id }) => ({
        url: `/induk-betina/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "IndukBetina", id }],
    }),
    createIndukBetinaBaru: builder.mutation({
      query: (data) => ({
        url: "/induk-betina",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "IndukBetina", id: "LIST" }],
    }),
    updateIndukBetina: builder.mutation({
      query: ({ id, data }) => ({
        url: `/induk-betina/${id}`,
        method: "PUT", // Use PUT for update
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "IndukBetina", id }],
    }),
    deleteIndukBetina: builder.mutation({
      query: ({ id }) => ({
        url: `/induk-betina/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "IndukBetina", id }],
    }),
  }),
});

export const {
  useGetIndukBetinaQuery,
  useCreateIndukBetinaBaruMutation,
  useGetIndukBetinaByIdQuery,
  useUpdateIndukBetinaMutation,
  useDeleteIndukBetinaMutation,
} = indukBetinaApiSlice;
