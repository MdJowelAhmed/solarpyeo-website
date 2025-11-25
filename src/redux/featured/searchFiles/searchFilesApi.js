import { api } from "@/redux/baseUrl/baseUrl";

const searchFilesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get all files (not used in current implementation but kept for reference)
    searchFiles: builder.query({
      query: () => ({
        url: `/dashboard/user`,
        method: "GET",
      }),
      providesTags: ["SearchFiles"],
    }),
    
    // Search files by user details (firstName, lastName, birthDate)
    searchFilesByUser: builder.mutation({
      query: (params) => ({
        url: `/dashboard/case?firstName=${params.firstName}&lastName=${params.lastName}&birthDate=${params.birthDate}`,
        method: "GET",
      }),
      invalidatesTags: ["SearchFiles"],
    }),
    
    // Payment for file access
    paymentForFiles: builder.mutation({
      query: (data) => ({
        url: `/dashboard/case`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SearchFiles"],
    }),
  }),
});

export const { 
  useSearchFilesQuery,
  useSearchFilesByUserMutation,
  usePaymentForFilesMutation,
} = searchFilesApi;

export default searchFilesApi;