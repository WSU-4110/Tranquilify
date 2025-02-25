import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';

class Observer {
  constructor() {
    this.subscribers = [];
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  notify(data) {
    this.subscribers.forEach((callback) => callback(data));
  }
}

export default function BreathingExerciseScreen() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [longestSession, setLongestSession] = useState(0);
  const scaleAnim = useState(new Animated.Value(1))[0];

  const timeObserver = new Observer();

  useEffect(() => {
    timeObserver.subscribe((time) => {
      if (time > 0 && time % 10 === 0) {
        setFeedback('Great job! Keep going!');
      } else if (time > 0 && time % 30 === 0) {
        setFeedback('You are doing amazing! Feel the relaxation.');
      } else {
        setFeedback('');
      }
    });
  }, []);

  const startExercise = () => {
    if (!isRunning) {
      setIsRunning(true);
      const id = setInterval(() => {
        setElapsedTime((prev) => {
          const newTime = prev + 1;
          timeObserver.notify(newTime); 
          return newTime;
        });
      }, 1000);
      setIntervalId(id);
      animateBreathing();
    }
  };

  const stopExercise = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(intervalId);
      if (elapsedTime > longestSession) {
        setLongestSession(elapsedTime);
      }
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const animateBreathing = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.5, duration: 4000, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 4000, useNativeDriver: true }),
      ])
    ).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breathing Exercise</Text>
      <Text style={styles.subtitle}>Focus on your breath and relax</Text>
      <Animated.View style={[styles.breathingCircle, { transform: [{ scale: scaleAnim }] }]} />
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{formatTime(elapsedTime)}</Text>
      </View>
      <Text style={styles.feedbackText}>{feedback}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.startButton]} onPress={startExercise}>
          <Text style={styles.buttonText}>Start Exercise</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.stopButton]} onPress={stopExercise}>
          <Text style={styles.buttonText}>Stop Exercise</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.recordText}>Longest Session: {formatTime(longestSession)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 12,
  },
  breathingCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#0D47A1',
    opacity: 0.5,
    marginVertical: 20,
  },
  timerContainer: {
    width: Dimensions.get('window').width - 64,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 20,
  },
  timerText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#0D47A1',
  },
  feedbackText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#388E3C',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  startButton: {
    backgroundColor: '#0D47A1',
  },
  stopButton: {
    backgroundColor: '#D32F2F',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recordText: {
    fontSize: 14,
    marginTop: 20,
    color: '#333',
  },
});
