import React from "react";
import { useRoutes, RouteObject, Navigate, Outlet } from "react-router-dom";

import { ROUTES } from "shared/config/routes";

import { ApplicationAPage } from "./application-a";
import { ApplicationBPage } from "./application-b";

const Layout = () => (
  <div>
    <div>layout</div>
    <Outlet />
  </div>
);

const router_config: RouteObject[] = [
  {
    path: ROUTES.DEFAULT,
    element: <Navigate to={ROUTES.APPLICATION_A} />,
  },
  {
    path: ROUTES.APPLICATION_A,
    element: <Layout />,
    children: [
      {
        path: ROUTES.APPLICATION_A,
        element: <ApplicationAPage />,
      },
    ],
  },
  {
    path: ROUTES.APPLICATION_B,
    element: <Layout />,
    children: [
      {
        path: ROUTES.APPLICATION_B,
        element: <ApplicationBPage />,
      },
    ],
  },
];

export const Routes = () => useRoutes(router_config);

export default Routes;
