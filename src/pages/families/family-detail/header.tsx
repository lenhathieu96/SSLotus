import { memo } from "react";
import equals from "react-fast-compare";

import Button from "@components/button";

interface Props {
  onSetAppointment: () => void;
  onPrint: () => void;
  onClose: () => void;
}

const FamilyDetailHeaderComp = ({
  onSetAppointment,
  onPrint,
  onClose,
}: Props) => {
  return (
    <div className="flex w-2/3 justify-end gap-L self-end">
      <Button.Icon
        icon="CalendarIcon"
        iconColor="gray-600"
        onClick={onSetAppointment}
      />
      <Button.Icon icon="PrinterIcon" iconColor="red-200" onClick={onPrint} />
      <Button.Icon icon="XMarkIcon" iconColor="black-300" onClick={onClose} />
    </div>
  );
};

const FamilyDetailHeader = memo(FamilyDetailHeaderComp, equals);
export default FamilyDetailHeader;
