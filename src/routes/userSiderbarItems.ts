import Allrides from "@/pages/user/Allrides";
import Profile from "@/pages/user/Profile";
import RequestRide from "@/pages/user/RequestRide";
import RideDetails from "@/pages/user/RideDetails";

export const userSidebarItems = [
  {
    title: "Rider Dashboard",
    items: [
      {
        title: "All Rides",
        url: "/rider/allRides",
        component: Allrides,
      },
      {
        title: "Ride Details",
        url: "/rider/rideDetails",
        component: RideDetails,
      },
      {
        title: "Request Ride",
        url: "/rider/RequestRide",
        component: RequestRide,
      },
      {
        title: "Profile",
        url: "/rider/profile",
        component: Profile,
      },
    ],
  },
];
