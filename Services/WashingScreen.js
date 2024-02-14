import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';

const WashingScreen = () => {

  const WashingData = [
    { id: '1', name: 'BeautySaloonScreen', displayName: 'Headlight Hi', icon: require('../assets/icons/headlight.png') },
    { id: '2', name: 'BeautySaloonScreen', displayName: 'Oil Changing', icon: require('../assets/icons/oil.png') },
     { id: '3', name: 'BeautySaloonScreen', displayName: 'Rapid Bike Revival', icon: require('../assets/icons/motorcy.png') },
    { id: '4', name: 'BeautySaloonScreen', displayName: 'Wiper Wellness', icon: require('../assets/icons/wiper.png') },
    { id: '5', name: 'BeautySaloonScreen', displayName: 'Filter Fresh Service', icon: require('../assets/icons/filter.png') },
    { id: '6', name: 'BeautySaloonScreen', displayName: 'zWheel Wizardry', icon: require('../assets/icons/rim.png') },
    { id: '7', name: 'BeautySaloonScreen', displayName: 'Battery Boost Service', icon: require('../assets/icons/carbater.png') },
    { id: '8', name: 'BeautySaloonScreen', displayName: 'Brake Bliss Package', icon: require('../assets/icons/brakes.png') },

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

export default WashingScreen;
