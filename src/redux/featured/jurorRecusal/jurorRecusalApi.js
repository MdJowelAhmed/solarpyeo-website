import { api } from "@/redux/baseUrl/baseUrl";

const jurorRecusalApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getJurorRecusal: builder.query({
      query: () => ({
        url: `/featured/initial-submission`,
        method: "GET",
      }),
      providesTags: ["JurorRecusal"],
    }),
    
    createJurorRecusal: builder.mutation({
      query: (formData) => ({
        url: `/jurors/recusal`,
        method: "POST",
        body: formData, 
      }),
      invalidatesTags: ["JurorRecusal"],
    }),
    
    updateJurorRecusal: builder.mutation({
      query: ({ id, data }) => ({
        url: `/seal-expunge/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["JurorRecusal"],
    }),
  }),
});

export const { 
    useGetJurorRecusalQuery, 
    useCreateJurorRecusalMutation, 
    useUpdateJurorRecusalMutation 
} = jurorRecusalApi;
