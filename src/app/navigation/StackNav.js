import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '../Config/FirebaseConfig';

import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import InsideLayout from './InsideStackNav';

const Stack = createNativeStackNavigator();

const StackNav = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Stack.Navigator initialRouteName="Login">
      {user ? (
        <Stack.Screen 
          name="Inside" 
          component={InsideLayout} 
          options={{ headerShown: false }} 
        />
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNav;
