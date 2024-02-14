import React, { useState, useEffect } from "react";
import {View,Text,TouchableOpacity,ImageBackground,Image,} from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import WelcomeScreen from "./WelcomeScreen";
import Icon from "react-native-vector-icons/Ionicons";

export default function HomeScreen() {
  const [userName, setUserName] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch user's name from authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        setUserName(user.displayName);
      } else {
        // No user is signed in.
        setUserName("");
      }
    });

    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleUser = () => {
    navigation.navigate("UserScreen");
  };

  const handleServiceProvider = () => {
    navigation.navigate("ServiceProviderScreen");
  };

  const handleExploreOurServices = () => {
    navigation.navigate("ServicesScreen");
  };

  const Prov_Requirement = () => {
    // Navigate to the ServiceProviderFormScreen when the button is pressed
    navigation.navigate("Prov_Requirement");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 8,
          backgroundColor: "#333333",
        }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>
          Welcome, {userName}
        </Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={{ color: "white", fontSize: 16 }}>Logout</Text>
        </TouchableOpacity>
      </View>
      <ImageBackground
        source={require("../assets/images/background.jpg")}
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
            Welcome!
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
                User
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={Prov_Requirement}
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
      </ImageBackground>
      {/* Taskbar */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "#333333",
          paddingVertical: 12,
        }}
      >
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => navigation.navigate("Home")}
        >
          <Icon name="home-outline" size={24} color="white" />
          <Text style={{ color: "white", fontSize: 14, marginTop: 4 }}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => navigation.navigate("MyOrders")}
        >
          <Icon name="clipboard-outline" size={24} color="white" />
          <Text style={{ color: "white", fontSize: 14, marginTop: 4 }}>
            My Orders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => navigation.navigate("MyProfile")}
        >
          <Icon name="person-outline" size={24} color="white" />
          <Text style={{ color: "white", fontSize: 14, marginTop: 4 }}>
            My Profile
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
