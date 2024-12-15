import { memo } from "react";
import { Row, Typography } from "antd";

import { Logo } from "@assets/svgs";

const { Title } = Typography;

const MenuHeader = () => {
  return (
    <Row align="middle" className="gap-xs">
      <Logo className="size-extra" />
      <Title level={2}>SSLotus</Title>
    </Row>
  );
};

export default memo(MenuHeader);
