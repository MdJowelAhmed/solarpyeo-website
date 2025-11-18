import { api } from "@/redux/baseUrl/baseUrl";

const dashboardPageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardPage: builder.query({
      query: () => ({
        url: `/dashboard/case`,
        method: "GET",
      }),
      providesTags: ["DashboardPage"],
    }),
    
    createDashboardPage: builder.mutation({
      query: (data) => ({
        url: `/mistaker/claim-form`,
        method: "POST",
        body: data, 
      }),
      invalidatesTags: ["DashboardPage"],
    }),
    
    updateDashboardPage: builder.mutation({
      query: ({ id, data }) => ({
        url: `/featured/identity-dispute/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["DashboardPage"],
    }),
  }),
});

export const { 
  useGetDashboardPageQuery, 
  useCreateDashboardPageMutation, 
  useUpdateDashboardPageMutation 
} = dashboardPageApi;
