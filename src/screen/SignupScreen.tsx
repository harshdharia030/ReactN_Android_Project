import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import auth from '@react-native-firebase/auth'; 
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore'; 

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [contactName, setContactName] = useState('');
  const [dateOfIncorporation, setDateOfIncorporation] = useState('');
  const [mobile, setMobile] = useState('');
  const [gstChecked, setGstChecked] = useState(false);
  const [panChecked, setPanChecked] = useState(false);
  const [gstOrPanNumber, setGstOrPanNumber] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const navigation = useNavigation();

  // Function for handling the registration
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (!email || !password || !organizationName || !contactName || !mobile || !gstOrPanNumber || !pinCode || !city || !district || !state) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      // Create user with Firebase Authentication
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      const userData = {
        email: user.email,
        mobile: mobile,
        organizationName: organizationName,
        contactName: contactName,
        dateOfIncorporation: dateOfIncorporation,
        gstChecked: gstChecked,
        panChecked: panChecked,
        gstOrPanNumber: gstOrPanNumber,
        pinCode: pinCode,
        city: city,
        district: district,
        state: state,
      };

       // Save user data to Firebase Realtime Database (Key = Mobile Number)
       const realtimeRef = database().ref('/users/' + mobile);
       await realtimeRef.set(userData);
 
       // Save user data to Firestore Database (Document ID = Mobile Number)
       const firestoreRef = firestore().collection('users').doc(mobile);
       await firestoreRef.set(userData);
 

      console.log('User data added to Firebase (Realtime Database & Firestore)');
      navigation.navigate('LoginTwo'); // Navigate to login after successful registration

    } catch (error) {
      console.error('Error registering user:', error);
      Alert.alert('Registration Error', error.message);
    }
  };



  // Toggle GST Checkbox
  const toggleGSTCheckbox = () => {
    setGstChecked(true);
    setPanChecked(false); // Deselect PAN when GST is selected
  };

  // Toggle PAN Checkbox
  const togglePANCheckbox = () => {
    setPanChecked(true);
    setGstChecked(false); // Deselect GST when PAN is selected
  };

  // Go back to login screen
  const handleBack = () => {
    navigation.navigate('LoginTwo');
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
            <Ionicons name="arrow-back" size={30} color="#FFFFFF" />
          </Text>
        </TouchableOpacity>

        <Text style={styles.createAccountText}>Create Account</Text>

        {/* Input Fields */}
        <TextInput
          style={styles.textInput}
          placeholder='Organization Name*'
          value={organizationName}
          onChangeText={setOrganizationName}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Contact Name*'
          value={contactName}
          onChangeText={setContactName}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Date of Incorporation*'
          value={dateOfIncorporation}
          onChangeText={setDateOfIncorporation}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Mobile Number*'
          value={mobile}
          onChangeText={setMobile}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.textInput}
          placeholder='Email*'
          value={email}
          onChangeText={setEmail}
        />
        
        {/* Checkboxes for GST/PAN */}
        <View style={styles.checkboxRow}>
          <TouchableOpacity style={styles.checkboxContainer} onPress={toggleGSTCheckbox}>
            <View style={[styles.checkbox, gstChecked && styles.checkedCheckbox]}>
              {gstChecked && <View style={styles.innerCheckbox} />}
            </View>
            <Text style={styles.label}>GST Number</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.checkboxContainer} onPress={togglePANCheckbox}>
            <View style={[styles.checkbox, panChecked && styles.checkedCheckbox]}>
              {panChecked && <View style={styles.innerCheckbox} />}
            </View>
            <Text style={styles.label}>PAN Number</Text>
          </TouchableOpacity>
        </View>

        {/* Input for GST or PAN */}
        <TextInput
          style={styles.textInput}
          placeholder={gstChecked ? 'Enter GST Number*' : panChecked ? 'Enter PAN Number*' : 'Enter Number*'}
          value={gstOrPanNumber}
          onChangeText={setGstOrPanNumber}
        />

        {/* Remaining Input Fields */}
        <TextInput
          style={styles.textInput}
          placeholder='Pin Code*'
          value={pinCode}
          onChangeText={setPinCode}
        />
        <TextInput
          style={styles.textInput}
          placeholder='City*'
          value={city}
          onChangeText={setCity}
        />
        <TextInput
          style={styles.textInput}
          placeholder='District*'
          value={district}
          onChangeText={setDistrict}
        />
        <TextInput
          style={styles.textInput}
          placeholder='State*'
          value={state}
          onChangeText={setState}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Password*'
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Re-Enter Password*'
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

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
  textInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginHorizontal: 20,
    height: 50,
    marginBottom: 10,
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
