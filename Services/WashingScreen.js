import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { SliderBox } from 'react-native-image-slider-box';
import axios from 'axios';
import { IMG_URL } from '../config/ip_address';

const WashingScreen = () => {
  const navigation = useNavigation(); // Initialize useNavigation hook
  const [washingImages, setWashingImages] = useState([]);

  useEffect(() => {
    fetchWashingImages();
  }, []);

  const fetchWashingImages = async () => {
    try {
      const response = await axios.get(`${IMG_URL}/post-images?service=Vehicle Maintenance`);
      setWashingImages(response.data);
    } catch (error) {
      console.error('Error fetching washing images:', error);
    }
  };

  const navigateToPostDetails = (post) => {
    navigation.navigate('PostDetails', { post });
  };


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
      console.log(`Navigating to Booking Page for ${service.displayName}`);
      navigation.navigate('Services', { screen: 'Booking' }); // Navigate to BookingScreen
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
      <View style={styles.sliderContainer}>
          <SliderBox
            images={washingImages.map(image => ({ uri: `data:image/jpeg;base64,${image.imageData}`, title: image.title }))}
            sliderBoxHeight={200}
            dotColor="#FFEE58"
            inactiveDotColor="#90A4AE"
            paginationBoxVerticalPadding={20}
            autoplay
            circleLoop
            resizeMethod={'resize'}
            resizeMode={'cover'}
            paginationBoxStyle={styles.paginationBoxStyle}
            dotStyle={styles.dotStyle}
            ImageComponentStyle={styles.imageComponentStyle}
            imageLoadingColor="#2196F3"
            onCurrentImagePressed={(index) => navigateToPostDetails(washingImages[index])}
          />
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
  gridContainer: {
    justifyContent: 'space-around',
    padding: 8,
  },
  serviceBlock: {
    width: '100%',
    aspectRatio: 12 / 3,
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
  sliderContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  paginationBoxStyle: {
    position: 'absolute',
    bottom: 0,
    padding: 0,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 10
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    padding: 0,
    margin: 0,
    backgroundColor: 'rgba(128, 128, 128, 0.92)'
  },
  imageComponentStyle: {
    borderRadius: 15,
    width: '97%',
    marginTop: 5
  },
});

export default WashingScreen;
