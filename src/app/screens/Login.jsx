import { View, Text, StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView, Image } from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_AUTH } from '../Config/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
    const navigation = useNavigation();

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
            navigation.navigate('Inside');
        } catch(error) {
            console.log(error);
            alert('Sign in failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../Image/title.webp')} style={styles.image}/>
            <Text style={styles.title}>DietApp - Twoja aplikacja do spersonalizowanej diety</Text>
            <KeyboardAvoidingView behavior='padding' style={styles.form}>
                <TextInput 
                value={email} 
                style={styles.input} 
                placeholder='Email' 
                autoCapitalize='none' 
                onChangeText={text => setEmail(text)}
                />
                <TextInput 
                value={password} 
                style={styles.input} 
                placeholder='Hasło' 
                autoCapitalize='none' 
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
                />

                {loading ? (
                    <ActivityIndicator size='large' color='#4C9A70' />
                ) : (
                    <>
                        <View style={styles.button}>
                            <Button title='Zaloguj' onPress={signIn} color='#4C9A70' />
                        </View>
                        <View style={styles.button}>
                            <Button title='Zarejestruj' onPress={() => navigation.navigate('SignUp')} color='#A8D5BA' />
                        </View>
                    </>
                )}
            </KeyboardAvoidingView>
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
    form: {
        width: '100%',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20, // Zmniejszony margines, aby dostosować się do obrazka
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
    },
    button: {
        marginTop: 10,
        color: '#FFFFFF',
    },
    image: {
        marginBottom: 20, // Dodany margines, aby oddzielić obrazek od tekstu
        width: 300, // Ustaw szerokość obrazka
        height: 150, // Ustaw wysokość obrazka
        resizeMode: 'contain', // Zapewnia, że obrazek będzie skalowany w odpowiedni sposób
    }
});

export default Login;
