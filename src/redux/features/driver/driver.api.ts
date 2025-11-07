import { baseApi } from "@/redux/baseApi";

export const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    requestedRide: builder.query({
      query: () => ({
        url: "/drivers/available",
        method: "GET",
      }),
    }),
    requestedSingleRide: builder.query({
      query: (id) => ({
        url: `/drivers/available/${id}`,
        method: "GET",
      }),
    }),
    canceldRide: builder.mutation({
      query: (id) => ({
        url: `/rides/${id}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["RIDES"],
    }),
    acceptdRide: builder.mutation({
      query: (id) => ({
        url: `/drivers/${id}/accept`,
        method: "PATCH",
      }),
      invalidatesTags: ["RIDES"],
    }),
    pickedup: builder.mutation({
      query: (id) => ({
        url: `/drivers/${id}/pickup`,
        method: "PATCH",
      }),
      invalidatesTags: ["RIDES"],
    }),
    completeRide: builder.mutation({
      query: (id) => ({
        url: `/drivers/${id}/complete`,
        method: "PATCH",
      }),
      invalidatesTags: ["RIDES"],
    }),
    earning: builder.query({
      query: () => ({
        url: `/drivers/history`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRequestedRideQuery,
  useRequestedSingleRideQuery,
  useCanceldRideMutation,
  useAcceptdRideMutation,
  usePickedupMutation,
  useCompleteRideMutation,
  useEarningQuery,
} = driverApi;
