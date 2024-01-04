import { useMemo } from "react";
import { AppColor } from "@utils/constant";

import { IBaseButtonProps } from "./index.props";

const BASE_STYLE =
  "flex min-h-EXTRA flex-row items-center justify-center rounded-2xl transition-all duration-500 hover:opacity-80 p-MS";

const BaseButtonComp = ({
  label,
  leading,
  trailing,
  mode = "fill",
  color = AppColor.primary["100"],
  disabled,
  onClick,
}: Readonly<IBaseButtonProps>) => {
  const borderStyle = useMemo(() => {
    if (mode === "fill") {
      return "border-none";
    }

    return `border-1`;
  }, [mode]);

  const labelColor = useMemo(() => {
    if (mode === "fill" || disabled) {
      return AppColor.white[100];
    }
    return color;
  }, [mode, color, disabled]);

  const backgroundColor = useMemo(() => {
    if (disabled) {
      return AppColor.gray["400"];
    }

    if (mode === "outline") {
      return AppColor.white["100"];
    }
    return color;
  }, [mode, disabled, color]);

  return (
    <button
      className={`${BASE_STYLE} ${borderStyle}`}
      disabled={disabled}
      id="base-button"
      style={{
        backgroundColor,
        borderColor: mode === "outline" ? color : undefined,
      }}
      onClick={onClick}
    >
      {leading}
      <span
        className="mx-XS text-body2 font-semibold"
        style={{ color: labelColor }}
      >
        {label}
      </span>
      {trailing}
    </button>
  );
};

export default BaseButtonComp;
