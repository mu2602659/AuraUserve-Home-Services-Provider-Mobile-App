import React, { useState, useEffect } from "react"; // Add this line
import {View,Text,StyleSheet,TouchableOpacity,Image,TextInput,Alert,} from "react-native";
import * as ImagePicker from "expo-image-picker";
import HamburgerMenu from "./HamburgerMenu";
import { FontAwesome5 } from "@expo/vector-icons";
import { IMG_URL } from "../config/ip_address";
import axios from "axios";

const NextScreen = ({ route }) => {
  const { firstName, lastName, selectedService } = route.params;
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

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
  const handleImageUpload = () => {
    if (!image) {
      Alert.alert(
        "No image selected",
        "Please select an image before uploading."
      );
      return;
    }
    if (!description) {
      Alert.alert(
        "Description required",
        "Please enter a description for the image."
      );
      return;
    }

    const formData = new FormData();
    formData.append("avatar", {
      uri: image,
      type: "image/jpeg",
      name: "avatar.jpg",
    });
    formData.append("description", description);

    axios
      .post(`${IMG_URL}/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === "ok") {
          Toast.show({
            type: "success",
            text1: "Success!!",
            text2: "Image Uploaded",
            text2: "Decription Added",
            visibilityTime: 1000,
          });
        } else {
          Toast.show({
            type: "error",
            text1: "Error!!",
            text2: response.data.data,
            visibilityTime: 1000,
          });
        }
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        Toast.show({
          type: "error",
          text1: "Error!!",
          text2: "Failed to upload image",
          visibilityTime: 1000,
        });
      });
  };
  const navigateToAllPosts = () => {
    navigation.navigate("List_images");
    closeMenu();
  };

  const navigateToEditProfile = () => {
    navigation.navigate("EditProfileScreen");
    closeMenu();
  };

  const navigateToAllUsers = () => {
    navigation.navigate("List_Users");
    closeMenu();
  };

  const handleNavigatefirebase_img = () => {
    navigation.navigate("firebase_img");
    closeMenu();
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HamburgerMenu />
      </View>

      <Text style={{ marginTop: 10, fontSize: 18 }}>
        {firstName} {lastName}
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 20 }}>
        Welcome to {selectedService} Services
      </Text>
      <TouchableOpacity style={styles.addButton} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick an image from camera roll</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <TextInput
        style={styles.input}
        placeholder="Enter Image Description"
        onChangeText={(text) => setDescription(text)}
      />
      <TouchableOpacity onPress={handleImageUpload} style={styles.addButton}>
        <Text style={styles.buttonText}>Add Post</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.requestsButton} onPress={() => {}}>
        <Text style={styles.requestsButtonText}>Incoming Requests</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerItem}
          onPress={handleNavigatefirebase_img}
        >
          <FontAwesome5
            name="file-alt"
            size={20}
            color="black"
            style={styles.footerIcon}
          />
          <Text style={styles.footerText}>Firebase store image</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerItem}>
          <FontAwesome5
            name="sign-out-alt"
            size={20}
            color="black"
            style={styles.footerIcon}
          />
          <Text style={styles.footerText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    position: "absolute",
    top: 0,
    left:0,
    right: 218,
    zIndex: 1,
  },
  image: {
    width: 200,
    height: 200,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    position: "relative",
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
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
  },
  profilePlaceholderText: {
    fontSize: 16,
    color: "#555",
  },
  logoContainer: {
    alignItems: "center",
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
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
  },
  logoPlaceholderText: {
    fontSize: 16,
    color: "#555",
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
    backgroundColor: "#FDDA0D",
    padding: 15,
    color: "Black",
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "Black",
    fontSize: 18,
    fontWeight: "bold",
  },
  requestsButton: {
    backgroundColor: "#FDDA0D",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    position: "absolute",
    top: 20,
    right: 20,
  },
  requestsButtonText: {
    fontSize: 18,
    fontWeight: "bold",
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
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FDDA0D",
    paddingVertical: 10,
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerIcon: {
    marginRight: 5,
  },
  footerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NextScreen;
//above hamburger menu inside this page
