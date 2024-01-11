import { View, Text, StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_AUTH } from '../Config/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
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

    // const signUp = async () => {
    //     setLoading(true);
    //     try {
    //         const response = await createUserWithEmailAndPassword(auth, email, password);
    //         console.log(response);
    //         alert('Check your emails!');
    //     } catch(error) {
    //         console.log(error);
    //         alert('Sign in failed: ' + error.message);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior='padding'>
                <TextInput 
                value={email} 
                style={styles.input} 
                placeholder='Email' 
                autoCapitalize='none' 
                onChangeText={text => setEmail(text)}
                >   
                </TextInput>
                <TextInput 
                value={password} 
                style={styles.input} 
                placeholder='Password' 
                autoCapitalize='none' 
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
                >   
                </TextInput>

                { loading ? <ActivityIndicator size='large' color='#0000ff' /> 
                : <>
                <View style={styles.button}>
                    <Button title='Login' onPress={signIn} />
                </View>
                <View style={styles.button}>
                    <Button title='Register' onPress={() => navigation.navigate('SignUp')} style={styles.button} />
                </View>
                </>}
            </KeyboardAvoidingView>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        justifyContent: 'center',
    },
    input: {
        height: 50,
        marginVertical: 4,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff',
    },
    button: {
        marginTop: 5,
        marginBottom: 5,
    }
});