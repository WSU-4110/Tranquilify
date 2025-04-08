// app/Screens/LogoutScreen.js
import React, { useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import { AuthContext } from '../Services/AuthContext';

export default function LogoutScreen() {
  const { signOut } = useContext(AuthContext);

  useEffect(() => {
    signOut();
  }, []);

  return (
    <View>
      <Text>Logging out...</Text>
    </View>
  );
}
