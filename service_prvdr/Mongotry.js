//Mongotry.js
import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, Image, Button, Platform, Alert } from 'react-native';
import { Avatar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { IMG_URL } from '../config/ip_address';
import { DATA_URL } from '../config/ip_address';
import styles from './stylesProfileEdit'; // Import your styles

export default function ProfileEditScreen() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  
  const navigation = useNavigation();
  const route = useRoute();

  const ImagesList = () => {
    navigation.navigate('List_images');
  };
  const UserList = () => {
    navigation.navigate('List_Users');
  };
  useEffect(() => {
    const userData = route.params?.data;
    if (userData) {
      setEmail(userData.email);
      setImage(userData.image.uri);
      setName(userData.name);
      setMobile(userData.mobile);
    }
  }, [route.params]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    console.log(result);

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  

  const handleImageUpload = () => {
    if (!image) {
      // Ensure that an image is selected before uploading
      Alert.alert('No image selected', 'Please select an image before uploading.');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', {
      uri: image,
      type: 'image/jpeg',
      name: 'avatar.jpg',
    });

    axios.post(`${IMG_URL}/profile`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      console.log(response.data);
      if (response.data.status === 'ok') {
        Toast.show({
          type: 'success',
          text1: 'Success!!',
          text2: 'Image Uploaded',
          visibilityTime: 5000,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error!!',
          text2: response.data.data,
          visibilityTime: 5000,
        });
      }
    })
    .catch(error => {
      console.error('Error uploading image:', error);
      Toast.show({
        type: 'error',
        text1: 'Error!!',
        text2: 'Failed to upload image',
        visibilityTime: 5000,
      });
    });
  };

  const handleSubmit = () => {
    const userData = {
      name: name,
      email: email,
      mobile: mobile,
      image: { uri: image }
    };

    axios.post(`${DATA_URL}register`, userData)
      .then(res => {
        console.log(res.data);
        if (res.data.status === 'ok') {
          Toast.show({
            type: 'success',
            text1: 'Success!!',
            text2: 'User Created',
            visibilityTime: 5000,
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error!!',
            text2: res.data.data,
            visibilityTime: 5000,
          });
        }
      })
      .catch(e => console.log(e));
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps={'always'}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}>
      <View>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={30} style={styles.backIcon} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={styles.nameText}>Edit Profile</Text>
          </View>
          <View style={{ flex: 1 }}></View>
        </View>

        {/* Avatar */}
        <View style={styles.camDiv}>
          <TouchableOpacity onPress={pickImage}>
            <Avatar.Image
              size={140}
              style={styles.avatar}
              source={image ? { uri: image } : require('../assets/icon.png')}
            />
          </TouchableOpacity>
          <View style={styles.camIconDiv}>
            <Ionicons name="camera" size={22} style={styles.cameraIcon} />
          </View>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <Text>Name:</Text>
          <TextInput
            placeholder="Your Name"
            placeholderTextColor={'#999797'}
            style={styles.inputField}
            value={name}
            onChangeText={setName}
          />
          <Text>Email:</Text>
          <TextInput
            placeholder="Your Email"
            placeholderTextColor={'#999797'}
            style={styles.inputField}
            value={email}
            onChangeText={setEmail}
          />
          <Text>Mobile No:</Text>
          <TextInput
            placeholder="Your Mobile No"
            placeholderTextColor={'#999797'}
            keyboardType="numeric"
            maxLength={10}
            style={styles.inputField}
            value={mobile}
            onChangeText={setMobile}
          />
        </View>

        {/* Save Button */}
        <View style={styles.buttonDiv}>
          <TouchableOpacity onPress={handleSubmit} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Form Data To Back-End</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleImageUpload} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Upload Image to Back-End</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={ImagesList} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>View All Images  Data</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={UserList} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>View All Users Data</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
