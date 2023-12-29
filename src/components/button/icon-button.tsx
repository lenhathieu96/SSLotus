import { memo, useMemo } from "react";
import equals from "react-fast-compare";
import * as AppIcon from "@heroicons/react/24/outline";

import { IIconButtonProps } from "./index.props";

const IconButtonComp = ({
  icon,
  iconColor = "primary-100",
  iconSize = "XL",
  disabled,
  className,
  onClick,
}: Readonly<IIconButtonProps>) => {
  const IconComponent = AppIcon[icon];

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
      className={`cursor-pointer items-center justify-center rounded-2xl p-MS hover:opacity-80 ${buttonColor} ${className}`}
      id="icon-button"
      onClick={onClick}
    >
      <IconComponent className={`${size}`} />
    </button>
  );
};

const IconButton = memo(IconButtonComp, equals);
export default IconButton;
