import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { FIRESTORE_DB } from '../Config/FirebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const MealPlanner = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [userDailyLimit, setUserDailyLimit] = useState(2000); // Załóżmy, że limit to 2000 kalorii
    const [dailyMeals, setDailyMeals] = useState([]);
    const [totalCalories, setTotalCalories] = useState(0);

    const navigation = useNavigation();

    const onDayPress = (day) => {
      setSelectedDate(day.dateString);
      fetchMealsForDay(day.dateString);
      navigation.navigate('DishSelector', { selectedDate: day.dateString });
    };

    // Funkcja do pobierania posiłków dla wybranego dnia
    const fetchMealsForDay = async (date) => {
        const q = query(collection(FIRESTORE_DB, 'MealPlans'), where('date', '==', date));
        const querySnapshot = await getDocs(q);
        let meals = [];
        let calories = 0;
        querySnapshot.forEach((doc) => {
            meals.push(doc.data());
            calories += doc.data().calories; // Zakładając, że każdy posiłek ma pole 'calories'
        });
        setDailyMeals(meals);
        setTotalCalories(calories);
    };

    // Wywołane, gdy użytkownik wybierze datę


    // Dodaj tu funkcję do dodawania posiłków do Firestore

    return (
        <View>
            <Calendar
                onDayPress={onDayPress}
            />
            <Text>Wybrana data: {selectedDate}</Text>
            <Text>Limit kalorii na dzień: {userDailyLimit}</Text>
            <Text>Całkowite kalorie na dzień: {totalCalories}</Text>
            {totalCalories > userDailyLimit && (
                <Text>Przekroczono limit kalorii!</Text>
            )}
            {/* Tutaj można dodać listę dań i funkcjonalność dodawania dań do wybranego dnia */}
        </View>
    );
};

export default MealPlanner;
