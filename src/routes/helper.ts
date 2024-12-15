import type { Location } from "react-router-dom";

import Helper from "@utils/helper";

import { ROUTE_CONFIGS } from "./constants";

const extractPathFromLocation = (location: Location): string => {
  const segments = location.pathname.split("/").filter(Boolean); //remove empty segments;
  const lastSegment = segments.pop() ?? "";

  if (Helper.isUUID(lastSegment)) {
    return segments.slice(segments.length - 2, segments.length).join("/");
  }
  return lastSegment;
};

export const findRouteTitleFromLocation = (location: Location): string => {
  const path = extractPathFromLocation(location);

  for (const [_, routeConfig] of Object.entries(ROUTE_CONFIGS)) {
    // Check if the main route matches the pathroll
    if (path === routeConfig.path) {
      return routeConfig.title.vi;
    }

    // Check if any subMenu matches the path
    if (routeConfig.subMenu) {
      for (const [__, subRoute] of Object.entries(routeConfig.subMenu)) {
        if (path === subRoute.path) {
          return subRoute.title.vi;
        }
      }
    }
  }
  return "";
};

export const findRouteFromSideMenuPath = (path: string, rootPath: string) => {
  if (rootPath === ROUTE_CONFIGS.Root.path) return `/${path}`;

  return path.replace(`${rootPath}/`, "");
};
