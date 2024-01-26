import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import UserScreen from './screens/UserScreen';
import ServiceProviderScreen from './screens/ServiceProviderScreen';
import ServicesScreen from './screens/ServicesScreen';
import BeautySaloonScreen from './screens/BeautySaloonScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import Prov_Requirement from './screens/Prov_Requirement';
import ProviderForm from './screens/ProviderForm';

// Import other screens
import CateringScreen from './screens/CateringScreen';
import MaintenanceScreen from './screens/MaintenanceScreen';
import ShiftingScreen from './screens/ShiftingScreen';
import SolarScreen from './screens/SolarScreen';
import RenovationScreen from './screens/RenovationScreen';
import SecurityScreen from './screens/SecurityScreen';
import PestControlScreen from './screens/PestControlScreen';
import GardeningScreen from './screens/GardeningScreen';
import ClinicalScreen from './screens/ClinicalScreen';
import WashingScreen from './screens/WashingScreen';
import CleaningScreen from './screens/CleaningScreen';

const Stack = createNativeStackNavigator();
const ServicesStack = createNativeStackNavigator();

const ServicesStackNavigator = () => (
  <ServicesStack.Navigator>
      <ServicesStack.Screen name="ServicesScreen" component={ServicesScreen} />
    <ServicesStack.Screen name="BeautySaloonScreen" component={BeautySaloonScreen} />
    <ServicesStack.Screen name="CateringScreen" component={CateringScreen} />
    <ServicesStack.Screen name="MaintenanceScreen" component={MaintenanceScreen} />
    <ServicesStack.Screen name="ShiftingScreen" component={ShiftingScreen} />
    <ServicesStack.Screen name="SolarScreen" component={SolarScreen} />
    <ServicesStack.Screen name="RenovationScreen" component={RenovationScreen} />
    <ServicesStack.Screen name="SecurityScreen" component={SecurityScreen} />
    <ServicesStack.Screen name="PestControlScreen" component={PestControlScreen} />
    <ServicesStack.Screen name="GardeningScreen" component={GardeningScreen} />
    <ServicesStack.Screen name="ClinicalScreen" component={ClinicalScreen} />
    <ServicesStack.Screen name="WashingScreen" component={WashingScreen} />
    <ServicesStack.Screen name="CleaningScreen" component={CleaningScreen} />
    {/* Add more screens for the nested navigation if needed */}
  </ServicesStack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
        <Stack.Screen name="Welcome" options={{ headerShown: false }} component={WelcomeScreen} />
        <Stack.Screen name="User" options={{ headerShown: false }} component={UserScreen} />
        <Stack.Screen name="ServiceProvider" options={{ headerShown: false }} component={ServiceProviderScreen} />
        <Stack.Screen name="Prov_Requirement" options={{ headerShown: false }} component={Prov_Requirement} />
        <Stack.Screen name="ProviderForm" options={{ headerShown: false }} component={ProviderForm} />
        <Stack.Screen name="Services" options={{ headerShown: false }} component={ServicesStackNavigator} />
        <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
        <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
