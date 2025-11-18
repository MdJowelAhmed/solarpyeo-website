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
    
    getJurorStatusMonitoring: builder.mutation({
      query: () => ({
        url: `/dashboard/juror/status`,
        method: "GET",
     
      }),
      providesTags: ["DashboardPage"],
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
  useGetJurorStatusMonitoringMutation,
  useUpdateDashboardPageMutation 
} = dashboardPageApi;
