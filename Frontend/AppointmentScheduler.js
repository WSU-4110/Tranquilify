import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Calendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";

// Shared styles
import CommonStyles from "../Styles/CommonStyles";
import theme from "../Styles/theme";

export default function AppointmentScheduler() {
  const [selectedDate, setSelectedDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (selectedDate) {
      // Later, fetch from your backend
      setAvailableSlots([
        { id: "1", time: "09:00 AM" },
        { id: "2", time: "10:00 AM" },
        { id: "3", time: "11:00 AM" },
        { id: "4", time: "09:00 PM" },
        { id: "5", time: "10:00 PM" },
        { id: "6", time: "11:00 PM" },
      ]);
    }
  }, [selectedDate]);

  const handleSlotPress = (slot) => {
    navigation.navigate("AppointmentDetails", {
      date: selectedDate,
      time: slot.time,
    });
  };

  const renderSlot = ({ item }) => (
    <TouchableOpacity
      style={localStyles.slot}
      onPress={() => handleSlotPress(item)}
    >
      <Text style={localStyles.slotText}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={CommonStyles.container}>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: theme.accent },
        }}
      />
      {selectedDate ? (
        <>
          <Text style={localStyles.header}>
            Available Slots on {selectedDate}
          </Text>
          <FlatList
            data={availableSlots}
            renderItem={renderSlot}
            keyExtractor={(item) => item.id}
          />
        </>
      ) : (
        <Text style={localStyles.header}>
          Select a date to see available slots
        </Text>
      )}
    </View>
  );
}

const localStyles = {
  header: {
    marginVertical: theme.spacing.md,
    fontSize: theme.fontSize.lg,
    fontWeight: "bold",
    textAlign: "center",
    color: theme.text,
  },
  slot: {
    padding: theme.spacing.md,
    backgroundColor: "#ddd",
    marginVertical: theme.spacing.sm,
    borderRadius: 8,
    alignItems: "center",
  },
  slotText: {
    fontSize: theme.fontSize.md,
    color: theme.text,
  },
};
