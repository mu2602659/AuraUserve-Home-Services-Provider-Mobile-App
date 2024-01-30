import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import React from 'react'

import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import WelcomeScreen from "./WelcomeScreen";


export default function HomeScreen() {
  const handleLogout = async ()=>{
    await signOut(auth);
  }

  const navigation = useNavigation();
  const handleUser = () => {
    // Navigate to UserScreen.js
    navigation.navigate("UserScreen");
  };

  const handleServiceProvider = () => {
    // Navigate to ServiceProviderScreen.js
    navigation.navigate("ServiceProviderScreen");
  };

  const handleExploreOurServices = () => {
    navigation.navigate("ServicesScreen");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/images/background.jpg")} // Specify your background image path
        style={{ flex: 1, resizeMode: "cover" }}
      >
        <View
          style={{ flex: 1, justifyContent: "space-around", marginVertical: 4 }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 36,
              textAlign: "center",
            }}
          >
            Let's Get Started!
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Image
              source={require("../assets/images/welcome.png")}
              style={{ width: 200, height: 200 }}
            />
          </View>
          <View style={{ spaceY: 4 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Services")}
              style={{
                paddingVertical: 15,
                backgroundColor: "#FFD700",
                marginHorizontal: 20,
                marginVertical: 8,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "#555555",
                }}
              >
                {" "}
                User
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("ServiceProvider")}
              style={{
                paddingVertical: 15,
                backgroundColor: "#FFD700",
                marginHorizontal: 20,
                marginVertical: 8,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "#555555",
                }}
              >
                Service Provider
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={handleLogout} className="p-1 bg-red-400 rounded-lg">
        <Text className="text-white text-lg font-bold">Logout</Text>
      </TouchableOpacity>
      </ImageBackground>

      
    </SafeAreaView>
  );
}
