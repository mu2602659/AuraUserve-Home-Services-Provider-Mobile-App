import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const HeaderComponent = ({ userName, profileImage, handleProfileClick, navigation }) => {
  return (
    <View style={styles.header}>
      {/* Welcome Message with User Name */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {/* Profile Picture */}
        <TouchableOpacity onPress={handleProfileClick}>
          <Image source={profileImage} style={styles.profileImage} />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, marginLeft: 8 }}>Welcome, {userName}</Text>
      </View>

      {/* Cart Icon */}
      <TouchableOpacity onPress={() => {/* Add your cart functionality */}}>
        <FontAwesome5 name="shopping-cart" size={24} color="black" />
      </TouchableOpacity>

      {/* Hamburger Menu */}
      <TouchableOpacity style={styles.hamburgerMenu} onPress={() => navigation.openDrawer()}>
        <FontAwesome5 name="bars" size={24} color="black" />
      </TouchableOpacity>
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
});

export default HeaderComponent;
