import Config from "../../tailwind.config";

type ThemeColors<T extends { [key: string]: unknown }> = {
  [P in keyof T]: {
    [K in keyof T[P]]: `${P}-${K}`;
  }[keyof T[P]];
}[keyof T];

declare global {
  export type AppColor =
    | "primary-100"
    | "primary-200"
    | "primary-300"
    | "primary-400"
    | "secondary-100"
    | "secondary-200"
    | "secondary-300"
    | "white-100"
    | "white-200"
    | "black-100"
    | "black-200"
    | "black-300"
    | "gray-100"
    | "gray-200"
    | "gray-300"
    | "gray-400"
    | "gray-500"
    | "gray-600"
    | "blue-100"
    | "red-100"
    | "red-200"
    | "transparent";
  export type AppSize = keyof typeof Config.theme.spacing;
  export type AppIcon = typeof import("../assets/svgs");
  export type IconName = keyof AppIcon;

  namespace Navigation {
    export type RouteKey = "Root" | "HouseHold" | "Calendar";

    export type Route = {
      path: string;
      title: {
        vi: string;
        en?: string;
      };
      subMenu?: Record<string, Route>;
    };

    export type SideNavRoute = {
      path: string;
      title: string;
      icon?: IconName;
      activeIcon?: IconName;
      routes?: SideNavRoute[];
    };

    export type SideNavMenu = {
      path: string;
      routes: SideNavRoute[];
    };
  }
}
