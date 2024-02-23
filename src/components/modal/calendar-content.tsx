import { useCallback, useEffect, useState } from "react";
import Calendar from "react-calendar";
import {
  NavigationLabelFunc,
  TileClassNameFunc,
  TileContentFunc,
  Value,
} from "react-calendar/dist/cjs/shared/types";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { APPOINTMENT_TYPES, PERIODS } from "@utils/constant";
import Helper from "@utils/helper";
import Utils from "@utils/utils";
import dayjs from "dayjs";

import Button from "@components/button";
import { modalRef } from "@components/modal/index.ref";

import { AppointmentDate, AppointmentType, Period } from "@models";

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
  defaultAppointmentType,
}: Readonly<Props>) {
  const [selectedDate, setSelectedDate] = useState<Value | undefined>(
    defaultSelectedDate,
  );
  const [selectedPeriod, setSelectedPeriod] = useState<Period>(
    defaultPeriod ?? "UNKNOWN",
  );
  const [selectedAppointmentType, setSelectedAppointmentType] =
    useState<AppointmentType>(defaultAppointmentType ?? "CA");

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
    return (
      <div className="mb-XL font-medium text-h2">{`Tháng ${
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
        className={`mt-XXS text-right text-body2 ${color}`}
      >{`${lunarDate.getDay()}/${lunarDate.getMonth()}`}</p>
    );
  }, []);

  const onPressConfirm = () => {
    modalRef.current?.hide();

    onConfirm({
      period: selectedPeriod,
      type: selectedAppointmentType,
      selectedDate: selectedDate ? dayjs(selectedDate?.toString()) : undefined,
    });
  };

  useEffect(() => {
    if (!selectedDate && selectedPeriod !== "UNKNOWN") {
      setSelectedPeriod("UNKNOWN");
    }
  }, [selectedDate, selectedPeriod]);

  return (
    <div className="flex flex-col gap-S">
      <div className="mb-S self-center">
        <span className="font-semibold text-h3">Chọn ngày</span>
      </div>
      <div className="flex flex-row justify-evenly gap-S">
        {APPOINTMENT_TYPES.map((type) => {
          return (
            <div key={type} className="flex items-center">
              <input
                checked={type === selectedAppointmentType}
                className="h-LS w-LS"
                name="appointment-radio"
                type="radio"
                value=""
                onClick={() => setSelectedAppointmentType(type)}
              />
              <span className="ml-XXXS font-medium text-h4 ">
                {Utils.renderAppointmentTitle(type)}
              </span>
            </div>
          );
        })}
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

      <div className="flex flex-row justify-evenly gap-S">
        {PERIODS.map((period) => {
          return (
            <div key={period} className="flex items-center">
              <input
                checked={period === selectedPeriod}
                className="h-LS w-LS"
                name="default-radio"
                type="radio"
                value=""
                onClick={() => setSelectedPeriod(period)}
              />
              <span className="ml-XXXS font-medium text-h4 ">
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
