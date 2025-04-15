import React, { useContext } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import MoodTrackerScreen from '../Screens/MoodTrackerScreen.js';
import BreathingExerciseScreen from '../Screens/BreathingExerciseScreen.js';
import JournalScreen from '../Screens/JournalScreen.js';
import MessagingScreen from '../Screens/MessagingScreen.js';
import AppointmentNavigator from './AppointmentNavigator';
import { AuthContext } from '../Services/AuthContext';
import theme from '../Styles/theme';

const HomeTab = createBottomTabNavigator();

export default function HomeNavigator(props) {
  const { signOut, firstName } = useContext(AuthContext);
  
  // Sign out button component for the header
  const SignOutButton = () => (
    <TouchableOpacity
      style={styles.signOutButton}
      onPress={signOut}
    >
      <Ionicons name="log-out-outline" size={24} color={theme.primary} />
    </TouchableOpacity>
  );

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
          elevation: 2,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        headerRight: () => <SignOutButton />, // Add sign out button to all screens in the tab navigator
        headerLeft: () => null, // Remove back button
      })}
    >
      <HomeTab.Screen
        name="MoodTrackerScreen"
        component={MoodTrackerScreen}
        options={{ title: `Home || ${firstName}` }}
      />
      <HomeTab.Screen
        name="Breathing"
        component={BreathingExerciseScreen}
        options={{ title: `Breathing || ${firstName}` }}
      />
      <HomeTab.Screen
        name="Journal"
        component={JournalScreen}
        options={{ title: `Journal || ${firstName}` }}
      />
      <HomeTab.Screen
        name="Messaging"
        component={MessagingScreen}
        options={{ title: `Messaging || ${firstName}` }}
      />
      <HomeTab.Screen
        name="Appointments"
        component={AppointmentNavigator}
        options={{ 
          title: `Schedule || ${firstName}`,
          headerShown: false // Hide the header since AppointmentNavigator has its own header
        }}
      />
    </HomeTab.Navigator>
  );
}

const styles = StyleSheet.create({
  signOutButton: {
    marginRight: 16,
    padding: 8,
  }
});