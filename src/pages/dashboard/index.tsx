import { InstantSearch } from "react-instantsearch";
import { Outlet } from "react-router-dom";

import RootView from "@components/root-view";

import { SEARCH_CLIENT } from "@utils/constant";

import SideNavBar from "./side-nav";

export default function DashboardPage() {
  return (
    <RootView className="h-screen">
      <SideNavBar />
      <div className="flex-1 bg-gray-100 p-xs">
        <InstantSearch
          indexName={import.meta.env.VITE_ALGOLIA_INDEX_NAME}
          searchClient={SEARCH_CLIENT}
        >
          <Outlet />
        </InstantSearch>
      </div>
    </RootView>
  );
}
