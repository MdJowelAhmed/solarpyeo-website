import { api } from "@/redux/baseUrl/baseUrl";

const paymentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createPayment: builder.mutation({
      query: (paymentData) => ({
        url: `/initial-submission/pay`,
        method: "POST",
        body: paymentData,
      }),
      invalidatesTags: ["Payment"],
    }),
    
    getPaymentsBySubmission: builder.query({
      query: (submissionId) => ({
        url: `/payment/submission/${submissionId}`,
        method: "GET",
      }),
      providesTags: ["Payment"],
    }),
    
    updatePaymentStatus: builder.mutation({
      query: ({ paymentId, status }) => ({
        url: `/payment/${paymentId}`,
        method: "PATCH",
        body: { paymentStatus: status },
      }),
      invalidatesTags: ["Payment"],
    }),
  }),
});

export const { 
  useCreatePaymentMutation,
  useGetPaymentsBySubmissionQuery,
  useUpdatePaymentStatusMutation
} = paymentApi;