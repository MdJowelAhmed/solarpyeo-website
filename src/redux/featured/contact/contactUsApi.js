import { api } from "@/redux/baseUrl/baseUrl";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    contactUs: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/contact/us",
        body: data,
      }),
    }),
  }),
});

export const {
  useContactUsMutation,
} = authApi;
