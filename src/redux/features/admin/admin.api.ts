import { baseApi } from "@/redux/baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDriver: builder.query({
      query: () => ({
        url: "/drivers/",
        method: "GET",
      }),
      providesTags: ["DRIVERS"],
    }),
    updateDriver: builder.mutation({
      query: (driverInfo) => ({
        url: "/drivers/approve",
        method: "PATCH",
        data: driverInfo,
      }),
      invalidatesTags: ["DRIVERS"],
    }),
  }),
});

export const { useGetDriverQuery, useUpdateDriverMutation } = adminApi;
