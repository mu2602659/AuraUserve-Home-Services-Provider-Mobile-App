import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, ImageBackground, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const HeaderComponent = ({ userName, userEmail,handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navigateToHomeScreen = () => {
    navigation.navigate('home');
  };

  const navigateToServicesScreen = () => {
    navigation.navigate('Services');
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
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
    <View style={styles.header}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={pickImage} style={styles.profileContainer}>
      {image ? (
        <Image source={{ uri: image }} style={styles.profileImage} />
          ) : (
          <View style={styles.profilePlaceholder}>
            <Text style={styles.profilePlaceholderText}>Add</Text>
          </View>
          )}
      </TouchableOpacity>
      <Text style={{ fontSize: 17, marginLeft: 5, marginTop:-17, fontWeight: "bold",}}>Welcome To AuraUserve</Text>
      </View>

      {/* Cart Icon */}
      <TouchableOpacity style={styles.CartMenu} onPress={() => {/* Add your cart functionality */}}>
        <FontAwesome5 name="shopping-cart" size={24} color="black" />
      </TouchableOpacity>

      {/* Hamburger Menu */}
      <TouchableOpacity style={styles.hamburgerMenu} onPress={toggleMenu}>
        <FontAwesome5 name="bars" size={24} color="black" />
      </TouchableOpacity>

      {/* Menu Items */}
      {isMenuOpen && (
        <View style={styles.menu}>
          <ScrollView>
            <ImageBackground source={require('../assets/images/background.jpg')} style={{ width: undefined, padding: 16, paddingTop: 48 }}>
          <TouchableOpacity onPress={pickImage} style={styles.profileContainer1}>
              {image ? (
                <Image source={{ uri: image }} style={styles.profileImage1} />
                ) : (
              <View style={styles.profilePlaceholder1}>
                <Text style={styles.profilePlaceholderText1}>Add Profile Picture</Text>
              </View>
              )}
          </TouchableOpacity>
              <Text style={{ fontSize: 16, marginLeft: 8, color: 'white', fontWeight: "bold" }}>{userName}</Text>
        <Text style={{ fontSize: 14, marginLeft: 8, color: 'white', fontWeight:"bold" }}>{userEmail}</Text>
            </ImageBackground>
          </ScrollView>
          <TouchableOpacity onPress={navigateToHomeScreen}>
            <View style={styles.menuItem}>
              <MaterialIcons name="home" size={24} color="black" />
              <Text style={styles.menuText}>Home</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={closeMenu}>
            <View style={styles.menuItem}>
              <MaterialIcons name="info" size={24} color="black" />
              <Text style={styles.menuText}>About</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToServicesScreen}>
            <View style={styles.menuItem}>
              <MaterialIcons name="settings" size={24} color="black" />
              <Text style={styles.menuText}>Services</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={closeMenu}>
            <View style={styles.menuItem}>
              <MaterialIcons name="announcement" size={24} color="black" />
              <Text style={styles.menuText}>Terms & Conditions</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={closeMenu}>
            <View style={styles.menuItem}>
              <MaterialIcons name="contacts" size={24} color="black" />
              <Text style={styles.menuText}>Contact</Text>
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
    padding: 16,
  },
  profileImage: {
    width: 40,
    height: 40,
    resizeMode: "cover",
    borderRadius: 20,
  },
  hamburgerMenu: {
    marginLeft: -130,
    marginTop:-17,
  },
  CartMenu: {
    marginLeft: -110,
    marginTop:-17,
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

  },
  menuItem: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 20,
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

export default HeaderComponent;