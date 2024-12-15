import { useState } from "react";
import { Link } from "react-router-dom";
import { CalendarIcon, UsersIcon } from "@heroicons/react/24/outline";

import { LogoIcon } from "@assets/svgs";

const FEATURES_PATHS = ["/", "/calendar"] as const;
type DashboardFeaturePath = (typeof FEATURES_PATHS)[number];

const SIDE_NAV_ICON_STROKE_WIDTH = 2;
const SIDE_NAV_ICON_STYLE = "h-xxl w-xxl desktop:h-xl desktop:w-xl";

export default function SideNavBar() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const renderSideNavItemIcon = (path: DashboardFeaturePath) => {
    switch (path) {
      case "/calendar":
        return (
          <CalendarIcon
            className={SIDE_NAV_ICON_STYLE}
            strokeWidth={SIDE_NAV_ICON_STROKE_WIDTH}
          />
        );
      default:
        return (
          <UsersIcon
            className={SIDE_NAV_ICON_STYLE}
            strokeWidth={SIDE_NAV_ICON_STROKE_WIDTH}
          />
        );
    }
  };

  const renderSideNavItemTitle = (path: DashboardFeaturePath) => {
    switch (path) {
      case "/calendar":
        return "Lịch";
      default:
        return "Hộ gia đình";
    }
  };

  return (
    <aside className="bg-white-100 p-s desktop:w-1/6 flex w-1/12 flex-col rounded-r-3xl shadow-xl">
      {/**Navbar Header */}
      <div className="py-xl flex h-auto flex-row items-center">
        <LogoIcon height={64} width={64} />
        <span className="ml-xs text-h1 tablet:hidden desktop:inline-block font-semibold ">
          SSLotus
        </span>
      </div>

      {/**Navbar body */}
      <ul className="line-clamp-1 grow">
        {FEATURES_PATHS.map((path, index) => (
          <li
            key={`nav-${path}`}
            className={`my-xs p-s hover:text-primary-100 flex flex-row rounded-xl transition duration-300 ease-in-out hover:bg-gray-100
            ${activeIndex === index ? "text-primary-100" : "text-black-200"} 
            ${activeIndex === index ? "bg-gray-100" : "bg-transparent"} 
            `}
          >
            <Link
              className="gap-l desktop:justify-start flex grow items-center justify-center "
              to={`/dashboard${path}`}
              onClick={() => setActiveIndex(index)}
            >
              {renderSideNavItemIcon(path)}
              <span className="text-button2 laptop:text-body1 desktop:inline-block desktop:text-h4 hidden font-medium">
                {renderSideNavItemTitle(path)}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/**Navbar footer */}
    </aside>
  );
}
