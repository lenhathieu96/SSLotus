import { Outlet } from "react-router-dom";

import RootView from "@components/root-view";

import SideNavBar from "./side-nav";

export default function DashboardPage() {
  return (
    <RootView className="h-screen">
      <SideNavBar />
      <div className="flex-1 bg-gray-100 p-XS">
        <Outlet />
      </div>
    </RootView>
  );
}
