import { useState } from "react";
import { Link } from "react-router-dom";
import { CalendarIcon, UsersIcon } from "@heroicons/react/24/outline";

import { LogoIcon } from "@assets/svg";

const FEATURES_PATHS = ["/", "/calendar"] as const;
type DashboardFeaturePath = (typeof FEATURES_PATHS)[number];

const SIDE_NAV_ICON_STROKE_WIDTH = 2;
const SIDE_NAV_ICON_STYLE = "h-XXL w-XXL desktop:h-XL desktop:w-XL";

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
    <aside className="flex w-1/12 flex-col rounded-r-3xl bg-white-100 p-S shadow-xl desktop:w-1/6">
      {/**Navbar Header */}
      <div className="flex h-auto flex-row items-center py-XL">
        <LogoIcon height={64} width={64} />
        <span className="ml-XS font-semiBold text-h1 tablet:hidden desktop:inline-block ">
          SSLotus
        </span>
      </div>

      {/**Navbar body */}
      <ul className="line-clamp-1 grow">
        {FEATURES_PATHS.map((path, index) => (
          <li
            key={`nav-${path}`}
            className={`my-XS flex flex-row rounded-xl p-S transition duration-300 ease-in-out hover:bg-gray-100 hover:text-primary-100
            ${activeIndex === index ? "text-primary-100" : "text-black-200"} 
            ${activeIndex === index ? "bg-gray-100" : "bg-transparent"} 
            `}
          >
            <Link
              className="flex grow items-center justify-center gap-L desktop:justify-start "
              to={`/dashboard${path}`}
              onClick={() => setActiveIndex(index)}
            >
              {renderSideNavItemIcon(path)}
              <span className="hidden font-medium text-button2 laptop:text-body1 desktop:inline-block desktop:text-h4">
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
