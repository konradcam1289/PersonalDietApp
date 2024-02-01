import React, { useState, useEffect } from 'react';
import { View, Text, SectionList, StyleSheet, TextInput } from 'react-native';
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
          const { date, calories } = data;
          if (!mealsByDate[date]) {
            mealsByDate[date] = { data: [], totalCalories: 0 };
          }
          mealsByDate[date].data.push(data);
          mealsByDate[date].totalCalories += Number(calories) || 0;
        });

        const sortedMealsList = Object.keys(mealsByDate)
          .sort((a, b) => a.localeCompare(b))
          .map(date => ({
            date,
            data: mealsByDate[date].data,
            totalCalories: mealsByDate[date].totalCalories,
            targetCalories: 2000, // Domyślna wartość założonej liczby kalorii
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
      <Text style={styles.calories}>Kalorie: {item.calories}</Text>
    </View>
  );

  const renderSectionFooter = ({ section }) => {
    const handleTargetCaloriesChange = (text) => {
      setDailyMeals(meals => meals.map(meal => {
        if (meal.date === section.date) {
          return { ...meal, targetCalories: parseInt(text, 10) || 0 };
        }
        return meal;
      }));
    };

    const statusMessage = () => {
      const calorieDifference = section.totalCalories - section.targetCalories;
      if (calorieDifference > 100) {
        return 'Za dużo kalorii!';
      } else if (calorieDifference < -100) {
        return 'Za mało kalorii!';
      } else {
        return 'Wystarczająco kalorii!';
      }
    };

    return (
      <View style={styles.sectionFooter}>
        <Text>Liczba założonych kalorii:</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleTargetCaloriesChange}
          keyboardType="numeric"
          value={String(section.targetCalories)}
        />
        <Text style={styles.caloriesSummary}>Łączna liczba kalorii: {section.totalCalories}</Text>
        <Text style={styles.status}>{statusMessage()}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SectionList
        sections={dailyMeals}
        keyExtractor={(item, index) => item.dishName + index}
        renderItem={renderItem}
        renderSectionHeader={({ section: { date } }) => (
          <Text style={styles.header}>{date}</Text>
        )}
        renderSectionFooter={renderSectionFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#ffffff',
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  mealItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calories: {
    fontSize: 14,
    color: '#666',
  },
  sectionFooter: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
    borderRadius: 5,
  },
  caloriesSummary: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4caf50',
  },
});

export default UserMealsScreen;
