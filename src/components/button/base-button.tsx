import { useMemo } from "react";

import { IBaseButtonProps } from "./index.props";

const BASE_STYLE =
  "flex w-full flex-row items-center justify-center rounded-2xl transition-all duration-500 hover:opacity-80 p-MS";

const BaseButtonComp = ({
  label,
  leading,
  trailing,
  mode = "fill",
  color = "primary-100",
  disabled,
  onClick,
}: Readonly<IBaseButtonProps>) => {
  const borderStyle = useMemo(() => {
    if (mode === "fill") {
      return "border-none";
    }
    const borderColor = disabled ? "border-gray-400" : `border-${color}`;
    return `border-1 ${borderColor}`;
  }, [mode, color, disabled]);

  const buttonTextColor = useMemo(() => {
    if (mode === "fill" || disabled) {
      return "text-white-100 ";
    }

    return `text-${color}`;
  }, [mode, color, disabled]);

  const buttonColor = useMemo(() => {
    if (disabled) {
      return "bg-gray-400";
    }

    if (mode === "outline") {
      return `bg-white-100`;
    }
    return `bg-${color}`;
  }, [mode, disabled, color]);

  return (
    <button
      className={`${BASE_STYLE} ${borderStyle} ${buttonTextColor} ${buttonColor}`}
      disabled={disabled}
      id="base-button"
      onClick={onClick}
    >
      {leading}
      <span className="mx-XS text-body2 font-semibold">{label}</span>
      {trailing}
    </button>
  );
};

export default BaseButtonComp;
