import { PERIODS } from "@utils/constant";
import { Dayjs } from "dayjs";

export type Period = (typeof PERIODS)[number];

export type Person = {
  fullName: string;
  christineName?: string;
  yob?: number;
};
export interface AppointmentDate {
  period: Period;
  selectedDate?: Dayjs;
}
export interface Appointment {
  period: Period;
  date: Date;
  type: "CA";
}

export interface Family {
  id: number;
  address: string;
  members: Person[];
  appointment?: Appointment;
}
