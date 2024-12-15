import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import dayjs from "dayjs";

import AppRouter from "@routes";

import "dayjs/locale/vi";
import "./index.css";

import Colors from "@theme/colors";

dayjs.locale("vi");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Alegreya",
          colorPrimary: Colors.primary,
        },
        components: {
          Typography: {
            fontSizeHeading1: 28,
            fontSizeHeading2: 22,
            fontSizeHeading3: 20,
            fontSizeHeading4: 18,
            fontSizeLG: 16,
            fontSizeSM: 10,
            fontSizeXL: 18,
            titleMarginBottom: 0,
          },
          Button: {
            fontWeight: 600,
          },
        },
      }}
    >
      <AppRouter />
    </ConfigProvider>
  </React.StrictMode>,
);
