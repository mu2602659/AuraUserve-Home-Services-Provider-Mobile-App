import React, { useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useAuth from './hooks/useAuth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';

// Import screens
import HomeScreen from './screens/HomeScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import UserScreen from './screens/UserScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import ServicesScreen from './screens/ServicesScreen';
import myProfileScreen from './screens/myProfileScreen';


// Import Service Provider 
import ProviderSignup from './service_prvdr/ProviderSignup';
import ProviderSignin from './service_prvdr/ProviderSignin';

import NextScreen from './service_prvdr/NextScreen';
import Prov_Requirement from './service_prvdr/Prov_Requirement';
import ProviderForm from './service_prvdr/ProviderForm';
import ChatScreen from './service_prvdr/Chat';
import BookingScreen from './service_prvdr/BookingScreen';
import Mongotry from './service_prvdr/Mongotry';
import firebase_img from './service_prvdr/firebase_img';
import List_images from './service_prvdr/List_images';
import List_Users from './service_prvdr/List_Users';
import EditProfileScreen from './service_prvdr/EditProfileScreen';

// Post integration
import PostDetails from './Posts_integration/PostDetails';


// Import other services
import BeautySaloonScreen from './Services/BeautySaloonScreen';
import CateringScreen from './Services/CateringScreen';
import MaintenanceScreen from './Services/MaintenanceScreen';
import ShiftingScreen from './Services/ShiftingScreen';
import SolarScreen from './Services/SolarScreen';
import SecurityScreen from './Services/SecurityScreen';
import GardeningScreen from './Services/GardeningScreen';
import ClinicalScreen from './Services/ClinicalScreen';
import WashingScreen from './Services/WashingScreen';
import HomeCareScreen from './Services/HomeCareScreen';
import CleaningScreen from './Services/CleaningScreen';

const Stack = createNativeStackNavigator();
const ServicesStack = createNativeStackNavigator();


const ServicesStackNavigator = () => (
  <ServicesStack.Navigator>
    <ServicesStack.Screen name="Booking" component={BookingScreen} options={{ headerShown: false }} />
    <ServicesStack.Screen name="ServicesScreen" component={ServicesScreen} options={{ headerShown: false }}  />
    <ServicesStack.Screen name="BeautySaloon" component={BeautySaloonScreen} options={{ title: 'Beauty Saloon' }} />
    <ServicesStack.Screen name="Maintenance" component={MaintenanceScreen} options={{ title: 'Maintenance' }} />
    <ServicesStack.Screen name="Gardening" component={GardeningScreen} options={{ title: 'Gardening' }} />
    <ServicesStack.Screen name="Catering" component={CateringScreen} options={{ title: 'Catering' }} />
    <ServicesStack.Screen name="Cleaning" component={CleaningScreen} options={{ title: 'Cleaning' }} />
    <ServicesStack.Screen name="Clinical" component={ClinicalScreen} options={{ title: 'Clinical' }} />
    <ServicesStack.Screen name="Security" component={SecurityScreen} options={{ title: 'Security' }} />
    <ServicesStack.Screen name="HomeCare" component={HomeCareScreen} options={{ title: 'HomeCare' }} />
    <ServicesStack.Screen name="Shifting" component={ShiftingScreen} options={{ title: 'Shifting' }} />
    <ServicesStack.Screen name="Washing" component={WashingScreen} options={{ title: 'Washing' }} />
    <ServicesStack.Screen name="Solar" component={SolarScreen} options={{ title: 'Solar' }} />
  </ServicesStack.Navigator>
);
export default function App() {
  const { user } = useAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        // Check user's type here and navigate accordingly
        if (user) {
            if (user.isProvider) {
                // Navigate to Provider's screen
                navigation.navigate('NextScreen');
            } else {
                // Navigate to User's screen
                navigation.navigate('Home');
            }
        } else {
            // Navigate to login screen
            navigation.navigate('Welcome');
        }
    });

    return unsubscribe;
}, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "Home" : "Welcome"}>
        {user ? (
          <>
          {user.isProvider ? (
        <>
          <Stack.Screen name="NextScreen" component={NextScreen} options={{ headerShown: false }} />
          {/* Add other provider screens */}
        </>
      ) : (
        <>
            <Stack.Screen name="Home"  component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="BeautySaloon" component={BeautySaloonScreen} options={{ title: 'Beauty Saloon' }} />
            <Stack.Screen name="Maintenance" component={MaintenanceScreen} options={{ title: 'Maintenance' }} />
            <Stack.Screen name="Gardening" component={GardeningScreen} options={{ title: 'Gardening' }} />
            <Stack.Screen name="Catering" component={CateringScreen} options={{ title: 'Catering' }} />
            <Stack.Screen name="Cleaning" component={CleaningScreen} options={{ title: 'Cleaning' }} />
            <Stack.Screen name="Clinical" component={ClinicalScreen} options={{ title: 'Clinical' }} />
            <Stack.Screen name="Security" component={SecurityScreen} options={{ title: 'Security' }} />
            <Stack.Screen name="HomeCare" component={HomeCareScreen} options={{ title: 'HomeCare' }} />
            <Stack.Screen name="Shifting" component={ShiftingScreen} options={{ title: 'Shifting' }} />
            <Stack.Screen name="Washing" component={WashingScreen} options={{ title: 'Washing' }} />
            <Stack.Screen name="Solar" component={SolarScreen} options={{ title: 'Solar' }} />
            
            </>
      )}
    </>
  ) : (
        <>
        <Stack.Screen name="Welcome"  component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="User"     component={UserScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login"    component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp"   component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NextScreen" component={NextScreen} options={{ headerShown: false }} />

        <Stack.Screen name="ProviderSign"  component={ProviderSignin} options={{ headerShown: false }} />
        </>
        )}
        <Stack.Screen name="Services"      component={ServicesStackNavigator} options={{ title: 'Services' }} />

        <Stack.Screen name="ProviderSignup" component={ProviderSignup} options={{ headerShown: false }} />
        <Stack.Screen name="ProviderSignin" component={ProviderSignin} options={{ headerShown: false }} />
        
        <Stack.Screen name="welcome"  component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="login"    component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="signUp"   component={SignUpScreen} options={{ headerShown: false }} />

        <Stack.Screen name="Prov_Requirement"  component={Prov_Requirement} options={{ title: 'Verify the Requirements' }} />
        <Stack.Screen name="ProviderForm"      component={ProviderForm} options={{ title: 'Fill the Form' }}/>
        <Stack.Screen name="myProfile" component={myProfileScreen} options={{ title: 'myProfile' }} />
        <Stack.Screen name="Chat"      component={ChatScreen} options={{ title: 'Chat Conversation' }} />

        <Stack.Screen name="Mongotry"     component={Mongotry} options={{ headerShown: false }} />


        <Stack.Screen name="List_Users"   component={List_Users} options={{ title: 'Profile Pictures' }}/>
        <Stack.Screen name="PostDetails" component={PostDetails} options={{ title: "Post Details" }} />
        <Stack.Screen name="List_images"  component={List_images} options={{ title: 'Images List' }}/>
        <Stack.Screen name="firebase_img" component={firebase_img} />
       
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}