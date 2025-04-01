import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import styles from '../Styles/BreathingExcercise';

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