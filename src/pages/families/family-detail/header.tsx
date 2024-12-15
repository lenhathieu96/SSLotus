import { memo, useMemo } from "react";
import equals from "react-fast-compare";

import Button from "@components/button";

import { AppColor } from "@utils/constant";
import Helper from "@utils/helper";

interface Props {
  showControlOptions: boolean;
  printEnabled?: boolean;
  appointmentDate?: Date;
  onSetAppointment: () => void;
  onPrint: () => void;
  onClose: () => void;
}

const FamilyDetailHeaderComp = ({
  onSetAppointment,
  onPrint,
  onClose,
  showControlOptions,
  appointmentDate,
  printEnabled = true,
}: Props) => {
  const lunarAppointmentDate = useMemo(() => {
    if (appointmentDate) {
      const lunarDate = Helper.convertSolarToLunarDate(appointmentDate);
      return Helper.getDisplayLunarDate(lunarDate);
    }
    return undefined;
  }, [appointmentDate]);

  return (
    <div className="flex w-2/3 justify-end gap-l self-end">
      {showControlOptions ? (
        <Button
          color={AppColor.pallet.secondary20}
          label={lunarAppointmentDate ?? "Đặt lịch"}
          // leading={
          //   <CalendarIcon
          //     className="text-white-100 size-ls desktop:size-xl"
          //     strokeWidth={2}
          //   />
          // }
          onClick={onSetAppointment}
        />
      ) : null}
      {showControlOptions ? (
        <Button
          color={AppColor.pallet.blue10}
          disabled={!printEnabled}
          label="In"
          // leading={
          //   <PrinterIcon
          //     className="text-white-100 size-ls desktop:size-xl"
          //     strokeWidth={2}
          //   />
          // }
          onClick={onPrint}
        />
      ) : null}

      <Button.Icon
        className="p-zero"
        icon="XMarkIcon"
        iconColor="black-300"
        onClick={onClose}
      />
    </div>
  );
};

const FamilyDetailHeader = memo(FamilyDetailHeaderComp, equals);
export default FamilyDetailHeader;
