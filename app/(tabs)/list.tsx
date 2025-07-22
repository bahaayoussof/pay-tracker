import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { people, Person } from "../../data/peopleData";

export default function PersonListScreen() {
  return (
    <View className="flex-1 bg-gray-100 px-4 py-8">
      <Text className="text-2xl font-bold text-center mb-6 text-gray-700">
        People
      </Text>
      <FlatList
        data={people}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link
            href={{ pathname: "/person/[id]", params: { id: item.id } }}
            asChild
          >
            <TouchableOpacity className="flex-row items-center justify-between bg-white rounded-lg shadow-sm px-4 py-3 mb-3 border border-gray-200">
              <Text className="text-lg font-medium text-gray-800">
                {item.name}
              </Text>
              <Text
                className={`text-base font-bold ${item.net > 0 ? "text-green-600" : item.net < 0 ? "text-red-600" : "text-gray-500"}`}
              >
                {item.net > 0 ? "+" : ""}
                {item.net} EGP
              </Text>
            </TouchableOpacity>
          </Link>
        )}
        ListEmptyComponent={
          <Text className="text-center text-gray-400 mt-8">No people yet.</Text>
        }
      />
    </View>
  );
}
