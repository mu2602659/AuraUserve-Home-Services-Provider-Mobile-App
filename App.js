import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useAuth from './hooks/useAuth';
// Import Dashboards
import Prvdr_Dashboard from './Dashboards/Prvdr_Dashboard';
import User_Dashboard from './Dashboards/User_Dashboard';


// Import screens
import HomeScreen from './screens/HomeScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import UserScreen from './screens/UserScreen';
import LoginScreen from './screens/LoginScreen';
import VerificationComponent from './screens/VerificationComponent';
import SignUpScreen from './screens/SignUpScreen';
import ServicesScreen from './screens/ServicesScreen';
import myProfileScreen from './screens/myProfileScreen';


// Import Service Provider Signup
import ProviderSignup from './service_prvdr/ProviderSignup';
import NextScreen from './service_prvdr/NextScreen';
import Prov_Requirement from './service_prvdr/Prov_Requirement';
import ProviderForm from './service_prvdr/ProviderForm';
import ChatScreen from './service_prvdr/Chat';
import BookingScreen from './service_prvdr/BookingScreen';

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
    <ServicesStack.Screen name="ServicesScreen" options={{ headerShown: false }} component={ServicesScreen} />
    <ServicesStack.Screen name="BeautySaloon" component={BeautySaloonScreen} />
    <ServicesStack.Screen name="Catering" component={CateringScreen} />
    <ServicesStack.Screen name="Maintenance" component={MaintenanceScreen} />
    <ServicesStack.Screen name="Shifting" component={ShiftingScreen} />
    <ServicesStack.Screen name="Solar" component={SolarScreen} />
    <ServicesStack.Screen name="Security" component={SecurityScreen} />
    <ServicesStack.Screen name="Gardening" component={GardeningScreen} />
    <ServicesStack.Screen name="Clinical" component={ClinicalScreen} />
    <ServicesStack.Screen name="Washing" component={WashingScreen} />
    <ServicesStack.Screen name="Cleaning" component={CleaningScreen} />
    <ServicesStack.Screen name="HomeCare" component={HomeCareScreen} />
    <ServicesStack.Screen name="Booking" options={{ headerShown: false }} component={BookingScreen} />
  </ServicesStack.Navigator>
);
export default function App() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "Home" : "Welcome"}>
        {user ? (
          <>
            <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
            <Stack.Screen name="BeautySaloon" options={{ headerShown: false }} component={BeautySaloonScreen} />
          </>
        ) : (
        <>
        <Stack.Screen name="Welcome" options={{ headerShown: false }} component={WelcomeScreen} />
        <Stack.Screen name="User" options={{ headerShown: false }} component={UserScreen} />
        <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
        <Stack.Screen name="VerificationComponent" options={{ headerShown: false }} component={VerificationComponent} />
        <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUpScreen} />
        </>
        )}
        {/* Common screens */}
        <Stack.Screen name="Prov_Requirement" options={{ headerShown: false }} component={Prov_Requirement} />
        <Stack.Screen name="ProviderForm"  component={ProviderForm} />
        <Stack.Screen name="Services" options={{ headerShown: false }} component={ServicesStackNavigator} />
        <Stack.Screen name="PrvdrDashboard" component={Prvdr_Dashboard} />
        <Stack.Screen name="UserDashboard" component={User_Dashboard} />
        <Stack.Screen name="myProfile" component={myProfileScreen} options={{ title: 'myProfile' }} />
        <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'Chat Conversation' }} />

        {/* Add ProviderSignup screen */}
        <Stack.Screen name="ProviderSignup" component={ProviderSignup} options={{ headerShown: false }} />
        <Stack.Screen name="NextScreen" component={NextScreen} options={{ title: 'Next Screen' }} />

       
      </Stack.Navigator>
    </NavigationContainer>
  );
}