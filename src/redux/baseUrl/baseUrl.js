import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://10.10.7.44:5000/api/v1",
    // baseUrl: "http://206.162.244.188:5000/api/v1",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Posts", "Comments", "Likes","Community", "Package", "Subscription", "Access", "Pigeon","Notification","InitialSubmission","MisuseForm","RespondentSubmission", "AppealForm","SealOrExpunge", "DashboardPage"], 





  endpoints: () => ({}),
});



