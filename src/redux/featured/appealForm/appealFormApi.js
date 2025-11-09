import { api } from "@/redux/baseUrl/baseUrl";

const appealFormApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAppealForm: builder.query({
      query: () => ({
        url: `/respondent/submission`,
        method: "GET",
      }),
      providesTags: ["AppealForm"],
    }),
    
    createAppealForm: builder.mutation({
      query: (formData) => ({
        url: `/appeal/request`,
        method: "POST",
        body: formData, 
      }),
      invalidatesTags: ["AppealForm"],
    }),
    
    updateAppealForm: builder.mutation({
      query: ({ id, data }) => ({
        url: `/respondent/submission/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["AppealForm"],
    }),
  }),
});

export const { 
    useGetAppealFormQuery, 
    useCreateAppealFormMutation, 
    useUpdateAppealFormMutation 
} = appealFormApi;
