import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Controller, Control } from "react-hook-form";
import { TransactionFormData } from "../screens/TransactionForm";

type SelectorProps = {
  control: Control<TransactionFormData>;
  name: "type";
};

// A smaller helper for the individual button to reduce repetition
const TypeButton = ({
  label,
  isActive,
  onPress,
  position,
}: {
  label: string;
  isActive: boolean;
  onPress: () => void;
  position: "left" | "right";
}) => {
  const baseClasses = "px-4 py-2 border";
  const positionClasses =
    position === "left" ? "rounded-l-lg border-r-0" : "rounded-r-lg";
  const activeClasses = isActive
    ? "bg-gray-300 border-gray-400"
    : "bg-white border-gray-300";
  const textClasses = isActive ? "text-gray-800 font-bold" : "text-gray-500";

  return (
    <TouchableOpacity
      className={`${baseClasses} ${positionClasses} ${activeClasses}`}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text className={textClasses}>{label}</Text>
    </TouchableOpacity>
  );
};

const TransactionTypeSelector = ({ control, name }: SelectorProps) => {
  return (
    <View className="mb-6">
      <Text className="mb-1 text-gray-700 font-medium">Type</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <View className="flex-row">
            <TypeButton
              label="Paid"
              position="left"
              isActive={value === "paid"}
              onPress={() => onChange("paid")}
            />
            <TypeButton
              label="Received"
              position="right"
              isActive={value === "received"}
              onPress={() => onChange("received")}
            />
          </View>
        )}
      />
    </View>
  );
};

export default TransactionTypeSelector;
