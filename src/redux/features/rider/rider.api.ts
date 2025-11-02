import { baseApi } from "@/redux/baseApi";

export const riderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    requestRide: builder.mutation({
      query: (rideInfo) => ({
        url: "/rides/request",
        method: "POST",
        data: rideInfo,
      }),
    }),
    estimateFare: builder.mutation({
      query: (rideInfo) => ({
        url: "/rides/estimate",
        method: "POST",
        data: rideInfo,
      }),
    }),
  }),
});

export const { useRequestRideMutation, useEstimateFareMutation } = riderApi;
