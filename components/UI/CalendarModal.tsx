import React from "react";
import { Modal, View, Text } from "react-native";
import { BlurView } from "expo-blur";
import { Calendar } from "react-native-calendars";

type Props = {
  visible: boolean;
  initialDate: string; // YYYY-MM-DD
  onClose: () => void;
  onSelect: (isoDate: string) => void;
};

export default function CalendarModal({
  visible,
  initialDate,
  onClose,
  onSelect,
}: Props) {
  const [selected, setSelected] = React.useState(initialDate);

  React.useEffect(() => {
    setSelected(initialDate);
  }, [initialDate]);

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View
        className="flex-1 items-center justify-center bg-black/50 px-4"
        onTouchEnd={onClose}
      >
        <BlurView
          intensity={120}
          tint="light"
          className="rounded-2xl overflow-hidden w-full max-w-md"
        >
          <View className="p-4">
            <Text className="text-center text-neutral-900 text-lg font-semibold mb-2">
              Pick a date
            </Text>
            <Calendar
              current={selected}
              onDayPress={(d: any) => {
                const iso = new Date(d.dateString).toISOString();
                setSelected(d.dateString);
                onSelect(iso);
                onClose();
              }}
              theme={{
                calendarBackground: "transparent",
                textSectionTitleColor: "#111827", // header day titles (Su, Mo, ...)
                dayTextColor: "#111827", // days
                textDisabledColor: "#cbd5e1",
                monthTextColor: "#111827",
                textMonthFontWeight: "600",
                arrowColor: "#6b7280", // grey-500
                todayTextColor: "#6b7280",
                selectedDayBackgroundColor: "#6b7280",
                selectedDayTextColor: "#ffffff",
              }}
              markedDates={{ [selected]: { selected: true } }}
              hideExtraDays
              enableSwipeMonths
            />
          </View>
        </BlurView>
      </View>
    </Modal>
  );
}
