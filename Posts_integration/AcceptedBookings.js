import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { IMG_URL } from '../config/ip_address';

const AcceptedBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchAcceptedBookings();
  }, []);

  const fetchAcceptedBookings = async () => {
    try {
      const response = await axios.get(`${IMG_URL}/bookings`);
      const acceptedBookings = response.data.filter(booking => booking.status === 'accepted');
      setBookings(acceptedBookings);
    } catch (error) {
      console.error('Error fetching accepted bookings:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Accepted Bookings</Text>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.bookingContainer}>
            <Text>Full Name: {item.fullName}</Text>
            <Text>Service Name: {item.serviceName}</Text>
            <Text>Phone: {item.phone}</Text>
            <Text>Service Time: {new Date(item.serviceTime).toLocaleString()}</Text>
            <Text>Service Date: {new Date(item.serviceDate).toDateString()}</Text>
            <Text>Work Description: {item.workDescription}</Text>
            <Text>Contact Number: {item.contactNumber}</Text>
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
});

export default AcceptedBookings;
