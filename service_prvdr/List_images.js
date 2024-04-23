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
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(`${IMG_URL}/all-images`);
        setUserPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user posts:", error);
        setLoading(false);
      }
    };
  
    const deletePost = (postId) => {
      axios
        .delete(`${IMG_URL}/post/${postId}`)
        .then((response) => {
          console.log("Post deleted successfully:", response.data);
          // Refresh user posts after deletion
          fetchUserPosts();
        })
        .catch((error) => {
          console.error("Error deleting post:", error);
        });
    };
return (
  <View style={styles.container}>
    <Text style={styles.heading}>Your Posts</Text>
    {loading ? (
      <ActivityIndicator size="large" color="#0000ff" />
    ) : (
      <FlatList
        data={userPosts}
        keyExtractor={(item) => item._id}
        vertical
        renderItem={({ item }) => (
          <View style={styles.postItem}>
            <TouchableOpacity onPress={() => deletePost(item._id)}>
              <Image
                source={{ uri: `data:image/jpeg;base64,${item.imageData}` }}
                style={styles.postImage}
              />
            </TouchableOpacity>
            <View style={styles.postInfo}>
              <Text style={styles.postText}>{item.originalFilename}</Text>
              <TouchableOpacity onPress={() => deletePost(item._id)}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    )}
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
