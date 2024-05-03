import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { SliderBox } from 'react-native-image-slider-box'; // Import SliderBox for image slider
import axios from 'axios'; // Import axios for HTTP requests
import { IMG_URL } from '../config/ip_address';

const BeautySaloonScreen = () => {
  const navigation = useNavigation();
  const [beautySalonImages, setBeautySalonImages] = useState([]);

  useEffect(() => {
    fetchBeautySalonImages();
  }, []);

  const fetchBeautySalonImages = async () => {
    try {
      const response = await axios.get(`${IMG_URL}/post-images?service=Beauty Salon`);
      setBeautySalonImages(response.data);
    } catch (error) {
      console.error('Error fetching beauty salon images:', error);
    }
  };
  const BeautySaloonData = [
    { id: '1', name: 'HairCutScreen', displayName: 'HairCut', icon: require('../assets/icons/hair-cutting.png') },
    { id: '2', name: 'BeardSettingScreen', displayName: 'Beard Setting', icon: require('../assets/icons/beard.png') },
    { id: '3', name: 'Facial-TreatmentScreen', displayName: 'Facial-Treatment', icon: require('../assets/icons/facial-treatment.png') },
    { id: '4', name: 'MakeupScreen', displayName: 'MakeUp', icon: require('../assets/icons/make.png') },
    { id: '5', name: 'BodyMassageScreen', displayName: 'Body Massage', icon: require('../assets/icons/massage.png') },
    { id: '6', name: 'PedicuresScreen', displayName: 'Pedicures', icon: require('../assets/icons/pedicure.png') },
    { id: '7', name: 'BodyWaxScreen', displayName: 'Body Wax', icon: require('../assets/icons/waxing.png') },
    { id: '8', name: 'HairTreatmentScreen', displayName: 'Hair Treatment', icon: require('../assets/icons/boy-hair-shape.png') },
    { id: '9', name: 'MehndiScreen', displayName: 'Mehndi', icon: require('../assets/icons/henna.png') },
    { id: '10', name: 'NailArtScreen', displayName: 'Nail Art', icon: require('../assets/icons/nail-polish.png') },
    { id: '11', name: 'HairExtensionsScreen', displayName: 'Hair Extensions', icon: require('../assets/icons/extensions.png') },
    { id: '12', name: 'EyelashExtensionsScreen', displayName: 'Eyelash Extensions', icon: require('../assets/icons/eyelash.png') },
    // Add more services as needed
  ];

  const navigateToPostDetails = (post) => {
    navigation.navigate('PostDetails', { post });
  };

  const renderServiceBlock = (service) => (
    <TouchableOpacity
      key={service.id}
      style={styles.serviceBlock}
      onPress={() => {
        console.log(`Navigating to Booking Page for ${service.displayName}`);
        navigation.navigate('Services', { screen: 'Booking' });
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
            images={beautySalonImages.map(image => `data:image/jpeg;base64,${image.imageData}`)}
            sliderBoxHeight={200}
            dotColor="#FFEE58"
            inactiveDotColor="#90A4AE"
            paginationBoxVerticalPadding={20}
            autoplay
            circleLoop
            resizeMethod={'resize'}
            resizeMode={'cover'}
            paginationBoxStyle={{
              position: "absolute",
              bottom: 0,
              padding: 0,
              alignItems: "center",
              alignSelf: "center",
              justifyContent: "center",
              paddingVertical: 10
            }}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 0,
              padding: 0,
              margin: 0,
              backgroundColor: "rgba(128, 128, 128, 0.92)"
            }}
            ImageComponentStyle={{ borderRadius: 15, width: '97%', marginTop: 5 }}
            imageLoadingColor="#2196F3"
            onCurrentImagePressed={(index) => navigateToPostDetails(beautySalonImages[index])}
          />
        </View>
      
        <View style={styles.gridContainer}>
          {BeautySaloonData.map((service) => renderServiceBlock(service))}
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
  sliderContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
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

export default BeautySaloonScreen;
