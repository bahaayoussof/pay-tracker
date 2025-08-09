import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { nanoid } from "nanoid/non-secure";
import type { OccasionRecord, Person, PeopleState, Totals } from "../types";

type Actions = {
  addPersonIfMissing: (name: string) => string; // returns personId
  addRecord: (personId: string, record: Omit<OccasionRecord, "id">) => void;
  editPerson: (
    personId: string,
    updates: Partial<Pick<Person, "name">>
  ) => void;
  deletePerson: (personId: string) => void;
  deleteRecord: (personId: string, recordId: string) => void;
  computeTotals: (person: Person) => Totals;
  findByName: (name: string) => Person | undefined;
};

export type Store = PeopleState & Actions;

export const usePeopleStore = create<Store>()(
  persist(
    (set, get) => ({
      people: [],
      addPersonIfMissing: (name: string) => {
        const trimmed = name.trim();
        if (!trimmed) return "";
        const existing = get().people.find(
          (p) => p.name.toLowerCase() === trimmed.toLowerCase()
        );
        if (existing) return existing.id;
        const id = nanoid();
        set((s) => ({
          people: [...s.people, { id, name: trimmed, records: [] }],
        }));
        return id;
      },
      addRecord: (personId, record) => {
        const id = nanoid();
        set((s) => ({
          people: s.people.map((p) =>
            p.id === personId
              ? { ...p, records: [...p.records, { id, ...record }] }
              : p
          ),
        }));
      },
      editPerson: (personId, updates) =>
        set((s) => ({
          people: s.people.map((p) =>
            p.id === personId ? { ...p, ...updates } : p
          ),
        })),
      deletePerson: (personId) =>
        set((s) => ({ people: s.people.filter((p) => p.id !== personId) })),
      deleteRecord: (personId, recordId) =>
        set((s) => ({
          people: s.people.map((p) =>
            p.id === personId
              ? { ...p, records: p.records.filter((r) => r.id !== recordId) }
              : p
          ),
        })),
      computeTotals: (person) => {
        const totalPaid = person.records
          .filter((r) => r.role === "payer")
          .reduce((acc, r) => acc + r.amount, 0);
        const totalReceived = person.records
          .filter((r) => r.role === "receiver")
          .reduce((acc, r) => acc + r.amount, 0);
        return { totalPaid, totalReceived, balance: totalReceived - totalPaid };
      },
      findByName: (name: string) =>
        get().people.find((p) => p.name.toLowerCase() === name.toLowerCase()),
    }),
    {
      name: "pay-tracker-store",
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
      migrate: (persisted: any) => persisted,
      partialize: (s) => ({ people: s.people }),
    }
  )
);

export const selectPeopleSorted = (s: Store) =>
  [...s.people].sort((a, b) => a.name.localeCompare(b.name));
