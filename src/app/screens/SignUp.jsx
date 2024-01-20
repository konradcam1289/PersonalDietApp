// SignUp.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../Config/FirebaseConfig';
import { useNavigation } from '@react-navigation/native';


const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    

    const handleSignUp = async () => {
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
            Alert.alert("Success", "Account created successfully");
            setEmail("");
            setPassword("");
            navigation.navigate("Inside");
        } catch (error) {
            console.error(error);
            Alert.alert("Error", error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleBackToLogin = () => {
        navigation.navigate("Login");
    };

    return (
        <View style={styles.container}>
            <Text style={{fontSize: 20}}>Sign Up</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <View style={styles.button}>
                <Button title="Create Account" onPress={handleSignUp} disabled={loading} style={styles.button} />
            </View>
            <View style={styles.button}>
                <Button title="Powrót do ekranu logowania" onPress={handleBackToLogin} />
            </View>
        </View>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        height: 50,
        marginVertical: 4,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff',
        width: '80%',
    },
    button: {
        marginTop: 5,
        marginBottom: 5,
    },
});
