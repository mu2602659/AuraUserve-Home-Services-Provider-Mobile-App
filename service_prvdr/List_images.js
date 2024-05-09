// Frontend code
import React, { useState, useEffect } from 'react';
import { View, Image, FlatList, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';

const List_images = () => {
  const [latestImages, setLatestImages] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const latestResponse = await axios.get('http:// 192.168.137.1:5002/latest-images');
      const allResponse = await axios.get('http:// 192.168.137.1:5002/all-images');
      setLatestImages(latestResponse.data);
      setAllImages(allResponse.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching images:', error);
      setLoading(false);
    }
  };

  return (
    <View>
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Latest Images</Text>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={latestImages}
            keyExtractor={(item) => item._id}
            horizontal
            renderItem={({ item }) => (
              <View style={{ margin: 10 }}>
                <Image
                  source={{ uri: `data:image/jpeg;base64,${item.imageData}` }}
                  style={{ width: 100, height: 100 }}
                />
                <Text>{item.originalFilename}</Text>
              </View>
            )}
          />
        )}
      </View>
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>All Images</Text>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={allImages}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={{ margin: 10 }}>
                <Image
                  source={{ uri: `data:image/jpeg;base64,${item.imageData}` }}
                  style={{ width: 200, height: 200 }}
                />
                <Text>{item.originalFilename}</Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default List_images;
