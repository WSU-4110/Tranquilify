import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Replace with your actual backend API endpoint
    const API_URL = 'https://your-backend-url.com/login';

    try {
      const response = await axios.post(API_URL, { email, password });
      // Assume the response returns a token
      const { token } = response.data;
      Alert.alert('Login Successful', 'You are now logged in.');
      // After a successful login, navigate to another screen if needed
    } catch (error) {
      console.error(error);
      Alert.alert('Login Failed', error.response?.data?.message || error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Login</Text>
      
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
      
      <Button title="Login" onPress={handleLogin} />

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.linkText}>
          Don't have an account? <Text style={styles.linkAction}>Sign Up</Text>
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
    color: '#1E90FF',  // Customize this color as needed
    fontWeight: 'bold'
  },
});
