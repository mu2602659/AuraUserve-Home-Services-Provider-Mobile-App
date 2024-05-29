import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const FooterComponent = ({ Prov_Requirement, handleLogout, myProfile }) => {
  return (
    <ImageBackground 
    source={require("../assets/images/blackk.jpg")}
      style={styles.footerBackground}
    >
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem}>
          <FontAwesome5 name="home" size={24} color="white" />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={Prov_Requirement} style={styles.footerItem}>
          <FontAwesome5 name="briefcase" size={24} color="white" />
          <Text style={styles.footerText}>Job Opportunities</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.footerItem}>
          <FontAwesome5 name="book" size={24} color="white" />
          <Text style={styles.footerText}>Bookings</Text>
        </TouchableOpacity>
        
        {/* Updated TouchableOpacity for My Profile */}
        <TouchableOpacity onPress={myProfile} style={styles.footerItem}>
          <FontAwesome5 name="user" size={24} color="white" />
          <Text style={styles.footerText}>My Profile</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleLogout} style={styles.footerItem}>
          <FontAwesome5 name="sign-out-alt" size={24} color="white" />
          <Text style={styles.footerText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  footerBackground: {
    width: '100%',
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 9,
    paddingHorizontal:8,
  },
  footerItem: {
    alignItems: "center",
  },
  footerText: {
    marginTop: 5,
    fontSize: 12,
    color:"white",
  },
});

export default FooterComponent;
