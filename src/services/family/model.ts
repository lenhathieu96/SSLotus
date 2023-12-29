export type Person = {
  fullName: string;
  christineName?: string;
  yob?: number;
};

export type Family = {
  id: number;
  address: string;
  member: Person[];
};
