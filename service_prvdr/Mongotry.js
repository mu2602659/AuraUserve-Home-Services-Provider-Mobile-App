import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, ImageBackground, StyleSheet, Image, Alert } from 'react-native';
import { Avatar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import styles from './stylesProfileEdit'; 

export default function ProfileEditScreen() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [saveState, setSaveState] = useState('Save Profile'); // New state for button text
  const navigation = useNavigation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadMedia = async () => {
    if (!image) {
      Alert.alert('Please pick an image first.');
      return;
    }

    setUploading(true);
    setSaveState('Saving...');

    try {
      const { uri } = await FileSystem.getInfoAsync(image);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => resolve(xhr.response);
        xhr.onerror = (e) => reject(new TypeError('Network request failed'));
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
      });

      const filename = image.substring(image.lastIndexOf('/') + 1);
      const storage = getStorage();
      const storageRef = ref(storage, `user_edit-profile/${filename}`); // Path to store image in Firebase Storage

      // Upload image to Firebase Storage
      await uploadBytes(storageRef, blob);

      // Get download URL of the uploaded image
      const imageUrl = await getDownloadURL(storageRef);

      // Store user information and image URL in Firestore
      const db = getFirestore();
      await addDoc(collection(db, 'user_edit-profile'), {
        name: name,
        email: email,
        mobile: mobile,
        imageUrl: imageUrl,
        createdAt: new Date() 
      });

      setUploading(false);
      setSaveState('Saved'); // Set the button state to "Saved"
      Alert.alert('Profile Updated Successfully!');
      setImage(null);
      
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error uploading image. Please try again.');
      setUploading(false);
      setSaveState('Save Profile');
    }
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
          <ImageBackground source={require('../assets/images/background.jpg')} style={{ padding: 210, paddingTop:7,position: 'absolute' }} />
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
          <Text style={[{fontWeight:'bold',marginTop:'2%',marginLeft:'1%'}]}>Name:</Text>
          <TextInput
            placeholder="Your Name"
            placeholderTextColor={'#999797'}
            style={styles.inputField}
            value={name}
            onChangeText={setName}
          />
          <Text style={[{fontWeight:'bold',marginLeft:'1%'}]}>Email:</Text>
          <TextInput
            placeholder="Your Email"
            placeholderTextColor={'#999797'}
            style={styles.inputField}
            value={email}
            onChangeText={setEmail}
          />
          <Text style={[{fontWeight:'bold',marginLeft:'1%'}]}>Mobile No:</Text>
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
        <View style={styles.imageContainer}>
          {image && 
            <Image source={{ uri: image }} style={styles.image} />
          }
        </View>

        <View style={styles.buttonDiv}>
        <TouchableOpacity style={styles.saveButton} onPress={uploadMedia} disabled={uploading}>
            <Text style={styles.saveButtonText}>{saveState}</Text>
        </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
