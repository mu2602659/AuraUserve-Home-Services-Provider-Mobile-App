import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";

const HomeScreen = () => {
  const [userName, setUserName] = useState("");
  const [profileImage, setProfileImage] = useState(require("../assets/images/logoo.png"));
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

  const handleProfileClick = () => {
    const newProfileImage =
      profileImage === require("../assets/images/logoo.png")
        ? require("../assets/images/logoo.png")
        : require("../assets/images/logoo.png");
    setProfileImage(newProfileImage);
  };

  const Prov_Requirement = () => {
    // Navigate to the ServiceScreenProviderForm when the button is pressed
    navigation.navigate("Prov_Requirement");
  };

  // Services Data
  const servicesData = [
    { id: '1', name: 'BeautySaloon', displayName: 'Beauty Saloon', icon: require('../assets/icons/beauty.png') },
    { id: '2', name: 'Clinical', displayName: 'Clinical', icon: require('../assets/icons/clinical.png') },
    { id: '3', name: 'Maintenance', displayName: 'Maintenance', icon: require('../assets/icons/maintenance.png') },
    { id: '4', name: 'Shifting', displayName: 'Shifting', icon: require('../assets/icons/shifting.png') },
    { id: '5', name: 'Solar', displayName: 'Solar', icon: require('../assets/icons/solar.png') },
    { id: '6', name: 'Cleaning', displayName: 'Cleaning', icon: require('../assets/icons/clean.png') },
    { id: '7', name: 'Catering', displayName: 'Event Organization', icon: require('../assets/icons/wedding.png') },
    { id: '8', name: 'Gardening', displayName: 'Gardening', icon: require('../assets/icons/garden.png') },
    { id: '9', name: 'Security', displayName: 'Security', icon: require('../assets/icons/security.png') },
    { id: '10', name: 'Washing', displayName: 'Vehicle Maintenance', icon: require('../assets/icons/vechile.png') },
    { id: '11', name: 'HomeCare', displayName: 'HomeCare Solutions', icon: require('../assets/icons/shield.png') },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <HeaderComponent 
          userName={userName} 
          profileImage={profileImage} 
          handleProfileClick={handleProfileClick} // Pass handleProfileClick function to HeaderComponent
          navigation={navigation} 
        />

        {/* Our Services and See All Link */}
        <View style={styles.content}>
          <View style={styles.servicesHeader}>
            <Text style={styles.ourServicesText}>Our Services</Text>
            <TouchableOpacity
              style={styles.seeAllLink}
              onPress={() => navigation.navigate("Services")}
            >
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
            {/* Services */}
            {servicesData.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={styles.serviceBlock}
                onPress={() => navigation.navigate(service.name)} // Navigate to service screen
              >
                <Image source={service.icon} style={styles.serviceIcon} />
                <Text style={styles.serviceName}>{service.displayName}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <FooterComponent Prov_Requirement={Prov_Requirement} handleLogout={handleLogout} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
  },
  seeAllLink: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555555",
  },
  servicesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 16,
  },
  ourServicesText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  servicesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  serviceBlock: {
    alignItems: "center",
    marginHorizontal: 8,
    marginVertical: 16,
  },
  serviceIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  serviceName: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HomeScreen;
