import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList, ScrollView } from 'react-native';
import axios from 'axios';
import { IMG_URL } from '../config/ip_address';
import StarRating from 'react-native-star-rating-widget'; // Assuming you're using a star rating library
import { useRoute, useNavigation } from '@react-navigation/native';

const RatingScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { bookingId, userName } = route.params; // Get the bookingId from route parameters
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  // Predefined suggested comments
  const suggestedComments = [
    'Excellent service!',
    'Great experience overall.',
    'Service could be better.',
    'Average service quality.',
    'Poor customer service.',
    'Highly recommended!',
    'Good value for money.',
    'Prompt and efficient service.',
    'Professional and courteous staff.',
    'Very satisfied with the service.',
    'Could improve on communication.',
    'Fast response time.',
    'Friendly and helpful staff.',
    'Would use this service again.',
    'Below expectations.'
  ];

  const submitRating = async () => {
    try {
      await axios.put(`${IMG_URL}/bookings/${bookingId}/rate`, { rating, comment, userName });
      Alert.alert('Success', 'Your rating has been submitted.');
      navigation.goBack();
    } catch (error) {
      console.error('Error submitting rating:', error);
      Alert.alert('Error', 'Failed to submit rating. Please try again later.');
    }
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.header}>Rate Your Booking</Text>
      <StarRating rating={rating} onChange={setRating} />
      <TextInput
        style={styles.commentInput}
        placeholder="Leave a comment"
        multiline
        value={comment}
        onChangeText={setComment}
      />
      <View style={styles.suggestedCommentsContainer}>
        <Text style={styles.suggestedCommentsHeader}>Suggested Comments:</Text>
        <FlatList
          data={suggestedComments}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setComment(item)} style={styles.suggestedComment}>
              <Text style={styles.suggestedCommentText}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={submitRating}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
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
  commentInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
  },
  suggestedCommentsContainer: {
    marginTop: 20,
  },
  suggestedCommentsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  suggestedComment: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  suggestedCommentText: {
    fontSize: 14,
  },
});

export default RatingScreen;
