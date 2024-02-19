import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// Import screens
import HomeScreen from './screens/HomeScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import UserScreen from './screens/UserScreen';
import ServiceProviderScreen from './screens/--ServiceProviderScreen';
import ServicesScreen from './screens/ServicesScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import Prov_Requirement from './screens/Prov_Requirement';
import ProviderForm from './screens/ProviderForm';
import BookingScreen from './screens/BookingScreen';

// Import other services
import BeautySaloonScreen from './Services/BeautySaloonScreen';
import CateringScreen from './Services/CateringScreen';
import MaintenanceScreen from './Services/MaintenanceScreen';
import ShiftingScreen from './Services/ShiftingScreen';
import SolarScreen from './Services/SolarScreen';
import RenovationScreen from './Services/RenovationScreen';
import SecurityScreen from './Services/SecurityScreen';
import PestControlScreen from './Services/PestControlScreen';
import GardeningScreen from './Services/GardeningScreen';
import ClinicalScreen from './Services/ClinicalScreen';
import WashingScreen from './Services/WashingScreen';
import HomeCareScreen from './Services/HomeCareScreen'
import CleaningScreen from './Services/CleaningScreen';

//import Dashboard
import Prvdr_Dashboard from './Dashboards/Prvdr_Dashboard';
import User_Dashboard from './Dashboards/User_Dashboard';

import useAuth from './hooks/useAuth';



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
    <ServicesStack.Screen name="Renovation" component={RenovationScreen} />
    <ServicesStack.Screen name="Security" component={SecurityScreen} />
    <ServicesStack.Screen name="PestControl" component={PestControlScreen} />
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
            {/* Add other screens for authenticated users here */}
          </>
        ) : (
          <>
            <Stack.Screen name="Welcome" options={{ headerShown: false }} component={WelcomeScreen} />
            <Stack.Screen name="User" options={{ headerShown: false }} component={UserScreen} />
            <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
            <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUpScreen} />
          </>
        )}
        {/* Common screens */}
        <Stack.Screen name="ServiceProvider" options={{ headerShown: false }} component={ServiceProviderScreen} />
        <Stack.Screen name="Prov_Requirement" options={{ headerShown: false }} component={Prov_Requirement} />
        <Stack.Screen name="ProviderForm"  component={ProviderForm} />
        <Stack.Screen name="Services" options={{ headerShown: false }} component={ServicesStackNavigator} />

        <Stack.Screen name="PrvdrDashboard" component={Prvdr_Dashboard} />
        <Stack.Screen name="UserDashboard" component={User_Dashboard} />


       {/* <Stack.Screen name="Services" component={ServicesScreen} />
        <Stack.Screen name="MyBookings" component={MyBookingsScreen} />
        <Stack.Screen name="MyPreviousDeals" component={MyPreviousDealsScreen} />
        <Stack.Screen name="JobOpportunities" component={JobOpportunitiesScreen} />
        <Stack.Screen name="MyOrders" component={MyOrdersScreen} />
        <Stack.Screen name="Logout" component={LogoutScreen} />*/}
      </Stack.Navigator>


       


    </NavigationContainer>
  );
}
