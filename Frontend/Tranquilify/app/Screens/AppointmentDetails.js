import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Linking } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
// Shared styles
import CommonStyles from "../Styles/CommonStyles";
import theme from "../Styles/theme";

export default function AppointmentDetails({ route }) {
  const { date, time } = route.params;
  const navigation = useNavigation();
  // Replace with logic to see if the session is about to start
  const isSessionTime = false;
  const zoomLink = "https://zoom.us/j/1234567890";
  
  const handleJoinMeeting = () => {
    Linking.openURL(zoomLink);
  };
  
  const handleCancelAppointment = () => {
    console.log("Cancel appointment");
    // After cancellation logic:
    navigation.goBack();
  };
  
  const handleRescheduleAppointment = () => {
    console.log("Reschedule appointment");
    navigation.goBack();
  };
  
  return (
    <View style={CommonStyles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Appointment Details</Text>
        <Text style={styles.detail}>
          Date: <Text style={styles.value}>{date}</Text>
        </Text>
        <Text style={styles.detail}>
          Time: <Text style={styles.value}>{time}</Text>
        </Text>
        {isSessionTime ? (
          <TouchableOpacity style={styles.joinButton} onPress={handleJoinMeeting}>
            <Text style={styles.buttonText}>Join Zoom Meeting</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.info}>
            Your Zoom meeting link will appear when it's time for your session.
          </Text>
        )}
      </View>
      
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.leftButton]}
          onPress={handleCancelAppointment}
        >
          <Text style={styles.actionText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.rightButton]}
          onPress={handleRescheduleAppointment}
        >
          <Text style={styles.actionText}>Reschedule</Text>
        </TouchableOpacity>
      </View>
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
  card: {
    backgroundColor: theme.white,
    borderRadius: 10,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: "600",
    marginBottom: theme.spacing.md,
    color: theme.text,
    textAlign: "center",
  },
  detail: {
    fontSize: theme.fontSize.md,
    marginBottom: theme.spacing.sm,
    color: theme.textLight,
  },
  value: {
    fontWeight: "bold",
    color: theme.text,
  },
  info: {
    fontSize: theme.fontSize.md,
    fontStyle: "italic",
    color: theme.textLight,
    textAlign: "center",
    marginVertical: theme.spacing.md,
  },
  joinButton: {
    backgroundColor: theme.primary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: theme.spacing.sm,
  },
  buttonText: {
    color: theme.white,
    fontSize: theme.fontSize.sm,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
  },
  actionButton: {
    backgroundColor: theme.secondary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: 8,
  },
  leftButton: {
    marginRight: theme.spacing.sm,
  },
  rightButton: {
    marginLeft: theme.spacing.sm,
  },
  actionText: {
    color: theme.white,
    fontSize: theme.fontSize.md,
  },
});