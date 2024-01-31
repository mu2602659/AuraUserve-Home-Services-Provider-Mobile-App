import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook

const BeautySaloonScreen = () => {
  const navigation = useNavigation(); // Use the useNavigation hook to get the navigation object


  const BeautySaloonData = [
    { id: '1', name: 'BeautySaloonScreen', displayName: 'HairCut', icon: require('../assets/icons/hair-cutting.png') },
    { id: '2', name: 'ClinicalScreen', displayName: 'Beard Setting', icon: require('../assets/icons/beard.png') },
    { id: '3', name: 'MaintenanceScreen', displayName: 'Facial-Treatment', icon: require('../assets/icons/facial-treatment.png') },
    { id: '4', name: 'ShiftingScreen', displayName: 'MakeUp', icon: require('../assets/icons/make.png') },
    { id: '5', name: 'PestControlScreen', displayName: 'Body Massage', icon: require('../assets/icons/massage.png') },
    { id: '6', name: 'SolarScreen', displayName: 'Pedicures', icon: require('../assets/icons/pedicure.png') },
    { id: '7', name: 'CleaningScreen', displayName: 'Body Wax', icon: require('../assets/icons/waxing.png') },
    { id: '8', name: 'CateringScreen', displayName: 'Hair Treatment', icon: require('../assets/icons/boy-hair-shape.png') },
    { id: '9', name: 'GardeningScreen', displayName: 'Mehndi', icon: require('../assets/icons/henna.png') },
    { id: '10', name: 'RenovationScreen', displayName: 'Nail Art', icon: require('../assets/icons/nail-polish.png') },
    { id: '11', name: 'SecurityScreen', displayName: 'Hair Extensions', icon: require('../assets/icons/extensions.png') },
    { id: '12', name: 'WashingScreen', displayName: 'Eyelash Extensions', icon: require('../assets/icons/eyelash.png') },
    // Add more services as needed
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
      <ScrollView>
        <View style={styles.header}>
          {/* Your logo image goes here */}
          <Image source={require('../assets/images/logoo.png')} style={styles.logoImage} />
        </View>
        <View style={styles.gridContainer}>
          {BeautySaloonData.map((service) => renderServiceBlock(service))}
        </View>
        <TouchableOpacity
        style={{ paddingVertical: 15, backgroundColor: "#FFD700", marginHorizontal: 160, marginVertical: 10, borderRadius: 10 }}
          onPress={() => {
            console.log("Navigating to Booking Page");
            navigation.navigate('BookingScreen');
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center", color: "#555555" }}>Book Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    alignItems: 'center',
    padding: 16,
  },
  logoImage: {
    width: 190,
    height: 120,
    resizeMode: 'contain',
    borderTopLeftRadius: 40, // Adjust the value as needed
    borderBottomRightRadius: 40, // Adjust the value as needed
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 8,
  },
  serviceBlock: {
    width: '40%',
    aspectRatio: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000000',
  },
  serviceIcon: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
  },
  serviceName: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BeautySaloonScreen;
