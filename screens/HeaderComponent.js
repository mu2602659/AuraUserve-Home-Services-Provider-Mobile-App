import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, ImageBackground, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const HeaderComponent = ({ userName, userEmail, profileImage, handleProfileClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
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

  // Function to handle image selection
  const handleImageSelect = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Sorry, we need camera roll permissions to make this work!');
      return;
    }
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  return (
    <View style={styles.header}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={handleProfileClick}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.profileImage} />
          ) : (
            <Image source={profileImage} style={styles.profileImage} />
          )}
        </TouchableOpacity>
        <Text style={{ fontSize: 19, marginLeft: 8, fontWeight: "bold",}}>Welcome To AuraUserve</Text>
      </View>

      {/* Cart Icon */}
      <TouchableOpacity onPress={() => {/* Add your cart functionality */}}>
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
              <Image source={require('../assets/images/pic.jpg')} style={styles.profile} />
              <Text style={styles.name}>Arslan Saeed</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.Registered}>Registered</Text>
                <MaterialIcons name="person" size={24} color={"white"}/>
              </View>
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
          <TouchableOpacity onPress={closeMenu}>
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
    padding: 5,
    marginLeft: -103,
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
  }

});

export default HeaderComponent;
