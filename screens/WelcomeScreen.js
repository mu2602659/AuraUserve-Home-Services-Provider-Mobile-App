import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
    const navigation = useNavigation();

    const handleUser = () => {
        // Navigate to UserScreen.js
        navigation.navigate('UserScreen');
    };

    const handleServiceProvider = () => {
        // Navigate to ServiceProviderScreen.js
        navigation.navigate('ServiceProviderScreen');
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require("../assets/images/background.jpg")} // Specify your background image path
                style={{ flex: 1, resizeMode: 'cover' }}
            >
                <View style={{ flex: 1, justifyContent: 'space-around', marginVertical: 4 }}>
                    <Text
                        style={{ color: 'white', fontWeight: 'bold', fontSize: 36, textAlign: 'center' }}
                    >
                        Let's Get Started!
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Image source={require("../assets/images/welcome.png")} style={{ width: 200, height: 200 }} />
                    </View>
                    <View style={{ spaceY: 4 }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('User')}
                            style={{ paddingVertical: 15, backgroundColor: '#FFD700', marginHorizontal: 20, marginVertical: 8, borderRadius: 10 }}
                        >
                            <Text
                                style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: '#555555' }}
                            > User
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ServiceProvider')}
                            style={{ paddingVertical: 15, backgroundColor: '#FFD700', marginHorizontal: 20, marginVertical: 8, borderRadius: 10 }}
                        >
                            <Text
                                style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: '#555555' }}
                            >Service Provider
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}
