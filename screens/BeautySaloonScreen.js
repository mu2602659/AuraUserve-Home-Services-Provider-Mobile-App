// SubServicesScreen.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation, useRoute } from '@react-navigation/native';

const BeautySaloonScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { BeautySaloonScreen } = route.params;

  // Example sub-services data (you can replace this with your actual sub-services data)
  const BeautySaloonScreenData = [
    { id: '1', name: 'Beauty Saloon', icon: require('../assets/icons/beauty.png') },
    { id: '2', name: 'Clinical', icon: require('../assets/icons/clinical.png') },
    { id: '3', name: 'Maintenance', icon: require('../assets/icons/maintenance.png') },
    { id: '4', name: 'Shifting', icon: require('../assets/icons/shifting.png') },
    { id: '5', name: 'Pest Control', icon: require('../assets/icons/pestcontrol.png') },
    { id: '6', name: 'Solar', icon: require('../assets/icons/solar.png') },
    { id: '7', name: 'Cleaning', icon: require('../assets/icons/clean.png') },
    // Add more sub-services as needed
  ];

  const handleBeautySaloonScreenPress = (BeautySaloonScreenId) => {
    // Handle the sub-service press as needed
    console.log(`Selected BeautySaloonScreen: ${BeautySaloonScreenId}`);
    // You may navigate to a detailed page or perform other actions here
  };

  const renderBeautySaloonScreenBlock = (BeautySaloonScreen) => (
    <TouchableOpacity
      key={BeautySaloonScreen.id}
      style={styles.BeautySaloonScreenBlock}
      onPress={() => handleBeautySaloonScreenPress(BeautySaloonScreen.id)}
    >
      <Text style={styles.BeautySaloonScreenName}>{BeautySaloonScreen.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View className="flex-row justify-start mt-4">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
        >
          <ArrowLeftIcon size="20" color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.header}>
          {/* Your logo image goes here */}
          <Image
            source={require("../assets/images/logoo.png")}
            style={styles.logoImage}
          />
        </View>
        <View style={styles.gridContainer}>
          {BeautySaloonScreenData.map((BeautySaloonScreen) => renderBeautySaloonScreenBlock(BeautySaloonScreen))}
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
  BeautySaloonScreenBlock: {
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
  BeautySaloonScreenName: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BeautySaloonScreen;
