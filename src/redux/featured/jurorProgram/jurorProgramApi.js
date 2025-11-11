import { api } from "@/redux/baseUrl/baseUrl";

const jurorProgramApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getJurorProgram: builder.query({
      query: () => ({
        url: `/featured/initial-submission`,
        method: "GET",
      }),
      providesTags: ["JurorProgram"],
    }),
    
    createJurorProgram: builder.mutation({
      query: (formData) => ({
        url: `/juror-program`,
        method: "POST",
        body: formData, 
      
      }),
      invalidatesTags: ["JurorProgram"],
    }),
    
    updateJurorProgramForm: builder.mutation({
      query: ({ id, data }) => ({
        url: `/featured/initial-submission/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["JurorProgram"],
    }),
  }),
});

export const { 
  useGetJurorProgramQuery, 
  useCreateJurorProgramMutation, 
  useUpdateJurorProgramFormMutation 
} = jurorProgramApi;
