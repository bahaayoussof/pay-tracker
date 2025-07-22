import React from "react";
import { Text } from "react-native";

export default function ErrorMessage({ message }: { message: string }) {
  if (!message) return null;
  return <Text className="text-red-500 mb-1 text-sm">{message}</Text>;
}
