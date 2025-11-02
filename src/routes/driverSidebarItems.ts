import ActiveRide from "@/pages/driver/ActiveRide";
import AllRides from "@/pages/driver/AllRides";
import Income from "@/pages/driver/Income";
import Profile from "@/pages/driver/Profile";
import RequestedRides from "@/pages/driver/RequestedRides";

export const driverSidebarItems = [
  {
    title: "Driver Dashboard",
    items: [
      {
        title: "All Rides",
        url: "/driver/rides",
        component: AllRides,
      },
      {
        title: "Requested Rides",
        url: "/driver/requested",
        component: RequestedRides,
      },
      {
        title: "Active Ride",
        url: "/driver/active",
        component: ActiveRide,
      },
      {
        title: "Income",
        url: "/driver/income",
        component: Income,
      },
      {
        title: "Profile",
        url: "/driver/profile",
        component: Profile,
      },
    ],
  },
];
