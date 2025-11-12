import { api } from "@/redux/baseUrl/baseUrl";

const initialSubmissionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getInitialSubmission: builder.query({
      query: () => ({
        url: `/featured/initial-submission`,
        method: "GET",
      }),
      providesTags: ["InitialSubmission"],
    }),
    getSingleInitialSubmission: builder.query({
      query: (id) => ({
        url: `/initial/submission/${id}`,
        method: "GET",
      }),
      providesTags: ["InitialSubmission"],
    }),
    
    createInitialSubmission: builder.mutation({
      query: (formData) => ({
        url: `/initial/submission`,
        method: "POST",
        body: formData, // Use 'body' not 'data' for RTK Query
        // Don't set headers - RTK Query will handle FormData automatically
      }),
      invalidatesTags: ["InitialSubmission"],
    }),
    
    updateInitialSubmission: builder.mutation({
      query: ({ id, data }) => ({
        url: `/featured/initial-submission/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["InitialSubmission"],
    }),
  }),
});

export const { 
  useGetInitialSubmissionQuery, 
  useCreateInitialSubmissionMutation, 
  useUpdateInitialSubmissionMutation,
  useGetSingleInitialSubmissionQuery
} = initialSubmissionApi;