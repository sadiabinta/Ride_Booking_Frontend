import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { generateRoutes } from "@/utils/generateRoutes";
import { userSidebarItems } from "./userSiderbarItems";
import { driverSidebarItems } from "./driverSidebarItems";
import Faq from "@/pages/Faq";
import Contact from "@/pages/Contact";
import Features from "@/pages/Features";
import RequestRide from "@/pages/user/RequestRide";
import Unauthorized from "@/pages/Unauthorized";
import { withAuth } from "@/utils/withAuth";
import { role } from "@/constants/role";
import type { TRole } from "@/types";
import Profile from "@/pages/Profile";
import HomePage from "@/pages/HomePage";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: HomePage,
        index: true,
      },
      {
        Component: About,
        path: "about",
      },
      {
        Component: RequestRide,
        path: "requestRide",
      },
      {
        Component: Faq,
        path: "faq",
      },
      {
        Component: Contact,
        path: "contact",
      },
      {
        Component: Features,
        path: "features",
      },
    ],
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
  {
    Component: Profile,
    path: "/profile",
  },
  {
    Component: Unauthorized,
    path: "/unauthorized",
  },
  {
    Component: withAuth(DashboardLayout, role.admin as TRole),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.rider as TRole),
    path: "/rider",
    children: [
      { index: true, element: <Navigate to="/rider/allRides" /> },
      ...generateRoutes(userSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.driver as TRole),
    path: "/driver",
    children: [
      { index: true, element: <Navigate to="/driver/requested" /> },
      ...generateRoutes(driverSidebarItems),
    ],
  },
]);
