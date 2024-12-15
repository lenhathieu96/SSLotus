import type { FC } from "react";
import { memo, useCallback, useEffect, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ProLayout from "@ant-design/pro-layout";
import { ConfigProvider } from "antd";

import { findRouteTitleFromLocation } from "@routes/helper";

import { createRouteConfig } from "@components/app_layout/helper";

import type { AppLayoutProps } from "./index.props";

import { Logo } from "@assets/svgs";
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
    <ConfigProvider
      getTargetContainer={() => {
        return document.getElementById("app-layout") || document.body;
      }}
    >
      <ProLayout
        fixedHeader
        fixSiderbar
        collapsed={false}
        collapsedButtonRender={() => null}
        location={location}
        logo={<Logo className="size-extra" />}
        route={routeMenu}
        siderWidth={200}
        title="SSLotus"
        token={{
          bgLayout: Colors.white,
          sider: {
            colorBgMenuItemSelected: Colors.pallet.green10,
            colorTextMenuSelected: Colors.primary,
            colorMenuBackground: Colors.white,
          },
          pageContainer: {
            paddingInlinePageContainerContent: 0,
            paddingBlockPageContainerContent: 0,
          },
        }}
      >
        <Outlet />
      </ProLayout>
    </ConfigProvider>
  );
};

export default memo(AppLayout);
