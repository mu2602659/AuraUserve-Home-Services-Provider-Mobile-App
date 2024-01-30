import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';

const MaintenanceScreen = () => {

  const MaintenanceData = [
    { id: '1', name: 'BeautySaloonScreen', displayName: 'Electric Services', icon: require('../assets/icons/electrical-service.png') },
    { id: '2', name: 'ClinicalScreen', displayName: 'Smart Home Integration', icon: require('../assets/icons/timer.png') },
    { id: '3', name: 'MaintenanceScreen', displayName: 'Roofing services', icon: require('../assets/icons/roof.png') },
    { id: '4', name: 'ShiftingScreen', displayName: 'Home Inspection', icon: require('../assets/icons/inspection.png') },
    { id: '5', name: 'PestControlScreen', displayName: 'Flooring Services', icon: require('../assets/icons/floor.png') },
    { id: '6', name: 'SolarScreen', displayName: 'Handyman Service', icon: require('../assets/icons/man.png') },
    { id: '7', name: 'CleaningScreen', displayName: 'Appliance Repair', icon: require('../assets/icons/electric-appliance.png') },
    { id: '8', name: 'CateringScreen', displayName: 'AC Maintenance', icon: require('../assets/icons/air-conditioner.png') },
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
          {MaintenanceData.map((service) => renderServiceBlock(service))}
        </View>
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

export default MaintenanceScreen;
