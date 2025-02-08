import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function BreathingExerciseScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breathing Exercise</Text>
      <View style={styles.sessionCircle}>
        <Text style={styles.sessionText}>3</Text>
        <Text style={styles.sessionLabel}>Sessions</Text>
      </View>
      <TouchableOpacity style={styles.startButton} onPress={() => alert('Exercise Started')}>
        <Text style={styles.buttonText}>Start Exercise</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E3F2FD', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 20,
  },
  sessionCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#BBDEFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  sessionText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0D47A1',
  },
  sessionLabel: {
    fontSize: 14,
    color: '#0D47A1',
  },
  startButton: {
    backgroundColor: '#0D47A1',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
