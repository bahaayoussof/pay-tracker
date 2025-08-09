export type RecordRole = "payer" | "receiver";

export type OccasionRecord = {
  id: string;
  occasionType: string;
  date: string; // ISO string
  amount: number;
  role: RecordRole;
};

export type Person = {
  id: string;
  name: string;
  records: OccasionRecord[];
};

export type PeopleState = {
  people: Person[];
};

export type Totals = {
  totalPaid: number;
  totalReceived: number;
  balance: number; // received - paid
};
