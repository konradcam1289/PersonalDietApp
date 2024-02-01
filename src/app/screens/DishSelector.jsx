import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { FIRESTORE_DB, FIREBASE_AUTH } from '../Config/FirebaseConfig';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { useRoute, useNavigation } from '@react-navigation/native';

const DishSelector = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const selectedDay = route.params ? route.params.selectedDate : null;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const userId = FIREBASE_AUTH.currentUser?.uid;
        if (!userId) {
          throw new Error("Nie jesteś zalogowany");
        }
  
        const publicDishesCollection = collection(FIRESTORE_DB, 'dishes');
        const publicDishesSnapshot = await getDocs(publicDishesCollection);
        const publicDishesList = publicDishesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), isUserDish: false }));
  
        const userDishesQuery = query(collection(FIRESTORE_DB, 'userDishes'), where('userId', '==', userId));
        const userDishesSnapshot = await getDocs(userDishesQuery);
        const userDishesList = userDishesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), isUserDish: true }));
  
        setDishes([...publicDishesList, ...userDishesList]);
      } catch (error) {
        console.error("Error getting dishes: ", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchDishes();
  }, []);

  const addDishToDay = async (dishId, dishName) => {
    try {
      const userId = FIREBASE_AUTH.currentUser?.uid;
      if (!userId) {
        throw new Error("Nie jesteś zalogowany");
      }

      const selectedDishesRef = collection(FIRESTORE_DB, 'SelectedDishes');
      await addDoc(selectedDishesRef, {
        date: selectedDay,
        dishId: dishId,
        dishName: dishName,
        userId: userId,
      });
      navigation.navigate('MyDiet', { selectedDate: selectedDay });
      alert(`Dish added to ${selectedDay} successfully!`);
    } catch (error) {
      console.error('Error adding dish to day: ', error);
    }
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={dishes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.name} {item.isUserDish ? '(User Dish)' : '(Public Dish)'}</Text>
            <TouchableOpacity 
              style={styles.addButton} 
              onPress={() => addDishToDay(item.id, item.name)}
            >
              <Text style={styles.addButtonText}>Add to Day</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  title: {
    fontSize: 18,
    color: 'black',
  },
  addButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
  }
});

export default DishSelector;
