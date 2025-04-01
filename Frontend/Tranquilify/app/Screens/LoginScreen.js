import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../Services/AuthContext';
import { Login, getUser } from '../Services/LoginService';
import styles from '../Styles/Login';


export default function LoginScreen() {

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const { signIn, user, } = useContext(AuthContext);

  const navigation = useNavigation();

  const handleLogin = async () => {

      setLoading(true);

      const n_email = email.trim().toLowerCase();

      const n_pass = password.trim();

      try{

          const response = await Login(n_email, n_pass);

          if(response === false || ( typeof response === 'string' && response.startsWith('Error') ) ) Alert.alert(response);
          
          else {
            
            signIn(response);
            
            try{

              const response2 = await getUser(response);

              if(typeof response2 === 'string' && response2.startsWith('Error') ) Alert.alert(response2);

              else user(response2.firstName, response.lastName);

            }
            catch(error){}
          }
      }
      catch(error){}

      setLoading(false);
  };

  return (

    <View style={styles.container}>

      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />

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
      
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
      
              {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>Login</Text>}
      
        </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>

        <Text style={styles.linkText}>

          Don't have an account? <Text style={styles.linkAction}>Sign Up</Text>

        </Text>

      </TouchableOpacity>

    </View>

  );
}

