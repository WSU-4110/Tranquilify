import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import HomeNavigator from './HomeNavigator';
import { AuthContext, AuthProvider } from '../AuthContext';

function RootNavigator() {
  const { userToken } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {userToken == null ? <AuthNavigator /> : <HomeNavigator userToken={userToken}/>}
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
