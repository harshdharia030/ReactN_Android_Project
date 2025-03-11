import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, Alert } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth'; // Import Firebase Authentication
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons for the back arrow


const LoginTwoScreen = () => {
  const [mobile, setMobile] = useState(''); // For storing email/mobile
  const [password, setPassword] = useState(''); // For storing password
  const [keepLoggedIn, setKeepLoggedIn] = useState(false); // For "Keep me logged in" toggle
  const navigation = useNavigation();

  const handleSignIn = async () => {
    try {
      // Firebase login with email and password (using mobile as email)
      const userCredential = await auth().signInWithEmailAndPassword(mobile, password);
      console.log('User signed in:', userCredential.user);

      // Optionally, handle "keep logged in" feature
      if (keepLoggedIn) {
        auth().setPersistence(auth.Auth.Persistence.LOCAL); // Session persists across app restarts
      } else {
        auth().setPersistence(auth.Auth.Persistence.SESSION); // Session expires after closing the app
      }

      // Navigate to the next screen after successful login
      navigation.navigate('Home'); // Replace 'Home' with the actual screen you want to navigate to
    } catch (error) {
      console.error('Error signing in:', error);
      // Show an alert with the error message
      Alert.alert('Login Error', error.message);
    }
  };
  const handleBack = () => {
    navigation.navigate('Signup'); // Navigate back to LoginScreen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SIGN IN</Text>

      <TextInput
        style={styles.input}
        placeholder="Mobile number*"
        value={mobile}
        onChangeText={setMobile} // Update mobile state
        keyboardType="email-address" // Firebase uses email for login
      />
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text>
          <Ionicons name="arrow-back" size={30} color="#7B3FD3" /> {/* Greyish color */}
        </Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Password*"
        value={password}
        onChangeText={setPassword} // Update password state
        secureTextEntry
      />

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInButtonText}>SIGN IN</Text>
      </TouchableOpacity>

      <View style={styles.checkboxContainer}>
        <Switch
          value={keepLoggedIn}
          onValueChange={setKeepLoggedIn} // Toggle the keepLoggedIn state
        />
        <Text style={styles.checkboxLabel}>Keep me logged in</Text>
      </View>

      <Text style={styles.signupText}>
        Don't have an account? <Text style={styles.signupLink} onPress={() => navigation.navigate('Signup')}>SIGN UP</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#e7e7e7',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#7B3FD3',
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 1,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
  forgotPassword: {
    color: '#7B3FD3',
    textAlign: 'right',
    marginBottom: 20,
  },
  signInButton: {
    backgroundColor: '#7B3FD3',
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  signInButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  checkboxLabel: {
    marginLeft: 8,
    color: '#7B3FD3',
  },
  signupText: {
    textAlign: 'center',
  },
  signupLink: {
    color: '#7B3FD3',
    fontWeight: 'bold',
  },
});

export default LoginTwoScreen;
