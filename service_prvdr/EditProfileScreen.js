// components/EditProfileScreen.js
import React, { useState, useEffect } from "react"; // Add this line
import {View,Text,StyleSheet, TouchableOpacity, Image, TextInput,Alert,} from "react-native";

const EditProfileScreen = () => {
    const [image, setImage] = useState(null);
    
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage} style={styles.profileContainer}>
            {image ? (
              <Image source={{ uri: image }} style={styles.profileImage} />
            ) : (
              <View style={styles.profilePlaceholder}>
                <Text style={styles.profilePlaceholderText}>Add</Text>
              </View>
            )}
          </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EditProfileScreen;
