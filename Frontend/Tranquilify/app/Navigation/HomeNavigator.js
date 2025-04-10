import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Make sure you have expo vector icons installed
import MoodTrackerScreen from '../Screens/MoodTrackerScreen.js';
import BreathingExerciseScreen from '../Screens/BreathingExerciseScreen.js';
import JournalScreen from '../Screens/JournalScreen.js';
import MessagingScreen from '../Screens/MessagingScreen.js';
import AppointmentNavigator from './AppointmentNavigator'; // Import the AppointmentNavigator
import theme from '../Styles/theme';

const HomeTab = createBottomTabNavigator();

export default function HomeNavigator(props) {
  return (
    <HomeTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          
          if (route.name === 'MoodTrackerScreen') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Breathing') {
            iconName = focused ? 'fitness' : 'fitness-outline';
          } else if (route.name === 'Journal') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Messaging') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'Appointments') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          }
          
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textLight,
        headerTitleStyle: {
          color: theme.text,
          fontSize: theme.fontSize.lg,
          fontWeight: 'bold',
        },
        headerStyle: {
          backgroundColor: theme.white,
        }
      })}
    >
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
      />
      <HomeTab.Screen
        name="Messaging"
        component={MessagingScreen}
        options={{ title: 'Messaging' }}
      />
      <HomeTab.Screen
        name="Appointments"
        component={AppointmentNavigator}
        options={{ 
          title: 'Appointments',
          headerShown: false // Hide the header since AppointmentNavigator has its own header
        }}
      />
    </HomeTab.Navigator>
  );
}