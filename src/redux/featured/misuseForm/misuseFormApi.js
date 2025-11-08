import { api } from "@/redux/baseUrl/baseUrl";

const misuseFormApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMisuseForm: builder.query({
      query: () => ({
        url: `/featured/initial-submission`,
        method: "GET",
      }),
      providesTags: ["MisuseForm"],
    }),
    
    createMisuseForm: builder.mutation({
      query: (formData) => ({
        url: `/misuse/report`,
        method: "POST",
        body: formData, // Use 'body' not 'data' for RTK Query
        // Don't set headers - RTK Query will handle FormData automatically
      }),
      invalidatesTags: ["MisuseForm"],
    }),
    
    updateMisuseForm: builder.mutation({
      query: ({ id, data }) => ({
        url: `/featured/initial-submission/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["MisuseForm"],
    }),
  }),
});

export const { 
  useGetMisuseFormQuery, 
  useCreateMisuseFormMutation, 
  useUpdateMisuseFormMutation 
} = misuseFormApi;