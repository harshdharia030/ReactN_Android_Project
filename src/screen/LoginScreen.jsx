import { Image, StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();

  const handleRegister = () => {
    navigation.navigate('Signup'); // Navigate to Signup screen
  };

  const handleLogin = () => {
    navigation.navigate('LoginTwo'); // Navigate to LoginTwo screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.topImageContainer}>
        <Image
          source={require("../../assets/topVector2.png")}
          style={styles.topImage}
        />
      </View>
      <View style={styles.helloContainer}>
        <Text style={styles.helloText}>Hi, there</Text>
      </View>
      <View>
        <Text style={styles.signIntext}>Let's Get Started</Text>
      </View>

      {/* Buttons */}
      <TouchableOpacity style={styles.signUpButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={[styles.buttonText, styles.loginButtonText]}>LOG IN</Text>
      </TouchableOpacity>

      <View style={styles.leftVectorContainer}>
        <ImageBackground source={require("../../assets/leftVector.png")} style={styles.leftVectorImage} />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    flex: 1,
    position: "relative",
  },
  topImageContainer: {},
  topImage: {
    width: "100%",
    height: 127,
  },
  helloContainer: {},
  helloText: {
    textAlign: "center",
    fontSize: 70,
    color: "#262626",
    fontWeight: "400",
    marginTop: 130,
  },
  signIntext: {
    textAlign: "center",
    fontSize: 30,
  },
  signUpButton: {
    backgroundColor: "#7B3FD3", // Button color
    paddingVertical: 15,
    borderRadius: 25,
    marginHorizontal: 20,
    marginTop: 20,
  },
  loginButton: {
    backgroundColor: "transparent", // Button color
    borderColor: "#7B3FD3",
    borderWidth: 2,
    paddingVertical: 15,
    borderRadius: 25,
    marginHorizontal: 20,
    marginTop: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFFFFF", // Text color for SIGN UP button
    fontSize: 16,
    fontWeight: "600",
  },
  loginButtonText: {
    color: "#7B3FD3",
  },
  leftVectorContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  leftVectorImage: {
    height: 320,
    width: 150, // Corrected typo here
  },
});
