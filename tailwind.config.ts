import type { Config } from "tailwindcss";

import Colors from "./src/theme/colors";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      tablet: "640px",
      laptop: "1024px",
      desktop: "1440px",
    },
    colors: {
      ...Colors,
    },
    fontFamily: {
      alegreya: ["Alegreya"],
    },
    fontSize: {
      h1: "1.75rem", //28px
      h2: "1.375rem", // 22px
      h3: "1.25rem", // 20px
      h4: "1.125rem", //18px
      body1: "1rem", //16px
      body2: "0.9375rem", //15px
      body3: "0.8125rem", // 13px

      button1: "1.125rem",
      button2: "0.9375rem",
    },
    spacing: {
      zero: "0px",
      tiny: "1px",
      xxxs: "4px",
      xxs: "8px",
      xs: "10px",
      s: "12px",
      m: "14px",
      l: "16px",
      ls: "18px",
      xl: "24px",
      xxl: "26px",
      xxxl: "32px",
      extra: "48px",
    },
  },
} satisfies Config;
