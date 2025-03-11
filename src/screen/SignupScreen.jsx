import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons for the back arrow

const SignupScreen = () => {
  const [isGSTChecked, setIsGSTChecked] = useState(false);
  const [isPANChecked, setIsPANChecked] = useState(false);
  const navigation = useNavigation();

  const handleRegister = () => {
    // Implement registration logic here
    console.log('Registering user...');
    // You can navigate to another screen after registration if needed
  };

  const toggleGSTCheckbox = () => {
    setIsGSTChecked(true);
    setIsPANChecked(false); // Deselect PAN when GST is selected
  };

  const togglePANCheckbox = () => {
    setIsPANChecked(true);
    setIsGSTChecked(false); // Deselect GST when PAN is selected
  };

  const handleBack = () => {
    navigation.navigate('Login'); // Navigate back to LoginScreen
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.topImageContainer}>
          <Image
            source={require("../../assets/topVector2.png")}
            style={styles.topImage}
          />
        </View>

        {/* Back Arrow */}
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text>
          <Ionicons name="arrow-back" size={30} color="#FFFFFF" /> {/* Greyish color */}
          </Text>
        </TouchableOpacity>

        <Text style={styles.createAccountText}>Create Account</Text>

        <View style={styles.inputContainer}>
          <TextInput style={styles.textInput} placeholder='Organization Name*' />
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.textInput} placeholder='Contact Name*' />
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.textInput} placeholder='Date of Incorporation*' />
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.textInput} placeholder='Mobile Number*' />
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.textInput} placeholder='Email*' />
        </View>

        {/* Checkboxes on the same line */}
        <View style={styles.checkboxRow}>
          <TouchableOpacity style={styles.checkboxContainer} onPress={toggleGSTCheckbox}>
            <View style={[styles.checkbox, isGSTChecked && styles.checkedCheckbox]}>
              {isGSTChecked && <View style={styles.innerCheckbox} />}
            </View>
            <Text style={styles.label}>GST Number</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.checkboxContainer} onPress={togglePANCheckbox}>
            <View style={[styles.checkbox, isPANChecked && styles.checkedCheckbox]}>
              {isPANChecked && <View style={styles.innerCheckbox} />}
            </View>
            <Text style={styles.label}>PAN Number</Text>
          </TouchableOpacity>
        </View>

        {/* Show GST or PAN placeholder based on selection */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder={isGSTChecked ? 'Enter GST Number*' : isPANChecked ? 'Enter PAN Number*' : 'Enter Number*'}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.textInput} placeholder='Pin Code*' />
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.textInput} placeholder='City*' />
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.textInput} placeholder='District*' />
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.textInput} placeholder='State*' />
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.textInput} placeholder='Password*' />
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.textInput} placeholder='Re-Enter Password*' />
        </View>

        {/* Register Button */}
        <TouchableOpacity style={styles.signUpButton} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

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
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 1,
  },
  createAccountText: {
    textAlign: "center",
    fontSize: 30,
    color: "#262626",
    fontWeight: "bold",
    marginVertical: 20,
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    borderRadius: 10,
    marginHorizontal: 20,
    elevation: 5,
    marginVertical: 10,
    alignItems: "center",
    height: 50,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 16,
  },
  checkboxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%', 
    marginLeft: '10%',
    marginVertical: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#7B3FD3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkedCheckbox: {
    backgroundColor: '#7B3FD3',
  },
  innerCheckbox: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
  },
  label: {
    fontSize: 16,
    color: '#262626',
  },
  signUpButton: {
    backgroundColor: "#7B3FD3", 
    paddingVertical: 15,
    borderRadius: 25,
    marginHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default SignupScreen;
