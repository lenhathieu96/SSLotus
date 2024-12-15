import { Navigate, Route, Routes } from "react-router-dom";

import CalendarPage from "@pages/calendar";
import FamiliesPage from "@pages/families";

import AppLayout from "@components/app_layout";

import { DASHBOARD_SIDE_MENU, ROUTE_CONFIGS } from "../constants";

export default function AuthorizedRoutes() {
  return (
    <Routes>
      <Route
        path={ROUTE_CONFIGS.Root.path}
        element={
          <AppLayout
            menu={{
              path: ROUTE_CONFIGS.Root.path,
              routes: DASHBOARD_SIDE_MENU,
            }}
          />
        }
      >
        <Route
          index
          element={<Navigate replace to={ROUTE_CONFIGS.HouseHold.path} />}
        />
        <Route element={<FamiliesPage />} path={ROUTE_CONFIGS.HouseHold.path} />
        <Route element={<CalendarPage />} path={ROUTE_CONFIGS.Calendar.path} />
      </Route>
    </Routes>
  );
}
