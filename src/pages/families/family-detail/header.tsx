import { memo, useMemo } from "react";
import equals from "react-fast-compare";
import { CalendarIcon, PrinterIcon } from "@heroicons/react/24/outline";
import { AppColor } from "@utils/constant";
import Helper from "@utils/helper";

import Button from "@components/button";

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
    <div className="flex w-2/3 justify-end gap-L self-end">
      {showControlOptions ? (
        <Button
          color={AppColor.secondary[200]}
          label={lunarAppointmentDate ?? "Đặt lịch"}
          leading={
            <CalendarIcon className="h-LS w-LS text-white-100 desktop:h-XL desktop:w-XL" />
          }
          onClick={onSetAppointment}
        />
      ) : null}
      {showControlOptions ? (
        <Button
          color={AppColor.blue[100]}
          disabled={!printEnabled}
          label="In"
          leading={
            <PrinterIcon className="h-LS w-LS text-white-100 desktop:h-XL desktop:w-XL" />
          }
          onClick={onPrint}
        />
      ) : null}

      <Button.Icon
        className="p-ZERO"
        icon="XMarkIcon"
        iconColor="black-300"
        onClick={onClose}
      />
    </div>
  );
};

const FamilyDetailHeader = memo(FamilyDetailHeaderComp, equals);
export default FamilyDetailHeader;
