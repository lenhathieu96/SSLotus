import type { FC } from "react";
import { memo, useCallback, useEffect, useMemo } from "react";
import equals from "react-fast-compare";
import { Outlet, useLocation } from "react-router-dom";
import ProLayout from "@ant-design/pro-layout";

import { findRouteTitleFromLocation } from "@routes/helper";

import { createRouteConfig } from "@components/app_layout/helper";

import type { AppLayoutProps } from "./index.props";
import MenuHeader from "./menu_header";

import Colors from "@theme/colors";

const AppLayout: FC<AppLayoutProps> = ({ menu }) => {
  const location = useLocation();

  const routeMenu = useMemo(() => {
    return {
      routes: menu.routes.map((route) =>
        createRouteConfig(route, location.pathname, menu.path, menu.path),
      ),
    };
  }, [location.pathname, menu]);

  const updateDocumentTitleFromPath = useCallback(() => {
    document.title = findRouteTitleFromLocation(location);
  }, [location]);

  useEffect(() => {
    updateDocumentTitleFromPath();
  }, [updateDocumentTitleFromPath]);

  return (
    <ProLayout
      fixedHeader
      collapsed={false}
      collapsedButtonRender={() => null}
      location={location}
      menuHeaderRender={() => <MenuHeader />}
      route={routeMenu}
      siderWidth={200}
      token={{
        bgLayout: Colors.pallet.gray10,
        sider: {
          colorBgMenuItemSelected: Colors.pallet.green10,
          colorTextMenuSelected: Colors.primary,
          colorMenuBackground: Colors.white,
        },
        pageContainer: {
          paddingInlinePageContainerContent: 8,
          paddingBlockPageContainerContent: 0,
        },
      }}
    >
      <Outlet />
    </ProLayout>
  );
};

export default memo(AppLayout, equals);
