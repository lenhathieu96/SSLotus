import { memo, useMemo } from "react";
import equals from "react-fast-compare";

import { IIconButtonProps } from "./index.props";

import * as AppIcon from "@assets/svgs";

const IconButtonComp = ({
  icon,
  iconColor = "primary-100",
  iconSize = "xl",
  disabled,
  className,
  onClick,
}: Readonly<IIconButtonProps>) => {
  // const IconComponent = AppIcon[icon];

  const buttonColor = useMemo(() => {
    if (disabled) {
      return "text-gray-400";
    }

    const defaultColor = `text-${iconColor}`;
    return defaultColor;
  }, [disabled, iconColor]);

  const size = `h-${iconSize} w-${iconSize}`;

  return (
    <button
      className={`cursor-pointer items-center justify-center rounded-2xl p-m hover:opacity-80 ${buttonColor} ${className}`}
      id="icon-button"
      onClick={onClick}
    >
      {/* <IconComponent className={`${size}`} /> */}
    </button>
  );
};

const IconButton = memo(IconButtonComp, equals);
export default IconButton;
