// PostDetailsScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const PostDetails = ({ route }) => {
  const { post } = route.params;

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
        {/*<Text style={styles.userName}>User: {userName}</Text>
        <Text style={styles.comment}>Comment: {comment}</Text>*/}
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
});

export default PostDetails;
