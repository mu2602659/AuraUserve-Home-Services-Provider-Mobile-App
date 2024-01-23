import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import UserScreen from './screens/UserScreen';
import ServiceProviderScreen from './screens/ServiceProviderScreen';
import ServicesScreen from './screens/ServicesScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import BeautySaloonScreen from './screens/BeautySaloonScreen';
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
import SubServicesScreen from './screens/SubServicesScreen';
import Prov_Requirement from './screens/Prov_Requirement';
import ProviderForm from './screens/ProviderForm';
const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
        <Stack.Screen name="Welcome" options={{headerShown: false}} component={WelcomeScreen} />
        <Stack.Screen name="User" options={{headerShown: false}} component={UserScreen} />
        <Stack.Screen name="ServiceProvider" options={{headerShown: false}} component={ServiceProviderScreen} />
        <Stack.Screen name="Prov_Requirement" options={{headerShown: false}}component={Prov_Requirement} />
        <Stack.Screen name="ProviderForm" options={{ headerShown: false }} component={ProviderForm} />

        <Stack.Screen name="Services" options={{headerShown: false}} component={ServicesScreen} />
        <Stack.Screen name="BeautySaloonScreen" options={{ headerShown: false }} component={BeautySaloonScreen} />
        <Stack.Screen name="CleaningScreen" options={{ headerShown: false }} component={CleaningScreen} />
        <Stack.Screen name="CateringScreen" options={{ headerShown: false }} component={CateringScreen} />
        <Stack.Screen name="WashingScreen" options={{ headerShown: false }} component={WashingScreen} />
        <Stack.Screen name="ClinicalScreen" options={{ headerShown: false }} component={ClinicalScreen} />
        <Stack.Screen name="RenovationScreen" options={{ headerShown: false }} component={RenovationScreen} />
        <Stack.Screen name="SecurityScreen" options={{ headerShown: false }} component={SecurityScreen} />
        <Stack.Screen name="PestControlScreen" options={{ headerShown: false }} component={PestControlScreen} />
        <Stack.Screen name="GardeningScreen" options={{ headerShown: false }} component={GardeningScreen} />
        <Stack.Screen name="MaintenenceScreen" options={{ headerShown: false }} component={MaintenanceScreen} />
        <Stack.Screen name="SolarScreen" options={{ headerShown: false }} component={SolarScreen} />
        <Stack.Screen name="ShiftingScreen" options={{ headerShown: false }} component={ShiftingScreen} />
        <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
        <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}