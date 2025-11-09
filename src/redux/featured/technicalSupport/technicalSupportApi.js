import { api } from "@/redux/baseUrl/baseUrl";

const technicalSupportApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTechnicalSupport: builder.query({
      query: () => ({
        url: `/featured/initial-submission`,
        method: "GET",
      }),
      providesTags: ["MisuseForm"],
    }),
    
    createTechnicalSupport: builder.mutation({
      query: (formData) => ({
        url: `/technical/support`,
        method: "POST",
        body: formData, 
      }),
      invalidatesTags: ["MisuseForm"],
    }),
    
    updateTechnicalSupport: builder.mutation({
      query: ({ id, data }) => ({
        url: `/technical/support/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["MisuseForm"],
    }),
  }),
});

export const { 
  useGetTechnicalSupportQuery, 
  useCreateTechnicalSupportMutation, 
  useUpdateTechnicalSupportMutation 
} = technicalSupportApi;
