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
import Prov_Requirement from './screens/Prov_Requirement';
import ProviderForm from './screens/ProviderForm';
import BookingScreen from './screens/BookingScreen';
import ServicesScreen from './screens/ServicesScreen';
import ChatScreen from './screens/Chat';
import myProfileScreen from './screens/myProfileScreen';


// Import Service Provider Signup
import ProviderSignup from './service_prvdr/ProviderSignup';
import BeautySalon from './service_prvdr/BeautySalon';
import Clinical from './service_prvdr/Clinical';
import Catering from './service_prvdr/Catering';
import Maintenance from './service_prvdr/Maintenance';
import Shifting from './service_prvdr/Shifting';
import Solar from './service_prvdr/Solar';
import Security from './service_prvdr/Security';
import Gardening from './service_prvdr/Gardening';
import Washing from './service_prvdr/Washing';
import HomeCare from './service_prvdr/HomeCare';
import Cleaning from './service_prvdr/Cleaning';

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
            {/* Add other screens for authenticated users here */}
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
        <Stack.Screen name="BeautySalon" component={BeautySalon} options={{ title: 'Beauty Salon' }} />
        <Stack.Screen name="Catering" component={Catering} options={{ title: 'Catering' }} />
        <Stack.Screen name="Maintenance" component={Maintenance} options={{ title: 'Maintenance' }} />
        <Stack.Screen name="Shifting" component={Shifting} options={{ title: 'Shifting' }} />
        <Stack.Screen name="Solar" component={Solar} options={{ title: 'Solar' }} />
        <Stack.Screen name="Security" component={Security} options={{ title: 'Security' }} />
        <Stack.Screen name="Gardening" component={Gardening} options={{ title: 'Gardening' }} />
        <Stack.Screen name="Clinical" component={Clinical} options={{ title: 'Clinical' }} />
        <Stack.Screen name="Washing" component={Washing} options={{ title: 'Washing' }} />
        <Stack.Screen name="HomeCare" component={HomeCare} options={{ title: 'Home Care' }} />
        <Stack.Screen name="Cleaning" component={Cleaning} options={{ title: 'Cleaning' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}