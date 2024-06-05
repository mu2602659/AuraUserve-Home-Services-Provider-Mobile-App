import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, TextInput, Linking } from 'react-native';
import axios from 'axios';
import { IMG_URL } from '../config/ip_address';

const AppointmentsScreen = () => {
  const [acceptedBookings, setAcceptedBookings] = useState([]);
  const [rejectedBookings, setRejectedBookings] = useState([]);
  const navigation = useNavigation();


  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${IMG_URL}/bookings`);
      const accepted = response.data.filter(booking => booking.status === 'accepted');
      const rejected = response.data.filter(booking => booking.status === 'rejected');
      setAcceptedBookings(accepted);
      setRejectedBookings(rejected);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      Alert.alert('Error', 'Failed to fetch bookings. Please try again later.');
    }
  };


  const openWhatsApp = (phone) => {
    const url = `whatsapp://send?phone=${phone}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Failed to open WhatsApp. Please make sure WhatsApp is installed.');
    });
  };

  const navigateToRating = () => {
    navigation.navigate('Rating'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Accepted Bookings</Text>
      <FlatList
        data={acceptedBookings}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.bookingContainer}>
            <Text>Service Name: {item.serviceName}</Text>
            <Text>Full Name: {item.fullName}</Text>
            <Text>Service Time: {new Date(item.serviceTime).toLocaleString()}</Text>
            <Text>Service Date: {new Date(item.serviceDate).toDateString()}</Text>
            <Text style={{ backgroundColor: '#1F51FF', width:115, borderRadius: 5, color:'white', height:30, padding:5, fontSize:15, fontWeight:'bold' }}>Status: {item.status}</Text>
            <TouchableOpacity style={styles.whatsappButton1} onPress={navigateToRating}>
              <Text style={styles.buttonText1}>Rate Booking</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Text style={styles.header}>Rejected Bookings</Text>
      <FlatList
        data={rejectedBookings}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.bookingContainer}>
            <Text>Service Name: {item.serviceName}</Text>
            <Text>Full Name: {item.fullName}</Text>
            <Text style={{ backgroundColor: 'red', width:105, borderRadius: 5, color:'white', height:30, padding:5, fontSize:15, fontWeight:'bold' }}>Status: {item.status}</Text>
            <TouchableOpacity onPress={() => openWhatsApp(item.contactNumber)} style={styles.whatsappButton}>
              <Text style={styles.buttonText}>Contact on WhatsApp</Text>
            </TouchableOpacity>
          </View>
        )}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bookingContainer: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  ratingButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  whatsappButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  whatsappButton1: {
    backgroundColor: '#FFBF00',
    color:'black',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText1: {
    color: 'black',
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  commentInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  ratingModal: {
    position: 'absolute',
    top: '30%',
    left: '10%',
    right: '10%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  modalHeader: {
    fontSizegah: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default AppointmentsScreen;
