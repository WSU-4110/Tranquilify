import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure you have expo vector icons installed
import AppointmentScheduler from '../Screens/AppointmentScheduler';
import AppointmentDetails from '../Screens/AppointmentDetails';
import theme from '../Styles/theme';

const AppointmentStack = createNativeStackNavigator();

export default function AppointmentNavigator() {
  return (
    <AppointmentStack.Navigator
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={theme.primary} />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        ),
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
      <AppointmentStack.Screen
        name="AppointmentScheduler"
        component={AppointmentScheduler}
        options={{ title: 'Schedule Appointment' }}
      />
      <AppointmentStack.Screen
        name="AppointmentDetails"
        component={AppointmentDetails}
        options={{ title: 'Appointment Details' }}
      />
    </AppointmentStack.Navigator>
  );
}

const styles = StyleSheet.create({
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  backText: {
    color: theme.primary,
    fontSize: theme.fontSize.md,
    marginLeft: 4,
  }
});