import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
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
    );
};

export default Details;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    info: {
        fontSize: 20,
        marginBottom: 10,
    },
    input: {
        height: 40,
        width: '500',
        marginVertical: 10,
        borderWidth: 1,
        padding: 10,
    },
    changePasswordContainer: {
        marginTop: 20,
    },
});
