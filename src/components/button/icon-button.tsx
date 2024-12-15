import { memo, useMemo } from "react";
import equals from "react-fast-compare";

import { IIconButtonProps } from "./index.props";

const IconButtonComp = ({
  iconColor = "primary-100",
  disabled,
  className,
  onClick,
}: Readonly<IIconButtonProps>) => {
  const buttonColor = useMemo(() => {
    if (disabled) {
      return "text-gray-400";
    }

    const defaultColor = `text-${iconColor}`;
    return defaultColor;
  }, [disabled, iconColor]);

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
