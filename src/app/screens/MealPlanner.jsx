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
            <Calendar onDayPress={onDayPress} />
            <Text>Wybrana data: {selectedDate}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    }
});

export default MealPlanner;
