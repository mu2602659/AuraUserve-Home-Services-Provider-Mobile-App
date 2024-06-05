import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import axios from 'axios';
import { IMG_URL } from '../config/ip_address';

const RatingScreen = () => {
  const [completedBookings, setCompletedBookings] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const userId = 'USER_ID'; // Replace with actual user ID

  useEffect(() => {
    fetchCompletedBookings();
  }, []);

  const fetchCompletedBookings = async () => {
    try {
      const response = await axios.get(`${IMG_URL}/bookings?status=done&userId=${userId}`);
      setCompletedBookings(response.data);
    } catch (error) {
      console.error('Error fetching completed bookings:', error);
      Alert.alert('Error', 'Failed to fetch completed bookings. Please try again later.');
    }
  };

  const submitRating = async (bookingId, providerId) => {
    try {
      await axios.post(`${IMG_URL}/ratings`, {
        bookingId,
        rating,
        comment,
        userId,
        providerId,
      });
      Alert.alert('Success', 'Rating submitted successfully.');
      setRating(0);
      setComment('');
      fetchCompletedBookings();
    } catch (error) {
      console.error('Error submitting rating:', error);
      Alert.alert('Error', 'Failed to submit rating. Please try again later.');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Rate Completed Bookings</Text>
      <FlatList
        data={completedBookings}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ borderWidth: 1, borderColor: 'lightgray', borderRadius: 10, padding: 10, marginTop: 10 }}>
            <Text>Service Name: {item.serviceName}</Text>
            <Text>Full Name: {item.fullName}</Text>
            <Text>Phone: {item.phone}</Text>
            <Text>Service Time: {new Date(item.serviceTime).toLocaleString()}</Text>
            <Text>Service Date: {new Date(item.serviceDate).toDateString()}</Text>
            <Text>Work Description: {item.workDescription}</Text>
            <StarRating
              rating={rating}
              onChange={setRating}
              starSize={30}
              color="gold"
              style={{ marginTop: 10 }}
            />
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: 'gray',
                   padding: 10,
                   borderRadius: 8,
                   marginTop: 10,
                 }}
                 placeholder="Leave a comment"
                 value={comment}
                 onChangeText={setComment}
               />
               <TouchableOpacity
                 onPress={() => submitRating(item._id, item.providerId)}
                 style={{
                   backgroundColor: 'blue',
                   padding: 10,
                   borderRadius: 8,
                   marginTop: 10,
                   alignItems: 'center',
                 }}
               >
                 <Text style={{ color: 'white' }}>Submit Rating</Text>
               </TouchableOpacity>
             </View>
           )}
         />
       </View>
     );
   };

   export default RatingScreen;
