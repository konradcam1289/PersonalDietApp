import { View, Text, Button } from 'react-native';
import React from 'react';
import { FIREBASE_AUTH } from '../Config/FirebaseConfig';



const List = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Button onPress={() => navigation.navigate('Details')} title='Open details'/>
            <Button onPress={() => FIREBASE_AUTH.signOut()} title='Logout'/>
        </View>
    );
};

export default List;