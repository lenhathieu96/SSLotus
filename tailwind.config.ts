import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      tablet: "640px",
      laptop: "1024px",
      desktop: "1440px",
    },
    colors: {
      primary: {
        100: "#53B175",
        200: "#4b9e6c",
        300: "#49a86a",
        400: "#4f8670",
      },
      secondary: {
        100: "#59517b",
        200: "#5a497c",
        300: "#5d3e7f",
      },
      white: {
        100: "#FFFFFF",
        200: "#FFF9FF",
      },
      black: {
        100: "#4C4F4D",
        200: "#030303",
        300: "#181725",
      },
      gray: {
        100: "#F2F3F2",
        200: "#E2E2E2",
        300: "#B1B1B1",
        400: "#B3B3B3",
        500: "#828282",
        600: "#7C7C7C",
      },
      blue: {
        100: "#5383EC",
      },
      red: {
        100: "#FFC5C5",
        200: "#DF0404",
      },
      transparent: "transparent",
    },
    fontFamily: {
      light: "Rasa-Light",
      regular: "Rasa-Regular",
      medium: "Rasa-Medium",
      semibold: "Rasa-SemiBold",
      bold: "Rasa-Bold",
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
      ZERO: "0px",
      TINY: "1px",
      XXXS: "4px",
      XXS: "9px",
      XS: "10px",
      S: "12px",
      M: "13px",
      MS: "14px",
      L: "16px",
      LS: "18px",
      XL: "24px",
      XLS: "25px",
      XXL: "26px",
      XXXL: "32px",
      EXTRA: "48px",
    },
    extend: {
      borderWidth: {
        1: "1px",
        2: "2px",
        3: "3px",
        4: "4px",
        5: "5px",
      },
      stroke: {
        1: "1px",
        2: "2px",
        3: "3px",
        4: "4px",
        5: "5px",
      },
    },
  },
} satisfies Config;
