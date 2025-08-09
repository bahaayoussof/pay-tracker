import "../../global.css";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Text, View, ScrollView } from "react-native";
import FormField, { FormFieldConfig } from "../../components/FormField";
import TransactionType from "../../components/TransactionType";
import SubmitButton from "../../components/SubmitButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export type TransactionFormData = {
  name: string;
  amount: number;
  reason: string;
  type: "paid" | "received";
};

const formFields: FormFieldConfig[] = [
  {
    name: "name",
    label: "Name",
    placeholder: "Person's name",
    rules: { required: "Name is required" },
  },
  {
    name: "amount",
    label: "Amount",
    placeholder: "Amount",
    rules: {
      required: "Amount is required",
      min: { value: 1, message: "Amount must be greater than 0" },
      pattern: {
        value: /^[0-9]+$/,
        message: "Please enter numbers only",
      },
    },
    keyboardType: "numeric",
  },
  {
    name: "reason",
    label: "Reason",
    placeholder: "Reason (e.g., Wedding)",
    rules: { required: "Reason is required" },
  },
];

export default function HomeScreen() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TransactionFormData>({
    defaultValues: {
      name: "",
      amount: undefined,
      reason: "",
      type: "paid",
    },
  });

  const onSubmit: SubmitHandler<TransactionFormData> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <KeyboardAwareScrollView
      className="flex-1 bg-gray-100"
      contentContainerClassName="items-center justify-center p-4"
    >
      <View className="w-full max-w-md bg-gray-50 rounded-xl shadow-sm p-6 border border-gray-200">
        <Text className="text-xl font-bold mb-6 text-center text-gray-700 tracking-tight">
          Transaction
        </Text>

        {formFields.map((field) => (
          <FormField
            key={field.name}
            control={control}
            errors={errors}
            {...field}
          />
        ))}

        <TransactionType control={control} name="type" />

        <SubmitButton title="Save" onPress={handleSubmit(onSubmit)} />
      </View>
    </KeyboardAwareScrollView>
  );
}
