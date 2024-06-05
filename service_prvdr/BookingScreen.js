import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, ScrollView, Linking, StyleSheet, Image, FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome5 } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding'; // Import Geocoder
import axios from 'axios';
import { IMG_URL } from '../config/ip_address';
import ServicePicker from '../Posts_integration/ServicePicker';

const Booking = () => {
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showServicePicker, setShowServicePicker] = useState(false);

  const [services, setServices] = useState(['Gardening', 'Security', 'Beauty Salon', 'Clinical', 'Maintenance', 'Shifting', 'Solar', 'Cleaning', 'Event Organization', 'Vehicle Maintenance', 'HomeCare Solutions']);

  const navigation = useNavigation();
  const [region, setRegion] = useState({
    latitude: 31.5204, // Latitude of Lahore
    longitude: 74.3587, // Longitude of Lahore
    latitudeDelta: 5, // Adjust the latitude delta as needed
    longitudeDelta: 5, // Adjust the longitude delta as needed
  });

  const [bookingInfo, setBookingInfo] = useState({
    serviceName: '',
    fullName: '',
    email: '',
    phone: '',
    serviceTime: new Date(),
    serviceDate: new Date(),
    location: { latitude: null, longitude: null }, // Initialize location
    address: '', // Added for manual address input
    workDescription: '',
    providerName: '',
  });

  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);

  useEffect(() => {
    fetchProviders();
    // Initialize Geocoder
    Geocoder.init('YOUR_API_KEY');
  }, []);

  const fetchProviders = async () => {
    try {
      const response = await axios.get(`${IMG_URL}/profile-images`);
      setProviders(response.data);
    } catch (error) {
      console.error('Error fetching providers:', error);
    }
  };

  const handleSubmit = async () => {
    if (!selectedProvider) {
      Alert.alert('Error', 'Please select a provider.');
      return;
    }
    
    if (!bookingInfo.address) {
      Alert.alert('Error', 'Please enter an address.');
      return;
    }

    try {
      const bookingData = {
        ...bookingInfo,
        providerName: selectedProvider.name,
        location: {
          address: bookingInfo.address,
        },
      };

      // Send booking data to the server
      const response = await axios.post(`${IMG_URL}/bookings`, bookingData);
      console.log(response.data);
      Alert.alert('Success', 'Your booking is submitted!');
      navigation.navigate('Home');

    } catch (error) {
      console.error('Error submitting booking:', error);
      Alert.alert('Error', 'Failed to submit booking. Please try again later.');
    }
  };
  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || bookingInfo.serviceTime;
    setShowTimePicker(false);
    setBookingInfo({ ...bookingInfo, serviceTime: currentTime });
  };
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || bookingInfo.serviceDate;
    setShowDatePicker(false);
    setBookingInfo({ ...bookingInfo, serviceDate: currentDate });
  };

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    // Reverse geocode to get the address from coordinates
    Geocoder.from({ latitude, longitude })
      .then((json) => {
        const address = json.results[0].formatted_address;
        setBookingInfo({ ...bookingInfo, address });
      })
      .catch((error) => console.warn(error));
  };

  const openWhatsApp = () => {
    const phoneNumber = '+92 3314311640'; // Replace with the desired phone number
    const message = 'Hello, I would like to book a service.';
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('Error', 'WhatsApp is not installed on your device');
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  const renderProviderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.providerItem}
      onPress={() => setSelectedProvider(item)}
    >
      <Image source={{ uri: `data:image/jpeg;base64,${item.imageData}` }} style={styles.providerImage} />
      <View style={styles.providerInfo}>
        <Text style={styles.providerName}>{item.name}</Text>
        <FontAwesome5 name="star" size={16} color="gold" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Booking Information</Text>

          {/* Service Name */}
          <Text style={styles.label}>Service Name</Text>
          <TouchableOpacity onPress={() => setShowServicePicker(true)} style={styles.inputContainer}>
            <FontAwesome5 name="cut" style={styles.icon} />
            <Text style={styles.input}>{bookingInfo.serviceName || 'Select Service'}</Text>
          </TouchableOpacity>
          <ServicePicker
            visible={showServicePicker}
            services={services}
            selectedService={bookingInfo.serviceName}
            onSelect={(service) => {
              setShowServicePicker(false);
              setBookingInfo({ ...bookingInfo, serviceName: service });
            }}
          />
          {/* Full Name */}
          <Text style={styles.label}>Full Name</Text>
          <View style={styles.inputContainer}>
            <FontAwesome5 name="user" style={styles.icon} />
            <TextInput
              placeholder="Enter Full Name"
              style={styles.input}
              value={bookingInfo.fullName}
              onChangeText={(text) => setBookingInfo({ ...bookingInfo, fullName: text })}
            />
          </View>

          {/* Email */}
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputContainer}>
            <FontAwesome5 name="envelope" style={styles.icon} />
            <TextInput
              placeholder="Enter Email"
              style={styles.input}
              value={bookingInfo.email}
              onChangeText={(text) => setBookingInfo({ ...bookingInfo, email: text })}
              keyboardType="email-address"
            />
          </View>

          {/* Phone */}
          <Text style={styles.label}>Phone</Text>
          <View style={styles.inputContainer}>
            <FontAwesome5 name="phone" style={styles.icon} />
            <TextInput
              placeholder="Enter Phone Number"
              style={styles.input}
              value={bookingInfo.phone}
              onChangeText={(text) => setBookingInfo({ ...bookingInfo, phone: text })}
              keyboardType="phone-pad"
            />
          </View>

          {/* Service Time and Date */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
            {/* Service Time */}
            <View style={{ flex: 1, marginRight: 5 }}>
              <Text style={{ fontSize: 16, marginBottom: 5 }}>Service Time</Text>
              <TouchableOpacity
                onPress={() => setShowTimePicker(true)}
                style={{ borderWidth: 1, borderColor: 'gray', padding: 10, borderRadius: 8, flexDirection: 'row', alignItems: 'center' }}
              >
                <FontAwesome5 name="clock" size={20} style={{ marginRight: 10 }} />
                <Text>{bookingInfo.serviceTime.toLocaleTimeString()}</Text>
              </TouchableOpacity>
              {showTimePicker && (
                <DateTimePicker
                  value={bookingInfo.serviceTime}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={handleTimeChange}
                />
              )}
            </View>

            {/* Service Date */}
            <View style={{ flex: 1, marginLeft: 5 }}>
              <Text style={{ fontSize: 16, marginBottom: 5 }}>Service Date</Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={{ borderWidth: 1, borderColor: 'gray', padding: 10, borderRadius: 8, flexDirection: 'row', alignItems: 'center' }}
              >
                <FontAwesome5 name="calendar" size={20} style={{ marginRight: 10 }} />
                <Text>{bookingInfo.serviceDate.toLocaleDateString()}</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={bookingInfo.serviceDate}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
            </View>
          </View>

          {/* Location */}
          <Text style={styles.label}>Location</Text>
          <MapView
            style={{ width: '100%', height: 200, marginBottom: 16 }}
            region={region}
            onPress={handleMapPress}
          >
            {bookingInfo.address && (
              <Marker
                coordinate={{ latitude: region.latitude, longitude: region.longitude }}
                pinColor="red" // Set marker color to red
              />
            )}
          </MapView>

          {/* Manual Address Input */}
          <Text style={styles.label}>Address</Text>
          <View style={styles.inputContainer}>
            <FontAwesome5 name="map-marker-alt" style={styles.icon} />
            <TextInput
              placeholder="Enter Address"
              style={styles.input}
              value={bookingInfo.address}
              onChangeText={(text) => setBookingInfo({ ...bookingInfo, address: text })}
            />
          </View>

          {/* Work Description */}
          <Text style={styles.label}>Work Description</Text>
          <View style={styles.inputContainer}>
            <FontAwesome5 name="pencil-alt" style={styles.icon} />
            <TextInput
              placeholder="Enter Work Description"
              style={styles.input}
              value={bookingInfo.workDescription}
              onChangeText={(text) => setBookingInfo({ ...bookingInfo, workDescription: text })}
            />
          </View>

          {/* Provider */}
          <Text style={styles.label}>Provider</Text>
          {selectedProvider ? (
            <View style={styles.selectedProvider}>
              <Image source={{ uri: `data:image/jpeg;base64,${selectedProvider.imageData}` }} style={styles.selectedProviderImage} />
              <Text style={styles.selectedProviderName}>{selectedProvider.name}</Text>
            </View>
          ) : (
            <FlatList
              data={providers}
              renderItem={renderProviderItem}
              keyExtractor={(item) => item._id}
              horizontal
              contentContainerStyle={{ marginBottom: 16 }}
            />
          )}

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            style={{ backgroundColor: 'blue', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 20 }}
          >
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Submit Booking</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Floating WhatsApp Icon */}
      <TouchableOpacity
        style={styles.whatsappButton}
        onPress={openWhatsApp}
      >
        <FontAwesome5 name="whatsapp" size={30} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  icon: {
    marginRight: 10,
    fontSize: 18,
  },
  input: {
    flex: 1,
  },
  providerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width:380,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  providerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  providerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  providerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  selectedProvider: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  selectedProviderImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  selectedProviderName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  whatsappButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#25D366',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Booking;

