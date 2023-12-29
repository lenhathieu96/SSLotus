import { useState } from "react";
import { Link } from "react-router-dom";
import { CalendarIcon, UsersIcon } from "@heroicons/react/24/outline";

import { LogoIcon } from "@assets/svg";

const FEATURES_PATHS = ["/", "/calendar"] as const;
type DashboardFeaturePath = (typeof FEATURES_PATHS)[number];

export default function SideNavBar() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const renderSideNavItemIcon = (path: DashboardFeaturePath) => {
    switch (path) {
      case "/calendar":
        return <CalendarIcon className="mr-L h-XL w-XL" />;
      default:
        return <UsersIcon className="mr-L h-XL w-XL" />;
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
    <aside className="flex w-1/6 flex-col rounded-r-3xl bg-white-100 p-S shadow-xl">
      {/**Navbar Header */}
      <div className="flex h-auto flex-row items-center py-XL">
        <LogoIcon className=" " height={64} width={64} />
        <span className=" ml-XS font-semiBold text-h3 ">SSLotus</span>
      </div>

      {/**Navbar body */}
      <ul className="grow">
        {FEATURES_PATHS.map((path, index) => (
          <li
            key={`nav-${path}`}
            className={`my-XS flex flex-row items-center rounded-xl p-S transition duration-300 ease-in-out hover:bg-gray-100 hover:text-primary-100 
            ${activeIndex === index ? "text-primary-100" : "text-black-200"} 
            ${activeIndex === index ? "bg-gray-100" : "bg-transparent"} 
            `}
          >
            {renderSideNavItemIcon(path)}
            <Link
              className="flex grow font-medium text-subtitle2"
              to={`/dashboard${path}`}
              onClick={() => setActiveIndex(index)}
            >
              {renderSideNavItemTitle(path)}
            </Link>
          </li>
        ))}
      </ul>

      {/**Navbar footer */}
    </aside>
  );
}
