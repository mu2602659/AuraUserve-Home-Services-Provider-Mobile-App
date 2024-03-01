import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';

const GardeningScreen = () => {

  const GardeningData = [
    { id: '1', name: 'GardenInstallationScreen', displayName: 'Garden Installation', icon: require('../assets/icons/garden.png') },
    { id: '3', name: 'MosquitoControlScreen', displayName: 'Mosquito Control', icon: require('../assets/icons/mosquito.png') },
    { id: '4', name: 'GLIScreen', displayName: 'Garden Lighting Installation', icon: require('../assets/icons/street-light.png') },
    { id: '5', name: 'WildlifeControlScreen', displayName: 'Wildlife Control', icon: require('../assets/icons/snail.png') },
    { id: '6', name: 'TCTScreen', displayName: 'Tree Care and Trimming', icon: require('../assets/icons/palm-tree.png') },
    { id: '7', name: 'RodentControlScreen', displayName: 'Rodent Control', icon: require('../assets/icons/rat.png') },
    { id: '8', name: 'BedBugExterminationScreen', displayName: 'Bed Bug Extermination', icon: require('../assets/icons/bed-bug.png') },
    { id: '9', name: 'BeeandWaspScreen', displayName: 'Bee and Wasp Removal', icon: require('../assets/icons/bee.png') },
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
          {GardeningData.map((service) => renderServiceBlock(service))}
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
export default GardeningScreen;
