import { useCallback, useEffect, useState } from "react";
import Calendar from "react-calendar";
import {
  NavigationLabelFunc,
  TileClassNameFunc,
  TileContentFunc,
  Value,
} from "react-calendar/dist/cjs/shared/types";
import dayjs from "dayjs";

import Button from "@components/button";
import { modalRef } from "@components/modal/index.ref";

import { AppointmentDate, AppointmentType, Period } from "@models";
import { PERIODS } from "@utils/constant";
import Helper from "@utils/helper";
import Utils from "@utils/utils";

interface Props {
  defaultSelectedDate?: Date;
  defaultPeriod?: Period;
  defaultAppointmentType?: AppointmentType;
  onConfirm: (time: AppointmentDate) => void;
}

const TODAY = new Date();

export default function CalendarContent({
  onConfirm,
  defaultSelectedDate,
  defaultPeriod,
}: Readonly<Props>) {
  const [selectedDate, setSelectedDate] = useState<Value | undefined>(
    defaultSelectedDate,
  );
  const [selectedPeriod, setSelectedPeriod] = useState<Period>(
    defaultPeriod ?? "UNKNOWN",
  );

  const beautifyDate: TileClassNameFunc = ({ date }) => {
    const isSelectedDate =
      dayjs(date).isSame(dayjs(selectedDate?.toString()), "day") &&
      selectedDate;

    const isDisabledDate = dayjs(date).isBefore(dayjs(TODAY), "day");

    return `mt-l px-l py-xxs font-medium text-body1 rounded-2xl ${
      isSelectedDate
        ? "bg-primary-100/90 text-white-100"
        : isDisabledDate
          ? "text-gray-200"
          : "hover:bg-gray-100 text-black-300"
    }`;
  };

  const renderHeader: NavigationLabelFunc = useCallback(({ date }) => {
    return (
      <div className="mb-xl text-h2 font-medium">{`Tháng ${
        date.getMonth() + 1
      }`}</div>
    );
  }, []);

  const renderLunarDate: TileContentFunc = useCallback(({ date }) => {
    const lunarDate = Helper.convertSolarToLunarDate(date);
    const color = !dayjs(date).isBefore(dayjs(TODAY), "day")
      ? "text-blue-100"
      : "text-gray-200";

    return (
      <p
        className={`mt-xxs text-right text-body2 ${color}`}
      >{`${lunarDate.getDay()}/${lunarDate.getMonth()}`}</p>
    );
  }, []);

  const onPressConfirm = () => {
    modalRef.current?.hide();

    onConfirm({
      period: selectedPeriod,
      type: "CA",
      selectedDate: selectedDate ? dayjs(selectedDate?.toString()) : undefined,
    });
  };

  useEffect(() => {
    if (!selectedDate && selectedPeriod !== "UNKNOWN") {
      setSelectedPeriod("UNKNOWN");
    }
  }, [selectedDate, selectedPeriod]);

  return (
    <div className="flex flex-col gap-s">
      <div className="mb-s self-center">
        <span className="text-h3 font-semibold">Chọn ngày</span>
      </div>
      <div className="flex flex-row justify-evenly gap-s">
        {/* {APPOINTMENT_TYPES.map((type) => {
          return (
            <div key={type} className="flex items-center">
              <input
                checked={type === selectedAppointmentType}
                className="h-ls w-ls"
                name="appointment-radio"
                type="radio"
                value=""
                onClick={() => setSelectedAppointmentType(type)}
              />
              <span className="ml-xxxs font-medium text-h4 ">
                {Utils.renderAppointmentTitle(type)}
              </span>
            </div>
          );
        })} */}
      </div>

      <div>
        <Calendar
          className={"items-center text-center text-h4 font-medium"}
          locale="vi"
          navigationLabel={renderHeader}
          next2Label={null}
          // nextLabel={<ChevronRightIcon className="ml-extra size-ls stroke-2" />}
          prev2Label={null}
          // prevLabel={<ChevronLeftIcon className="mr-extra size-ls stroke-2" />}
          tileClassName={beautifyDate}
          tileContent={renderLunarDate}
          tileDisabled={({ date }) => dayjs(date).isBefore(dayjs(TODAY), "day")}
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

      <div className="flex flex-row justify-evenly gap-s">
        {PERIODS.map((period) => {
          return (
            <div key={period} className="flex items-center">
              <input
                checked={period === selectedPeriod}
                className="size-ls"
                name="default-radio"
                type="radio"
                value=""
                onClick={() => setSelectedPeriod(period)}
              />
              <span className="ml-xxxs text-h4 font-medium ">
                {Utils.renderPeriod(period)}
              </span>
            </div>
          );
        })}
      </div>

      <Button label="Xác nhận" onClick={onPressConfirm} />
    </div>
  );
}
