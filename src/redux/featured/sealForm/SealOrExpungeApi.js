import { api } from "@/redux/baseUrl/baseUrl";

const sealOrExpungeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSealOrExpunge: builder.query({
      query: () => ({
        url: `/featured/initial-submission`,
        method: "GET",
      }),
      providesTags: ["SealOrExpunge"],
    }),
    
    createSealOrExpunge: builder.mutation({
      query: (formData) => ({
        url: `/for/seal`,
        method: "POST",
        body: formData, 
      }),
      invalidatesTags: ["SealOrExpunge"],
    }),
    
    updateSealOrExpunge: builder.mutation({
      query: ({ id, data }) => ({
        url: `/seal-expunge/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["SealOrExpunge"],
    }),
  }),
});

export const { 
  useGetSealOrExpungeQuery, 
  useCreateSealOrExpungeMutation, 
  useUpdateSealOrExpungeMutation 
} = sealOrExpungeApi;
