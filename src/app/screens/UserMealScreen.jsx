import React, { useState, useEffect } from 'react';
import { View, Text, SectionList, StyleSheet } from 'react-native';
import { FIRESTORE_DB, FIREBASE_AUTH } from '../Config/FirebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

const UserMealsScreen = () => {
  const [dailyMeals, setDailyMeals] = useState([]);
  const currentUser = FIREBASE_AUTH.currentUser;

  useEffect(() => {
    const fetchMeals = async () => {
      if (!currentUser) {
        console.error('No user logged in');
        return;
      }

      try {
        const q = query(collection(FIRESTORE_DB, 'SelectedDishes'), where('userId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        const mealsByDate = {};

        querySnapshot.docs.forEach(doc => {
          const data = doc.data();
          const { date } = data;
          if (mealsByDate[date]) {
            mealsByDate[date].push(data);
          } else {
            mealsByDate[date] = [data];
          }
        });

        // Sortowanie dat i przekształcenie w odpowiednią strukturę dla SectionList
        const sortedMealsList = Object.keys(mealsByDate)
          .sort((a, b) => a.localeCompare(b)) // Sortowanie dat
          .map(date => ({
            date,
            data: mealsByDate[date],
          }));

        setDailyMeals(sortedMealsList);
      } catch (error) {
        console.error('Error fetching meals: ', error);
      }
    };

    fetchMeals();
  }, [currentUser]);

  const renderItem = ({ item }) => (
    <View style={styles.mealItem}>
      <Text>{item.dishName}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={dailyMeals}
        keyExtractor={(item, index) => item.dishName + index}
        renderItem={renderItem}
        renderSectionHeader={({ section: { date } }) => (
          <Text style={styles.header}>{date}</Text>
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
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginTop: 10,
  },
  mealItem: {
    backgroundColor: '#fff',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  }
});

export default UserMealsScreen;
