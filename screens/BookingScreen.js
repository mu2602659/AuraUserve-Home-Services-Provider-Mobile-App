// BookingScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome5 } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

// Set your Geocoding API key here
//Geocoder.init('YOUR_GEOCODING_API_KEY');

const BookingScreen = () => {
  const navigation = useNavigation();

  const [bookingInfo, setBookingInfo] = useState({
    serviceName: '',
    fullName: '',
    email: '',
    phone: '',
    serviceTime: new Date(),
    serviceDate: new Date(),
    location: null,
    workDescription: '',
  });

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    // Check if geolocation is available
    if ('geolocation' in navigator) {
      // Set the initial location to the user's current location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setRegion({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        },
        (error) => console.log(error),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    } else {
      console.log('Geolocation is not available in this environment.');
    }
  }, []);

  const openInAppChat = () => {
    // Replace 'your_in_app_chat_url' with the actual URL for in-app chat
    Linking.openURL('your_in_app_chat_url');
  };

  const openWhatsAppChat = () => {
    // Replace 'your_whatsapp_number' with the actual WhatsApp number
    Linking.openURL(`whatsapp://send?phone=03314311640`);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || bookingInfo.serviceDate;
    setShowDatePicker(false);
    setBookingInfo({ ...bookingInfo, serviceDate: currentDate });
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || bookingInfo.serviceTime;
    setShowTimePicker(false);
    setBookingInfo({ ...bookingInfo, serviceTime: currentTime });
  };

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    // Reverse geocode to get the address from coordinates
    Geocoder.from({ latitude, longitude })
      .then((json) => {
        const address = json.results[0].formatted_address;
        setBookingInfo({ ...bookingInfo, location: { latitude, longitude, address } });
      })
      .catch((error) => console.warn(error));
  };

  const handleBookingSubmit = () => {
    console.log('Booking submitted:', bookingInfo);
    Alert.alert('Success', 'Your booking is submitted!');
    // You can add logic to send the booking information to the server
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Booking Information</Text>

          {/* Service Name */}
          <Text style={styles.label}>Service Name</Text>
          <View style={styles.inputContainer}>
            <FontAwesome5 name="cut" style={styles.icon} />
            <TextInput
              placeholder="Enter Service Name"
              style={styles.input}
              value={bookingInfo.serviceName}
              onChangeText={(text) => setBookingInfo({ ...bookingInfo, serviceName: text })}
            />
          </View>

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

          {/* Service Time and Date in Parallel */}
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
                <Text>{bookingInfo.serviceDate.toDateString()}</Text>
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
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 16, marginBottom: 5 }}>Select Your Location</Text>
            <MapView
              style={{ height: 200, marginBottom: 10 }}
              region={region}
              onPress={handleMapPress}
            >
              {bookingInfo.location && (
                <Marker
                  coordinate={bookingInfo.location}
                  title="Selected Location"
                  description={bookingInfo.location.address}
                />
              )}
            </MapView>
          </View>

          {/* Work Description */}
          <Text style={{ fontSize: 16, marginBottom: 5 }}>Work Description</Text>
          <View style={styles.inputContainer}>
            <FontAwesome5 name="clipboard" style={styles.icon} />
            <TextInput
              placeholder="Enter Work Description"
              style={styles.input}
              value={bookingInfo.workDescription}
              onChangeText={(text) => setBookingInfo({ ...bookingInfo, workDescription: text })}
              multiline
            />
          </View>
          
 {/* Submit and Cancel Buttons */}
 <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            {/* Submit Button */}
            <TouchableOpacity
              onPress={handleBookingSubmit}
              style={{ flex: 1, padding: 15, borderRadius: 10, alignItems: 'center', backgroundColor: '#FFD700' }}
            >
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Submit Booking</Text>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ flex: 1, padding: 15, borderRadius: 10, alignItems: 'center', backgroundColor: '#FF0000', marginLeft: 10 }}
            >
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Cancel</Text>
            </TouchableOpacity>
          </View>

          {/* WhatsApp and In-App Chat Buttons */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            {/* WhatsApp Button */}
            <TouchableOpacity onPress={openWhatsAppChat} style={{ flex: 1, padding: 15, borderRadius: 10, alignItems: 'center', backgroundColor: '#25D366', marginLeft: 10 }}>
            <FontAwesome5 name="whatsapp" size={30} color="white" />
              <Text style={{ fontSize: 16, marginTop: 5, color: 'white' }}>WhatsApp</Text>
            </TouchableOpacity>

            {/* In-App Chat Button */}
            <TouchableOpacity onPress={openInAppChat} style={{ flex: 1, padding: 15, borderRadius: 10, alignItems: 'center', backgroundColor: '#007AFF', marginLeft: 10 }}>
            <FontAwesome5 name="comment" size={30} color="white" />
            <Text style={{ fontSize: 16, marginTop: 5, color: 'white' }}>In-App Chat</Text>
            </TouchableOpacity>
          </View>

          
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 16,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
  },
  floatingButton: {
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 10,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
};

export default BookingScreen;
