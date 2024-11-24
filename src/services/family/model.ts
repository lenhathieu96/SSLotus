import { Dayjs } from "dayjs";

import { APPOINTMENT_TYPES, PERIODS } from "@utils/constant";

export type Period = (typeof PERIODS)[number];
export type AppointmentType = (typeof APPOINTMENT_TYPES)[number];

export type Person = {
  fullName: string;
  christineName?: string;
  yob?: number;
};
export interface AppointmentDate {
  period: Period;
  selectedDate?: Dayjs;
  type: AppointmentType;
}
export interface Appointment {
  period: Period;
  date: Date;
  type: AppointmentType;
}

export interface Family {
  id: number;
  address: string;
  members: Person[];
  appointment?: Appointment;
}
