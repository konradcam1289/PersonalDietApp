import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FIRESTORE_DB, FIREBASE_AUTH } from '../Config/FirebaseConfig';
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';

const MyDiet = () => {
  const [dailyMeals, setDailyMeals] = useState([]);
  const route = useRoute();
  const selectedDate = route.params.selectedDate;
  const userId = FIREBASE_AUTH.currentUser?.uid;

  useEffect(() => {
    const fetchMeals = async () => {
      if (!userId) {
        console.error('No user logged in');
        return;
      }

      try {
        const q = query(collection(FIRESTORE_DB, 'SelectedDishes'), 
                        where('date', '==', selectedDate),
                        where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        const meals = querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
        setDailyMeals(meals);
      } catch (error) {
        console.error('Error fetching meals: ', error);
      }
    };

    fetchMeals();
  }, [selectedDate, userId]);

  const removeDish = async (dishId) => {
    try {
      await deleteDoc(doc(FIRESTORE_DB, 'SelectedDishes', dishId));
      setDailyMeals(dailyMeals.filter(dish => dish.id !== dishId));
    } catch (error) {
      console.error('Error removing dish: ', error);
      Alert.alert('Error', 'Nie udało się usunąć dania');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.mealItem}>
      <Text style={styles.dishName}>{item.dishName}</Text>
      <TouchableOpacity 
        style={styles.deleteButton} 
        onPress={() => removeDish(item.id)}
      >
        <Text style={styles.deleteButtonText}>Usuń</Text>
      </TouchableOpacity>
    </View>
  );
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Posiłki na dzień: {selectedDate}</Text>
      <FlatList
        data={dailyMeals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4C9A70',
    marginBottom: 20,
    textAlign: 'center',
  },
  mealItem: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dishName: {
    fontSize: 18,
    color: '#333',
    flex: 1,
  },
  deleteButton: {
    backgroundColor: '#D9534F',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default MyDiet;
