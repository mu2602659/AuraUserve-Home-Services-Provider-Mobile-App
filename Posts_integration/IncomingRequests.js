import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { IMG_URL } from '../config/ip_address';
import { useNavigation } from '@react-navigation/native';

const IncomingRequests = () => {
  const [requests, setRequests] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${IMG_URL}/bookings`);
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching booking requests:', error);
      Alert.alert('Error', 'Failed to fetch booking requests. Please try again later.');
    }
  };

  const handleAccept = async (id) => {
    try {
      await axios.put(`${IMG_URL}/bookings/${id}/accept`);
      Alert.alert('Success', 'Booking request accepted successfully.');
      navigation.navigate('AcceptedBookings');
      setRequests(prevRequests => prevRequests.filter(request => request._id !== id));
    } catch (error) {
      console.error('Error accepting booking request:', error);
      Alert.alert('Error', 'Failed to accept booking request. Please try again later.');
    }
  };
  
  const handleReject = (id) => {
    navigation.navigate('RejectedBookings', { bookingId: id });
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Incoming Booking Requests</Text>
      <FlatList
        data={requests}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.requestContainer}>
            <Text>Service Name: {item.serviceName}</Text>
            <Text>Full Name: {item.fullName}</Text>
            <Text>Phone: {item.phone}</Text>
            <Text>Service Time: {new Date(item.serviceTime).toLocaleString()}</Text>
            <Text>Service Date: {new Date(item.serviceDate).toDateString()}</Text>
            <Text>Work Description: {item.workDescription}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => handleAccept(item._id)} style={styles.acceptButton}>
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleReject(item._id)} style={styles.rejectButton}>
                <Text style={styles.buttonText}>Reject</Text>
              </TouchableOpacity>
            </View>
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
  requestContainer: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  acceptButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  rejectButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});

export default IncomingRequests;
