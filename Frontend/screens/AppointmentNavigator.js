import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppointmentScheduler from '../screens/AppointmentScheduler';
import AppointmentDetails from '../screens/AppointmentDetails';

const AppointmentStack = createNativeStackNavigator();

export default function AppointmentNavigator() {
  return (
    <AppointmentStack.Navigator>
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
