import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const NextScreen = ({ route }) => {
  const { firstName, lastName, selectedService } = route.params;
  const [profileImage, setProfileImage] = useState(null);

  // Function to handle image selection
  const handleImageSelect = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Sorry, we need camera roll permissions to make this work!');
        return;
      }
    }
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleImageSelect} style={styles.profileContainer}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <View style={styles.profilePlaceholder}>
            <Text style={styles.profilePlaceholderText}>Add Profile Picture</Text>
          </View>
        )}
      </TouchableOpacity>
   
      <Text style={styles.title}> {firstName} {lastName}</Text>
      <Text style={styles.text}>Welcome To {selectedService} Services</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => {}}>
        <Text style={styles.buttonText}>Add Post</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.requestsButton} onPress={() => {}}>
        <Text style={styles.requestsButtonText}>Incoming Requests</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    position: 'relative',
  },
  profileContainer: {
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  profilePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePlaceholderText: {
    fontSize: 16,
    color: '#555',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  logoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoPlaceholderText: {
    fontSize: 16,
    color: '#555',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#FDDA0D',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'Black',
    fontSize: 18,
    fontWeight:"bold"
  },
  requestsButton: {
    backgroundColor: '#FDDA0D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    position: 'absolute',
    top: 20,
    right: 20,
  },
  requestsButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NextScreen;
