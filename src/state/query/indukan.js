import { apiSlice } from "../api";

export const indukanApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getIndukan: builder.query({
      query: () => ({
        url: `/induk-kambing`,
      }),
      providesTags: [{ type: "Indukan", id: "LIST" }],
    }),
    getIndukanById: builder.query({
      query: ({ id }) => ({
        url: `/induk-kambing/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Indukan", id }],
    }),
    createIndukanBaru: builder.mutation({
      query: (data) => ({
        url: "/induk-kambing",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Indukan", id: "LIST" }],
    }),
    updateIndukan: builder.mutation({
      query: ({ id, data }) => ({
        url: `/induk-kambing/${id}`,
        method: "PUT", // Use PUT for update
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Indukan", id }],
    }),
    deleteIndukan: builder.mutation({
      query: ({ id }) => ({
        url: `/induk-kambing/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Indukan", id }],
    }),
  }),
});

export const {
  useGetIndukanQuery,
  useCreateIndukanBaruMutation,
  useGetIndukanByIdQuery,
  useUpdateIndukanMutation,
  useDeleteIndukanMutation,
} = indukanApiSlice;
