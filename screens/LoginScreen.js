import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'; // Import GoogleAuthProvider
import { auth } from '../config/firebase';
import { themeColors } from '../theme';





////////////////////////////////////////////////////////////////

export default function LoginScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        if (email && password) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
            } catch (error) {
                console.log('Error: ', error.message);
            }
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            // You can access the signed-in user with result.user
            console.log('Google Sign In Successful!', result.user);
        } catch (error) {
            console.log('Error: ', error.message);
        }
    };

    return (
        <View className="flex-1 bg-white" style={{ backgroundColor: themeColors.bg }}>
            <SafeAreaView className="flex">
                <View className="flex-row justify-start mt-4">
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
                    >
                        <ArrowLeftIcon size="20" color="black" />
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-center">
                    <Image source={require('../assets/images/welcome.png')} style={{ width: 150, height: 150 }} />
                </View>
            </SafeAreaView>
            <View
                style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
                className="flex-1 bg-white px-8 pt-8">
                <View className="form space-y-2">
                    <Text className="text-gray-700 ml-4">Email Address</Text>
                    <TextInput
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                        placeholder="email"
                        value={email}
                        onChangeText={value => setEmail(value)}
                    />
                    <Text className="text-gray-700 ml-4">Password</Text>
                    <TextInput
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
                        secureTextEntry
                        placeholder="password"
                        value={password}
                        onChangeText={value => setPassword(value)}
                    />
                    <TouchableOpacity className="flex items-end">
                        <Text className="text-gray-700 mb-5">Forgot Password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleSubmit}
                        className="py-3 bg-yellow-400 rounded-xl">
                        <Text
                            className="text-xl font-bold text-center text-gray-700"
                        >
                            Login
                        </Text>
                    </TouchableOpacity>

                </View>
                <Text className="text-xl text-gray-700 font-bold text-center py-5">Or</Text>
                <View className="flex-row justify-center space-x-12">
                    <TouchableOpacity
                        onPress={handleGoogleSignIn}
                        style={{
                            padding: 10,
                            backgroundColor: '#FFFFFF',
                            borderRadius: 8,
                            borderWidth: 1,
                            borderColor: '#000000',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            source={require('../assets/icons/google.png')}
                            style={{ width: 24, height: 24, marginRight: 10 }}
                        />
                        <Text
                            style={{fontSize: 16,fontWeight: 'bold', color: '#555555',
                            }}
                        >
                            Continue with Google
                        </Text>
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-center mt-7">
                    <Text className="text-gray-500 font-semibold">
                        Don't have an account?
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text className="font-semibold text-yellow-500"> Sign Up</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>

    )
}
