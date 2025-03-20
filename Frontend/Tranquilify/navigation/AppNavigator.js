import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import HomeNavigator from './HomeNavigator';
import { AuthContext, AuthProvider } from '../AuthContext';

function RootNavigator() {
  const { uid } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {uid == null ? <AuthNavigator /> : <HomeNavigator uid={uid}/>}
    </NavigationContainer>
  );
}

export default function AppNavigator() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
