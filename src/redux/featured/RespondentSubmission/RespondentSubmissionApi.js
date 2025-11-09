import { api } from "@/redux/baseUrl/baseUrl";

const respondentSubmissionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRespondentSubmission: builder.query({
      query: () => ({
        url: `/respondent/submission`,
        method: "GET",
      }),
      providesTags: ["RespondentSubmission"],
    }),
    
    createRespondentSubmission: builder.mutation({
      query: (formData) => ({
        url: `/respondent/submission`,
        method: "POST",
        body: formData, 
      }),
      invalidatesTags: ["RespondentSubmission"],
    }),
    
    updateRespondentSubmission: builder.mutation({
      query: ({ id, data }) => ({
        url: `/respondent/submission/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["RespondentSubmission"],
    }),
  }),
});

export const { 
    useGetRespondentSubmissionQuery, 
    useCreateRespondentSubmissionMutation, 
    useUpdateRespondentSubmissionMutation 
} = respondentSubmissionApi;
