import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons'; // Now using Ionicons
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

  const handleBackToHome = () => {
    // This will navigate back to the Home tab
    navigation.navigate("MoodTrackerScreen");
  };

  const renderSlot = ({ item }) => (
    <TouchableOpacity
      style={styles.slot}
      onPress={() => handleSlotPress(item)}
    >
      <Text style={styles.slotText}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={CommonStyles.container}>
      <TouchableOpacity 
        style={styles.backButtonContainer}
        onPress={handleBackToHome}
      >
        <Ionicons name="home" size={24} color={theme.primary} />
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>

      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: theme.accent },
        }}
        theme={{
          todayTextColor: theme.primary,
          arrowColor: theme.primary,
          selectedDayBackgroundColor: theme.primary,
        }}
      />
      
      {selectedDate ? (
        <>
          <Text style={styles.header}>
            Available Slots on {selectedDate}
          </Text>
          <FlatList
            data={availableSlots}
            renderItem={renderSlot}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.slotList}
          />
        </>
      ) : (
        <Text style={styles.header}>
          Select a date to see available slots
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  backButtonText: {
    fontSize: theme.fontSize.md,
    color: theme.primary,
    marginLeft: theme.spacing.sm,
    fontWeight: '500',
  },
  header: {
    marginVertical: theme.spacing.md,
    fontSize: theme.fontSize.lg,
    fontWeight: "bold",
    textAlign: "center",
    color: theme.text,
  },
  slot: {
    padding: theme.spacing.md,
    backgroundColor: theme.backgroundLight,
    marginVertical: theme.spacing.sm,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  slotText: {
    fontSize: theme.fontSize.md,
    color: theme.text,
    fontWeight: "500",
  },
  slotList: {
    paddingBottom: theme.spacing.lg,
  }
});