import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/app/screens/Login';
import List from './src/app/screens/List';
import Details from './src/app/screens/Details';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { FIREBASE_AUTH } from './src/app/Config/FirebaseConfig';

const StackActions = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout () {
  return (
    <InsideStack.Navigator initialRouteName="Home">
      <InsideStack.Screen name="My meals" component={List} />
      <InsideStack.Screen name="Details" component={Details} />
    </InsideStack.Navigator>
  )
}

export default function App() {
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log(user);
      setUser(user);
    });
  }, []);
  

  return (
  
    <NavigationContainer>
      <StackActions.Navigator initialRouteName="Login">
        <StackActions.Screen name="Login" component={Login} options={{ headerShown : false }} />
      </StackActions.Navigator>
    </NavigationContainer>
  );
}


