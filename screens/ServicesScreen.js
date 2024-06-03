import React from "react";
import { View, Text, Image,ImageBackground, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

const ServicesScreen = () => {
  const navigation = useNavigation();
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      <ImageBackground source={require("../assets/images/blackk.jpg")} style={[styles.servicesBackgroundImage, { width: "100%",height:2000,width:'200%', paddingTop:7, paddingTop:7, position: 'absolute' }]}/>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5 name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Services</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      
        
        <View style={styles.gridContainer}>
          {servicesData.map((service) => renderServiceBlock(service))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color:"white",
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
  servicesBackgroundImage: {
    width: "100%", 
    height:700,
    resizeMode: "cover",
    marginTop:"auto",
    
  },
});

export default ServicesScreen;