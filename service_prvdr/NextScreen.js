import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image,ImageBackground, TextInput, Alert, Dimensions, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import HamburgerMenu from "./HamburgerMenu";
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from "@expo/vector-icons";
import { IMG_URL } from "../config/ip_address";
import ServicePicker from "../Posts_integration/ServicePicker";
import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import WelcomeScreen from "../screens/WelcomeScreen";

const NextScreen = ({ route }) => {
  const { firstName, lastName } = route.params;
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
        await signOut(auth);
        navigation.navigate('welcome');
    } catch (error) {
        console.error('Sign-out error:', error.message);
    }
};

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

  const services = ['Gardening', 'Security', 'Beauty Salon','Clinical','Maintenance','Shifting','Solar','Cleaning','Event Organization','Vehicle Maintenance','HomeCare Solutions'];

  const handleServiceSelection = (service) => {
    setSelectedService(service);
    setModalVisible(false);
  };

 const handleSubmit = () => {
    if (!image || !title || !description || !price || !address || !selectedService) {
      Alert.alert("Incomplete Form", "Please fill in all fields before submitting.");
      return;
    }

   // if (submitted) {
   //   Alert.alert("Already Submitted", "You have already submitted this form.");
    //  return;
   // }
    

    const formData = new FormData();
    formData.append("avatar", {
      uri: image,
      type: "image/jpeg",
      name: "avatar.jpg",
    });
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("address", address);
    formData.append("service", selectedService);

    axios
      .post(`${IMG_URL}/post-image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === "ok") {
          Alert.alert("Success", "Image Uploaded and Description Added Successfully");
          setSubmitted(true);
        } else if (response.data.status === "error" && response.data.message === "Duplicate post") {
          Alert.alert("Error", "Duplicate post. You have already submitted this post.");
        } else {
          Alert.alert("Error", "Failed to upload image. Please try again later.");
        }
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        Alert.alert("Error", "Failed to upload image. Please try again later.");
      });
  };
  
  const navigateToAllPosts = () => {
    navigation.navigate("List_images");
  };

  const navigateToEditProfile = () => {
    navigation.navigate("EditProfileScreen");
  };

  const navigateToAllUsers = () => {
    navigation.navigate("List_Users");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <HamburgerMenu />
        </View>    
        <View style={styles.formContainer}>
          <Text style={styles.name}>{firstName} {lastName}</Text>
          <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <View style={styles.profilePlaceholder}>
                <FontAwesome5 name="image" size={50} color="#ccc" />
                <Text style={styles.lablel}>Add Post</Text>
              </View>
            )}
          </TouchableOpacity>

          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            onChangeText={(text) => setTitle(text)}
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Image Description"
            onChangeText={(text) => setDescription(text)}
          />

          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            placeholder="Price"
            onChangeText={(text) => setPrice(text)}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={address}
            onChangeText={(text) => setAddress(text)}
          />

          <Text style={styles.label}>Selected Service</Text>
          <TouchableOpacity style={styles.serviceContainer} onPress={() => setModalVisible(true)}>
            <Text style={[styles.input, selectedService ? styles.selectedService : null]}>{selectedService ? selectedService : 'Select a Service'}</Text>
          </TouchableOpacity>
          <ServicePicker
            visible={modalVisible}
            services={services}
            selectedService={selectedService}
            onSelect={handleServiceSelection}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.requestsButton} onPress={() => {}}>
          <Text style={styles.requestsButtonText}>Incoming Requests</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer */}
      <ImageBackground 
    source={require("../assets/images/blackk.jpg")}
      style={styles.footerBackground}
    >
      <View style={styles.footer}>
         <TouchableOpacity style={styles.footerItem}onPress={navigateToEditProfile}>
          <FontAwesome5 name="edit" size={24} color="white" />
          <Text style={styles.footerText}>Edit Profile</Text>
        </TouchableOpacity>

         <TouchableOpacity onPress={navigateToAllPosts} style={styles.footerItem}>
          <FontAwesome5 name="image" size={24} color="white" />
          <Text style={styles.footerText}>All Posts</Text>
        </TouchableOpacity>

<TouchableOpacity style={styles.footerItem}onPress={navigateToAllUsers}>
          <FontAwesome5 name="user" size={24} color="white" />
          <Text style={styles.footerText}>All Users</Text>
        </TouchableOpacity>

 <TouchableOpacity onPress={handleLogout} style={styles.footerItem}>
          <FontAwesome5 name="sign-out-alt" size={24} color="white" />
          <Text style={styles.footerText}>Logout</Text>
        </TouchableOpacity>
        
      </View>
      </ImageBackground>
      
    </View>
    
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    padding:-1,
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: windowWidth - 218,
    zIndex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    paddingTop:80,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: 200,
    height: 180,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: "black",
    borderRadius: 17,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft:6,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    marginLeft:8,
    marginRight:4,
  },
  serviceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  selectedService: {
    backgroundColor: "#FDDA0D",
  },
  submitButton: {
    backgroundColor: "#FDDA0D",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  requestsButton: {
    backgroundColor: "#FDDA0D",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    position: "absolute",
    top: 20,
    right: 2,
  },
  requestsButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  footerBackground: {
    width: '100%',
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal:8,
  },
  footerItem: {
    alignItems: "center",
  },
  footerText: {
    fontSize: 13,
    color: "white",
    fontWeight: "bold",
  },
  menuIcon: {
    marginRight: 5,
  },
  menuText: {
    fontSize: 16,
    color: "black",
  },
  lablel:{
    alignSelf: 'flex-start',
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft:-8,

  }
 
});

export default NextScreen;
