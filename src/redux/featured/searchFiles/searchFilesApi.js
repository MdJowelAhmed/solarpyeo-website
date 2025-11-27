import { api } from "@/redux/baseUrl/baseUrl";

const searchFilesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get all files (not used in current implementation but kept for reference)
    searchFiles: builder.query({
      query: (id) => ({
        url: `/dashboard/user/${id}`,
        method: "GET",
      }),
      providesTags: ["SearchFiles"],
    }),
    
    // Search files by user details (firstName, lastName, birthDate)
    searchFilesByUser: builder.mutation({
      query: (params) => ({
        url: `/dashboard/case/search?firstName=${params.firstName}&lastName=${params.lastName}&birthDate=${params.birthDate}`,
        method: "GET",
      }),
      invalidatesTags: ["SearchFiles"],
    }),
    
    // Payment for file access
    paymentForFiles: builder.mutation({
      query: (data) => ({
        url: `/dashboard/case/search`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SearchFiles"],
    }),

    searchMySubmissionForm: builder.query({
      query: () => ({
        url: `/dashboard/caseId`,
        method: "GET",
      }),
      providesTags: ["SearchFiles"],
    }),
  }),
});

export const { 
  useSearchFilesQuery,
  useSearchFilesByUserMutation,
  usePaymentForFilesMutation,
  useSearchMySubmissionFormQuery,
} = searchFilesApi;

export default searchFilesApi;