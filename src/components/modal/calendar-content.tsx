import { useCallback, useState } from "react";
import Calendar from "react-calendar";
import {
  NavigationLabelFunc,
  TileClassNameFunc,
  TileContentFunc,
  Value,
} from "react-calendar/dist/cjs/shared/types";
import dayjs, { Dayjs } from "dayjs";
import { Lunar, Solar } from "lunar-typescript";

import Button from "@components/button";
import { modalRef } from "@components/modal/index.ref";

interface Props {
  onConfirm: (selectedDate: Dayjs) => void;
}

const TODAY = new Date();

export default function CalendarContent({ onConfirm }: Readonly<Props>) {
  const [selectedDate, setSelectedDate] = useState<Value>(TODAY);

  const beautifyDate: TileClassNameFunc = ({ date }) => {
    const isSelectedDate = dayjs(date).isSame(
      dayjs(selectedDate?.toString()),
      "day",
    );
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
    return <div className="mb-S">{`Tháng ${date.getMonth() + 1}`}</div>;
  }, []);

  const renderLunarDate: TileContentFunc = useCallback(({ date }) => {
    const lunarDate = Lunar.fromSolar(
      Solar.fromYmd(date.getFullYear(), date.getMonth() + 1, date.getDate()),
    ).getDay();
    const color =
      date.getMonth() === TODAY.getMonth() ? "text-blue-100" : "text-gray-200";
    return (
      <p className={`mt-XXS text-right text-body2 ${color}`}>{lunarDate}</p>
    );
  }, []);

  return (
    <div className="flex flex-col gap-L">
      <span className="text-center font-semiBold text-subtitle1">
        Chọn ngày
      </span>
      <Calendar
        className={"items-center text-center font-medium text-subtitle2"}
        defaultValue={selectedDate}
        locale="vi"
        navigationLabel={renderHeader}
        next2Label=""
        nextLabel=""
        prev2Label=""
        prevLabel=""
        tileClassName={beautifyDate}
        tileContent={renderLunarDate}
        tileDisabled={({ date }) => dayjs(date).isBefore(dayjs(TODAY), "day")}
        onChange={setSelectedDate}
      />
      <Button
        label="Xác nhận"
        onClick={() => {
          modalRef.current?.hide();
          onConfirm(dayjs(selectedDate?.toString()));
        }}
      />
    </div>
  );
}
