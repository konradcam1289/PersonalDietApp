import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
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
            Alert.alert("Success", "Konto zostało pomyślnie utworzone.");
            setEmail("");
            setPassword("");
            navigation.navigate("Inside");
        } catch (error) {
            console.error(error);
            Alert.alert("Błąd", error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleBackToLogin = () => {
        navigation.navigate("Login");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Załóż konto</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Hasło"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {loading ? (
                <ActivityIndicator size="large" color="#4C9A70" />
            ) : (
                <View style={styles.buttonContainer}>
                    <Button title="Utwórz konto" onPress={handleSignUp} color="#4C9A70" />
                </View>
            )}
            <View style={styles.buttonContainer}>
                <Button title="Powrót do ekranu logowania" onPress={handleBackToLogin} color="#A8D5BA" />
            </View>
        </View>
    );
};

export default SignUp;

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
    input: {
        height: 50,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#A8D5BA',
        borderRadius: 25,
        padding: 15,
        backgroundColor: '#FFFFFF',
        width: '80%',
    },
    buttonContainer: {
        marginTop: 10,
        width: '80%',
        borderRadius: 25,
    },
});
