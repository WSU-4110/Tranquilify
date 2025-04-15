import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import BreathingExerciseScreen from '../screens/BreathingExerciseScreen';

import { formatTime } from '../screens/BreathingExerciseScreen';

describe('BreathingExerciseScreen Unit Tests', () => {

  test('formatTime should convert seconds into mm:ss format', () => {
    expect(formatTime(65)).toBe('1:05');
    expect(formatTime(5)).toBe('0:05');
    expect(formatTime(0)).toBe('0:00');
  });

  test('Observer class should subscribe and notify correctly', () => {
    const Observer = require('../screens/BreathingExerciseScreen').Observer;
    const obs = new Observer();
    const mockCallback = jest.fn();
    obs.subscribe(mockCallback);
    obs.notify(10);
    expect(mockCallback).toHaveBeenCalledWith(10);
  });

  test('Starts and stops exercise correctly', () => {
    const { getByText } = render(<BreathingExerciseScreen />);
    const startButton = getByText('Start Exercise');
    fireEvent.press(startButton);
    const stopButton = getByText('Stop Exercise');
    fireEvent.press(stopButton);
    expect(getByText(/Longest Session:/)).toBeTruthy();
  });

  test('Feedback updates based on elapsed time', () => {
    jest.useFakeTimers();
    const { getByText, queryByText } = render(<BreathingExerciseScreen />);
    fireEvent.press(getByText('Start Exercise'));
    jest.advanceTimersByTime(10000); // Simulate 10 seconds
    expect(queryByText('Great job! Keep going!')).toBeTruthy();
    jest.advanceTimersByTime(20000); // Total 30 seconds
    expect(queryByText('You are doing amazing! Feel the relaxation.')).toBeTruthy();
    jest.useRealTimers();
  });
});
