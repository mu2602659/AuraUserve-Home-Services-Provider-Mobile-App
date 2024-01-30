import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';

const CleaningScreen = () => {

  const CleaningData = [
    { id: '1', name: 'BeautySaloonScreen', displayName: 'Residential Cleaning', icon: require('../assets/icons/house (1).png') },
    { id: '2', name: 'ClinicalScreen', displayName: 'Garden Cleaning', icon: require('../assets/icons/gardener.png') },
    { id: '3', name: 'MaintenanceScreen', displayName: 'Specialty Floor Care', icon: require('../assets/icons/floor.png') },
    { id: '4', name: 'ShiftingScreen', displayName: 'Water Tank', icon: require('../assets/icons/water-tank.png') },
    { id: '5', name: 'PestControlScreen', displayName: 'Curtain Cleaning', icon: require('../assets/icons/curtains.png') },
    { id: '6', name: 'SolarScreen', displayName: 'Sofa Cleaning', icon: require('../assets/icons/sofa.png') },
    { id: '7', name: 'CleaningScreen', displayName: 'Air Duct Cleaning', icon: require('../assets/icons/air duct.png') },
    { id: '8', name: 'CateringScreen', displayName: 'Odor Removal Services', icon: require('../assets/icons/love.png') },
   
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
          {CleaningData.map((service) => renderServiceBlock(service))}
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

export default CleaningScreen;
