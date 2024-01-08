import { useCallback, useState } from "react";
import Calendar from "react-calendar";
import {
  NavigationLabelFunc,
  TileClassNameFunc,
  TileContentFunc,
  Value,
} from "react-calendar/dist/cjs/shared/types";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Helper from "@utils/helper";
import dayjs, { Dayjs } from "dayjs";

import Button from "@components/button";
import { modalRef } from "@components/modal/index.ref";

interface Props {
  defaultSelectedDate?: Date;
  onConfirm: (selectedDate?: Dayjs) => void;
}

const TODAY = new Date();

export default function CalendarContent({
  onConfirm,
  defaultSelectedDate,
}: Readonly<Props>) {
  const [selectedDate, setSelectedDate] = useState<Value | undefined>(
    defaultSelectedDate,
  );

  const beautifyDate: TileClassNameFunc = ({ date }) => {
    const isSelectedDate =
      dayjs(date).isSame(dayjs(selectedDate?.toString()), "day") &&
      selectedDate;

    const isDisabledDate = dayjs(date).isBefore(dayjs(TODAY), "day");

    return `mt-L px-L py-XXS font-medium text-body1 rounded-2xl ${
      isSelectedDate
        ? "bg-primary-100/90 text-white-100"
        : isDisabledDate
          ? "text-gray-200"
          : "hover:bg-gray-100 text-black-300"
    }`;
  };

  const renderHeader: NavigationLabelFunc = useCallback(({ date }) => {
    return <div className="mb-XL">{`Tháng ${date.getMonth() + 1}`}</div>;
  }, []);

  const renderLunarDate: TileContentFunc = useCallback(({ date }) => {
    const lunarDate = Helper.convertSolarToLunarDate(date);
    const color = !dayjs(date).isBefore(dayjs(TODAY), "day")
      ? "text-blue-100"
      : "text-gray-200";

    return (
      <p
        className={`mt-XXS text-right text-body2 ${color}`}
      >{`${lunarDate.getDay()}/${lunarDate.getMonth()}`}</p>
    );
  }, []);

  return (
    <div className="flex flex-col gap-S">
      <div className="mb-S self-center">
        <span className="font-semiBold text-h3">Chọn ngày</span>
      </div>

      <div>
        <Calendar
          className={"items-center text-center font-medium text-h4"}
          locale="vi"
          navigationLabel={renderHeader}
          next2Label={null}
          prev2Label={null}
          tileClassName={beautifyDate}
          tileContent={renderLunarDate}
          tileDisabled={({ date }) => dayjs(date).isBefore(dayjs(TODAY), "day")}
          nextLabel={
            <ChevronRightIcon className="ml-EXTRA h-LS w-LS stroke-2" />
          }
          prevLabel={
            <ChevronLeftIcon className="mr-EXTRA h-LS w-LS stroke-2" />
          }
          onChange={(date) => {
            if (
              dayjs(date?.toString()).isSame(
                dayjs(selectedDate?.toString()),
                "day",
              ) &&
              selectedDate
            ) {
              setSelectedDate(undefined);
            } else {
              setSelectedDate(date);
            }
          }}
        />
      </div>

      <Button
        label="Xác nhận"
        onClick={() => {
          modalRef.current?.hide();
          onConfirm(selectedDate ? dayjs(selectedDate?.toString()) : undefined);
        }}
      />
    </div>
  );
}
