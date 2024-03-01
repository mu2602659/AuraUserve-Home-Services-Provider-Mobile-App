import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';

const CleaningScreen = () => {

  const CleaningData = [
    { id: '1', name: 'ResidentialCleaningScreen', displayName: 'Residential Cleaning', icon: require('../assets/icons/mansion.png') },
    { id: '2', name: 'WaterTankScreen', displayName: 'Water Tank', icon: require('../assets/icons/water-tank.png') },
    { id: '3', name: 'SofaCleaningScreen', displayName: 'Sofa Cleaning', icon: require('../assets/icons/sofa.png') },
    { id: '4', name: 'LaundryScreen', displayName: 'Laundry Services', icon: require('../assets/icons/washing-machine.png') },
    { id: '5', name: 'GutterCleaningScreen', displayName: 'Gutter Cleaning', icon: require('../assets/icons/gutter.png') },

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
    <View style={styles.serviceContent}>
      <Image source={service.icon} style={styles.serviceIcon} />
      <Text style={styles.serviceName}>{service.displayName}</Text>
    </View>
  </TouchableOpacity>
);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      
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
  gridContainer: {
    justifyContent: 'space-around',
    padding: 8,
  },
  serviceBlock: {
    width: '100%',
    aspectRatio: 12/3,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginVertical: 8, // Adjust vertical margin as needed
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000000',
  },
  serviceContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
 serviceIcon: {
  width: 50, // Example width value in pixels
  height: 50, // Example height value in pixels
  resizeMode: 'contain',
  marginLeft: 30,
},

  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
});

export default CleaningScreen;
