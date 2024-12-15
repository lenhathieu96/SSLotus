export const ROUTE_CONFIGS: Record<Navigation.RouteKey, Navigation.Route> = {
  Root: {
    path: "/",
    title: {
      vi: "Trang Chủ",
    },
  },
  HouseHold: {
    path: "house-hold",
    title: {
      vi: "Hộ gia đình",
    },
  },
  Calendar: {
    path: "calendar",
    title: {
      vi: "Lịch",
    },
  },
};

export const DASHBOARD_SIDE_MENU: Navigation.SideNavRoute[] = [
  {
    title: ROUTE_CONFIGS.HouseHold.title.vi,
    path: ROUTE_CONFIGS.HouseHold.path,
    icon: "UsersOutlined",
    activeIcon: "UsersSolid",
  },

  {
    title: ROUTE_CONFIGS.Calendar.title.vi,
    path: ROUTE_CONFIGS.Calendar.path,
    icon: "CalendarOutlined",
    activeIcon: "CalendarSolid",
  },
];
