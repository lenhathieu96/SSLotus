import { memo } from "react";
import equals from "react-fast-compare";

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
      className={`box-border flex  w-full cursor-pointer flex-col gap-XS rounded-xl border-b-2 p-L shadow
      hover:bg-primary-100 hover:text-white-100
      ${
        isSelected
          ? "bg-primary-100 text-white-100"
          : "bg-white-100 text-black-200"
      }
      ${className}`}
      onClick={() => onClick(data.id)}
    >
      <div className="flex flex-row items-baseline gap-XXXS">
        <span className=" font-semibold text-h3">{`${data.address} - ${data.id}`}</span>
      </div>
      {data.members.length > 0 ? (
        <span className=" font-medium text-body2">
          {data.members[0].fullName}
        </span>
      ) : null}
    </button>
  );
}

const FamilyOverView = memo(FamilyOverviewComp, equals);

export default FamilyOverView;
