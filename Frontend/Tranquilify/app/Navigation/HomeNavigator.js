import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MoodTrackerScreen from '../Screens/MoodTrackerScreen.js';
import BreathingExerciseScreen from '../Screens/BreathingExerciseScreen.js';
import JournalScreen from '../Screens/JournalScreen.js';

const HomeTab = createBottomTabNavigator();

export default function HomeNavigator(props) {
  return (
    <HomeTab.Navigator>
      <HomeTab.Screen
        name="MoodTrackerScreen"
        component={MoodTrackerScreen}
        options={{ title: 'Home' }}
      />
      <HomeTab.Screen
        name="Breathing"
        component={BreathingExerciseScreen}
        options={{ title: 'Breathing' }}
      />
      <HomeTab.Screen
        name="Journal"
        component={JournalScreen}
        options={{ title: 'Journal' }}
        userToken={props.userToken}
      />
    </HomeTab.Navigator>
  );
}
