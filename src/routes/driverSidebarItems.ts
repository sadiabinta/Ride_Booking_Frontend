import ActiveRide from "@/pages/driver/ActiveRide";
import Income from "@/pages/driver/Income";
import RequestedRides from "@/pages/driver/RequestedRides";

export const driverSidebarItems = [
  {
    title: "Driver Dashboard",
    items: [
      {
        title: "Requested Rides",
        url: "/driver/requested",
        component: RequestedRides,
      },
      {
        title: "Active Ride",
        url: "/driver/active/:id",
        component: ActiveRide,
      },
      {
        title: "Income",
        url: "/driver/income",
        component: Income,
      },
    ],
  },
];
