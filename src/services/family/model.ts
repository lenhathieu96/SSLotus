export type Person = {
  fullName: string;
  christineName?: string;
  yob?: number;
};

export interface Appointment {
  date: Date;
  type: "CA";
}

export interface Family {
  id: number;
  address: string;
  members: Person[];
  appointment?: Appointment;
}
