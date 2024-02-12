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
    backgroundColor: '#F0F0F0',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginTop: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
    marginHorizontal: 10,
    color: '#4C9A70',
  },
  mealItem: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    marginHorizontal: 10,
    borderRadius: 10,
  },
  calories: {
    fontSize: 16,
    color: '#666666',
  },
  sectionFooter: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginTop: 5,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#A8D5BA',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    color: '#333333',
    backgroundColor: '#F0F0F0',
  },
  caloriesSummary: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4C9A70',
  },
  deleteButton: {
    backgroundColor: '#D9534F',
    padding: 10,
    borderRadius: 20,
    color: '#FFFFFF',
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});


export default UserMealsScreen;
