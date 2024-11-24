import { memo } from "react";
import equals from "react-fast-compare";
import { ArrowPathIcon, PlusIcon } from "@heroicons/react/24/outline";

import Button from "@components/button";

import { AppColor } from "@utils/constant";

interface Props {
  isUpdated: boolean;
  onUpdate: () => void;
  onAddNewMember: () => void;
}

const FamilyDetailFooterComp = ({
  isUpdated,
  onAddNewMember,
  onUpdate,
}: Props) => {
  return (
    <div className="flex w-3/5 flex-row justify-end gap-L self-end ">
      <Button
        color={AppColor.blue[100]}
        disabled={!isUpdated}
        label="Cập nhập"
        leading={
          <ArrowPathIcon
            className="h-LS w-LS text-white-100 desktop:h-XL desktop:w-XL"
            strokeWidth={2}
          />
        }
        onClick={onUpdate}
      />
      <Button
        label="Thêm thành viên"
        leading={
          <PlusIcon
            className="h-LS w-LS text-white-100 desktop:h-XL desktop:w-XL"
            strokeWidth={2}
          />
        }
        onClick={onAddNewMember}
      />
    </div>
  );
};

const FamilyDetailFooter = memo(FamilyDetailFooterComp, equals);
export default FamilyDetailFooter;
