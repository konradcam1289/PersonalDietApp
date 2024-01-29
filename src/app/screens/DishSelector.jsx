import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { FIRESTORE_DB } from '../Config/FirebaseConfig';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const DishSelector = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const selectedDay = route.params ? route.params.selectedDate : null;


  const navigation = useNavigation();

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const dishesCollection = collection(FIRESTORE_DB, 'dishes');
        const dishesSnapshot = await getDocs(dishesCollection);
        const dishesList = dishesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDishes(dishesList);
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
      const selectedDishesRef = collection(FIRESTORE_DB, 'SelectedDishes');
      await addDoc(selectedDishesRef, {
        date: selectedDay,
        dishId: dishId,
        dishName: dishName,
      });
      console.log('Navigating to MyDiet with date:', selectedDay);
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
            <Text style={styles.title}>{item.name}</Text>
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
