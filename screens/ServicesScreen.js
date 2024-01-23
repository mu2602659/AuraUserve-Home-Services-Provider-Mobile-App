import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';

const ServicesScreen = () => {
  const navigation = useNavigation();

  const servicesData = [
    { id: '1', name: 'Beauty Saloon', icon: require('../assets/icons/beauty.png') },
    { id: '2', name: 'Clinical', icon: require('../assets/icons/clinical.png') },
    { id: '3', name: 'Maintenance', icon: require('../assets/icons/maintenance.png') },
    { id: '4', name: 'Shifting', icon: require('../assets/icons/shifting.png') },
    { id: '5', name: 'Pest Control', icon: require('../assets/icons/pestcontrol.png') },
    { id: '6', name: 'Solar', icon: require('../assets/icons/solar.png') },
    { id: '7', name: 'Cleaning', icon: require('../assets/icons/clean.png') },
    { id: '8', name: 'Catering', icon: require('../assets/icons/catering.png') },
    { id: '9', name: 'Gardening', icon: require('../assets/icons/garden.png') },
    { id: '10', name: 'Renovation', icon: require('../assets/icons/renovation.png') },
    { id: '11', name: 'Security', icon: require('../assets/icons/security.png') },
    { id: '12', name: 'Washing', icon: require('../assets/icons/washing.png') },
    // Add more services as needed
  ];

  const navigateToBeautySaloonScreen = () => {
    navigation.navigate('BeautySaloonScreen');
  };

  const navigateToClinicalScreen = () => {
    navigation.navigate('ClinicalScreen');
  };

  const navigateToSolarScreen = () => {
    navigation.navigate('SolarScreen');
  };
  const navigateToPestControlScreen = () => {
    navigation.navigate('PestControlScreen');
  };
  const navigateToGardeningScreen = () => {
    navigation.navigate('GardeningScreen');
  };
  const navigateToRenovationScreen = () => {
    navigation.navigate('RenovationScreen');
  };
  const navigateToSecurityScreen = () => {
    navigation.navigate('SecurityScreen');
  };
  const navigateToShiftingScreen = () => {
    navigation.navigate('ShiftingScreen');
  };
  const navigateToWashingScreen = () => {
    navigation.navigate('WashingScreen');
  };
  const navigateToCleaningScreen = () => {
    navigation.navigate('CleaningScreen');
  };
  const navigateToCateringScreen = () => {
    navigation.navigate('CateringScreen');
  };
  const navigateToMaintenanceScreen = () => {
    navigation.navigate('MaintenanceScreen');
  };
  // Add similar functions for other services

  const renderServiceBlock = (service) => {
    const navigateFunction = getNavigateFunction(service.id);
    return (
      <TouchableOpacity
        key={service.id}
        style={styles.serviceBlock}
        onPress={navigateFunction}
      >
        <Image source={service.icon} style={styles.serviceIcon} />
        <Text style={styles.serviceName}>{service.name}</Text>
      </TouchableOpacity>
    );
  };

  const getNavigateFunction = (serviceId) => {
    switch (serviceId) {
      case '1':
        return navigateToBeautySaloonScreen;
      case '2':
        return navigateToClinicalScreen;
      case '3':
        return navigateToSolarScreen;
        case '4':
          return navigateToPestControlScreen;
          case '5':
        return navigateToGardeningScreen;
        case '6':
        return navigateToRenovationScreen;
        case '7':
        return navigateToSecurityScreen;
        case '8':
        return navigateToShiftingScreen;
        case '9':
        return navigateToWashingScreen;
        case '10':
        return navigateToCleaningScreen;
        case '11':
        return navigateToCateringScreen;
        case '12':
        return navigateToMaintenanceScreen;
        
      default:
        return () => {};
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 4 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ backgroundColor: 'yellow', padding: 10, borderRadius: 20, marginLeft: 10 }}
        >
          <ArrowLeftIcon size={20} color="black" />
        </TouchableOpacity>
      </View>
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
