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
    <ServicesStack.Screen name="ServicesScreen" options={{ headerShown: false }} component={ServicesScreen} />
    <ServicesStack.Screen name="BeautySaloon" component={BeautySaloonScreen} />
        <ServicesStack.Screen name="Booking" options={{ headerShown: false }} component={BookingScreen} />

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
  </ServicesStack.Navigator>
);
export default function App() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "Home" : "Welcome"}>
        {user ? (
          <>
            <Stack.Screen name="Home"  component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="BeautySaloon" options={{ title: 'Beauty Saloon' }} component={BeautySaloonScreen}/>
            <Stack.Screen name="Catering" options={{ title: 'Catering' }} component={CateringScreen}/>
            <Stack.Screen name="Cleaning" options={{ title: 'Cleaning' }} component={CleaningScreen}/>
            <Stack.Screen name="Clinical" options={{ title: 'Clinical' }} component={ClinicalScreen}/>
            <Stack.Screen name="Gardening" options={{ title: 'Gardening' }} component={GardeningScreen}/>
            <Stack.Screen name="Solar" options={{ title: 'Solar' }} component={SolarScreen}/>
            <Stack.Screen name="Security" options={{ title: 'Security' }} component={SecurityScreen}/>
            <Stack.Screen name="Washing" options={{ title: 'Washing' }} component={WashingScreen}/>
            <Stack.Screen name="HomeCare" options={{ title: 'HomeCare' }} component={HomeCareScreen}/>
            <Stack.Screen name="Shifting" options={{ title: 'Shifting' }} component={ShiftingScreen}/>
            <Stack.Screen name="Maintenance" options={{ title: 'Maintenance' }} component={MaintenanceScreen}/>

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
        <Stack.Screen name="Prov_Requirement"  component={Prov_Requirement} options={{ title: 'Verify the Requirements' }} />
        <Stack.Screen name="ProviderForm"  component={ProviderForm} options={{ title: 'Fill the Form' }}/>
        <Stack.Screen name="Services" options={{ headerShown: false }} component={ServicesStackNavigator} />
        <Stack.Screen name="myProfile" component={myProfileScreen} options={{ title: 'myProfile' }} />
        <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'Chat Conversation' }} />
        <Stack.Screen name="PrvdrDashboard" component={Prvdr_Dashboard} />
        <Stack.Screen name="UserDashboard" component={User_Dashboard} />

        {/* Add ProviderSignup screen */}
        <Stack.Screen name="ProviderSignup" component={ProviderSignup} options={{ headerShown: false }} />
        <Stack.Screen name="ProviderSignin" component={ProviderSignin} options={{ headerShown: false }} />

        <Stack.Screen name="home" component={HomeScreen} options={{ title: 'home' }} />


        <Stack.Screen name="Login Screen" component={HomeScreen} options={{ title: 'Login sareen' }} />

        <Stack.Screen name="Mongotry" component={Mongotry} options={{ headerShown: false }} />
        <Stack.Screen name="firebase_img" component={firebase_img} />
        <Stack.Screen name="List_images" component={List_images} options={{ title: 'Images List' }}/>
        <Stack.Screen name="List_Users" component={List_Users} options={{ title: 'User List' }}/>
        <Stack.Screen name="welcome" options={{ headerShown: false }} component={WelcomeScreen} />
        <Stack.Screen name="login" options={{ headerShown: false }} component={LoginScreen} />
        <Stack.Screen name="signUp" options={{ headerShown: false }} component={SignUpScreen} />
       
        <Stack.Screen name="NextScreen" component={NextScreen} options={{ title: 'Service Povider' }}/>
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />

        <Stack.Screen name="PostDetails" component={PostDetails} options={{ title: "Post Details" }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}