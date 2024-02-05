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
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                {user ? (
                    <>
                        <Text style={styles.info}>Email: {user.email}</Text>
                        <Button 
                            title="Zmień hasło" 
                            onPress={() => setShowChangePassword(!showChangePassword)} 
                            color="#4C9A70"
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
                                <View style={styles.button}>
                                    <Button 
                                        title="Zapisz nowe hasło" 
                                        onPress={reauthenticateAndChangePassword} 
                                        color="#4C9A70"
                                    />
                                </View>
                            </View>
                        )}
                    </>
                ) : (
                    <Text style={styles.info}>Nie jesteś zalogowany</Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
    },
    title: {
        fontSize: 24,
        color: '#4C9A70',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    info: {
        fontSize: 18,
        color: '#333',
        marginBottom: 20,
    },
    input: {
        height: 50,
        width: '80%',
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#A8D5BA',
        borderRadius: 25,
        padding: 15,
        backgroundColor: '#FFFFFF',
    },
    buttonContainer: {
        marginTop: 10,
        width: '80%',
        borderRadius: 25,
    },
    changePasswordContainer: {
        width: '80%',
        marginTop: 20,
    },
});


export default Details;
