import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';

const ServicesScreen = () => {
  const navigation = useNavigation();

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
    { id: '13', name: 'HomeCareScreen', displayName: 'HomeCare Solutions', icon: require('../assets/icons/shield.png') },

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
          {servicesData.map((service) => renderServiceBlock(service))}
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

export default ServicesScreen;