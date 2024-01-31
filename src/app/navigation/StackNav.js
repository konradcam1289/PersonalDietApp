import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '../Config/FirebaseConfig'; // Aktualizuj ścieżkę zgodnie z lokalizacją FirebaseConfig
import Login from '../screens/Login'; // Aktualizuj ścieżki do ekranów
import SignUp from '../screens/SignUp';
import Dishes from '../screens/Dishes';
import InsideLayout from './InsideStackNav'; // Upewnij się, że ścieżka jest poprawna

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
