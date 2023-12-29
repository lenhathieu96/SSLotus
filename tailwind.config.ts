import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
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
      light: "Gilroy-Light",
      regular: "Gilroy-Regular",
      medium: "Gilroy-Medium",
      semiBold: "Gilroy-SemiBold",
      bold: "Gilroy-Bold",
    },
    fontSize: {
      h1: ["48px", "29px"],
      h2: ["26px", "29px"],
      h3: ["24px", "29px"],
      printh1: ["32px", "29px"],
      subtitle1: ["24px", "18px"],
      subtitle2: ["18px", "18px"],
      body1: ["16px", "18px"],
      body2: ["14px", "18px"],
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
} satisfies Config;
