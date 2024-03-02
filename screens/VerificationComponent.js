import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const VerificationComponent = () => {
    const navigation = useNavigation();

    const handleLogin = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, marginBottom: 20 }}>
                The Email verification link has been sent to your email address. Click on that link to verify.
            </Text>
            <TouchableOpacity onPress={handleLogin} style={{ backgroundColor: '#FFD700', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#4B5563' }}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

export default VerificationComponent;
