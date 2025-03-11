import React, { useState, useEffect } from 'react'; // Ensure useState and useEffect are imported
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screen/LoginScreen';
import SignupScreen from './src/screen/SignupScreen';
import LoginTwoScreen from './src/screen/LoginTwoScreen';
import auth from '@react-native-firebase/auth'; // Import Firebase Authentication


const Stack = createNativeStackNavigator();

const App = () => {
  const [initializing, setInitializing] = useState(true); // For handling app initialization state
  const [user, setUser] = useState(null); // User state for checking authentication

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false); // Set initializing to false after Firebase check is done
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged); // Listen to authentication state change
    return subscriber; // Unsubscribe from auth state change listener on unmount
  }, []); // Empty dependency array ensures this effect runs only once

  // If the app is still initializing, show loading screen
  if (initializing) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {
         <>
            <Stack.Screen name="LoginTwo" component={LoginTwoScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});  
