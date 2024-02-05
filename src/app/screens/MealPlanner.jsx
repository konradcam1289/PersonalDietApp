import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';

const MealPlanner = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const navigation = useNavigation();

    const onDayPress = (day) => {
        setSelectedDate(day.dateString);
        navigation.navigate('DishSelector', { selectedDate: day.dateString });
    };

    return (
        <View style={styles.container}>
          <Calendar 
            onDayPress={onDayPress}
            theme={{
              backgroundColor: '#F0F0F0',
              calendarBackground: '#FFFFFF',
              selectedDayBackgroundColor: '#4C9A70',
              selectedDayTextColor: '#FFFFFF',
              todayTextColor: '#4C9A70',
              dayTextColor: '#2d4150',
              textDisabledColor: '#d9e1e8',
              dotColor: '#00adf5',
              selectedDotColor: '#ffffff',
              arrowColor: 'orange',
              monthTextColor: '#4C9A70',
              textMonthFontWeight: 'bold',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16
            }}
          />
          <Text style={styles.selectedDateText}>Wybrana data: {selectedDate}</Text>
        </View>
      );
      
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F0F0F0',
    },
    selectedDateText: {
      fontSize: 16,
      marginTop: 10,
      textAlign: 'center',
      color: '#4C9A70',
    }
  });
  

export default MealPlanner;
