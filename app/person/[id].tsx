// React import not required with new JSX transform
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { BlurView } from "expo-blur";
import { usePeopleStore } from "../../store";

export default function PersonDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const person = usePeopleStore((s) => s.people.find((p) => p.id === id));
  const computeTotals = usePeopleStore((s) => s.computeTotals);
  const deletePerson = usePeopleStore((s) => s.deletePerson);
  const router = useRouter();

  if (!person) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-neutral-500">Person not found</Text>
      </View>
    );
  }

  const totals = computeTotals(person);

  const handleDelete = () => {
    Alert.alert("Delete", "Delete this person and all records?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          deletePerson(person.id);
          router.back();
        },
      },
    ]);
  };

  return (
    <View className="flex-1 bg-neutral-100 dark:bg-neutral-900 px-4 py-6">
      <BlurView
        intensity={30}
        tint="light"
        className="rounded-2xl overflow-hidden mb-4"
      >
        <View className="p-5">
          <Text className="text-2xl font-bold text-neutral-900 dark:text-white text-center">
            {person.name}
          </Text>
          <View className="flex-row justify-between mt-3">
            <Text className="text-emerald-600">
              Received: ${totals.totalReceived.toFixed(2)}
            </Text>
            <Text className="text-rose-600">
              Paid: ${totals.totalPaid.toFixed(2)}
            </Text>
          </View>
          <Text
            className={`mt-2 font-semibold ${
              totals.balance >= 0 ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            Balance: ${totals.balance.toFixed(2)}
          </Text>
        </View>
      </BlurView>

      <FlatList
        data={[...person.records].reverse()}
        keyExtractor={(r: any) => r.id}
        renderItem={({ item }: { item: any }) => (
          <BlurView
            intensity={20}
            tint="light"
            className="rounded-2xl overflow-hidden mb-3"
          >
            <View className="p-4">
              <View className="flex-row justify-between">
                <Text className="text-neutral-800 dark:text-white font-medium">
                  {item.occasionType}
                </Text>
                <Text className="text-neutral-500">
                  {new Date(item.date).toLocaleDateString()}
                </Text>
              </View>
              <View className="flex-row justify-between mt-2">
                <Text className="text-neutral-700 dark:text-neutral-200">
                  {item.role === "receiver" ? "Received" : "Paid"}
                </Text>
                <Text
                  className={
                    item.role === "receiver"
                      ? "text-emerald-600"
                      : "text-rose-600"
                  }
                >
                  ${item.amount.toFixed(2)}
                </Text>
              </View>
            </View>
          </BlurView>
        )}
      />

      <TouchableOpacity
        onPress={handleDelete}
        className="mt-4 bg-rose-600 rounded-xl py-3"
      >
        <Text className="text-white text-center font-semibold">
          Delete Person
        </Text>
      </TouchableOpacity>
    </View>
  );
}
