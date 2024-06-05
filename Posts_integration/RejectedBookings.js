import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { IMG_URL } from '../config/ip_address';
import { useNavigation, useRoute } from '@react-navigation/native';

const RejectBooking = () => {
  const [reason, setReason] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { bookingId } = route.params;

  const handleReject = async () => {
    if (!reason || !contactNumber) {
      Alert.alert('Error', 'Please provide a rejection reason and contact number.');
      return;
    }

    try {
      await axios.put(`${IMG_URL}/bookings/${bookingId}/reject`, {
        rejectionReason: reason,
        contactNumber: contactNumber,
      });
      Alert.alert('Success', 'Booking request rejected successfully.');
    } catch (error) {
      console.error('Error rejecting booking request:', error);
      Alert.alert('Error', 'Failed to reject booking request. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reject Booking</Text>
      <TextInput
        style={styles.input}
        placeholder="Rejection Reason"
        value={reason}
        onChangeText={setReason}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        value={contactNumber}
        onChangeText={setContactNumber}
        keyboardType="phone-pad"
      />
      <TouchableOpacity onPress={handleReject} style={styles.rejectButton}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
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
  input: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  rejectButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default RejectBooking;
