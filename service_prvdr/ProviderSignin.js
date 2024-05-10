import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Alert, ImageBackground, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { themeColors } from '../theme';

// Import your custom back arrow icon
import BackArrowIcon from '../assets/back_arrow.png';

export default function ProviderSignin() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // Successfully signed in
            const user = userCredential.user;
            console.log('Signed in user:', user.uid);
            // Navigate to the next screen
            navigation.navigate('NextScreen', { userId: user.uid });
        } catch (error) {
            // Handle sign-in errors
            console.error('Sign-in error:', error.message);
            Alert.alert('Error', 'Failed to sign in. Please check your email and password.');
        }
    };

    return (
            <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
        source={require("../assets/images/background.jpg")}
        style={{ flex: 1, resizeMode: "cover" }}
      >
                {/* Upper back arrow */}
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 20, left: 10 }}>
                    <View style={{ backgroundColor: '#FFD700', borderRadius: 12, padding: 6 }}>
                        <Image source={BackArrowIcon} style={{ width: 24, height: 24, tintColor: 'black' }} />
                    </View>
                </TouchableOpacity>
                {/* Your sign-in UI components */}
                <View style={{ alignItems: 'center', marginTop: 50 }}>
                    <Image source={require('../assets/icon.png')} style={{ width: 150, height: 150 }} />
                </View>
                <View style={{ marginHorizontal: 20, marginTop: 50 }}>
                    <TextInput
                        style={{ backgroundColor: '#F3F4F6', padding: 20, borderRadius: 20, marginBottom: 20 }}
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={{ backgroundColor: '#F3F4F6', padding: 20, borderRadius: 20, marginBottom: 20 }}
                        placeholder="Enter your password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <View style={{flexDirection: "row",justifyContent: "center", alignItems: "center", marginTop:-5, marginBottom:13
              }}>
    <Text style={{ color: 'white', fontWeight: 'bold' }}>
        Want to Become a Service Provider?
    </Text>
    <TouchableOpacity onPress={() => navigation.navigate('Prov_Requirement')}>
        <Text style={{ fontWeight: '600', color: '#FFD700' }}> Sign Up</Text>
    </TouchableOpacity>
</View>

                    <TouchableOpacity
                        onPress={handleSignIn}
                        style={{ backgroundColor: '#FFD700', padding: 20, borderRadius: 20, alignItems: 'center' }}
                    >
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            </SafeAreaView>
    );
}
