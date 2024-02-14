//ServicesScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

const ServicesScreen = () => {
  const navigation = useNavigation();
  const Prov_Requirement = () => {
    // Navigate to the ServiceProviderFormScreen when the button is pressed
    navigation.navigate("Prov_Requirement");
  };
  const [profileImage, setProfileImage] = useState(
    require("../assets/images/logoo.png")
  );

  const servicesData = [
    { id: '1', name: 'BeautySaloonScreen', displayName: 'Beauty Saloon', icon: require('../assets/icons/beauty.png') },
    { id: '2', name: 'ClinicalScreen', displayName: 'Clinical', icon: require('../assets/icons/clinical.png') },
    { id: '3', name: 'MaintenanceScreen', displayName: 'Maintenance', icon: require('../assets/icons/maintenance.png') },
    { id: '4', name: 'ShiftingScreen', displayName: 'Shifting', icon: require('../assets/icons/shifting.png') },
    { id: '6', name: 'SolarScreen', displayName: 'Solar', icon: require('../assets/icons/solar.png') },
    { id: '7', name: 'CleaningScreen', displayName: 'Cleaning', icon: require('../assets/icons/clean.png') },
    { id: '8', name: 'CateringScreen', displayName: 'Event Organization', icon: require('../assets/icons/wedding.png') },
    { id: '9', name: 'GardeningScreen', displayName: 'Gardening', icon: require('../assets/icons/garden.png') },
    { id: '11', name: 'SecurityScreen', displayName: 'Security', icon: require('../assets/icons/security.png') },
    { id: '12', name: 'WashingScreen', displayName: 'Vehicle Maintenance', icon: require('../assets/icons/vechile.png') },
    { id: '13', name: 'WashingScreen', displayName: 'HomeCare Solutions', icon: require('../assets/icons/shield.png') },
    // Add more service data as needed
  ];

  const renderServiceBlock = (service) => (
    <TouchableOpacity
      key={service.id}
      style={styles.serviceBlock}
      onPress={() => {
        console.log(`Navigating to ${service.name}`);
        navigation.navigate(service.name);
      }}
    >
      <Image source={service.icon} style={styles.serviceIcon} />
      <Text style={styles.serviceName}>{service.displayName}</Text>
    </TouchableOpacity>
  );

  const handleProfileClick = () => {
    // Handle profile picture click to show preview
    // For simplicity, it will toggle between two images
    const newProfileImage =
      profileImage === require("../assets/images/logoo.png")
        ? require("../assets/images/logoo.png")
        : require("../assets/images/logoo.png");
    setProfileImage(newProfileImage);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* Hamburger Menu */}
        <TouchableOpacity
          style={styles.hamburgerMenu}
          onPress={() => navigation.openDrawer()}
        >
          <FontAwesome5 name="bars" size={24} color="black" />
        </TouchableOpacity>

        {/* Profile Picture */}
        <TouchableOpacity onPress={handleProfileClick}>
          <Image source={profileImage} style={styles.profileImage} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Your logo image */}
        <Image
          source={require("../assets/images/logoo.png")}
          style={styles.logoImage}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("UserDashboard")}
          style={{
            backgroundColor: "#FFD700",
            padding: 15,
            borderRadius: 10,
            alignItems: "center",
            marginTop: 20,
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
            Deals
          </Text>
        </TouchableOpacity>
        <View style={styles.gridContainer}>
          {servicesData.map((service) => renderServiceBlock(service))}
        </View>
      </ScrollView>

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
          <FontAwesome5 name="user" size={24} color="black" />
          <Text style={styles.footerText}>My Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <FontAwesome5 name="book" size={24} color="black" />
          <Text style={styles.footerText}>Bookings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ///////
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: 160,
    height: 100,
    resizeMode: "contain",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  gridContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
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
  serviceBlock: {
    width: "40%",
    aspectRatio: 1,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000000",
  },
  serviceIcon: {
    width: "50%",
    height: "50%",
    resizeMode: "contain",
  },
  serviceName: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  hamburgerMenu: {
    padding: 5,
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

export default ServicesScreen;