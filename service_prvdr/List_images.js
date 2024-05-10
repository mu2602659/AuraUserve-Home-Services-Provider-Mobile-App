// Frontend code
import React, { useState, useEffect } from 'react';
import {View,Text,StyleSheet, TouchableOpacity, Image, ActivityIndicator,FlatList,} from "react-native";
import { IMG_URL } from '../config/ip_address';
import axios from 'axios';

const List_images = () => {
  const [loading, setLoading] = useState(true);
  const [userPosts, setUserPosts] = useState([]);
  
    useEffect(() => {
      fetchUserPosts();
    }, []);

  const fetchImages = async () => {
    try {
      const latestResponse = await axios.get('http://192.168.1.214:5002/latest-images');
      const allResponse = await axios.get('http://192.168.1.214:5002/all-images');
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

const styles = StyleSheet.create({
container: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
},
postItem: {
  marginRight: 10,
  alignItems: "center",
},
postImage: {
  width: 150,
  height: 150,
  borderRadius: 10,
  marginBottom: 10,
},
postInfo: {
  alignItems: "center",
},
postText: {
  fontSize: 16,
  fontWeight: "bold",
  marginBottom: 5,
},
deleteText: {
  color: "red",
  fontSize: 14,
  fontWeight: "bold",
},
});


export default List_images;
