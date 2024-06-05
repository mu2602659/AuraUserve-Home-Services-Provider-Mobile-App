import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, Image } from 'react-native';
import axios from 'axios';
import { IMG_URL } from '../config/ip_address';
import StarRating from 'react-native-star-rating';

const CommentScreen = () => {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {
      const response = await axios.get(`${IMG_URL}/bookings/ratings`);
      setRatings(response.data);
    } catch (error) {
      console.error('Error fetching ratings:', error);
      Alert.alert('Error', 'Failed to fetch ratings. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Ratings and Comments</Text>
      <FlatList
        data={ratings}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
  <View style={styles.commentContainer}>
    <View style={styles.commentInfo}>
      <Text style={styles.commentText}>{item.comment}</Text>
    </View>
    <StarRating
      disabled={true}
      maxStars={5}
      rating={item.rating}
      starSize={20}
      fullStarColor={'#FFD700'}
      emptyStarColor={'#D3D3D3'}
    />
    <Text style={styles.serviceInfo}>
        to {item.serviceName} service Provider {item.userName}
      </Text>
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
  commentContainer: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  commentInfo: {
    marginBottom: 10,
  },
  commentText: {
    fontSize: 16,
  },
  serviceInfo: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default CommentScreen;
