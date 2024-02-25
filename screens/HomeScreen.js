import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import WelcomeScreen from "./WelcomeScreen";
import ServicesScreen from "./ServicesScreen";

const HomeScreen = () => {
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

  const Prov_Requirement = () => {
    // Navigate to the ServiceScreenProviderForm when the button is pressed
    navigation.navigate("Prov_Requirement");
  };
const handleExploreOurServices = () => {
    navigation.navigate("ServicesScreen");
  };

  const [profileImage, setProfileImage] = useState(
    require("../assets/images/logoo.png")
  );

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

  const handleProfileClick = () => {
    const newProfileImage =
      profileImage === require("../assets/images/logoo.png")
        ? require("../assets/images/logoo.png")
        : require("../assets/images/logoo.png");
    setProfileImage(newProfileImage);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Header section */}
        <View style={styles.header}>
          {/* Welcome Message with User Name */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/* Profile Picture */}
            <TouchableOpacity onPress={handleProfileClick}>
              <Image source={profileImage} style={styles.profileImage} />
            </TouchableOpacity>
            <Text style={{ fontSize: 16, marginLeft: 8 }}>Welcome, {userName}</Text>
          </View>

          {/* Cart Icon */}
          <TouchableOpacity onPress={() => {/* Add your cart functionality */}}>
            <FontAwesome5 name="shopping-cart" size={24} color="black" />
          </TouchableOpacity>

          {/* Hamburger Menu */}
          <TouchableOpacity
            style={styles.hamburgerMenu}
            onPress={() => navigation.openDrawer()}
          >
            <FontAwesome5 name="bars" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Our Services and See All Link */}
        <View style={styles.servicesHeader}>
          <Text style={styles.ourServicesText}>Our Services</Text>
          <TouchableOpacity
            style={styles.seeAllLink}
            onPress={() => navigation.navigate("Services")}
          >
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.servicesContainer}>
          <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
            {/* Services */}
            {servicesData.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={styles.serviceBlock}
                onPress={() => handleServicesClick(service)}
              >
                <Image source={service.icon} style={styles.serviceIcon} />
                <Text style={styles.serviceName}>{service.displayName}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem}>
          <FontAwesome5 name="home" size={24} color="black" />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={Prov_Requirement} style={styles.footerItem}>
          <FontAwesome5 name="briefcase" size={24} color="black" />
          <Text style={styles.footerText}>Job Opportunities</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.footerItem}>
          <FontAwesome5 name="book" size={24} color="black" />
          <Text style={styles.footerText}>Bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <FontAwesome5 name="user" size={24} color="black" />
          <Text style={styles.footerText}>My Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.footerItem}>
          <FontAwesome5 name="sign-out-alt" size={24} color="black" />
          <Text style={styles.footerText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  profileImage: {
    width: 40,
    height: 40,
    resizeMode: "cover",
    borderRadius: 20,
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
  hamburgerMenu: {
    padding: 5,
    marginLeft: -103,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#F5F5F5",
  },
  footerItem: {
    alignItems: "center",
  },
  footerText: {
    marginTop: 5,
    fontSize: 12,
  },
});

export default HomeScreen;
