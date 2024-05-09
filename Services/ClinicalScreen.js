
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SliderBox } from 'react-native-image-slider-box';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { IMG_URL } from '../config/ip_address';

const ClinicalScreen = () => {
  const navigation = useNavigation();
  const [clinicalImages, setClinicalImages] = useState([]);

  useEffect(() => {
    fetchClinicalImages();
  }, []);

  const fetchClinicalImages = async () => {
    try {
      const response = await axios.get(`${IMG_URL}/post-images?service=Clinical`);
      setClinicalImages(response.data);
    } catch (error) {
      console.error('Error fetching clinical images:', error);
    }
  };
  const navigateToPostDetails = (post) => {
    navigation.navigate('PostDetails', { post });
  };

  const ClinicalData = [
    { id: '1', name: 'PrimaryCareScreen', displayName: 'Primary Care', icon: require('../assets/icons/healthcare.png') },
    { id: '2', name: 'VaccinationScreen', displayName: 'Vaccination', icon: require('../assets/icons/vaccine.png') },
    { id: '3', name: 'GynecologistScreen', displayName: 'Gynecologist', icon: require('../assets/icons/gynecologist.png') },
    { id: '4', name: 'PharmacyScreen', displayName: 'Pharmacy', icon: require('../assets/icons/pharmacy.png') },
    { id: '5', name: 'HomeopathicSpecialistScreen', displayName: 'Homeopathic Specialist', icon: require('../assets/icons/homeo.png') },
    { id: '6', name: 'ChildSpecialistScreen', displayName: 'Child Specialist', icon: require('../assets/icons/protection.png') },
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
            images={clinicalImages.map(image => ({ uri: `data:image/jpeg;base64,${image.imageData}`, title: image.title }))}
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
            onCurrentImagePressed={(index) => navigateToPostDetails(clinicalImages[index])}
          />
        </View>
        <View style={styles.gridContainer}>
          {ClinicalData.map((service) => renderServiceBlock(service))}
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

export default ClinicalScreen;
