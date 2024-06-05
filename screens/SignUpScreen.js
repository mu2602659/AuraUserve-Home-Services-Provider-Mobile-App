import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged, updatePhoneNumber } from 'firebase/auth'; // Update import to include updatePhoneNumber
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../config/firebase';
import { themeColors } from '../theme';
import { Feather } from '@expo/vector-icons'; 
import VerificationComponent from './VerificationComponent';

export default function SignUpScreen() {
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isEmailVerified, setIsEmailVerified] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user && user.emailVerified) {
                setIsEmailVerified(true);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleSignUp = async () => {
        if (name && email && password && phoneNumber) {
            if (!validateEmail(email)) {
                setEmailError('Invalid email address');
                return;
            }
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                await user.updateProfile({
                    displayName: name,
                });
                await updatePhoneNumber(user, phoneNumber);
                await sendEmailVerification(auth.currentUser);
                console.log('Verification email sent.');
            } catch (error) {
                console.log('Error: ', error.message);
            }
        } else {
            console.log('All fields are required.');
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

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    useEffect(() => {
        if (isEmailVerified) {
            navigation.navigate('HomeScreen');
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
                        <TextInput
                            style={{ backgroundColor: '#F3F4F6', padding: 20, borderRadius: 20, marginBottom: 10 }}
                            value={name}
                            onChangeText={value => setName(value)}
                            placeholder='Enter Your Full Name'
                        />

                        <TextInput
                            style={{ backgroundColor: '#F3F4F6', padding: 20, borderRadius: 20, marginBottom: 10 }}
                            value={email}
                            onChangeText={value => setEmail(value)}
                            placeholder='Enter Your Email Address'
                        />
                        {emailError ? <Text style={{ color: 'red', marginLeft: 20 }}>{emailError}</Text> : null}

                        <TextInput
                            style={{ backgroundColor: '#F3F4F6', padding: 20, borderRadius: 20, marginBottom: 10 }}
                            value={phoneNumber}
                            onChangeText={value => setPhoneNumber(value)}
                            keyboardType='phone-pad'
                            placeholder='Enter Your Phone Number'
                        />

                        <View style={{ position: 'relative' }}>
                            <TextInput
                                style={{ backgroundColor: '#F3F4F6', padding: 20, borderRadius: 20, marginBottom: 10 }}
                                secureTextEntry={secureTextEntry}
                                keyboardType='numeric'
                                placeholder="Create Your Password"
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
                            <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 15, }}>Already have an account?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={{ fontWeight: 'bold', color: '#FFD700', fontSize: 18, }}> Login</Text>
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
