import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, Alert, Modal } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth'; // Import Firebase Authentication
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons for the back arrow

const LoginTwoScreen = () => {
  const [mobile, setMobile] = useState(''); // For storing email/mobile
  const [password, setPassword] = useState(''); // For storing password
  const [keepLoggedIn, setKeepLoggedIn] = useState(false); // For "Keep me logged in" toggle
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false); // Modal visibility for Forgot Password
  const [emailForReset, setEmailForReset] = useState(''); // For storing email to send password reset link
  const navigation = useNavigation();

  // Handle sign-in
  const handleSignIn = async () => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(mobile, password);
      console.log('User signed in:', userCredential.user);

      if (keepLoggedIn) {
        auth().setPersistence(auth.Auth.Persistence.LOCAL); // Session persists across app restarts
      } else {
        auth().setPersistence(auth.Auth.Persistence.SESSION); // Session expires after closing the app
      }

      navigation.navigate('Home'); // Navigate to Home screen after successful login
    } catch (error) {
      console.error('Error signing in:', error);
      Alert.alert('Login Error', error.message);
    }
  };

  // Handle password reset
  const handleForgotPassword = async () => {
    try {
      await auth().sendPasswordResetEmail(emailForReset);
      Alert.alert('Password Reset', 'A password reset link has been sent to your email.');
      setShowForgotPasswordModal(false); // Close the modal after successful password reset
    } catch (error) {
      console.error('Error resetting password:', error);
      Alert.alert('Reset Error', error.message);
    }
  };

  const handleBack = () => {
    navigation.navigate('Login'); // Navigate back to Signup screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SIGN IN</Text>

      <TextInput
        style={styles.input}
        placeholder="Mobile number*"
        value={mobile}
        onChangeText={setMobile}
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
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity onPress={() => setShowForgotPasswordModal(true)}>
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

      {/* Forgot Password Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showForgotPasswordModal}
        onRequestClose={() => setShowForgotPasswordModal(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Reset Your Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={emailForReset}
            onChangeText={setEmailForReset}
          />
          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleForgotPassword}
          >
            <Text style={styles.resetButtonText}>Send Reset Link</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowForgotPasswordModal(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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

  // Modal Styles for Forgot Password
  modalView: {
    marginTop: '50%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#7B3FD3',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LoginTwoScreen;
