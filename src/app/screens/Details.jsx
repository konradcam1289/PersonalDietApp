import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground } from 'react-native';
import { FIREBASE_AUTH } from '../Config/FirebaseConfig';
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';

const Details = () => {
    const user = FIREBASE_AUTH.currentUser;
    const [email, setEmail] = useState(user ? user.email : '');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showChangePassword, setShowChangePassword] = useState(false);

    const reauthenticateAndChangePassword = async () => {
        if (!email || !password || newPassword.length < 6) {
            Alert.alert("Błąd", "Wszystkie pola muszą być wypełnione i hasło musi mieć co najmniej 6 znaków");
            return;
        }

        try {
            const credential = EmailAuthProvider.credential(email, password);
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, newPassword);
            Alert.alert("Sukces", "Hasło zostało zmienione");
            setPassword('');
            setNewPassword('');
            setShowChangePassword(false);
        } catch (error) {
            console.error(error);
            Alert.alert("Błąd", error.message);
        }
    };

    return (
        <ImageBackground 
            source={require('../Image/obraz1.png')} 
            style={styles.backgroundImage}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    {user ? (
                        <>
                            <Text style={styles.info}>Email: {user.email}</Text>
                            <Button 
                                title="Zmień hasło" 
                                onPress={() => setShowChangePassword(!showChangePassword)} 
                            />
                            {showChangePassword && (
                                <View style={styles.changePasswordContainer}>
                                    <TextInput 
                                        style={styles.input} 
                                        placeholder="Aktualny Email" 
                                        value={email}
                                        onChangeText={setEmail}
                                        autoCapitalize="none"
                                    />
                                    <TextInput 
                                        style={styles.input} 
                                        placeholder="Aktualne hasło" 
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry
                                    />
                                    <TextInput 
                                        style={styles.input} 
                                        placeholder="Nowe hasło" 
                                        value={newPassword}
                                        onChangeText={setNewPassword}
                                        secureTextEntry
                                    />
                                    <Button title="Zapisz nowe hasło" onPress={reauthenticateAndChangePassword} />
                                </View>
                            )}
                        </>
                    ) : (
                        <Text style={styles.info}>Nie jesteś zalogowany</Text>
                    )}
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '90%',
        padding: 20,
    },
    info: {
        fontSize: 20,
        marginBottom: 20,
        color: '#333',
    },
    input: {
        height: 40,
        width: '100%',
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    changePasswordContainer: {
        marginTop: 20,
    },
    // Dodaj tutaj więcej stylów, jeśli potrzebujesz
});

export default Details;
