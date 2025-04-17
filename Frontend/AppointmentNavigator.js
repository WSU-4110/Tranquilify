import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppointmentScheduler from '../Screens/AppointmentScheduler';
import AppointmentDetails from '../Screens/AppointmentDetails';

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
