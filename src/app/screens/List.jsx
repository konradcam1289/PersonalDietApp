import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import React from 'react';
import { FIREBASE_AUTH } from '../Config/FirebaseConfig';

const backgroundImage = require('../Image/obraz1.png')

const List = ({ navigation }) => {
    return (
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            <View style={styles.overlay}>
            <View style={styles.container}>
                <View style={styles.button}>
                    <Button onPress={() => navigation.navigate('Details')} title='Dane profilowe' />
                </View>
                <View style={styles.button}>
                    <Button onPress={() => navigation.navigate('BMI Calculator')} title='Kalkulator BMI' />
                </View>
                <View style={styles.button}>
                    <Button onPress={() => navigation.navigate('Dishes')} title='Lista dań' />
                </View>
                <View style={styles.button}>
                    <Button onPress={() => navigation.navigate('MealPlanner')} title='Plan żywienia' />
                </View>
                <View style={styles.button}>
                    <Button onPress={() => navigation.navigate('ShoppingList')} title='Lista zakupów' />
                </View>
                <View style={styles.button}>
                    <Button onPress={() => navigation.navigate('UserMealScreen')} title='Moje posiłki' />
                </View>
                <View style={styles.button}>
                    <Button onPress={() => FIREBASE_AUTH.signOut()} title='Logout' />
                </View>
            </View>
            </View>
        </ImageBackground>
    );
};

export default List;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        marginTop: 5,
        marginBottom: 5,
        width: '80%',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
    },
});