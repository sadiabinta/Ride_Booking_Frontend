import Allrider from "@/pages/admin/Allrider";
import ManageDrivers from "@/pages/admin/ManageDrivers";
import ManageUser from "@/pages/admin/ManageUser";
import { lazy } from "react";

const Analytics = lazy(() => import("@/pages/admin/Analytics"));

export const adminSidebarItems = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
      {
        title: "All Rider",
        url: "/admin/riders",
        component: Allrider,
      },
      {
        title: "Manage Rider",
        url: "/admin/manageUsers",
        component: ManageUser,
      },
      {
        title: "Manage Drivers",
        url: "/admin/manageDrivers",
        component: ManageDrivers,
      },
    ],
  },
];
