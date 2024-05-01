import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const CateringScreen = () => {
  const navigation = useNavigation();

  const CateringData = [
    { id: '1', name: 'EventCateringScreen', displayName: 'Event Catering', icon: require('../assets/icons/banquet.png') },
    { id: '2', name: 'CorporateCateringScreen', displayName: 'Corporate Catering', icon: require('../assets/icons/buffet.png') },
    { id: '3', name: 'MealDeliveryScreen', displayName: 'Meal Delivery Services', icon: require('../assets/icons/dinner.png') },
    { id: '4', name: 'FSFTScreen', displayName: 'Food Stations and Food Trucks', icon: require('../assets/icons/catering (1).png') },
    { id: '5', name: 'FTCScreen', displayName: 'Farm-to-Table Catering', icon: require('../assets/icons/waiter.png') },
    { id: '6', name: 'ICEScreen', displayName: 'Interactive Culinary Experiences', icon: require('../assets/icons/catering.png') },
    // Add more services as needed
  ];

  const renderServiceBlock = (service) => (
    <TouchableOpacity
      key={service.id}
      style={styles.serviceBlock}
      onPress={() => {
        console.log(`Navigating to ${service.name}`);
        navigation.navigate('Booking'); // Navigate to BookingScreen
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
          {CateringData.map((service) => renderServiceBlock(service))}
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
  gridContainer: {
    justifyContent: 'space-around',
    padding: 8,
  },
  serviceBlock: {
    width: '100%',
    aspectRatio: 12/3,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginVertical: 8,
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
    width: 50,
    height: 50,
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

export default CateringScreen;
