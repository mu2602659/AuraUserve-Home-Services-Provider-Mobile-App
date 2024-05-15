import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PostDetails = ({ route }) => {
  const { post } = route.params;
  const navigation = useNavigation();

  const handleBookNow = () => {
    navigation.navigate('booking');
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: `data:image/jpeg;base64,${post.imageData}` }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.description}>{post.description}</Text>
        <Text style={styles.price}>Price: Rs. {post.price}</Text>
        <Text style={styles.address}>Address: {post.address}</Text>
        <Text style={styles.service}>Service: {post.service}</Text>
        <Text style={styles.userName}>Added By UserName</Text>
        <Text style={styles.comment}>relevant comment </Text>
        <TouchableOpacity style={styles.bookNowButton} onPress={handleBookNow}>
          <Text style={styles.bookNowText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  detailsContainer: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    marginBottom: 5,
  },
  address: {
    fontSize: 16,
    marginBottom: 5,
  },
  service: {
    fontSize: 16,
    marginBottom: 5,
  },
  userName: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  comment: {
    fontSize: 16,
    marginBottom: 5,
  },
  bookNowButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  bookNowText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PostDetails;
