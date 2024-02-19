// User_Dashboard.js
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";

const User_Dashboard = () => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from backend
    // Example:
    // fetch('api_endpoint')
    //   .then(response => response.json())
    //   .then(data => setPosts(data))
    //   .catch(error => console.error('Error fetching posts:', error));
    // For demonstration, using mock data
    const mockPosts = [
      { id: "1", description: "Post 1 description" },
      { id: "2", description: "Post 2 description" },
      // Add more mock posts as needed
    ];
    setPosts(mockPosts);
  }, []);

  const handleBooking = (postId) => {
    // Handle booking action
    // Example:
    // fetch(`api_endpoint/book/${postId}`, { method: 'POST' })
    //   .then(response => {
    //     // Handle response
    //   })
    //   .catch(error => console.error('Error booking:', error));
    // For demonstration, just showing an alert
    Alert.alert("Booking", `Post ${postId} booked successfully!`);
  };

  const renderPostItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleBooking(item.id)}
      style={{
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#CCCCCC",
      }}
    >
      <Text>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <>
    

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
          User Dashboard
        </Text>
        <FlatList
          data={posts}
          renderItem={renderPostItem}
          keyExtractor={(item) => item.id}
          style={{ width: "100%" }}
        />
      </View>
    </>
  );
};

export default User_Dashboard;
