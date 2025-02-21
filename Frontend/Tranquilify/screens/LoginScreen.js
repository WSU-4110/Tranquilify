import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { AuthContext } from '../AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();


  const handleLogin = async () => {
    // Simple validation: Ensure both fields are filled.
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Login Failed', 'Please enter both email and password.');
      return;
    }

    // const API_URL = '35.16.81.152:9191/login/sign_in';
    // console.log('sending request to: ' + API_URL);
    // const response = await fetch(API_URL, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ email, password }),
    // });
    // console.log(response.status, response);
    // if(response.status !== 200) {
    //   Alert.alert('Login Failed', 'Invalid email or password.');
    //   return;
    // }
    const token = '1234';
    console.log(token);

    signIn(token);



    // Mock a successful login after a short delay (simulate API call)
    setTimeout(() => {
      Alert.alert('Login Successful', 'You are now logged in.');
      // Navigate to the MoodTracker screen after login
      //navigation.navigate('MoodTrackerScreen');
    }, 1000); // 1-second delay
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
    color: '#1E90FF', 
    fontWeight: 'bold'
  },
});