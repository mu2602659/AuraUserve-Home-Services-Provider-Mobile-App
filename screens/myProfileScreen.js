import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const MyProfileScreen = ({ navigation }) => {
  // Function to handle logout
  const handleLogout = () => {
    // Implement your logout logic here
    // For example, navigate to the login screen after logout
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>
      <View style={styles.profileInfo}>
        {/* Display user information here */}
        <Text>Name: John Doe</Text>
        <Text>Email: johndoe@example.com</Text>
        {/* Add more profile information as needed */}
      </View>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  profileInfo: {
    marginBottom: 20,
  },
});

export default MyProfileScreen;
