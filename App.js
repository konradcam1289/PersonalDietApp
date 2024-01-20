import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/app/screens/Login';
import List from './src/app/screens/List';
import Details from './src/app/screens/Details';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { FIREBASE_AUTH } from './src/app/Config/FirebaseConfig';
import SignUp from './src/app/screens/SignUp';
import BMICalculatorScreen from './src/app/screens/BMICalculatorScreen';
import Dishes from './src/app/screens/Dishes';
import DishDetails from './src/app/screens/DishDetails';
import MealPlanner from './src/app/screens/MealPlanner';
import DishSelector from './src/app/screens/DishSelector';
import ShoppingList from './src/app/screens/ShoppingList';

const StackActions = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout () {
  return (
    <InsideStack.Navigator initialRouteName="Login">
      <InsideStack.Screen name="Strona główna" component={List} options={{headerShown: false}} />
      <InsideStack.Screen name="Details" component={Details} />
      <InsideStack.Screen name="BMI Calculator" component={BMICalculatorScreen} />
      <InsideStack.Screen name="DishDetails" component={DishDetails} />
      <InsideStack.Screen name="MealPlanner" component={MealPlanner} /> 
      <InsideStack.Screen name="DishSelector" component={DishSelector} />
      <InsideStack.Screen name="ShoppingList" component={ShoppingList} />

    </InsideStack.Navigator>
  )
}

export default function App() {
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
        console.log(user);
        setUser(user);
    });

    // Oczyszczanie subskrypcji
    return () => unsubscribe();
}, []);

  return (
    <NavigationContainer>
      <StackActions.Navigator initialRouteName="Login">
        
        {/* pierwsza wersja */}
        {user ? (
          <StackActions.Screen 
          name="Inside" 
          component={InsideLayout} 
          options={{ headerShown : false }} 
          />
        ) : (
          <StackActions.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown : false }} 
          />
          
        )}
        <StackActions.Screen name="SignUp" component={SignUp} />
        <StackActions.Screen name="Dishes" component={Dishes} />
      </StackActions.Navigator>
    </NavigationContainer>
  );
}

//druga wersja


