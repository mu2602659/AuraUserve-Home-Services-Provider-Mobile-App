import React, { useState, useEffect } from "react";
import { ActivityIndicator,ScrollView,ImageBackground, FlatList, View, Text, TouchableOpacity, Image, menuWidth,StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { signOut } from "firebase/auth";
import axios from "axios";
import { IMG_URL } from "../config/ip_address";

import { auth } from "../config/firebase";

const HamburgerMenu = () => {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileImages, setProfileImages] = useState([]);
  const [latestImages, setLatestImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogout = async () => {
    try {
        await signOut(auth);
        navigation.navigate('Welcome');
    } catch (error) {
        console.error('Sign-out error:', error.message);
    }
};


  useEffect(() => {
    fetchProfileImages();
  }, []);

  const fetchProfileImages = async () => {
    try {
      const response = await axios.get(`${IMG_URL}/profile-images`);
      setProfileImages(response.data);
      setLatestImages(response.data.slice(-1)); // Get last two latest images
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile images:", error);
      setLoading(false);
    }
  };

  const navigateToAllPosts = () => {
    navigation.navigate('List_images');
    closeMenu();
  };

  const navigateToEditProfile = () => {
    navigation.navigate('EditProfileScreen');
    closeMenu();
  };

  const navigateToAllUsers = () => {
    navigation.navigate('List_Users');
    closeMenu();
  };

  const handleNavigatefirebase_img = () => {
    navigation.navigate('firebase_img');
    closeMenu();
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: `data:image/jpeg;base64,${item.imageData}` }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </View>
  );
  

  return (
    <View style={styles.header}>
    <TouchableOpacity onPress={toggleMenu} style={styles.hamburgerMenu}>
      <FontAwesome5 name="bars" size={100} color="black" paddingHorizontal={100} paddingLeft={100}/>
    </TouchableOpacity>

    {isMenuOpen && (
      <View style={styles.menu}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
        data={latestImages}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
        )}

          <TouchableOpacity onPress={navigateToEditProfile}>
            <View style={styles.menuItem}>
              <MaterialIcons name="home" size={24} color="black" />
              <Text style={styles.menuText}>Edit Profile</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={navigateToAllPosts}>
            <View style={styles.menuItem}>
              <MaterialIcons name="info" size={24} color="black" />
              <Text style={styles.menuText}>Posts</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToAllUsers}>
            <View style={styles.menuItem}>
              <MaterialIcons name="settings" size={24} color="black" />
              <Text style={styles.menuText}>Profile pictures</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNavigatefirebase_img}>
            <View style={styles.menuItem}>
              <MaterialIcons name="announcement" size={24} color="black" />
              <Text style={styles.menuText}>Firebase store image</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} >
            <View style={styles.menuItem}>
              <MaterialIcons name="logout" size={24} color="black" />
              <Text style={styles.menuText}>LogOut</Text>
            </View>
          </TouchableOpacity>

          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={closeMenu}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 20,
  },
  hamburgerMenu: {
    marginRight: 10,
    marginLeft: -90,
    marginTop:-17,
  },
  hoveredItem: {
    backgroundColor: "#f0f0f0",
  },
  menu: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'white',
    width: 280,
    height: 705,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1,
    width: menuWidth, // Media query applied here
  },
  menuItem: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 16,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "bold",
    color: "black",
  },
  profile: {
    width: 85,
    height: 85,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#FFF",
    resizeMode: "center",
  },
  name: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "800",
    marginVertical: 8
  },
  Registered: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "700",
    marginVertical: 5
  },
  closeButton: {
    alignSelf: 'left',
    marginTop: 20,
    paddingHorizontal: 120,
    paddingVertical: 10,
    backgroundColor: '#FFD700',
  },
  hoveredItem: {
    backgroundColor: "#f0f0f0", // Change the background color when hovered
  },
  closeButtonText:{
    fontWeight: "bold",
    fontSize: 15,
  },
  editButton:{
    marginLeft: 110,
   marginTop: 0,

  },
  
  profileContainer: {
    marginBottom: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 75,
  },
  profilePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 75,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePlaceholderText: {
    fontSize: 16,
    color: '#555',
  },
  
  profileContainer1: {
    marginBottom: 20,
  },
  profileImage1: {
    width: 110,
    height: 110,
    borderRadius: 75,
  },
  profilePlaceholder1: {
    width: 100,
    height: 100,
    borderRadius: 75,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePlaceholderText1: {
    fontSize: 16,
    color: '#555',
  },
});

export default HamburgerMenu;