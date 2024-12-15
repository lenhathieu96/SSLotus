import { memo } from "react";
import equals from "react-fast-compare";

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
    <div className="flex w-3/5 flex-row justify-end gap-l self-end ">
      <Button
        color={AppColor.pallet.blue10}
        disabled={!isUpdated}
        label="Cập nhập"
        // leading={
        // <ArrowPathIcon
        //   className="text-white-100 size-ls desktop:size-xl"
        //   strokeWidth={2}
        // />
        // }
        onClick={onUpdate}
      />
      <Button
        label="Thêm thành viên"
        // leading={
        //   <PlusIcon
        //     className="text-white-100 size-ls desktop:size-xl"
        //     strokeWidth={2}
        //   />
        // }
        onClick={onAddNewMember}
      />
    </div>
  );
};

const FamilyDetailFooter = memo(FamilyDetailFooterComp, equals);
export default FamilyDetailFooter;
