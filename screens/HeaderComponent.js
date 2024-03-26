import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, ImageBackground, StyleSheet, Dimensions } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';

const HeaderComponent = ({ userName, userEmail, profileImage, handleProfileClick, navigation }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <View style={styles.header}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={handleProfileClick}>
          <Image source={profileImage} style={styles.profileImage} />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, marginLeft: 8 }}>{userName}</Text>
        <Text style={{ fontSize: 14, marginLeft: 8 }}>{userEmail}</Text>
      </View>

      {/* Cart Icon */}
      <TouchableOpacity onPress={() => {/* Add your cart functionality */}}>
        <Ionicons name="shopping-cart" size={24} color="black" />
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
          <TouchableOpacity onPress={closeMenu}>
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
          <TouchableOpacity onPress={closeMenu}>
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
    height: 704,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1,
  },
  menuItem: {
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 42,
    
  },
  menuText: {
    fontSize: 17,
    marginLeft: 10,
    fontWeight: "bold",
  
    
  },
  container: {
    flex: 1
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
  }

});

export default HeaderComponent;
