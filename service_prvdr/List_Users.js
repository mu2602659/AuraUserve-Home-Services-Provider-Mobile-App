import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, FlatList } from "react-native";
import { IMG_URL } from "../config/ip_address";
import axios from "axios";

const ProfileImages = () => {
  const [profileImages, setProfileImages] = useState([]);
  const [latestImages, setLatestImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all users
        const usersResponse = await axios.get('http://192.168.1.214:5001/users');
        setUsers(usersResponse.data);

        // Fetch latest user
        const latestUserResponse = await axios.get('http://192.168.1.214:5001/latest-user');
        setLatestUser(latestUserResponse.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

  const deleteImage = async (imageId) => {
    try {
      await axios.delete(`${IMG_URL}/profile-image/${imageId}`);
      // Refresh profile images after deletion
      fetchProfileImages();
    } catch (error) {
      console.error("Error deleting profile image:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: `data:image/jpeg;base64,${item.imageData}` }} style={styles.image} />
      <TouchableOpacity onPress={() => deleteImage(item._id)} style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>All Profile Images</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={profileImages}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      )}
      <Text style={styles.heading}>Latest Profile Images</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={latestImages}
          horizontal
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
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
    padding: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProfileImages;
