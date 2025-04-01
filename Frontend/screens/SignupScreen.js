import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    // Replace with your actual backend API endpoint
    const API_URL = 'https://your-backend-url.com/signup';

    try {
      const response = await axios.post(API_URL, { email, password });
      Alert.alert('Signup Successful', 'You can now log in.');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      Alert.alert('Signup Failed', error.response?.data?.message || error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Sign Up</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <Button title="Sign Up" onPress={handleSignup} />

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>
          Already have an account? <Text style={styles.linkAction}>Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20,
    backgroundColor: '#F5F5F5'
  },
  logo: { 
    width: 100, 
    height: 100, 
    marginBottom: 20 
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333'
  },
  input: { 
    width: '100%',
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 10, 
    marginBottom: 10, 
    borderRadius: 5,
    backgroundColor: '#FFF',
    color: '#333'
  },
  linkText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555'
  },
  linkAction: {
    color: '#1E90FF', // Customize this color as needed
    fontWeight: 'bold'
  },
});
