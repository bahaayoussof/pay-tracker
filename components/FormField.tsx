// components/FormField.tsx
import React from "react";
import { View, Text, TextInput, KeyboardTypeOptions } from "react-native";
import {
  Controller,
  Control,
  FieldErrors,
  RegisterOptions,
} from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import { TransactionFormData } from "../app/(tabs)/TransactionForm"; // Adjust path as needed

// Define a type for the field configuration
export type FormFieldConfig = {
  name: keyof TransactionFormData;
  label: string;
  rules?: RegisterOptions;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
};

// Define the component's props
type FormFieldProps = FormFieldConfig & {
  control: Control<TransactionFormData>;
  errors: FieldErrors<TransactionFormData>;
};

const FormField = ({
  control,
  name,
  label,
  rules,
  errors,
  placeholder,
  keyboardType = "default",
}: FormFieldProps) => {
  return (
    <View className="mb-4">
      <Text className="mb-1 text-gray-700 font-medium">{label}</Text>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 focus:border-gray-400"
            onBlur={onBlur}
            onChangeText={(text) =>
              // Coerce to number only for the 'amount' field
              onChange(
                name === "amount" ? Number(text.replace(/[^0-9]/g, "")) : text
              )
            }
            value={value ? String(value) : ""}
            placeholder={placeholder}
            placeholderTextColor="#a3a3a3"
            keyboardType={keyboardType}
          />
        )}
      />
      {errors[name] && <ErrorMessage message={errors[name]?.message} />}
    </View>
  );
};

export default FormField;
