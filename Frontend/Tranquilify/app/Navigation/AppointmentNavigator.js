import React, { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import AppointmentScheduler from '../Screens/AppointmentScheduler';
import AppointmentDetails from '../Screens/AppointmentDetails';
import { AuthContext } from '../Services/AuthContext'; // Import AuthContext
import theme from '../Styles/theme';

const AppointmentStack = createNativeStackNavigator();

export default function AppointmentNavigator() {
  const { signOut } = useContext(AuthContext); // Access the signOut function
  
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
    <AppointmentStack.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: () => <SignOutButton />, // Add sign out button to header
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
        options={() => ({ 
          title: 'Appointment Details',
        })}
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
  },
  signOutButton: {
    padding: 8,
  }
});
