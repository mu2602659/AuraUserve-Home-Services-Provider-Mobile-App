import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';

const MaintenanceScreen = () => {

  const MaintenanceData = [
    { id: '1', name: 'BeautySaloonScreen', displayName: 'Electric Services', icon: require('../assets/icons/electrical-service.png') },
    { id: '2', name: 'MaintenanceScreen', displayName: 'Roofing services', icon: require('../assets/icons/roof.png') },
    { id: '3', name: 'PestControlScreen', displayName: 'Flooring Services', icon: require('../assets/icons/floor.png') },
    { id: '4', name: 'CleaningScreen', displayName: 'Appliance Repair', icon: require('../assets/icons/electric-appliance.png') },
    { id: '5', name: 'CateringScreen', displayName: 'AC Maintenance', icon: require('../assets/icons/air-conditioner.png') },
    { id: '6', name: 'BeautySaloonScreen', displayName: 'House Renovation', icon: require('../assets/icons/revo.png') },
    { id: '7', name: 'PestControlScreen', displayName: 'Interior Painting and Wallpapering', icon: require('../assets/icons/wallpaper.png') },
    { id: '8', name: 'SolarScreen', displayName: 'Windows and Doors Replacement', icon: require('../assets/icons/window.png') },
    { id: '9', name: 'PestControlScreen', displayName: 'Aluminium, Glass', icon: require('../assets/icons/aluminium.png') },
    { id: '10', name: 'SolarScreen', displayName: 'Welding', icon: require('../assets/icons/welding.png') },
  
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
