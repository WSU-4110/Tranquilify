import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SignUp } from '../Services/LoginService';
import styles from '../Styles/Signup';

export default function SignupScreen() {

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [firstName, setFirstName] = useState('');

  const [lastName, setLastName] = useState('');

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleSignup = async () => {

      setLoading(true);

      const n_email = email.trim().toLowerCase();

      const n_pass = password.trim();

      try{

          const response = await SignUp(n_email, n_pass, firstName, lastName);

          if( !response.startsWith('Error') ) navigation.navigate('Login');

          Alert.alert(response);
      }
      catch(error){}

      setLoading(false);
  };

  return (

    <View style={styles.container}>

      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />

      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        placeholderTextColor="#888"
        value={firstName}
        onChangeText={setFirstName}
      />

      <TextInput
        style={styles.input}
        placeholder="Last Name"
        placeholderTextColor="#888"
        value={lastName}
        onChangeText={setLastName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>

        {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>Sign Up</Text>}

      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>

        <Text style={styles.linkText}>

          Already have an account? <Text style={styles.linkAction}>Login</Text>

        </Text>

      </TouchableOpacity>

    </View>
  );
}

