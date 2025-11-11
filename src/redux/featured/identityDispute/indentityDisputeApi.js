import { api } from "@/redux/baseUrl/baseUrl";

const identityDisputeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getIdentityDispute: builder.query({
      query: () => ({
        url: `/featured/identity-dispute`,
        method: "GET",
      }),
      providesTags: ["IdentityDispute"],
    }),
    
    createIdentityDispute: builder.mutation({
      query: (data) => ({
        url: `/mistaker/claim-form`,
        method: "POST",
        body: data, 
      }),
      invalidatesTags: ["IdentityDispute"],
    }),
    
    updateIdentityDispute: builder.mutation({
      query: ({ id, data }) => ({
        url: `/featured/identity-dispute/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["IdentityDispute"],
    }),
  }),
});

export const { 
  useGetIdentityDisputeQuery, 
  useCreateIdentityDisputeMutation, 
  useUpdateIdentityDisputeMutation 
} = identityDisputeApi;
