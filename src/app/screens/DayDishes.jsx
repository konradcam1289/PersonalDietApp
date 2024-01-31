import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { FIRESTORE_DB } from '../Config/FirebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';
import Day from 'react-native-calendars/src/calendar/day';

const MyDiet = () => {
  const [dailyMeals, setDailyMeals] = useState([]);
  const route = useRoute();
  const selectedDate = route.params.selectedDate;

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const q = query(collection(FIRESTORE_DB, 'SelectedDishes'), where('date', '==', selectedDate));
        const querySnapshot = await getDocs(q);
        const meals = querySnapshot.docs.map(doc => doc.data());
        setDailyMeals(meals);
      } catch (error) {
        console.error('Error fetching meals: ', error);
      }
    };

    fetchMeals();
  }, [selectedDate]);

  const renderItem = ({ item }) => (
    <View style={styles.mealItem}>
      <Text>{item.dishName}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Posiłki na dzień: {selectedDate}</Text>
      <FlatList
        data={dailyMeals}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mealItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  }
});

export default MyDiet;
