import React from "react";
import { Text, TouchableOpacity, GestureResponderEvent } from "react-native";

type SubmitButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
};

const SubmitButton = ({ title, onPress }: SubmitButtonProps) => {
  return (
    <TouchableOpacity
      className="bg-gray-700 py-3 rounded-lg mt-2 shadow-sm"
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text className="text-white text-center font-bold text-base tracking-wide">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default SubmitButton;
