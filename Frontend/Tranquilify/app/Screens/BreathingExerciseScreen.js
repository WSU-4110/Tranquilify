import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import styles from '../Styles/BreathingExcercise.js';

export default function BreathingExerciseScreen() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalId = useRef(null);
  const [longestSession, setLongestSession] = useState(0);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const breathingAnimation = useRef(null);
  const [breathPrompt, setBreathPrompt] = useState('Get ready...');
  const breathCycleTimeoutRef = useRef(null);
  const runningRef = useRef(false);
  
  // Track current phase for proper prompt synchronization
  const currentPhaseRef = useRef('ready');
  const phaseStartTimeRef = useRef(0);
  const phaseDurations = {
    inhale: 4000,
    firstHold: 4000,
    exhale: 4000,
    secondHold: 4000,
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  useEffect(() => {
    runningRef.current = isRunning;
  }, [isRunning]);

  const clearTimers = () => {
    if (intervalId.current) clearInterval(intervalId.current);
    if (breathCycleTimeoutRef.current) clearTimeout(breathCycleTimeoutRef.current);
    if (breathingAnimation.current) breathingAnimation.current.stop();
  };

  const startBreathingCycle = () => {
    const runBreathCycle = () => {
      if (!runningRef.current) return;
      
      // Inhale phase
      setBreathPrompt('Inhale');
      currentPhaseRef.current = 'inhale';
      phaseStartTimeRef.current = Date.now();
      
      breathCycleTimeoutRef.current = setTimeout(() => {
        if (!runningRef.current) return;
        
        // First hold phase
        setBreathPrompt('Hold');
        currentPhaseRef.current = 'firstHold';
        phaseStartTimeRef.current = Date.now();
        
        breathCycleTimeoutRef.current = setTimeout(() => {
          if (!runningRef.current) return;
          
          // Exhale phase
          setBreathPrompt('Exhale');
          currentPhaseRef.current = 'exhale';
          phaseStartTimeRef.current = Date.now();
          
          breathCycleTimeoutRef.current = setTimeout(() => {
            if (!runningRef.current) return;
            
            // Second hold phase
            setBreathPrompt('Hold');
            currentPhaseRef.current = 'secondHold';
            phaseStartTimeRef.current = Date.now();
            
            breathCycleTimeoutRef.current = setTimeout(() => {
              if (runningRef.current) runBreathCycle();
            }, phaseDurations.secondHold); // Second hold duration
          }, phaseDurations.exhale); // Exhale duration
        }, phaseDurations.firstHold); // First hold duration
      }, phaseDurations.inhale); // Inhale duration
    };
    
    runBreathCycle();
  };

  const startExercise = () => {
    setIsRunning(true);
    setElapsedTime(0);
    runningRef.current = true;
    currentPhaseRef.current = 'ready';
    startTimer();
    animateBreathing();
    startBreathingCycle();
  };

  const startTimer = () => {
    intervalId.current = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
  };

  const stopExercise = () => {
    if (isRunning) {
      if (elapsedTime > longestSession) {
        setLongestSession(elapsedTime);
      }
      
      setIsRunning(false);
      clearTimers();
      intervalId.current = null;
      setElapsedTime(0);
      setBreathPrompt('Get ready...');
      
      scaleAnim.setValue(1);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const animateBreathing = () => {
    if (breathingAnimation.current) {
      breathingAnimation.current.stop();
    }
    
    scaleAnim.setValue(1);
    
    breathingAnimation.current = Animated.loop(
      Animated.sequence([
        // Inhale - expand for 4 seconds
        Animated.timing(scaleAnim, { 
          toValue: 1.35,
          duration: phaseDurations.inhale, 
          useNativeDriver: true 
        }),
        // First hold - stay expanded for 4 seconds
        Animated.timing(scaleAnim, {
          toValue: 1.35,
          duration: phaseDurations.firstHold,
          useNativeDriver: true
        }),
        // Exhale - contract for 4 seconds
        Animated.timing(scaleAnim, { 
          toValue: 1, 
          duration: phaseDurations.exhale, 
          useNativeDriver: true 
        }),
        // Second hold - stay contracted for 4 seconds
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: phaseDurations.secondHold,
          useNativeDriver: true
        })
      ])
    );
    
    breathingAnimation.current.start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breathing Exercise</Text>
      <Text style={styles.subtitle}>Focus on your breath and relax</Text>
      <Text style={styles.promptText}>{breathPrompt}</Text>
      <Animated.View style={[styles.breathingCircle, { transform: [{ scale: scaleAnim }] }]} />
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{formatTime(elapsedTime)}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {!isRunning && (
          <TouchableOpacity style={[styles.button, styles.startButton]} onPress={startExercise}>
            <Text style={styles.buttonText}>Start Exercise</Text>
          </TouchableOpacity>
        )}
        {isRunning && (
          <TouchableOpacity style={[styles.button, styles.stopButton]} onPress={stopExercise}>
            <Text style={styles.buttonText}>Stop Exercise</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.recordText}>Longest Session: {formatTime(longestSession)}</Text>
    </View>
  );
}