import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";


function ChosenMeals() {
    return (
        <View style={styles.container}>
        <Text style={styles.text}>ChosenMeals</Text>
        </View>
    );
}

export default ChosenMeals;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent:"center",
    },
    text: {
        color: "darkslateblue",
        fontSize: 30,
    }
});