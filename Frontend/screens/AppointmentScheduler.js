import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";

const AppointmentScheduler = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (selectedDate) {
      // we simulate fetching available slots; later hook up with your backend API.
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
    <TouchableOpacity style={styles.slot} onPress={() => handleSlotPress(item)}>
      <Text style={styles.slotText}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: "#00adf5" },
        }}
      />
      {selectedDate ? (
        <>
          <Text style={styles.header}>Available Slots on {selectedDate}</Text>
          <FlatList
            data={availableSlots}
            renderItem={renderSlot}
            keyExtractor={(item) => item.id}
          />
        </>
      ) : (
        <Text style={styles.header}>Select a date to see available slots</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: {
    marginVertical: 16,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  slot: {
    padding: 16,
    backgroundColor: "#ddd",
    marginVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  slotText: { fontSize: 16 },
});

export default AppointmentScheduler;
