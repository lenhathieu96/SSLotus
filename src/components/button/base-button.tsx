import { useMemo } from "react";
import { AppColor } from "@utils/constant";

import { IBaseButtonProps } from "./index.props";

const BASE_STYLE =
  "flex flex-row min-h-EXTRA justify-center items-center rounded-2xl p-XS transition-all duration-500 hover:opacity-80";

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
      <p
        className="mx-XXS line-clamp-1 p-ZERO text-left font-semibold text-body1 desktop:text-button1"
        style={{ color: labelColor }}
      >
        {label}
      </p>
      {trailing}
    </button>
  );
};

export default BaseButtonComp;
