import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';

const List_images = ({ navigation }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://192.168.43.48:5002/images');
      setImages(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching images:', error);
      setLoading(false);
    }
  };

  const handleImagePress = (image) => {
    // Navigate to a new screen to display the selected image
    navigation.navigate('ImageDetail', { image });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={images}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleImagePress(item)}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: `http://192.168.43.48:5002/uploads/${item.uniqueFilename}` }} style={styles.image} />
                <Text style={styles.imageName}>{item.originalFilename}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  imageContainer: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
  },
  imageName: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default List_images;
