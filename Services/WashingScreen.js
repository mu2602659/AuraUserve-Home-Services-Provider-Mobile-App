import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';

const WashingScreen = () => {

  const WashingData = [
    { id: '1', name: 'HeadlightScreen', displayName: 'Headlight', icon: require('../assets/icons/headlight.png') },
    { id: '2', name: 'OilChangingScreen', displayName: 'Oil Changing', icon: require('../assets/icons/oil.png') },
     { id: '3', name: 'RapidBikeRevivalScreen', displayName: 'Rapid Bike Revival', icon: require('../assets/icons/motorcy.png') },
    { id: '4', name: 'WiperWellnessScreen', displayName: 'Wiper Wellness', icon: require('../assets/icons/wiper.png') },
    { id: '5', name: 'FilterFreshServiceScreen', displayName: 'Filter Fresh Service', icon: require('../assets/icons/filter.png') },
    { id: '6', name: 'WheelWizardryScreen', displayName: 'Wheel Wizardry', icon: require('../assets/icons/rim.png') },
    { id: '7', name: 'BatteryBoostScreen', displayName: 'Battery Boost Service', icon: require('../assets/icons/carbater.png') },
    { id: '8', name: 'BrakeBlissScreen', displayName: 'Brake Bliss Package', icon: require('../assets/icons/brakes.png') },

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
          {WashingData.map((service) => renderServiceBlock(service))}
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

export default WashingScreen;
