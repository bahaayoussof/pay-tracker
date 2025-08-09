// @ts-nocheck
import { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { BlurView } from "expo-blur";
import { Link } from "expo-router";
import { usePeopleStore, selectPeopleSorted } from "../../store";

export default function PeopleScreen() {
  const people = usePeopleStore(selectPeopleSorted);
  const computeTotals = usePeopleStore((s) => s.computeTotals);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return people;
    return people.filter((p) => p.name.toLowerCase().includes(q));
  }, [people, query]);

  return (
    <View className="flex-1 bg-neutral-100 dark:bg-neutral-900 px-4 py-6">
      <BlurView
        intensity={30}
        tint="light"
        className="rounded-2xl overflow-hidden mb-4"
      >
        <View className="p-4">
          <Text className="text-2xl font-bold text-neutral-800 dark:text-white text-center">
            People
          </Text>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search people..."
            placeholderTextColor="#9ca3af"
            className="mt-4 bg-black/5 dark:bg-white/10 rounded-xl px-4 py-3 text-neutral-900 dark:text-white"
          />
        </View>
      </BlurView>

      <FlatList
        data={filtered}
        keyExtractor={(p: any) => p.id}
        renderItem={({ item }: { item: any }) => {
          const totals = computeTotals(item);
          const badgeColor =
            totals.balance >= 0 ? "text-emerald-600" : "text-rose-600";
          return (
            <BlurView
              intensity={20}
              tint="light"
              className="rounded-2xl overflow-hidden mb-3"
            >
              <Link
                href={{ pathname: "/person/[id]", params: { id: item.id } }}
                asChild
              >
                <TouchableOpacity className="p-4">
                  <Text className="text-lg font-semibold text-neutral-900 dark:text-white">
                    {item.name}
                  </Text>
                  <View className="flex-row justify-between mt-2">
                    <Text className="text-emerald-600">
                      ${totals.totalReceived.toFixed(2)} Received
                    </Text>
                    <Text className="text-rose-600">
                      ${totals.totalPaid.toFixed(2)} Paid
                    </Text>
                  </View>
                  <Text className={`mt-2 font-semibold ${badgeColor}`}>
                    Balance: ${totals.balance.toFixed(2)}
                  </Text>
                </TouchableOpacity>
              </Link>
            </BlurView>
          );
        }}
        ListEmptyComponent={() => (
          <View className="mt-20 items-center">
            <Text className="text-neutral-500 dark:text-neutral-400">
              No people yet. Add your first expense.
            </Text>
          </View>
        )}
      />
    </View>
  );
}
