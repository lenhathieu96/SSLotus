import { Navigate, Route, Routes } from "react-router-dom";

import CalendarPage from "@pages/calendar";
import DashboardPage from "@pages/dashboard";
import FamiliesPage from "@pages/families";

export default function AuthorizedRoutes() {
  return (
    <Routes>
      <Route index element={<Navigate replace to="/dashboard" />} />

      <Route element={<DashboardPage />} path="/dashboard">
        <Route element={<FamiliesPage />} path="" />
        <Route element={<CalendarPage />} path="calendar" />
      </Route>
    </Routes>
  );
}
