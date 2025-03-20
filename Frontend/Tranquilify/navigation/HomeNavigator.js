import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MoodTrackerScreen from '../screens/MoodTrackerScreen.js';
import BreathingExerciseScreen from '../screens/BreathingExerciseScreen.js';
import JournalScreen from '../screens/JournalScreen.js';
import MessagingScreen from '../screens/MessagingScreen.js';

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
      <HomeTab.Screen
        name="Messaging"
        component={MessagingScreen}
        options={{ title: 'Messaging' }}
        userToken={props.userToken}
      />
    </HomeTab.Navigator>
  );
}
