import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation, useRoute } from '@react-navigation/native';

const CleaningScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { ServicesScreen } = route.params;

  // Example sub-services data (you can replace this with your actual sub-services data)
  const CleaningScreenData = [
    { id: '1', name: 'Saloon', icon: require('../assets/icons/beauty.png') },
    { id: '2', name: 'Clinical', icon: require('../assets/icons/clinical.png') },
    { id: '3', name: 'Maintenance', icon: require('../assets/icons/maintenance.png') },
    { id: '4', name: 'Shifting', icon: require('../assets/icons/shifting.png') },
    // Add more sub-services as needed
  ];

  const handleCleaningScreenPress = (CleaningScreenId) => {
    // You can navigate to the same CleaningScreen.js with a different parameter
    // For simplicity, I'll use the same CleaningScreen component with a different parameter
    navigation.navigate('CleaningScreen', { subServiceId: CleaningScreenId });
  };

  const renderCleaningScreenBlock = (CleaningScreen) => (
    <TouchableOpacity
      key={CleaningScreen.id}
      style={styles.CleaningScreenBlock}
      onPress={() => handleCleaningScreenPress(CleaningScreen.id)}
    >
      <Text style={styles.CleaningScreenName}>{CleaningScreen.name}</Text>
    </TouchableOpacity>
  );

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
          {CleaningScreenData.map((CleaningScreen) => renderCleaningScreenBlock(CleaningScreen))}
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
  CleaningScreenBlock: {
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
  CleaningScreenName: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CleaningScreen;
