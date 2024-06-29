import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, FlatList, TouchableWithoutFeedback, Dimensions } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { IMG_URL } from "../config/ip_address";
import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

const HamburgerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileImages, setProfileImages] = useState([]);
  const [latestImages, setLatestImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const menuWidth = Dimensions.get('window').width * 0.8; // 80% of screen width

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

  const navigateToAcceptedBookings = () => {
    navigation.navigate('AcceptedBookings'); 
  };

  const navigateTocomment = () => {
    navigation.navigate('Comment'); 
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
    <TouchableWithoutFeedback onPress={() => isMenuOpen && closeMenu()}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleMenu} style={styles.hamburgerMenu}>
            <FontAwesome5 name="bars" size={24} color="black" />
          </TouchableOpacity>

          {isMenuOpen && (
            <View style={[styles.menu, { width: menuWidth }]}>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <FlatList
                  data={latestImages}
                  renderItem={renderItem}
                  keyExtractor={(item) => item._id}
                />
              )}
              <TouchableOpacity style={styles.menuItem} onPress={navigateToEditProfile}>
                <FontAwesome5 name="edit" size={20} color="black" style={styles.menuIcon} />
                <Text style={styles.menuText}>Edit Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={navigateToAllPosts}>
                <FontAwesome5 name="image" size={20} color="black" style={styles.menuIcon} />
                <Text style={styles.menuText}>Posts</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={navigateToAllUsers}>
                <FontAwesome5 name="user" size={20} color="black" style={styles.menuIcon} />
                <Text style={styles.menuText}>Profile pictures</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={handleNavigatefirebase_img}>
                <FontAwesome5 name="file-alt" size={20} color="black" style={styles.menuIcon} />
                <Text style={styles.menuText}>Firebase store image</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={navigateToAcceptedBookings}>
                <FontAwesome5 name="check-circle" size={20} color="black" style={styles.menuIcon} />
                <Text style={styles.menuText}>Accepted Bookings</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={navigateTocomment}>
                <FontAwesome5 name="comment" size={20} color="black" style={styles.menuIcon} />
                <Text style={styles.menuText}>Review</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                <FontAwesome5 name="sign-out-alt" size={20} color="black" style={styles.menuIcon} />
                <Text style={styles.menuText}>Logout</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={closeMenu}>
                <FontAwesome5 name="times" size={20} color="black" style={styles.menuIcon} />
                <Text style={styles.menuText}>Close</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'relative',
    zIndex: 1,
  },
  hamburgerMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 12,
  },
  menu: {
    position: 'absolute',
    top: 0,
    right: -105,
    backgroundColor: 'white',
    width: 200,
    height: 705,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1,
  },
  menuItem: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 20,
  },
  menuIcon: {
    marginRight: 4,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "bold",
    color: "black",
  },
  item: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
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

export default HamburgerMenu;
