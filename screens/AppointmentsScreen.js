import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Linking } from 'react-native';
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

  const navigateToRating = (bookingId, userName) => {
    navigation.navigate('Rating', { bookingId, userName });
  };;

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
            <Text style={styles.acceptedText}>Status: {item.status}</Text>
            <TouchableOpacity style={styles.ratingButton} onPress={() => navigateToRating(item._id)}>
              <Text style={styles.buttonText}>Rate Booking</Text>
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
            <Text>Reason: {item.rejectionReason}</Text>      
            <Text style={styles.rejectedText}>Status: {item.status}</Text>
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
  acceptedText: {
    backgroundColor: '#1F51FF',
    width: 115,
    borderRadius: 5,
    color: 'white',
    height: 30,
    padding: 5,
    fontSize: 15,
    fontWeight: 'bold',
  },
  rejectedText: {
    backgroundColor: 'red',
    width: 105,
    borderRadius: 5,
    color: 'white',
    height: 30,
    padding: 5,
    fontSize: 15,
    fontWeight: 'bold',
  },
  ratingButton: {
    backgroundColor: '#FFBF00',
    color: 'black',
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
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default AppointmentsScreen;
