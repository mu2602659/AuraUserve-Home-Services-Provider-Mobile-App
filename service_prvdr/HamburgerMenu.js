import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, RefreshControl } from "react-native"; // Import RefreshControl
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { IMG_URL } from "../config/ip_address";
import axios from "axios";

const HamburgerMenu = ({ handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [latestImage, setLatestImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    fetchLatestImage();
  }, [refreshing]);

  const fetchLatestImage = async () => {
    try {
      const response = await axios.get(`${IMG_URL}/latest-images`);
      if (response.data && response.data.length > 0) {
        setLatestImage(response.data[0]);
      }
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.error("Error fetching image:", error);
      setLoading(false);
      setRefreshing(false);
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

  const handleRefresh = () => {
    setRefreshing(true);
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={toggleMenu} style={styles.hamburgerMenu}>
        <FontAwesome5 name="bars" size={24} color="black" />
      </TouchableOpacity>

      {isMenuOpen && (
        <View style={styles.menu}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            {loading ? (
              <ActivityIndicator />
            ) : latestImage ? (
              <>
                <Image
                  source={{
                    uri: `data:image/jpeg;base64,${latestImage.imageData}`,
                  }}
                  style={{ width: 150, height: 150, borderRadius: 75 }}
                />
              </>
            ) : (
              <View style={{ alignItems: "center" }}>
                <Text>No image found</Text>
              </View>
            )}
          </View>

          <TouchableOpacity style={styles.menuItem} onPress={navigateToEditProfile}>
            <FontAwesome5 name="edit" size={20} color="black" style={styles.menuIcon} />
            <Text style={styles.menuText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={navigateToAllPosts}>
            <FontAwesome5 name="file-alt" size={20} color="black" style={styles.menuIcon} />
            <Text style={styles.menuText}>All Posts</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={navigateToAllUsers}>
            <FontAwesome5 name="users" size={20} color="black" style={styles.menuIcon} />
            <Text style={styles.menuText}>All users</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleNavigatefirebase_img}>
            <FontAwesome5 name="file-alt" size={20} color="black" style={styles.menuIcon} />
            <Text style={styles.menuText}>Firebase store image</Text>
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
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    zIndex: 1,
  },
  hamburgerMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 10,
  },
  menu: {
    position: 'absolute',
    top: 0,
    right: 5,
    paddingVertical: 19,
    backgroundColor: '#FFF',
    width: 200,
    height: 900,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  menuIcon: {
    marginRight: 5,
  },
  menuText: {
    fontSize: 16,
    color: 'black',
  },
});

export default HamburgerMenu;
