import { View, Text, Button, StyleSheet } from 'react-native';
import React from 'react';
import { FIREBASE_AUTH } from '../Config/FirebaseConfig';

const List = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Menu główne</Text>
            <View style={styles.buttonContainer}>
                <Button onPress={() => navigation.navigate('Details')} title='Dane profilowe' color='#4C9A70' />
            </View>
            <View style={styles.buttonContainer}>
                <Button onPress={() => navigation.navigate('BMI Calculator')} title='Kalkulator BMI' color='#4C9A70' />
            </View>
            <View style={styles.buttonContainer}>
                <Button onPress={() => navigation.navigate('Dishes')} title='Lista dań' color='#4C9A70' />
            </View>
            <View style={styles.buttonContainer}>
                <Button onPress={() => navigation.navigate('MealPlanner')} title='Plan żywienia' color='#4C9A70' />
            </View>
            <View style={styles.buttonContainer}>
                <Button onPress={() => navigation.navigate('ShoppingList')} title='Lista zakupów' color='#4C9A70' />
            </View>
            <View style={styles.buttonContainer}>
                <Button onPress={() => navigation.navigate('UserMealScreen')} title='Moje posiłki' color='#4C9A70' />
            </View>
            <View style={styles.buttonContainer}>
                <Button onPress={() => FIREBASE_AUTH.signOut()} title='Wyloguj' color='#4C9A70' />
            </View>
        </View>
    );
};

export default List;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
    },
    title: {
        fontSize: 24,
        marginBottom: 30,
        color: '#4C9A70',
        fontWeight: 'bold',
    },
    buttonContainer: {
        marginTop: 10,
        marginBottom: 10,
        width: '80%',
        borderRadius: 25,
    },
});
