import Config from "../tailwind.config";

type ThemeColors<T extends { [key: string]: any }> = {
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
}
