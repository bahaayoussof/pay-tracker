import "../../global.css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { BlurView } from "expo-blur";
import { usePeopleStore } from "../../store";
import type { OccasionRecord } from "../../types";
import CalendarModal from "../../components/UI/CalendarModal";

type FormFields = {
  name: string;
  occasionType: string;
  date: Date;
  amount: string;
  role: OccasionRecord["role"];
};

export default function AddExpenseScreen() {
  const addPersonIfMissing = usePeopleStore((s) => s.addPersonIfMissing);
  const addRecord = usePeopleStore((s) => s.addRecord);
  const [showCalendar, setShowCalendar] = useState(false);

  const { control, handleSubmit, reset } = useForm<FormFields>({
    defaultValues: {
      name: "",
      occasionType: "",
      date: new Date(),
      amount: "",
      role: "payer",
    },
  });

  const onSubmit: SubmitHandler<FormFields> = ({
    name,
    occasionType,
    date,
    amount,
    role,
  }) => {
    const numericAmount = Number(amount);
    if (!name || !occasionType || !numericAmount || numericAmount <= 0) {
      Toast.show({ type: "error", text1: "Fill all fields correctly" });
      return;
    }
    const personId = addPersonIfMissing(name);
    addRecord(personId, {
      occasionType,
      date: date.toISOString(),
      amount: numericAmount,
      role,
    });
    Toast.show({ type: "success", text1: "Expense added" });
    reset();
  };

  return (
    <KeyboardAwareScrollView className="flex-1 bg-neutral-100 dark:bg-neutral-900">
      <View className="px-4 py-6">
        <BlurView
          intensity={30}
          tint="light"
          className="rounded-2xl overflow-hidden"
        >
          <View className="p-5">
            <Text className="text-2xl font-bold text-neutral-800 dark:text-white text-center mb-4">
              Add Expense
            </Text>

            <Text className="text-neutral-700 dark:text-neutral-200 mb-1">
              Person Name
            </Text>
            <Controller
              control={control}
              name="name"
              rules={{ required: true }}
              render={({ field }: { field: any }) => (
                <View className="flex-row items-center bg-white/60 dark:bg-white/10 rounded-xl px-3 py-3 mb-3 border border-white/40">
                  <Ionicons name="person-outline" size={18} color="#64748b" />
                  <TextInput
                    className="flex-1 ml-2 text-neutral-900 dark:text-white"
                    placeholder="Enter person's name"
                    placeholderTextColor="#9ca3af"
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                  />
                </View>
              )}
            />

            <Text className="text-neutral-700 dark:text-neutral-200 mb-1">
              Occasion Type
            </Text>
            <Controller
              control={control}
              name="occasionType"
              rules={{ required: true }}
              render={({ field }: { field: any }) => (
                <View className="flex-row items-center bg-white/60 dark:bg-white/10 rounded-xl px-3 py-3 mb-3 border border-white/40">
                  <Ionicons name="pricetag-outline" size={18} color="#64748b" />
                  <TextInput
                    className="flex-1 ml-2 text-neutral-900 dark:text-white"
                    placeholder="Wedding / Engagement / Other"
                    placeholderTextColor="#9ca3af"
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                  />
                </View>
              )}
            />

            <Text className="text-neutral-700 dark:text-neutral-200 mb-1">
              Date
            </Text>
            <Controller
              control={control}
              name="date"
              render={({ field }: { field: any }) => (
                <>
                  <TouchableOpacity
                    className="flex-row items-center bg-white/60 dark:bg-white/10 rounded-xl px-3 py-3 border border-white/40"
                    onPress={() => setShowCalendar(true)}
                    activeOpacity={0.85}
                  >
                    <Ionicons
                      name="calendar-outline"
                      size={18}
                      color="#64748b"
                    />
                    <Text className="ml-2 text-neutral-900 dark:text-white">
                      {new Date(field.value).toLocaleDateString()}
                    </Text>
                  </TouchableOpacity>
                  <CalendarModal
                    visible={showCalendar}
                    initialDate={new Date(field.value)
                      .toISOString()
                      .slice(0, 10)}
                    onClose={() => setShowCalendar(false)}
                    onSelect={(iso) => {
                      field.onChange(new Date(iso));
                      setShowCalendar(false);
                    }}
                  />
                </>
              )}
            />

            <Text className="text-neutral-700 dark:text-neutral-200 mt-3 mb-1">
              Amount
            </Text>
            <Controller
              control={control}
              name="amount"
              rules={{ required: true, pattern: /^[0-9]+(\.[0-9]{1,2})?$/ }}
              render={({ field }: { field: any }) => (
                <View className="flex-row items-center bg-white/60 dark:bg-white/10 rounded-xl px-3 py-3 mb-3 border border-white/40">
                  <Ionicons name="logo-usd" size={18} color="#64748b" />
                  <TextInput
                    className="flex-1 ml-2 text-neutral-900 dark:text-white"
                    keyboardType="numeric"
                    placeholder="0"
                    placeholderTextColor="#9ca3af"
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                  />
                </View>
              )}
            />

            <Text className="text-neutral-700 dark:text-neutral-200 mt-3 mb-1">
              Role
            </Text>
            <Controller
              control={control}
              name="role"
              render={({ field }: { field: any }) => (
                <View className="flex-row gap-3">
                  <TouchableOpacity
                    className={`flex-1 rounded-xl px-4 py-3 ${
                      field.value === "payer"
                        ? "bg-black/10 dark:bg-white/20"
                        : "bg-black/5 dark:bg-white/10"
                    }`}
                    onPress={() => field.onChange("payer")}
                  >
                    <View className="flex-row items-center gap-2">
                      <Ionicons
                        name="radio-button-on-outline"
                        size={16}
                        color={field.value === "payer" ? "#4f46e5" : "#94a3b8"}
                      />
                      <View>
                        <Text className="text-neutral-800 dark:text-white">
                          Payer
                        </Text>
                        <Text className="text-xs text-neutral-500">
                          I paid this amount
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className={`flex-1 rounded-xl px-4 py-3 ${
                      field.value === "receiver"
                        ? "bg-black/10 dark:bg.white/20"
                        : "bg-black/5 dark:bg-white/10"
                    }`}
                    onPress={() => field.onChange("receiver")}
                  >
                    <View className="flex-row items-center gap-2">
                      <Ionicons
                        name="radio-button-on-outline"
                        size={16}
                        color={
                          field.value === "receiver" ? "#4f46e5" : "#94a3b8"
                        }
                      />
                      <View>
                        <Text className="text-neutral-800 dark:text-white">
                          Receiver
                        </Text>
                        <Text className="text-xs text-neutral-500">
                          I received this amount
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            />

            <TouchableOpacity
              className="mt-6 bg-neutral-800 dark:bg-white/20 rounded-xl py-3"
              onPress={handleSubmit(onSubmit)}
            >
              <Text className="text-white text-center font-semibold">
                Add Expense
              </Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </View>
      <Toast />
    </KeyboardAwareScrollView>
  );
}
