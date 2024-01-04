import { ReactNode } from "react";

declare type HeroIconType = typeof import("@heroicons/react/24/outline");

export interface IBaseButtonProps {
  onClick: () => void;
  label: string;
  className?: string;
  /**
   * @default fill
   */
  mode?: "fill" | "outline";
  disabled?: boolean;
  /**
   * @default primary color
   */
  color?: string;
  trailing?: ReactNode;
  leading?: ReactNode;
}

export interface IIconButtonProps {
  icon: keyof HeroIconType;
  /**
   * @default 24px - XL
   */
  iconSize?: AppSize;
  /**
   * @default primary color
   */
  mode?: "fill" | "outline" | "transparent";
  disabled?: boolean;
  iconColor?: AppColor;
  className?: string;
  onClick: () => void;
}
