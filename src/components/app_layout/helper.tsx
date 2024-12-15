import { Link } from "react-router-dom";

import { ROUTE_CONFIGS } from "@routes/constants";
import { findRouteFromSideMenuPath } from "@routes/helper";

import * as AppIcon from "@assets/svgs";
import Colors from "@theme/colors";

export const createRouteConfig = (
  route: Navigation.SideNavRoute,
  currentPath: string,
  parentPath: string,
  rootPath: string,
): unknown => {
  const sideMenuPath =
    parentPath === ROUTE_CONFIGS.Root.path
      ? route.path
      : `${parentPath}/${route.path}`;
  console.log(route, "ROUTE");
  console.log(currentPath, "Current Path");
  return {
    path: `/${sideMenuPath}`,
    name: (
      <Link to={findRouteFromSideMenuPath(sideMenuPath, rootPath)}>
        {route.title}
      </Link>
    ),
    icon:
      currentPath.includes(route.path) && route.activeIcon
        ? AppIcon[route.activeIcon]({
            fill: Colors.primary,
            className: "size-ls",
          })
        : route.icon
          ? AppIcon[route.icon]({
              fill: currentPath.includes(route.path)
                ? Colors.primary
                : Colors.white,
              className: "size-ls",
            })
          : null,
    routes: route.routes?.map((subRoute: Navigation.SideNavRoute) =>
      createRouteConfig(subRoute, currentPath, sideMenuPath, rootPath),
    ),
  };
};
