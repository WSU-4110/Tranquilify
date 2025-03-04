// /src/screens/AppointmentDetails.js
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";

const AppointmentDetails = ({ route }) => {
  const { date, time } = route.params;
  // Replace this with logic to determine when the session starts.
  const isSessionTime = false;
  const Link = "https://zoom.us/j/1234567890";

  const handleJoinMeeting = () => {
    Linking.openURL(zoomLink);
  };

  const handleCancelAppointment = () => {
    console.log("Cancel appointment");
  };

  const handleRescheduleAppointment = () => {
    console.log("Reschedule appointment");
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Appointment Details</Text>
        <Text style={styles.detail}>
          Date: <Text style={styles.value}>{date}</Text>
        </Text>
        <Text style={styles.detail}>
          Time: <Text style={styles.value}>{time}</Text>
        </Text>
        {isSessionTime ? (
          <TouchableOpacity
            style={styles.joinButton}
            onPress={handleJoinMeeting}
          >
            <Text style={styles.buttonText}>Join Zoom Meeting</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.info}>
            Your Zoom meeting link will appear when it’s time for your session.
          </Text>
        )}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.leftButton]}
          onPress={handleCancelAppointment}
        >
          <Text style={styles.actionText}>Cancel Appointment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.rightButton]}
          onPress={handleRescheduleAppointment}
        >
          <Text style={styles.actionText}>Reschedule Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 16,
    color: "#333",
    textAlign: "center",
  },
  detail: {
    fontSize: 18,
    marginBottom: 8,
    color: "#555",
  },
  value: {
    fontWeight: "bold",
    color: "#000",
  },
  info: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
  },
  joinButton: {
    backgroundColor: "#1e90ff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
  },
  actionButton: {
    backgroundColor: "#ff6347",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  leftButton: {
    marginRight: 10,
  },
  rightButton: {
    marginLeft: 10,
  },
  actionText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default AppointmentDetails;
