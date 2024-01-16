import { memo } from "react";

import { Family } from "@models";

interface Props {
  data: Family;
  onClick: (id: number) => void;
  isSelected?: boolean;
  className?: string;
}

function FamilyOverviewComp({
  data,
  onClick,
  className,
  isSelected = false,
}: Readonly<Props>) {
  return (
    <button
      className={`box-border flex ${
        isSelected ? "bg-primary-100" : "bg-transparent"
      } w-full cursor-pointer flex-col gap-XS rounded-xl border-b-2 p-L
      
      ${isSelected ? "hover: bg-primary-100" : "hover:bg-gray-100"}
      ${isSelected ? "text-white-100" : "text-black-200"}
      ${className}`}
      onClick={() => onClick(data.id)}
    >
      <div className="flex flex-row items-baseline gap-XXXS">
        <span className=" font-regular text-h4">Mã Số:</span>
        <span className=" font-semibold text-body1">{data.id}</span>
      </div>
      <div className="flex flex-row items-baseline gap-XXXS ">
        <span className=" font-regular text-h4">Địa chỉ:</span>
        <span className=" font-semibold text-body1">{data.address}</span>
      </div>
      <div className="flex flex-row items-baseline gap-XXXS ">
        <span className=" font-regular text-h4">Chủ hộ:</span>
        {data.members.length > 0 ? (
          <span className=" font-semibold text-body1">
            {data.members[0].fullName}
          </span>
        ) : null}
      </div>
    </button>
  );
}

const FamilyOverView = memo(FamilyOverviewComp);

export default FamilyOverView;
