import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged } from 'firebase/auth'; // Changed import to include onAuthStateChanged
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'; // Import for Google sign-in
import { auth } from '../config/firebase';
import { themeColors } from '../theme';
import { Feather } from '@expo/vector-icons'; 
import VerificationComponent from './VerificationComponent';


export default function SignUpScreen() {
    const [secureTextEntry, setSecureTextEntry] = useState(true); // State to manage password visibility
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(''); // State to hold email error message
    const [isEmailVerified, setIsEmailVerified] = useState(false); // State to track email verification status

    // Check if the user is already signed in and verified
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user && user.emailVerified) {
                setIsEmailVerified(true);
            }
        });

        return () => unsubscribe();
    }, []);
    const handleSignUp = async () => {
        if (email && password) {
            if (!validateEmail(email)) {
                setEmailError('Invalid email address');
                return;
            }
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                // Update user's display name and email
                const user = userCredential.user;
                await user.updateProfile({
                    displayName: name,
                });
                // Send verification email
                await sendEmailVerification(auth.currentUser);
                console.log('Verification email sent.');
                // Optionally, you can redirect the user to a screen indicating that the verification email has been sent.
            } catch (error) {
                console.log('Error: ', error.message);
            }
        }
    };
    const handleGoogleSignUp = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            console.log('Google Sign In Successful!', result.user);
        } catch (error) {
            console.log('Error: ', error.message);
        }
    };

    // Function to validate email format
    const validateEmail = (email) => {
        // Regular expression for validating email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Redirect user to the next screen if email is verified
    useEffect(() => {
        if (isEmailVerified) {
            navigation.navigate('HomeScreen'); // Replace 'NextScreen' with the name of your next screen
        }
    }, [isEmailVerified]);

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: themeColors.bg }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <View className="flex-row justify-start mt-4">
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
                        >
                            <ArrowLeftIcon size="20" color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Image source={require('../assets/images/welcome.png')} style={{ width: 150, height: 150 }} />
                    </View>
                </SafeAreaView>
                <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 20, borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>
                    <View style={{ marginVertical: 20 }}>
                        <Text style={{ color: 'gray', marginLeft: 20 }}>Full Name</Text>
                        <TextInput
                            style={{ backgroundColor: '#F3F4F6', padding: 20, borderRadius: 20, marginBottom: 10 }}
                            value={name}
                            onChangeText={value => setName(value)}
                            placeholder='Enter Name'
                        />

                        <Text style={{ color: 'gray', marginLeft: 20 }}>Email Address</Text>
                        <TextInput
                            style={{ backgroundColor: '#F3F4F6', padding: 20, borderRadius: 20, marginBottom: 10 }}
                            value={email}
                            onChangeText={value => setEmail(value)}
                            placeholder='Enter Email'
                        />
                        {emailError ? <Text style={{ color: 'red', marginLeft: 20 }}>{emailError}</Text> : null}

                    <View style={{ position: 'relative' }}>
                        <TextInput
                            style={{ backgroundColor: '#F3F4F6', padding: 20, borderRadius: 20, marginBottom: 10 }}
                            secureTextEntry={secureTextEntry}
                            keyboardType='numeric'
                            placeholder="Enter Password"
                            value={password}
                            onChangeText={value => setPassword(value)}
                        />
                        <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)} style={{ position: 'absolute', right: 20, top: 20 }}>
                            <Feather name={secureTextEntry ? 'eye' : 'eye-off'} size={24} color='black' />
                        </TouchableOpacity>
                    </View>


                        <TouchableOpacity
                            style={{ backgroundColor: '#FFD700', paddingVertical: 15, borderRadius: 20 }}
                            onPress={handleSignUp}
                        >
                            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#4B5563' }}>Sign Up</Text>
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                            <Text style={{ color: 'gray', fontWeight: 'bold' }}>Already have an account?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={{ fontWeight: 'bold', color: '#FFD700' }}> Login</Text>
                            </TouchableOpacity>
                        </View>

                    <Text style={{ fontSize: 20, color: 'gray', fontWeight: 'bold', textAlign: 'center', marginTop: 20 }}>Or</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                        <TouchableOpacity 
                            style={{
                                padding: 10,
                                backgroundColor: '#FFFFFF',
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: '#000000',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                            onPress={handleGoogleSignUp}
                        >
                            <Image source={require('../assets/icons/google.png')} style={{ width: 24, height: 24, marginRight: 10 }} />
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#555555' }}>Continue with Google</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
