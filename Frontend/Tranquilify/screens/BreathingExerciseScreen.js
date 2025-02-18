import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function BreathingExerciseScreen({ navigation }) {
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  const startExercise = () => {
    setIsRunning(true);
    setStartTime(Date.now());
    setElapsedTime(0);
  };

  const stopExercise = () => {
    setIsRunning(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breathing Exercise</Text>
      <View style={styles.sessionCircle}>
        <Text style={styles.sessionText}>3</Text>
        <Text style={styles.sessionLabel}>Sessions</Text>
      </View>
      <TouchableOpacity 
        style={styles.startButton} 
        onPress={isRunning ? stopExercise : startExercise}
      >
        <Text style={styles.buttonText}>{isRunning ? 'Stop Exercise' : 'Start Exercise'}</Text>
      </TouchableOpacity>
      <Text style={styles.timerText}>Time Spent: {elapsedTime} seconds</Text>
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
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  timerText: {
    fontSize: 18,
    color: '#0D47A1',
    marginTop: 10,
  }
});
